
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from routes import router as main_router
from admin_routes import router as admin_router
from contact_routes import router as contact_router
from content_view_routes import router as content_view_router
from database import client

# Initialize FastAPI
app = FastAPI(title="ML Academy API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory if it doesn't exist
os.makedirs("uploads/avatars", exist_ok=True)

# Serve static files
app.mount("/avatars", StaticFiles(directory="uploads/avatars"), name="avatars")
app.mount("/static", StaticFiles(directory="static"), name="static")

# Include routers
app.include_router(main_router)
app.include_router(admin_router)
app.include_router(contact_router)
app.include_router(content_view_router)

# Startup and shutdown events
@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = client

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
