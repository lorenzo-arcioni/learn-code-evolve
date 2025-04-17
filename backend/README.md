
# ML Academy Backend

This is the backend API for the ML Academy application, built with FastAPI and MongoDB.

## Setup

1. Create a virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies
```bash
pip install -r requirements.txt
```

3. Create a `.env` file by copying `.env.example` and updating the values
```bash
cp .env.example .env
```

4. Start MongoDB
Make sure you have MongoDB running locally or update the MONGODB_URI in your .env file to point to your MongoDB instance.

5. Run the application
```bash
python main.py
```
The API will be available at http://localhost:8000

## API Documentation

Once the application is running, you can access:
- Interactive API documentation: http://localhost:8000/docs
- Alternative documentation: http://localhost:8000/redoc

## Available Endpoints

### Authentication
- POST `/token` - Get authentication token
- POST `/users/` - Create a new user
- GET `/users/me` - Get current user profile

### Exercises
- GET `/exercises/` - List all exercises
- GET `/exercises/{exercise_id}` - Get a specific exercise
- POST `/exercises/` - Create a new exercise (admin only)
- POST `/exercises/{exercise_id}/submit` - Submit solution for an exercise

### Theory
- GET `/theory/` - List all theory articles
- GET `/theory/{theory_id}` - Get a specific theory article
- GET `/theory/category/{category}` - Get theory articles by category
- POST `/theory/` - Create a new theory article (admin only)

### Leaderboard
- GET `/leaderboard/` - Get top users leaderboard

### User Progress
- GET `/users/me/progress` - Get current user's progress
