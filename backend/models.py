
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field, GetJsonSchemaHandler
from typing_extensions import Annotated
from typing import Any
from pydantic.json_schema import JsonSchemaValue
from bson import ObjectId

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
