
from datetime import datetime
from typing import Dict, List, Optional, Any
from pydantic import BaseModel, Field, GetCoreSchemaHandler
from bson import ObjectId
from pydantic_core import core_schema

# ----------------------
# ObjectId Handler
# ----------------------

class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(
        cls, 
        _source_type: Any, 
        handler: GetCoreSchemaHandler
    ) -> core_schema.CoreSchema:
        return core_schema.union_schema([
            # Accetta già un ObjectId
            core_schema.is_instance_schema(ObjectId),
            # Oppure una stringa che può essere convertita a ObjectId
            core_schema.chain_schema([
                core_schema.str_schema(),
                core_schema.no_info_plain_validator_function(
                    lambda x: cls(x) if ObjectId.is_valid(x) else x
                ),
            ]),
        ])
    
    # Questi metodi assicurano una corretta serializzazione JSON
    def __jsonschema_serialize__(self):
        return str(self)
    
    @classmethod
    def __get_pydantic_json_schema__(cls, _core_schema, handler):
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
    role: str = "user" # Nuovo campo: "user" o "admin"
    last_login: Optional[datetime] = None  # Nuovo campo

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str}
    }

class User(UserBase):
    id: str
    points: int
    solved_exercises: List[str]
    role: str = "user"  # Aggiunto il campo role
    is_active: bool = True  # Aggiunto il campo is_active
    last_login: Optional[datetime] = None  # Aggiunto il campo last_login

    model_config = {
        "populate_by_name": True,
        "json_encoders": {ObjectId: str}
    }

class AdminUserUpdate(BaseModel):
    role: Optional[str] = None
    is_active: Optional[bool] = None

# ----------------------
# Token Models
# ----------------------

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str

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
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    title: str
    description: str
    category: str  # Es: 'Consulenze', 'Prodotti Digitali', 'Prodotti Fisici'
    price: str  # Es: '€45' o '€80/progetto'
    image_url: Optional[str] = None  # URL immagine prodotto
    is_active: bool = True  # Se il prodotto è disponibile
    buy_url: Optional[str] = None  # URL per acquistare il prodotto

    model_config = {
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str},
        "populate_by_name": True
    }

# ----------------------
# Course Models
# ----------------------

class Course(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    title: str
    description: str
    category: str
    level: str
    duration: str
    price: str
    instructor: str
    image_url: str
    status: str
    url: str = ""

    model_config = {
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str},  # Questo è importante per la serializzazione
        "populate_by_name": True
    }

class Lesson(BaseModel):
    id: int
    title: str
    description: str
    duration: str  # es. "45 min"
    video_url: Optional[str] = None
    materials: Optional[List[str]] = []  # Links a materiali aggiuntivi
    is_free: bool = False  # Se la lezione è gratuita per l'anteprima

class Module(BaseModel):
    id: int
    title: str
    description: str
    lessons: List[Lesson]
    estimated_hours: str  # es. "3-4 ore"

class Prerequisite(BaseModel):
    title: str
    description: str
    is_required: bool = True

class LearningObjective(BaseModel):
    objective: str
    description: Optional[str] = None

class CourseContent(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    course_id: PyObjectId  # Riferimento al corso principale
    title: str
    description: str
    full_description: str  # Descrizione dettagliata
    instructor: str
    instructor_bio: str  # Biografia del docente
    instructor_image: Optional[str] = None
    duration: str
    level: str
    category: str
    price: str
    image_url: str
    
    # Contenuto del corso
    learning_objectives: List[LearningObjective]
    prerequisites: List[Prerequisite]
    modules: List[Module]
    
    # Informazioni aggiuntive
    certification: bool = False
    certificate_description: Optional[str] = None
    target_audience: List[str] = []  # A chi è rivolto il corso
    tools_required: List[str] = []  # Strumenti necessari
    
    # Metadati
    created_at: datetime
    updated_at: datetime
    is_published: bool = True
    
    class Config:
        populate_by_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat(),
            ObjectId: str  # Aggiungi questo per serializzare ObjectId come string
        }
# ----------------------
# Consultation Request
# ----------------------

class ConsultationRequest(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    firstName: str
    lastName: str
    email: str
    consultationType: str
    description: str
    status: str = "pending"

# Schema per l’update della richiesta di consulenza
class ConsultationUpdate(BaseModel):
    status: str
    admin_notes: Optional[str] = None

# Feedback Management

class FeedbackCreate(BaseModel):
    name: str
    email: str
    message: str

class Feedback(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    email: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    resolved: bool = False

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str}
    }

class FeedbackResponse(BaseModel):
    id: str
    name: str
    email: str
    message: str
    created_at: datetime
    resolved: bool

    model_config = {
        "populate_by_name": True,
        "json_encoders": {ObjectId: str}
    }

# ----------------------
# Content View Models
# ----------------------

class ContentView(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    content_id: str
    content_type: str  # "theory" o "exercise"
    content_title: str
    user_id: Optional[str] = None
    viewed_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str}
    }

# ----------------------
# Statistics Models
# ----------------------

class UserStats(BaseModel):
    total_users: int
    active_users: int
    new_users_weekly: int
    active_users_7days: int
    active_users_30days: int
    admin_count: int

class ContentStats(BaseModel):
    total_content: int
    top_content: List[dict]
    recent_content: List[dict]

class InteractionStats(BaseModel):
    total_views: int
    weekly_views: int
    monthly_views: int
    average_views: float

class FeedbackStats(BaseModel):
    total_feedback: int
    unresolved_feedback: int
    recent_feedback: int

class AdminDashboardStats(BaseModel):
    user_stats: UserStats
    content_stats: ContentStats
    interaction_stats: InteractionStats
    feedback_stats: FeedbackStats
    user_activity_data: List[Dict[str, Any]]
    content_views_data: List[Dict[str, Any]]
