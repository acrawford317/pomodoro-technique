import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import fire from './firebase.js'
import "firebase/auth";
import "firebase/firestore";
import firebase from 'firebase';
import audio from "./alarm.mp3";


const Timer = ({ minSec, isPlaying, setIsPlaying, isPomodoro, setIsPomodoro, isShortBreak, setIsShortBreak, isLongBreak, setIsLongBreak }) => {

    const { minutes = 0, seconds = 60 } = minSec;
    const [[mins, secs], setTime] = React.useState([minutes, seconds]);

    const playAudio = () => {
        new Audio(audio).play();
    }

    const db = fire.firestore();

    // getting userid
    var userID = ""
    fire.auth().onAuthStateChanged((user) => {
        if (user) {
            userID = user.uid
        }
    })

    const addPomodoro = () => {
        db.collection("users")
            .doc(userID).update("pomodoroCount", firebase.firestore.FieldValue.increment(1))
    };

    const timesUp = () => {
        if (isPomodoro) {
            setTime([25, 0])
            addPomodoro();
        }
        else if (isShortBreak)
            setTime([5, 0])
        else
            setTime([15, 0])

        setIsPlaying(false)
        playAudio()
    }

    const tick = () => {
        if (mins === 0 && secs === 0)
            timesUp()
        else if (secs === 0)
            setTime([mins - 1, 59])
        else
            setTime([mins, secs - 1])
    }

    React.useEffect(() => {
        if (isPlaying) {
            const timerId = setInterval(() => tick(), 1000);
            return () => clearInterval(timerId);
        }
    });

    function toggle() {
        setIsPlaying(!isPlaying);
    }

    const pomodoro = () => {
        setIsPlaying(false)
        setIsPomodoro(true)
        setIsShortBreak(false)
        setIsLongBreak(false)
        setTime([25, 0])
    }

    const shortBreak = () => {
        setIsPlaying(false)
        setIsShortBreak(true)
        setIsPomodoro(false)
        setIsLongBreak(false)
        setTime([5, 0])
    }

    const longBreak = () => {
        setIsPlaying(false)
        setIsLongBreak(true)
        setIsPomodoro(false)
        setIsShortBreak(false)
        setTime([15, 0])
    }

    return (
        <Container maxWidth="sm">
            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '50vh' }} >
                <div style={{ paddingTop: "20px" }}>
                    <Button onClick={pomodoro} variant="outlined" size={isPomodoro ? "large" : "small"} color="primary" style={{ marginRight: "10px", textTransform: (isPomodoro ? "" : "lowercase") }}>Pomodoro</Button>
                    <Button onClick={shortBreak} variant="outlined" size={isShortBreak ? "large" : "small"} color="primary" style={{ marginRight: "10px", textTransform: (isShortBreak ? "" : "lowercase") }}>Short Break</Button>
                    <Button onClick={longBreak} variant="outlined" size={isLongBreak ? "large" : "small"} color="primary" style={{ marginRight: "10px", textTransform: (isLongBreak ? "" : "lowercase") }}>Long Break</Button>
                </div>
                <div style={{ textAlign: "center", fontSize: "80px" }}>
                    <p>{`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p>
                </div>
                <div>
                    <Button onClick={toggle} variant="contained" color="primary" >{isPlaying ? 'Pause' : 'Start'}</Button>
                </div>
            </Typography>
        </Container>
    )
}

export default Timer;