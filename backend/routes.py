
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from fastapi.security import OAuth2PasswordRequestForm
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
    get_password_hash, ACCESS_TOKEN_EXPIRE_MINUTES
)
from database import db

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

# User management
@router.post("/users/", response_model=User)
async def create_user(user: UserCreate):
    # ... keep existing code (User creation logic)

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
    # ... keep existing code (exercise creation)

@router.get("/exercises/", response_model=List[Exercise])
async def get_exercises():
    # ... keep existing code (get exercises)

@router.get("/exercises/{exercise_id}", response_model=Exercise)
async def get_exercise(exercise_id: str):
    # ... keep existing code (get exercise by ID)

# Theory routes
@router.post("/theory/", response_model=Theory)
async def create_theory(theory: TheoryCreate, current_user: UserInDB = Depends(get_current_active_user)):
    # ... keep existing code (theory creation)

@router.get("/theory/", response_model=List[Theory])
async def get_theories():
    # ... keep existing code (get theories)

@router.get("/theory/{theory_id}", response_model=Theory)
async def get_theory(theory_id: str):
    # ... keep existing code (get theory by ID)

@router.get("/theory/category/{category}", response_model=List[Theory])
async def get_theories_by_category(category: str):
    # ... keep existing code (get theories by category)

# Leaderboard routes
@router.get("/leaderboard/", response_model=List[LeaderboardEntry])
async def get_leaderboard():
    # ... keep existing code (get leaderboard)

# Exercise submission
@router.post("/exercises/{exercise_id}/submit")
async def submit_solution(
    exercise_id: str, 
    solution: dict, 
    current_user: UserInDB = Depends(get_current_active_user)
):
    # ... keep existing code (submit solution)

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
