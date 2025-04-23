
from datetime import datetime
from typing import List, Optional, Any
from pydantic import BaseModel, Field, GetCoreSchemaHandler
from bson import ObjectId
from pydantic_core import core_schema

# ----------------------
# ObjectId Handler
# ----------------------

class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(cls, _source_type: Any, handler: GetCoreSchemaHandler) -> core_schema.CoreSchema:
        return core_schema.no_info_after_validator_function(
            cls.validate,
            core_schema.str_schema()
        )

    @classmethod
    def validate(cls, v: Any) -> "PyObjectId":
        if isinstance(v, ObjectId):
            return cls(v)
        if isinstance(v, str) and ObjectId.is_valid(v):
            return cls(ObjectId(v))
        raise ValueError("Invalid ObjectId")

    @classmethod
    def __get_pydantic_json_schema__(cls, core_schema, handler):
        return {"type": "string"}

# ----------------------
# User Models
# ----------------------

class UserBase(BaseModel):
    username: str
    email: str
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    avatar_url: Optional[str] = None

class UserInDB(UserBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    solved_exercises: List[str] = []
    points: int = 0
    is_active: bool = True

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str}
    }

class User(UserBase):
    id: str
    points: int
    solved_exercises: List[str]

    model_config = {
        "populate_by_name": True,
        "json_encoders": {ObjectId: str}
    }

# ----------------------
# Token Models
# ----------------------

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# ----------------------
# Exercise Models
# ----------------------

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

# ----------------------
# Theory Models
# ----------------------

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

# ----------------------
# Leaderboard
# ----------------------

class LeaderboardEntry(BaseModel):
    username: str
    score: int
    problems_solved: int
    achievements: List[str]

# ----------------------
# Avatar Upload
# ----------------------

class AvatarResponse(BaseModel):
    avatar_url: str

# ----------------------
# Product Models
# ----------------------

class Product(BaseModel):
    id: int
    title: str
    description: str
    price: str
    image: str
    category: str

# ----------------------
# Course Models
# ----------------------

class Course(BaseModel):
    id: int
    title: str
    description: str
    instructor: str
    duration: str
    level: str
    price: str
    image: str
    category: str

# ----------------------
# Consultation Request
# ----------------------

class ConsultationRequest(BaseModel):
    firstName: str
    lastName: str
    email: str
    consultationType: str
    description: str