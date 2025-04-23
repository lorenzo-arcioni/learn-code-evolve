
from fastapi import APIRouter, Depends, HTTPException, status, Query
from fastapi.responses import JSONResponse
from typing import List, Dict, Optional
from datetime import datetime, timedelta
import os
from bson import ObjectId
from models import (
    UserInDB, User, AdminUserUpdate, Feedback, FeedbackResponse,
    UserStats, ContentStats, InteractionStats, FeedbackStats, AdminDashboardStats
)
from admin_middleware import get_current_admin
from database import db

router = APIRouter(prefix="/admin", tags=["admin"])

# ----------------------
# User Management
# ----------------------

@router.get("/users", response_model=List[User])
async def get_all_users(
    email: Optional[str] = None,
    role: Optional[str] = None,
    is_active: Optional[bool] = None,
    current_admin: UserInDB = Depends(get_current_admin)
):
    query = {}
    
    if email:
        query["email"] = {"$regex": email, "$options": "i"}
    
    if role:
        query["role"] = role
        
    if is_active is not None:
        query["is_active"] = is_active
    
    users = await db["users"].find(query).to_list(1000)
    
    return [
        User(
            id=str(user["_id"]),
            username=user["username"],
            email=user["email"],
            full_name=user.get("full_name"),
            points=user.get("points", 0),
            solved_exercises=user.get("solved_exercises", []),
            role=user.get("role", "user"),
            is_active=user.get("is_active", True),
            avatar_url=user.get("avatar_url"),
            last_login=user.get("last_login")
        ) for user in users
    ]

@router.put("/users/{user_id}", response_model=User)
async def update_user_admin(
    user_id: str,
    update_data: AdminUserUpdate,
    current_admin: UserInDB = Depends(get_current_admin)
):
    # Verifica che l'admin non stia declassando se stesso
    if str(current_admin.id) == user_id and update_data.role == "user":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Admin cannot demote themselves"
        )
    
    updated_fields = {k: v for k, v in update_data.dict(exclude_unset=True).items() if v is not None}
    
    if updated_fields:
        result = await db["users"].update_one(
            {"_id": ObjectId(user_id)},
            {"$set": updated_fields}
        )
        
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
    
    updated_user = await db["users"].find_one({"_id": ObjectId(user_id)})
    
    return User(
        id=str(updated_user["_id"]),
        username=updated_user["username"],
        email=updated_user["email"],
        full_name=updated_user.get("full_name"),
        points=updated_user.get("points", 0),
        solved_exercises=updated_user.get("solved_exercises", []),
        role=updated_user.get("role", "user"),
        is_active=updated_user.get("is_active", True),
        avatar_url=updated_user.get("avatar_url"),
        last_login=updated_user.get("last_login")
    )

# ----------------------
# Dashboard Statistics
# ----------------------

