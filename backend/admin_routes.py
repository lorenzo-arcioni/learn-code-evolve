
from fastapi import APIRouter, Depends, HTTPException, status, Query
from fastapi.responses import JSONResponse
from typing import List, Dict, Optional, Any
from datetime import datetime, timedelta
import os
from bson import ObjectId
from models import (
    UserInDB, User, AdminUserUpdate, Feedback, FeedbackResponse,
    UserStats, ContentStats, InteractionStats, FeedbackStats, AdminDashboardStats,
    Course, ConsultationUpdate
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
):
    now = datetime.utcnow()

    print(time_range)

    # Determina periodo e etichette
    if time_range == "today":
        start_date = now.replace(hour=0, minute=0, second=0, microsecond=0)
        # Create time slots from 00:00 to current hour (divided into 6-hour blocks)
        hours_in_day = [0, 6, 12, 18]
        # Filter time slots that have already passed today
        visible_slots = [h for h in hours_in_day if h <= now.hour]
        # Calculate next hour slot for query boundaries
        next_slots = [h for h in hours_in_day if h > now.hour]
        next_slot = next_slots[0] if next_slots else 24
        
        # Create labels only for visible time slots
        period_labels = [f"{h:02d}:00" for h in visible_slots]
        periods = len(period_labels)
        
    elif time_range == "week":
        start_date = now - timedelta(days=7)
        # Create labels for the past 7 days (including today)
        period_labels = [(now - timedelta(days=i)).strftime("%a") for i in range(6, -1, -1)]
        # Map weekday numbers to day names (1=Mon in isocalendar)
        today_weekday = now.isocalendar()[2]  # 1=Mon, 7=Sun
        days = [(today_weekday - i) % 7 or 7 for i in range(7, 0, -1)]
        day_to_label = {days[i]: period_labels[i] for i in range(len(days))}
        periods = 7
        
    elif time_range == "month":
        # Impostare l'inizio al primo giorno del mese corrente
        start_date = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        # Calcoliamo il numero di giorni nel mese corrente fino ad oggi
        days_in_month = now.day
        # Crea le etichette per ogni giorno del mese corrente fino ad oggi
        period_labels = [(start_date + timedelta(days=i)).strftime("%d") for i in range(days_in_month)]
        # Map day numbers to labels
        day_to_label = {i+1: period_labels[i] for i in range(days_in_month)}
        periods = days_in_month
        
    elif time_range == "6months":
        start_date = now - timedelta(days=180)
        # Create labels for the past 6 months (including current month)
        period_labels = [(now - timedelta(days=30 * i)).strftime("%b") for i in range(5, -1, -1)]
        # Map month numbers to month names
        months = [(now.month - i) % 12 or 12 for i in range(5, -1, -1)]
        month_to_label = {months[i]: period_labels[i] for i in range(len(months))}
        periods = 6
        
    elif time_range == "year":
        start_date = now - timedelta(days=365)
        # Create labels for the past 12 months (including current month)
        period_labels = [(now - timedelta(days=30 * i)).strftime("%b") for i in range(11, -1, -1)]
        # Map month numbers to month names
        months = [(now.month - i) % 12 or 12 for i in range(11, -1, -1)]
        month_to_label = {months[i]: period_labels[i] for i in range(len(months))}
        periods = 12
        
    else:  # "all"
        # Assuming we want to start from 2022 to current year
        start_date = datetime(2022, 1, 1)
        current_year = now.year
        # Create labels from 2022 to current year
        period_labels = [str(year) for year in range(2022, current_year + 1)]
        # Map years to labels
        year_to_label = {year: str(year) for year in range(2022, current_year + 1)}
        periods = len(period_labels)

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
    
    # Inizializza i dati con 0 per ogni periodo usando le etichette
    initialized_data = {label: 0 for label in period_labels}
    
    if time_range == "today":
        # Per oggi, dividi in slot temporali fino all'ora corrente
        for i in range(len(visible_slots)):
            h_start = visible_slots[i]
            h_end = next_slot if i == len(visible_slots) - 1 else visible_slots[i+1]
            
            start_t = now.replace(hour=h_start, minute=0, second=0, microsecond=0)
            end_t = now if i == len(visible_slots) - 1 else now.replace(hour=h_end, minute=0, second=0, microsecond=0)
            
            count = await db["users"].count_documents({"last_login": {"$gte": start_t, "$lt": end_t}})
            label = f"{h_start:02d}:00"
            initialized_data[label] = count
    elif time_range == "month":
        # Per il mese corrente, raggruppamento per giorno del mese
        for day in range(1, now.day + 1):
            start_t = now.replace(day=day, hour=0, minute=0, second=0, microsecond=0)
            end_t = now.replace(day=day, hour=23, minute=59, second=59, microsecond=999999) if day < now.day else now
            
            count = await db["users"].count_documents({"last_login": {"$gte": start_t, "$lt": end_t}})
            label = f"{day:02d}"
            initialized_data[label] = count
    else:
        # Per altri intervalli di tempo, usa l'aggregazione
        if time_range == "week":
            proj = {"period": {"$isoDayOfWeek": "$last_login"}}  # 1=Lunedì, 7=Domenica in ISO
            period_map = day_to_label
        elif time_range == "6months":
            proj = {"period": {"$month": "$last_login"}}
            period_map = month_to_label
        elif time_range == "year":
            proj = {"period": {"$month": "$last_login"}}
            period_map = month_to_label
        else:  # "all"
            proj = {"period": {"$year": "$last_login"}}
            period_map = year_to_label
            
        pipeline = [
            {"$match": {"last_login": {"$gte": start_date, "$lte": now}}},
            {"$project": proj},
            {"$group": {"_id": "$period", "count": {"$sum": 1}}},
            {"$sort": {"_id": 1}}
        ]
        
        login_counts = await db["users"].aggregate(pipeline).to_list(100)
        
        # Aggiorna i conteggi basati sui risultati dell'aggregazione
        for item in login_counts:
            period_id = item["_id"]
            if period_id in period_map:
                label = period_map[period_id]
                initialized_data[label] = item["count"]
    
    # Converte i dati inizializzati in formato lista per il frontend
    for label, count in initialized_data.items():
        user_activity_data.append({"name": label, "users": count})
    
    # ----------------------
    # Statistiche visualizzazioni contenuti
    # ----------------------
    content_views_data = []
    
    # Inizializza i dati con 0 per ogni periodo usando le etichette
    initialized_views_data = {label: 0 for label in period_labels}
    
    if time_range == "today":
        # Per oggi, dividi in slot temporali fino all'ora corrente
        for i in range(len(visible_slots)):
            h_start = visible_slots[i]
            h_end = next_slot if i == len(visible_slots) - 1 else visible_slots[i+1]
            
            start_t = now.replace(hour=h_start, minute=0, second=0, microsecond=0)
            end_t = now if i == len(visible_slots) - 1 else now.replace(hour=h_end, minute=0, second=0, microsecond=0)
            
            count = await db["content_views"].count_documents({"viewed_at": {"$gte": start_t, "$lt": end_t}})
            label = f"{h_start:02d}:00"
            initialized_views_data[label] = count
            print(start_t)
    elif time_range == "month":
        # Per il mese corrente, raggruppamento per giorno del mese
        for day in range(1, now.day + 1):
            start_t = now.replace(day=day, hour=0, minute=0, second=0, microsecond=0)
            end_t = now.replace(day=day, hour=23, minute=59, second=59, microsecond=999999) if day < now.day else now
            
            count = await db["content_views"].count_documents({"viewed_at": {"$gte": start_t, "$lt": end_t}})
            label = f"{day:02d}"
            initialized_views_data[label] = count
    else:
        # Per altri intervalli di tempo, usa l'aggregazione
        if time_range == "week":
            proj = {"period": {"$isoDayOfWeek": "$viewed_at"}}  # 1=Lunedì, 7=Domenica in ISO
            period_map = day_to_label
        elif time_range == "6months":
            proj = {"period": {"$month": "$viewed_at"}}
            period_map = month_to_label
        elif time_range == "year":
            proj = {"period": {"$month": "$viewed_at"}}
            period_map = month_to_label
        else:  # "all"
            proj = {"period": {"$year": "$viewed_at"}}
            period_map = year_to_label
            
        pipeline_v = [
            {"$match": {"viewed_at": {"$gte": start_date, "$lte": now}}},
            {"$project": proj},
            {"$group": {"_id": "$period", "count": {"$sum": 1}}},
            {"$sort": {"_id": 1}}
        ]
        
        view_counts = await db["content_views"].aggregate(pipeline_v).to_list(100)

        #print(view_counts)
        
        # Aggiorna i conteggi basati sui risultati dell'aggregazione
        for item in view_counts:
            period_id = item["_id"]
            if period_id in period_map:
                label = period_map[period_id]
                initialized_views_data[label] = item["count"]
    
    # Converte i dati inizializzati in formato lista per il frontend
    for label, count in initialized_views_data.items():
        content_views_data.append({"name": label, "views": count})

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
    weekly_views = await db["content_views"].count_documents({"viewed_at": {"$gte": now - timedelta(days=7)}})
    monthly_views = await db["content_views"].count_documents({"viewed_at": {"$gte": now - timedelta(days=30)}})
    average_views = (total_views / content_count) if content_count > 0 else 0

    interaction_stats = InteractionStats(
        total_views=total_views,
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

    # Delete the key "id"
    course_dict.pop("id")
    
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

# Consultation Management

@router.get(
    "/consultations",
    response_model=List[Dict[str, Any]],
    summary="Ottieni tutte le richieste di consulenza"
)
async def get_consultation_requests(
    admin: UserInDB = Depends(get_current_admin)
):
    """
    Restituisce tutte le richieste di consulenza.
    """
    # Usa to_list() per ottenere la lista dal cursor asincrono
    docs = await db["consultations"].find().to_list(length=None)
    for doc in docs:
        doc["id"] = str(doc.pop("_id"))
    return docs

@router.patch(
    "/consultations/{request_id}",
    response_model=Dict[str, Any],
    summary="Aggiorna lo stato di una richiesta di consulenza"
)
async def update_consultation_status(
    request_id: str,
    payload: ConsultationUpdate,
    admin: UserInDB = Depends(get_current_admin)
):
    """
    Aggiorna il campo `status` e opzionalmente `admin_notes` di una richiesta.
    """
    oid = ObjectId(request_id)
    update_data = {"status": payload.status}
    if payload.admin_notes is not None:
        update_data["admin_notes"] = payload.admin_notes
    update_data["updated_at"] = datetime.utcnow()

    # update_one è anch'esso asincrono
    result = await db["consultations"].update_one(
        {"_id": oid},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Consultation request not found"
        )

    # Recupera il documento aggiornato
    doc = await db["consultations"].find_one({"_id": oid})
    if not doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Consultation request not found after update"
        )
    doc["id"] = str(doc.pop("_id"))
    return doc
