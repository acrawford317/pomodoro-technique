import React from 'react';
import { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import fire from '../firebase.js'
import "firebase/auth";
import "firebase/firestore"

const ProfilePage = (props) => {

    const { userID } = props;

    const [email, setEmail] = useState([]);
    const [count, setCount] = useState([]);
    const db = fire.firestore();

    db.collection("users").doc(userID)
        .onSnapshot(documentSnapshot => {
            setCount(documentSnapshot.get("pomodoroCount"));
      });

      db.collection("users").doc(userID)
      .onSnapshot(documentSnapshot => {
          setEmail(documentSnapshot.get("email"));
    });

    // db.collection("users").doc(userID).update("email", email);

    return (
        <div>
            <h1>My Profile</h1>
            <Container maxWidth="sm">
                <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '35vh' }} >
                    <p style={{ padding: "15px" }}>
                        Email: {email} <br />
                        Pomodoro's completed: {count}
                    </p>
                </Typography>
            </Container>
        </div>
    );
};

export default ProfilePage;