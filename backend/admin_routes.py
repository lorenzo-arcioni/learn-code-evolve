
from fastapi import APIRouter, Depends, HTTPException, status, Query
from fastapi.responses import JSONResponse
from typing import List, Dict, Optional, Any
from datetime import datetime, timedelta
import os
from bson import ObjectId
from models import (
    UserInDB, User, AdminUserUpdate, Feedback, FeedbackResponse,
    UserStats, ContentStats, InteractionStats, FeedbackStats, AdminDashboardStats,
    Course
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

@router.put("/users/{user_id}/role", response_model=User)
async def update_user_role(
    user_id: str,
    promote: bool,
    current_admin: UserInDB = Depends(get_current_admin)
):
    """
    Update user's role. If promote is True, promotes to admin; otherwise demotes to user.
    """
    # Prevent admin from demoting themselves
    if str(current_admin.id) == user_id and not promote:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Admin cannot demote themselves"
        )
    
    new_role = "admin" if promote else "user"
    
    result = await db["users"].update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"role": new_role}}
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
        created_at=updated_user.get("created_at", datetime.utcnow()),
        solved_exercises=updated_user.get("solved_exercises", []),
        role=updated_user.get("role", "user"),
        is_active=updated_user.get("is_active", True),
        avatar_url=updated_user.get("avatar_url"),
        last_login=updated_user.get("last_login")
    )

