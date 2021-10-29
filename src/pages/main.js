import React, { useState } from 'react';
import Timer from '../Timer.js'

const MainPage = () => {

    const minSec = { minutes: 25, seconds: 0 }
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPomodoro, setIsPomodoro] = useState(true);
    const [isShortBreak, setIsShortBreak] = useState(false);
    const [isLongBreak, setIsLongBreak] = useState(false);
    const [pomodoroCount, setPomodoroCount] = useState(0);

    return (
        <div>
            <Timer
                minSec={minSec}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                isPomodoro={isPomodoro}
                setIsPomodoro={setIsPomodoro}
                isShortBreak={isShortBreak}
                setIsShortBreak={setIsShortBreak}
                isLongBreak={isLongBreak}
                setIsLongBreak={setIsLongBreak}
                pomodoroCount={pomodoroCount}
                setPomodoroCount={setPomodoroCount}
            />
        </div>
    );
};

export default MainPage;