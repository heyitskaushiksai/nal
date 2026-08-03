import { useState, useEffect } from "react";
import Header from "./components/Header";
import ActivityCard from "./components/ActivityCard";
import TimerScreen from "./components/TimerScreen";
import { getActivities, createActivity , getSessions} from "./services/api";

function App() {
  const [activityName, setActivityName] = useState("");
  const [activityEmoji, setActivityEmoji] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activities, setActivities] = useState([]);
  const [sessions, setSessions] = useState([]);

async function loadSessions() {

    const data = await getSessions();

    setSessions(data);

}

async function loadActivities() {

    const data = await getActivities();

    setActivities(data);

}

function getActivity(activityId) {

    return activities.find(
        (activity) => activity.id === activityId
    );

}

function formatDuration(seconds) {

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
        return `${hours}h ${minutes}m ${remainingSeconds}s`;
    }

    if (minutes > 0) {
        return `${minutes}m ${remainingSeconds}s`;
    }

    return `${remainingSeconds}s`;

}

useEffect(() => {
    loadActivities();
    loadSessions();
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

    await createActivity({

    name: activityName,
    emoji: activityEmoji

});

    await loadActivities();

    setActivityName("");
    setActivityEmoji("");
}

if (selectedActivity) {
    return (
        <TimerScreen
            activity={selectedActivity}
            goBack={() => {
                loadSessions();
                setSelectedActivity(null)}}
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

<h2>Today's Sessions</h2>

{sessions.map((session) => {

    const activity = getActivity(session.activity_id);

    return (

        <div key={session.session_id}>

            {activity?.emoji} {activity?.name}

            {" - "}

            {formatDuration(session.duration)}

        </div>

    );

})}
    </div>
  );
}

export default App;