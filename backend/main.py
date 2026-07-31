from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
import json

app = FastAPI()

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


@app.get("/")
def home():
    return {
        "message": "Welcome to the NAL Backend!"
    }


@app.get("/activities")
def get_activities():

    with open("data/activities.json", "r") as file:
        activities = json.load(file)

    return activities


@app.post("/activities")
def add_activity(activity: Activity):

    with open("data/activities.json", "r") as file:
        activities = json.load(file)

    new_activity = {
        "id": len(activities) + 1,
        "name": activity.name,
        "emoji": activity.emoji
    }

    activities.append(new_activity)

    with open("data/activities.json", "w") as file:
        json.dump(activities, file, indent=4)

    return new_activity