@router.get("/statistics/dashboard", response_model=AdminDashboardStats)
async def get_dashboard_statistics(
    current_admin: UserInDB = Depends(get_current_admin)
):
    # Date references
    now = datetime.utcnow()
    seven_days_ago = now - timedelta(days=7)
    thirty_days_ago = now - timedelta(days=30)
    fourteen_days_ago = now - timedelta(days=14)
    
    # User statistics
    total_users = await db["users"].count_documents({})
    active_users = await db["users"].count_documents({"is_active": True})
    new_users_weekly = await db["users"].count_documents({
        "created_at": {"$gte": seven_days_ago}
    })
    active_users_7days = await db["users"].count_documents({
        "last_login": {"$gte": seven_days_ago}
    })
    active_users_30days = await db["users"].count_documents({
        "last_login": {"$gte": thirty_days_ago}
    })
    
    user_stats = UserStats(
        total_users=total_users,
        active_users=active_users,
        new_users_weekly=new_users_weekly,
        active_users_7days=active_users_7days,
        active_users_30days=active_users_30days
    )
    
    # Content statistics
    # Conta tutti i file .md in backend/content/theory/
    content_count = 0
    for root, dirs, files in os.walk("backend/content/theory/"):
        for file in files:
            if file.endswith('.md'):
                content_count += 1
    
    # Trova i contenuti più visualizzati
    top_content_pipeline = [
        {"$group": {
            "_id": {"content_id": "$content_id", "content_title": "$content_title", "content_type": "$content_type"}, 
            "views": {"$sum": 1}
        }},
        {"$sort": {"views": -1}},
        {"$limit": 5},
        {"$project": {
            "_id": 0,
            "content_id": "$_id.content_id",
            "title": "$_id.content_title",
            "type": "$_id.content_type",
            "views": 1
        }}
    ]
    
    top_content = await db["content_views"].aggregate(top_content_pipeline).to_list(5)
    
    # Trova i contenuti più recenti
    recent_content = await db["content_views"].aggregate([
        {"$sort": {"viewed_at": -1}},
        {"$group": {
            "_id": {"content_id": "$content_id", "content_title": "$content_title", "content_type": "$content_type"},
            "last_viewed": {"$first": "$viewed_at"}
        }},
        {"$sort": {"last_viewed": -1}},
        {"$limit": 5},
        {"$project": {
            "_id": 0,
            "content_id": "$_id.content_id",
            "title": "$_id.content_title",
            "type": "$_id.content_type",
            "last_viewed": 1
        }}
    ]).to_list(5)
    
    content_stats = ContentStats(
        total_content=content_count,
        top_content=top_content,
        recent_content=recent_content
    )
    
    # Interaction statistics
    weekly_views = await db["content_views"].count_documents({
        "viewed_at": {"$gte": seven_days_ago}
    })
    
    monthly_views = await db["content_views"].count_documents({
        "viewed_at": {"$gte": thirty_days_ago}
    })
    
    average_views = 0
    if content_count > 0:
        total_views = await db["content_views"].count_documents({})
        average_views = total_views / content_count
    
    interaction_stats = InteractionStats(
        weekly_views=weekly_views,
        monthly_views=monthly_views,
        average_views=average_views
    )
    
    # Feedback statistics
    total_feedback = await db["feedback"].count_documents({})
    unresolved_feedback = await db["feedback"].count_documents({"resolved": False})
    recent_feedback = await db["feedback"].count_documents({
        "created_at": {"$gte": fourteen_days_ago}
    })
    
    feedback_stats = FeedbackStats(
        total_feedback=total_feedback,
        unresolved_feedback=unresolved_feedback,
        recent_feedback=recent_feedback
    )
    
    return AdminDashboardStats(
        user_stats=user_stats,
        content_stats=content_stats,
        interaction_stats=interaction_stats,
        feedback_stats=feedback_stats
    )

# ----------------------
# Feedback Management
# ----------------------

@router.get("/feedback", response_model=List[FeedbackResponse])
async def get_feedback(
    resolved: Optional[bool] = None,
    sort_by: str = "created_at",
    sort_direction: int = -1,  # -1 for descending, 1 for ascending
    current_admin: UserInDB = Depends(get_current_admin)
):
    query = {}
    if resolved is not None:
        query["resolved"] = resolved
    
    feedback_items = await db["feedback"].find(query).sort(sort_by, sort_direction).to_list(1000)
    
    return [
        FeedbackResponse(
            id=str(item["_id"]),
            name=item["name"],
            email=item["email"],
            message=item["message"],
            created_at=item["created_at"],
            resolved=item["resolved"]
        ) for item in feedback_items
    ]

@router.put("/feedback/{feedback_id}", response_model=FeedbackResponse)
async def update_feedback_status(
    feedback_id: str,
    resolved: bool,
    current_admin: UserInDB = Depends(get_current_admin)
):
    result = await db["feedback"].update_one(
        {"_id": ObjectId(feedback_id)},
        {"$set": {"resolved": resolved}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Feedback not found"
        )
    
    updated_feedback = await db["feedback"].find_one({"_id": ObjectId(feedback_id)})
    
    return FeedbackResponse(
        id=str(updated_feedback["_id"]),
        name=updated_feedback["name"],
        email=updated_feedback["email"],
        message=updated_feedback["message"],
        created_at=updated_feedback["created_at"],
        resolved=updated_feedback["resolved"]
    )
