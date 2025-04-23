
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from auth import get_current_user
from models import UserInDB

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_admin(current_user: UserInDB = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Unauthorized access. Admin privileges required.",
        )
    return current_user
