import sqlite3
from datetime import datetime

DATABASE_NAME = "nal.db"


def get_connection():
    return sqlite3.connect(DATABASE_NAME)

def create_tables():

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS activities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            emoji TEXT NOT NULL
        )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        activity_id INTEGER NOT NULL,
        duration INTEGER NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY(activity_id) REFERENCES activities(id)
    )
""")

    conn.commit()

    conn.close()

def get_activities():

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute("SELECT * FROM activities")

    rows = cursor.fetchall()

    conn.close()

    return [
        {
            "id": row[0],
            "name": row[1],
            "emoji": row[2]
        }
        for row in rows
    ]

def create_activity(activity):

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO activities (name, emoji)
        VALUES (?, ?)
        """,
        (activity.name, activity.emoji)
    )

    conn.commit()

    conn.close()

def create_session(activity_id, duration):

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO sessions (activity_id, duration, created_at)
        VALUES (?, ?, ?)
        """,
        (
            activity_id,
            duration,
            datetime.now().isoformat()
        )
    )

    conn.commit()

    conn.close()

def get_sessions():

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute("SELECT * FROM sessions")

    rows = cursor.fetchall()

    conn.close()

    return [
        {
            "activity_id": row[1],
            "session_id": row[0],
            "duration": row[2],
            "created_at": row[3]
        }
        for row in rows
    ]