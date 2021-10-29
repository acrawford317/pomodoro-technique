import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import fire from '../firebase.js'
import "firebase/auth";
import "firebase/firestore"

const LeaderboardPage = () => {

    const db = fire.firestore();
    const [userCounts, setUserCounts] = useState({});

    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            userCounts[doc.get("email")] = doc.get("pomodoroCount");
            setUserCounts({...userCounts});
        })
    })

    console.log(userCounts);

    return (
        <div>
            <h1>Leaderboard</h1>
            <Container maxWidth="sm">
                <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '35vh' }} >
                    <p style={{ padding: "15px" }}>
                        {
                            Object.keys(userCounts).map((key, index) => (
                                <p key={index}> user: {key}, count: {userCounts[key]}</p>
                            ))
                        }
                    </p>
                </Typography>
            </Container>
        </div>
    );
};

export default LeaderboardPage;