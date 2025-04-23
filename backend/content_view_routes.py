
from fastapi import APIRouter, Depends, HTTPException, status
from models import ContentView, UserInDB
from database import db
from auth import get_current_user
from typing import Optional
import datetime

router = APIRouter(tags=["content_views"])

@router.post("/content/view")
async def record_content_view(
    content_id: str,
    content_type: str,
    content_title: str,
    current_user: Optional[UserInDB] = Depends(get_current_user)
):
    view_data = {
        "content_id": content_id,
        "content_type": content_type, 
        "content_title": content_title,
        "viewed_at": datetime.utcnow()
    }
    
    if current_user:
        view_data["user_id"] = str(current_user.id)
    
    await db["content_views"].insert_one(view_data)
    
    return {"message": "View recorded successfully"}
