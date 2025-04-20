
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

# ... keep existing code (Exercise models)

# ----------------------
# Theory Models
# ----------------------

# ... keep existing code (Theory models)

# ----------------------
# Leaderboard
# ----------------------

# ... keep existing code (LeaderboardEntry model)

# ----------------------
# Avatar Upload
# ----------------------

class AvatarResponse(BaseModel):
    avatar_url: str
