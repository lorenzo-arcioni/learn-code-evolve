
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from bson import ObjectId
from typing import List
from models import (
    User, UserCreate, UserInDB, Token, Exercise, ExerciseCreate,
    Theory, TheoryCreate, LeaderboardEntry
)
from auth import (
    authenticate_user, create_access_token, get_current_active_user,
    get_password_hash, ACCESS_TOKEN_EXPIRE_MINUTES
)
from database import db

router = APIRouter()

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
        solved_exercises=current_user.solved_exercises
    )

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

@router.post("/theory/", response_model=Theory)
async def create_theory(theory: TheoryCreate, current_user: UserInDB = Depends(get_current_active_user)):
    new_theory = Theory(**theory.dict())
    result = await db["theory"].insert_one(new_theory.dict(by_alias=True))
    created_theory = await db["theory"].find_one({"_id": result.inserted_id})
    return Theory(**created_theory)

@router.get("/theory/", response_model=List[Theory])
async def get_theories():
    theories = await db["theory"].find().to_list(100)
    return [Theory(**theory) for theory in theories]

@router.get("/theory/{theory_id}", response_model=Theory)
async def get_theory(theory_id: str):
    theory = await db["theory"].find_one({"_id": ObjectId(theory_id)})
    if not theory:
        raise HTTPException(status_code=404, detail="Theory not found")
    return Theory(**theory)

@router.get("/theory/category/{category}", response_model=List[Theory])
async def get_theories_by_category(category: str):
    theories = await db["theory"].find({"category": category}).to_list(100)
    return [Theory(**theory) for theory in theories]

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
    
    return {
        "total_exercises": total_exercises,
        "solved_exercises": user_solved,
        "progress_percentage": (user_solved / total_exercises * 100) if total_exercises > 0 else 0,
        "points": current_user.points
    }
