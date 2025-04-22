from datetime import datetime, timedelta
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from fastapi import Request
from authlib.integrations.httpx_client import AsyncOAuth2Client
from jose import JWTError, jwt
from passlib.context import CryptContext
import os
from models import UserInDB, TokenData
from database import db
from bson import ObjectId  # Import per la gestione di ObjectId

# JWT Authentication settings
SECRET_KEY = os.getenv("JWT_SECRET", "supersecretkey")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))

# Google OAuth settings
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI")
GOOGLE_DISCOVERY_URL = os.getenv("GOOGLE_DISCOVERY_URL") #"https://accounts.google.com/.well-known/openid-configuration"

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Funzioni per la gestione delle password
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

# Funzione per recuperare un utente dal database
async def get_user(username: str):
    user = await db["users"].find_one({"username": username})
    if user:
        user["_id"] = str(user["_id"])  # Convert ObjectId to string
        return UserInDB(**user)
    return None

# Funzione per autenticare l'utente
async def authenticate_user(username: str, password: str):
    user = await get_user(username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

## Funzione per autenticare l'utente tramite Google
async def get_google_user_info(code: str):
    async with AsyncOAuth2Client(
        client_id=GOOGLE_CLIENT_ID,
        client_secret=GOOGLE_CLIENT_SECRET,
        redirect_uri=GOOGLE_REDIRECT_URI,
    ) as client:
        # Ottieni i provider endpoint
        resp = await client.get(GOOGLE_DISCOVERY_URL)
        resp.raise_for_status()
        google_conf = resp.json()

        # Scambia il codice per i token
        token = await client.fetch_token(
            token_endpoint=google_conf["token_endpoint"],
            code=code,
            grant_type="authorization_code",
        )

        # Recupera user info con il token
        resp = await client.get(
            google_conf["userinfo_endpoint"],
            headers={"Authorization": f"Bearer {token['access_token']}"}
        )
        resp.raise_for_status()
        return resp.json()

# Funzione per creare il token di accesso JWT
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)  # Usa il valore di default
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Funzione per ottenere l'utente corrente dal token
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = await get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

# Funzione per ottenere l'utente attivo
async def get_current_active_user(current_user: UserInDB = Depends(get_current_user)):
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user