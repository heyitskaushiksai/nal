import { useState, useEffect } from "react";
import Header from "./components/Header";
import ActivityCard from "./components/ActivityCard";
import TimerScreen from "./components/TimerScreen";

function App() {
  const [activityName, setActivityName] = useState("");
  const [activityEmoji, setActivityEmoji] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activities, setActivities] = useState([]);

  async function loadActivities() {
    const response = await fetch("http://127.0.0.1:8000/activities");
    const data = await response.json();
    setActivities(data);
}

useEffect(() => {
    loadActivities();
}, []);

async function addActivity() {

    if (!activityName.trim()) {
        alert("Please enter an activity name.");
        return;
    }

    if (!activityEmoji) {
        alert("Please select an emoji.");
        return;
    }

    await fetch("http://127.0.0.1:8000/activities", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: activityName,
            emoji: activityEmoji
        })

    });

    await loadActivities();

    setActivityName("");
    setActivityEmoji("");
}

if (selectedActivity) {
    return (
        <TimerScreen
            activity={selectedActivity}
            goBack={() => setSelectedActivity(null)}
        />
    );
}

  return (
    <div>
      <Header />
      <p>Let's record.</p>
      <input
    type="text"
    placeholder="Activity Name"
    value={activityName}
    onChange={(event) => setActivityName(event.target.value)}
    />
    <button
    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
>
    {activityEmoji || "😀"}
</button>
{
    showEmojiPicker && (
        <div>
            {["🐧","🎨","📖","☁️","🐳","💻","📚","🎮","✍️","🚀"].map((emoji) => (
                <button
                    key={emoji}
                    onClick={() => {
                        setActivityEmoji(emoji);
                        setShowEmojiPicker(false);
                    }}
                >
                    {emoji}
                </button>
            ))}
        </div>
    )
}
    <br />
      <button onClick={addActivity}>
    +
</button>
      {activities.map((activity) => (
  <div
    key={activity.id}
    onClick={() => setSelectedActivity(activity)}
    style={{ cursor: "pointer" }}
>
    <ActivityCard
        name={activity.name}
        emoji={activity.emoji}
    />
</div>
))}
    </div>
  );
}

export default App;