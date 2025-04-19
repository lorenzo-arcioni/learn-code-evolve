
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router
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

# Include routers
app.include_router(router)

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
