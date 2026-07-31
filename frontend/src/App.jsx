import {useState} from "react";
import Header from "./components/Header";
import ActivityCard from "./components/ActivityCard";
import TimerScreen from "./components/TimerScreen";

function App() {
  const [activityName, setActivityName] = useState("");
  const [activityEmoji, setActivityEmoji] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activities, setActivities] = useState([
  {
    id: 101,
    name: "Linux",
    emoji: "🐧",
  },
  {
    id: 102,
    name: "Sketching",
    emoji: "🎨",
  },
  {
    id: 103,
    name: "Reading",
    emoji: "📖",
  },
  {
    id: 104,
    name: "AWS",
    emoji: "☁️",
  },
]);
function addActivity() {

  if (!activityName.trim()) {
    alert("Please enter an activity name.");
    return;
}

if (!activityEmoji) {
    alert("Please select an emoji.");
    return;
}

    const newActivity = {
        id: Date.now(),
        name: activityName,
        emoji: activityEmoji
    };

    setActivities([
        ...activities,
        newActivity
    ]);

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