@router.put("/users/{user_id}/status", response_model=User)
async def update_user_status(
    user_id: str,
    active: bool,
    current_admin: UserInDB = Depends(get_current_admin)
):
    """
    Update user's active status. If active is True, activates the user; otherwise deactivates.
    """
    # Prevent admin from deactivating themselves
    if str(current_admin.id) == user_id and not active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Admin cannot deactivate themselves"
        )
    
    result = await db["users"].update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"is_active": active}}
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
        created_at=updated_user.get("created_at", datetime.utcnow()),
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
    time_range: str = Query(
        "month",
        enum=["today", "week", "month", "6months", "year", "all"],
    ),
    current_admin: UserInDB = Depends(get_current_admin),
):
    now = datetime.utcnow()

    # Determina periodo e etichette
    if time_range == "today":
        start_date = now.replace(hour=0, minute=0, second=0, microsecond=0)
        period_labels = ["00:00", "06:00", "12:00", "18:00"]
        hours_in_day = [0, 6, 12, 18]
        next_period = [h for h in hours_in_day if h > now.hour] + [24]
        periods = len(period_labels)
    elif time_range == "week":
        start_date = now - timedelta(days=7)
        period_labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        periods = 7
    elif time_range == "month":
        start_date = now - timedelta(days=30)
        period_labels = ["Week 1", "Week 2", "Week 3", "Week 4"]
        periods = 4
    elif time_range == "6months":
        start_date = now - timedelta(days=180)
        period_labels = [(now - timedelta(days=30 * i)).strftime("%b") for i in range(5, -1, -1)]
        periods = 6
    elif time_range == "year":
        start_date = now - timedelta(days=365)
        period_labels = [(now - timedelta(days=30 * i)).strftime("%b") for i in range(11, -1, -1)]
        periods = 12
    else:
        start_date = datetime(2022, 1, 1)
        period_labels = ["2022", "2023", "2024", "2025"]
        periods = 4

    # ----------------------
    # Statistiche utenti
    # ----------------------
    total_users = await db["users"].count_documents({})
    active_users = await db["users"].count_documents({"is_active": True})
    new_users_weekly = await db["users"].count_documents({"created_at": {"$gte": now - timedelta(days=7)}})
    active_users_7days = await db["users"].count_documents({"last_login": {"$gte": now - timedelta(days=7)}})
    active_users_30days = await db["users"].count_documents({"last_login": {"$gte": now - timedelta(days=30)}})
    admin_count = await db["users"].count_documents({"role": "admin"})

    # Statistiche attività utenti
    user_activity_data = []
    if time_range == "today":
        for i in range(periods):
            h_start = hours_in_day[i]
            h_end = next_period[i] if i < len(next_period) else 24
            start_t = now.replace(hour=h_start, minute=0, second=0, microsecond=0)
            end_t = (
                now.replace(hour=h_end, minute=0, second=0, microsecond=0)
                if h_end < 24 else now.replace(hour=23, minute=59, second=59, microsecond=999999)
            )
            count = await db["user_logins"].count_documents({"login_time": {"$gte": start_t, "$lt": end_t}})
            user_activity_data.append({"name": period_labels[i], "users": count})
    else:
        if time_range == "week":
            proj = {"period": {"$dayOfWeek": "$login_time"}}
        elif time_range == "month":
            proj = {"period": {"$week": "$login_time"}}
        elif time_range in ["6months", "year"]:
            proj = {"period": {"$month": "$login_time"}}
        else:
            proj = {"period": {"$year": "$login_time"}}
        pipeline = [
            {"$match": {"login_time": {"$gte": start_date}}},
            {"$project": proj},
            {"$group": {"_id": "$period", "count": {"$sum": 1}}},
            {"$sort": {"_id": 1}}
        ]
        login_counts = await db["user_logins"].aggregate(pipeline).to_list(periods)
        for i in range(periods):
            cnt = login_counts[i].get("count", 0) if i < len(login_counts) else 0
            user_activity_data.append({"name": period_labels[i], "users": cnt})

    # ----------------------
    # Statistiche visualizzazioni contenuti
    # ----------------------
    content_views_data = []
    if time_range == "today":
        for i in range(periods):
            content_views_data.append({"name": period_labels[i], "views": 0})
    else:
        if time_range == "week":
            proj = {"period": {"$dayOfWeek": "$view_time"}}
        elif time_range == "month":
            proj = {"period": {"$week": "$view_time"}}
        else:
            proj = {"period": {"$month": "$view_time"}}
        pipeline_v = [
            {"$match": {"view_time": {"$gte": start_date}}},
            {"$project": proj},
            {"$group": {"_id": "$period", "count": {"$sum": 1}}},
            {"$sort": {"_id": 1}}
        ]
        view_counts = await db["content_views"].aggregate(pipeline_v).to_list(periods)
        for i in range(periods):
            cnt = view_counts[i].get("count", 0) if i < len(view_counts) else 0
            content_views_data.append({"name": period_labels[i], "views": cnt})

    # ----------------------
    # Statistiche contenuti
    # ----------------------
    # Conta tutti i file .md in content/theory/
    content_count = 0
    for root, dirs, files in os.walk("content/theory/"):
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

    # ----------------------
    # Statistiche interazioni
    # ----------------------
    total_comments = await db["comments"].count_documents({})
    total_likes = await db["likes"].count_documents({})
    # Conteggi visualizzazioni per periodi
    total_views = await db["content_views"].count_documents({})
    weekly_views = await db["content_views"].count_documents({"view_time": {"$gte": now - timedelta(days=7)}})
    monthly_views = await db["content_views"].count_documents({"view_time": {"$gte": now - timedelta(days=30)}})
    average_views = (total_views / content_count) if content_count > 0 else 0

    interaction_stats = InteractionStats(
        total_comments=total_comments,
        total_likes=total_likes,
        weekly_views=weekly_views,
        monthly_views=monthly_views,
        average_views=average_views,
    )

    # ----------------------
    # Statistiche feedback
    # ----------------------
    feedback_received = await db["feedback"].count_documents({})
    avg_cursor = await db["feedback"].aggregate([
        {"$group": {"_id": None, "average": {"$avg": "$score"}}}
    ]).to_list(1)
    average_score = avg_cursor[0]["average"] if avg_cursor else 0.0
    feedback_stats = FeedbackStats(
        feedback_received=feedback_received,
        average_feedback_score=average_score,
        total_feedback=feedback_received,  # Same as feedback_received
        unresolved_feedback=await db["feedback"].count_documents({"resolved": False}),  # Count unresolved feedback
        recent_feedback=await db["feedback"].count_documents({"created_at": {"$gte": now - timedelta(days=7)}})  # Count feedback from last 7 days
    )

    # ----------------------
    # Statistiche utenti aggregate
    # ----------------------
    user_stats = UserStats(
        total_users=total_users,
        active_users=active_users,
        new_users_weekly=new_users_weekly,
        active_users_7days=active_users_7days,
        active_users_30days=active_users_30days,
        admin_count=admin_count,
    )

    return AdminDashboardStats(
        user_stats=user_stats,
        content_stats=content_stats,
        interaction_stats=interaction_stats,
        feedback_stats=feedback_stats,
        user_activity_data=user_activity_data,
        content_views_data=content_views_data,
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

# Courses Management

@router.post("/add-course", response_model=Dict[str, Any])
async def add_course(
    course_data: Course,
    current_admin: UserInDB = Depends(get_current_admin)
):
    """
    Add a new course to the database.
    Only administrators can add courses.
    """
    
    # Prepare the course data for insertion
    course_dict = course_data.dict()
    
    # Add creation timestamp
    course_dict["created_at"] = datetime.utcnow()
    
    # Add the admin who created the course
    course_dict["created_by"] = str(current_admin.id)
    
    # Insert into database
    result = await db["courses"].insert_one(course_dict)
    
    # Return success response
    return {
        "success": True,
        "message": "Course added successfully",
        "course_id": str(result.inserted_id)
    }