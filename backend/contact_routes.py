
from fastapi import APIRouter, Depends, HTTPException, status
from models import FeedbackCreate, FeedbackResponse
from database import db
from datetime import datetime

router = APIRouter(prefix="/contact", tags=["contact"])

@router.post("/feedback", response_model=FeedbackResponse)
async def submit_feedback(feedback: FeedbackCreate):
    feedback_data = feedback.dict()
    feedback_data["created_at"] = datetime.utcnow()
    feedback_data["resolved"] = False
    
    result = await db["feedback"].insert_one(feedback_data)
    
    created_feedback = await db["feedback"].find_one({"_id": result.inserted_id})
    
    return FeedbackResponse(
        id=str(created_feedback["_id"]),
        name=created_feedback["name"],
        email=created_feedback["email"],
        message=created_feedback["message"],
        created_at=created_feedback["created_at"],
        resolved=created_feedback["resolved"]
    )
