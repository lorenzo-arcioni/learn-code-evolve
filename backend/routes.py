from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import RedirectResponse
from datetime import timedelta
from bson import ObjectId
from typing import List
import os
import shutil
from models import (
    User, UserCreate, UserInDB, Token, Exercise, ExerciseCreate,
    Theory, TheoryCreate, LeaderboardEntry, UserUpdate, AvatarResponse
)
from auth import (
    authenticate_user, create_access_token, get_current_active_user,
    get_password_hash, get_google_user_info, ACCESS_TOKEN_EXPIRE_MINUTES
)
from database import db

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI")
GOOGLE_DISCOVERY_URL = os.getenv("GOOGLE_DISCOVERY_URL") 

router = APIRouter()

# Authentication routes
@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/auth/google/login")
async def google_login():
    # Invia l'utente a Google per login
    return RedirectResponse(
        f"https://accounts.google.com/o/oauth2/v2/auth"
        f"?response_type=code"
        f"&client_id={GOOGLE_CLIENT_ID}"
        f"&redirect_uri={GOOGLE_REDIRECT_URI}"
        f"&scope=openid%20email%20profile"
    )

@router.get("/auth/google/callback")
async def google_callback(code: str):
    try:
        google_user = await get_google_user_info(code)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Failed to authenticate with Google")

    email = google_user.get("email")
    name = google_user.get("name")
    picture = google_user.get("picture")
    
    # Cerca l'utente nel DB, o crealo se non esiste
    user = await db["users"].find_one({"email": email})
    if not user:
        new_user = UserInDB(
            username=email.split("@")[0],
            email=email,
            full_name=name,
            hashed_password="",  # no password
            is_active=True,
            points=0,
            solved_exercises=[],
            avatar_url=picture
        )
        result = await db["users"].insert_one(new_user.dict(by_alias=True))
        user = await db["users"].find_one({"_id": result.inserted_id})

    # Crea token JWT
    access_token = create_access_token(data={"sub": user["username"]})
    
    # In un'app reale potresti redirigere verso il frontend con il token
    return {"access_token": access_token, "token_type": "bearer"}

# User management
@router.post("/users/", response_model=User)
async def create_user(user: UserCreate):
    existing_user = await db["users"].find_one(
        {"$or": [{"username": user.username}, {"email": user.email}]}
    )
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already registered",
        )
    
    hashed_password = get_password_hash(user.password)
    user_in_db = UserInDB(
        **user.dict(exclude={"password"}),
        hashed_password=hashed_password,
    )
    
    result = await db["users"].insert_one(user_in_db.dict(by_alias=True))
    created_user = await db["users"].find_one({"_id": result.inserted_id})
    
    return User(
        id=str(created_user["_id"]),
        username=created_user["username"],
        email=created_user["email"],
        full_name=created_user.get("full_name"),
        points=created_user["points"],
        solved_exercises=created_user["solved_exercises"]
    )

@router.get("/users/me", response_model=User)
async def read_users_me(current_user: UserInDB = Depends(get_current_active_user)):
    return User(
        id=str(current_user.id),
        username=current_user.username,
        email=current_user.email,
        full_name=current_user.full_name,
        points=current_user.points,
        solved_exercises=current_user.solved_exercises,
        avatar_url=current_user.avatar_url
    )

@router.put("/users/me", response_model=User)
async def update_user_profile(
    user_update: UserUpdate,
    current_user: UserInDB = Depends(get_current_active_user)
):
    user_data = {k: v for k, v in user_update.dict(exclude_unset=True).items() if v is not None}
    
    if user_data:
        await db["users"].update_one(
            {"_id": current_user.id},
            {"$set": user_data}
        )
    
    updated_user = await db["users"].find_one({"_id": current_user.id})
    return User(
        id=str(updated_user["_id"]),
        username=updated_user["username"],
        email=updated_user["email"],
        full_name=updated_user.get("full_name"),
        points=updated_user["points"],
        solved_exercises=updated_user["solved_exercises"],
        avatar_url=updated_user.get("avatar_url")
    )

@router.post("/users/me/avatar", response_model=AvatarResponse)
async def upload_avatar(
    file: UploadFile = File(...),
    current_user: UserInDB = Depends(get_current_active_user)
):
    # Ensure the uploads directory exists
    os.makedirs("uploads/avatars", exist_ok=True)
    
    # Create a unique filename
    file_extension = file.filename.split(".")[-1]
    file_path = f"uploads/avatars/{current_user.id}.{file_extension}"
    
    # Save the file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Update the user's avatar_url in the database
    avatar_url = f"/avatars/{current_user.id}.{file_extension}"
    await db["users"].update_one(
        {"_id": current_user.id},
        {"$set": {"avatar_url": avatar_url}}
    )
    
    return {"avatar_url": avatar_url}

