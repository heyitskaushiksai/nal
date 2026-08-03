import { useState, useEffect } from "react";
import { createSession } from "../services/api";

function TimerScreen(props) {

    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    useEffect(() => {

    if (!isRunning) return;

    const timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);

}, [isRunning]);

    return (
        <div>
            <h2>{props.activity.emoji} {props.activity.name}</h2>

            <h1>
            {String(hours).padStart(2, "0")}:
            {String(minutes).padStart(2, "0")}:
            {String(remainingSeconds).padStart(2, "0")}
            </h1>

            {
                isRunning ? (
                    <button onClick={() => setIsRunning(false)}>
                        ⏸ Pause
                    </button>
                ) : (
                    <button onClick={() => setIsRunning(true)}>
                        {seconds === 0 ? "▶ Start" : "▶ Resume"}
                    </button>
                )
            }
            <button
                onClick={async () => {

                    setIsRunning(false);

                    await createSession({

                        activity_id: props.activity.id,

                        duration: seconds

                    }); 

                    props.goBack();

                    setSeconds(0);

                }}
                
            >
                ⏹ Stop
            </button>
            
            <br /><br />

            <button onClick={props.goBack}>
                ← Back
            </button>
        </div>
    );
}

export default TimerScreen;
