import os
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from typing import List, Optional, Any, ClassVar, Dict, Annotated
from typing_extensions import Annotated
from dotenv import load_dotenv
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel, Field, GetJsonSchemaHandler, json_schema
from pydantic.json_schema import JsonSchemaValue
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

# Load environment variables
load_dotenv()

# Initialize FastAPI
app = FastAPI(title="ML Academy API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "ml_academy")
client = AsyncIOMotorClient(MONGODB_URI)
db = client[DATABASE_NAME]

# JWT Authentication
SECRET_KEY = os.getenv("JWT_SECRET", "supersecretkey")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Helper class for ObjectId handling in Pydantic v2
class PyObjectId(str):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate
        
    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return str(v)
        
    @classmethod
    def __get_pydantic_json_schema__(
        cls, _: Any, schema_handler: GetJsonSchemaHandler
    ) -> JsonSchemaValue:
        return {"type": "string"}

# Models
class UserBase(BaseModel):
    username: str
    email: str
    full_name: Optional[str] = None
    
class UserCreate(UserBase):
    password: str
    
class UserInDB(UserBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    solved_exercises: List[str] = []
    points: int = 0
    is_active: bool = True
    
    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
        arbitrary_types_allowed = True

class User(UserBase):
    id: str
    points: int
    solved_exercises: List[str]
    
    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class ExerciseBase(BaseModel):
    title: str
    description: str
    difficulty: str
    content: str
    
class ExerciseCreate(ExerciseBase):
    pass

class Exercise(ExerciseBase):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    locked: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
        arbitrary_types_allowed = True

class TheoryBase(BaseModel):
    title: str
    content: str
    category: str
    
class TheoryCreate(TheoryBase):
    pass

class Theory(TheoryBase):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
        arbitrary_types_allowed = True

class LeaderboardEntry(BaseModel):
    username: str
    score: int
    problems_solved: int
    achievements: List[str]

# Authentication functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

async def get_user(username: str):
    user = await db["users"].find_one({"username": username})
    if user:
        user["id"] = str(user["_id"])  # Convert ObjectId to string
        return UserInDB(**user)
    return None

async def authenticate_user(username: str, password: str):
    user = await get_user(username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = await get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: UserInDB = Depends(get_current_user)):
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

# Routes
@app.post("/token", response_model=Token)
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

@app.post("/users/", response_model=User)
async def create_user(user: UserCreate):
    # Check if username or email already exists
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

@app.get("/users/me", response_model=User)
async def read_users_me(current_user: UserInDB = Depends(get_current_active_user)):
    return User(
        id=str(current_user.id),
        username=current_user.username,
        email=current_user.email,
        full_name=current_user.full_name,
        points=current_user.points,
        solved_exercises=current_user.solved_exercises
    )

# Exercise routes
@app.post("/exercises/", response_model=Exercise)
async def create_exercise(exercise: ExerciseCreate, current_user: UserInDB = Depends(get_current_active_user)):
    # Only allow creation for admin users in a real application
    new_exercise = Exercise(**exercise.dict())
    result = await db["exercises"].insert_one(new_exercise.dict(by_alias=True))
    created_exercise = await db["exercises"].find_one({"_id": result.inserted_id})
    return Exercise(**created_exercise)

@app.get("/exercises/", response_model=List[Exercise])
async def get_exercises():
    exercises = await db["exercises"].find().to_list(100)
    return [Exercise(**exercise) for exercise in exercises]

@app.get("/exercises/{exercise_id}", response_model=Exercise)
async def get_exercise(exercise_id: str):
    exercise = await db["exercises"].find_one({"_id": ObjectId(exercise_id)})
    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")
    return Exercise(**exercise)

# Theory routes
@app.post("/theory/", response_model=Theory)
async def create_theory(theory: TheoryCreate, current_user: UserInDB = Depends(get_current_active_user)):
    # Only allow creation for admin users in a real application
    new_theory = Theory(**theory.dict())
    result = await db["theory"].insert_one(new_theory.dict(by_alias=True))
    created_theory = await db["theory"].find_one({"_id": result.inserted_id})
    return Theory(**created_theory)

@app.get("/theory/", response_model=List[Theory])
async def get_theories():
    theories = await db["theory"].find().to_list(100)
    return [Theory(**theory) for theory in theories]

@app.get("/theory/{theory_id}", response_model=Theory)
async def get_theory(theory_id: str):
    theory = await db["theory"].find_one({"_id": ObjectId(theory_id)})
    if not theory:
        raise HTTPException(status_code=404, detail="Theory not found")
    return Theory(**theory)

@app.get("/theory/category/{category}", response_model=List[Theory])
async def get_theories_by_category(category: str):
    theories = await db["theory"].find({"category": category}).to_list(100)
    return [Theory(**theory) for theory in theories]

# Leaderboard route
@app.get("/leaderboard/", response_model=List[LeaderboardEntry])
async def get_leaderboard():
    # Get top users sorted by points
    users = await db["users"].find().sort("points", -1).limit(10).to_list(100)
    
    leaderboard = []
    for user in users:
        # You can customize how achievements are earned in a real application
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

# Route to submit exercise solution
@app.post("/exercises/{exercise_id}/submit")
async def submit_solution(
    exercise_id: str, 
    solution: dict, 
    current_user: UserInDB = Depends(get_current_active_user)
):
    # In a real application, you would validate the solution here
    # For this example, we'll assume all solutions are correct
    
    # Check if exercise exists
    exercise = await db["exercises"].find_one({"_id": ObjectId(exercise_id)})
    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")
    
    # Check if user already solved this exercise
    if exercise_id in current_user.solved_exercises:
        return {"message": "Exercise already solved", "success": True}
    
    # Add exercise to solved exercises and award points
    # Points could be based on difficulty
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

# Route to get user progress
@app.get("/users/me/progress")
async def get_user_progress(current_user: UserInDB = Depends(get_current_active_user)):
    total_exercises = await db["exercises"].count_documents({})
    user_solved = len(current_user.solved_exercises)
    
    return {
        "total_exercises": total_exercises,
        "solved_exercises": user_solved,
        "progress_percentage": (user_solved / total_exercises * 100) if total_exercises > 0 else 0,
        "points": current_user.points
    }

# Startup and shutdown events
@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(MONGODB_URI)
    app.mongodb = app.mongodb_client[DATABASE_NAME]

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