# Exercises routes
@router.post("/exercises/", response_model=Exercise)
async def create_exercise(exercise: ExerciseCreate, current_user: UserInDB = Depends(get_current_active_user)):
    new_exercise = Exercise(**exercise.dict())
    result = await db["exercises"].insert_one(new_exercise.dict(by_alias=True))
    created_exercise = await db["exercises"].find_one({"_id": result.inserted_id})
    return Exercise(**created_exercise)

@router.get("/exercises/", response_model=List[Exercise])
async def get_exercises():
    exercises = await db["exercises"].find().to_list(100)
    return [Exercise(**exercise) for exercise in exercises]

@router.get("/exercises/{exercise_id}", response_model=Exercise)
async def get_exercise(exercise_id: str):
    exercise = await db["exercises"].find_one({"_id": ObjectId(exercise_id)})
    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")
    return Exercise(**exercise)

# Theory routes

@router.get("/theory/structure")
async def get_theory_structure():
    """
    Restituisce la struttura ad albero di tutto ciò che c'è
    in backend/content/theory/, sotto forma di:
    {
      "intro": { subcategories: {...}, files: [{ name, path }, …] },
      "supervised": { … },
      …
    }
    """
    from markdown_utils import CONTENT_DIR, build_directory_tree
    # build_directory_tree deve tornare esattamente questo formato
    return build_directory_tree()

@router.get("/theory/{path:path}")
async def get_theory_content(path: str):
    """
    Legge il file Markdown corrispondente a `path`
    (es. 'intro/01-what-is-machine-learning') e ne restituisce
    {"title": "...", "content": "<h1>…</h1>…"} via parse_markdown_content.
    """
    from markdown_utils import CONTENT_DIR, parse_markdown_content, build_directory_tree
    # Normalizza e costruisci il percorso al .md
    full_path = os.path.normpath(
        os.path.join(CONTENT_DIR,  f"{path}.md")
    )
    # Blocca directory traversal
    if not full_path.startswith(os.path.join(CONTENT_DIR)):
        raise HTTPException(400, "Invalid path")
    if not os.path.exists(full_path):
        raise HTTPException(404, f"Content not found: {path}")
    # parse_markdown_content legge, converte e ritorna dict {title, content}
    return parse_markdown_content(full_path)

# Leaderboard routes

@router.get("/leaderboard/", response_model=List[LeaderboardEntry])
async def get_leaderboard():
    users = await db["users"].find().sort("points", -1).limit(10).to_list(100)
    
    leaderboard = []
    for user in users:
        achievements = []
        if user["points"] > 5000:
            achievements.append("Expert")
        elif user["points"] > 2000:
            achievements.append("Intermediate")
        else:
            achievements.append("Beginner")
            
        if len(user["solved_exercises"]) > 20:
            achievements.append("Problem Solver")
            
        leaderboard.append(
            LeaderboardEntry(
                username=user["username"],
                score=user["points"],
                problems_solved=len(user["solved_exercises"]),
                achievements=achievements
            )
        )
    
    return leaderboard

# Exercises routes
@router.post("/exercises/{exercise_id}/submit")
async def submit_solution(
    exercise_id: str, 
    solution: dict, 
    current_user: UserInDB = Depends(get_current_active_user)
):
    exercise = await db["exercises"].find_one({"_id": ObjectId(exercise_id)})
    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")
    
    if exercise_id in current_user.solved_exercises:
        return {"message": "Exercise already solved", "success": True}
    
    points = {
        "Easy": 100,
        "Medium": 200,
        "Hard": 300,
        "Expert": 500
    }.get(exercise["difficulty"], 100)
    
    await db["users"].update_one(
        {"_id": current_user.id},
        {
            "$addToSet": {"solved_exercises": exercise_id},
            "$inc": {"points": points}
        }
    )
    
    return {
        "message": f"Solution accepted! You earned {points} points.",
        "success": True,
        "points_earned": points
    }

@router.get("/users/me/progress")
async def get_user_progress(current_user: UserInDB = Depends(get_current_active_user)):
    total_exercises = await db["exercises"].count_documents({})
    user_solved = len(current_user.solved_exercises)
    
    # Get statistics by difficulty
    difficulty_stats = {
        "Easy": 0,
        "Medium": 0,
        "Hard": 0,
        "Expert": 0
    }
    
    for exercise_id in current_user.solved_exercises:
        exercise = await db["exercises"].find_one({"_id": ObjectId(exercise_id)})
        if exercise and "difficulty" in exercise:
            difficulty_stats[exercise["difficulty"]] += 1
    
    return {
        "total_exercises": total_exercises,
        "solved_exercises": user_solved,
        "progress_percentage": (user_solved / total_exercises * 100) if total_exercises > 0 else 0,
        "points": current_user.points,
        "difficulty_stats": difficulty_stats
    }