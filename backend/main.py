from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from database import ( create_tables , get_activities , create_activity , create_session , get_sessions )

import json

app = FastAPI()
create_tables()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Activity(BaseModel):
    name: str
    emoji: str

class Session(BaseModel):
    activity_id: int
    duration: int


@app.get("/")
def home():
    return {
        "message": "Welcome to the NAL Backend!"
    }


@app.get("/activities")
def read_activities():
    return get_activities()

@app.get("/sessions")
def read_sessions():

    return get_sessions()

@app.post("/activities")
def add_activity(activity: Activity):

    create_activity(activity)

    return {"message": "Activity Added"}

@app.post("/sessions")
def add_session(session: Session):

    create_session(
        session.activity_id,
        session.duration
    )

    return {"message": "Session Saved"}

