import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const AboutPage = () => {

    const steps = ["Choose a task to work on", 
                    "Start the Pomodoro timer for 25 minutes", 
                    "Work on the task without interruptions until the timer rings", 
                    "Take a short 5 minute break", 
                    "Every 4 Pomodoros, take a longer 15 minute break"];
                    
    const listItems = steps.map((step) =>
        <li>{step}</li>
    );

    return (
        <div>
            <h1>About</h1>
            <Container maxWidth="sm">
                <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '35vh' }} >
                    <p style={{padding:"15px"}}>
                        This app is designed to help you stay focused so that you can accomplish more. 
                        Here's how the Pomodoro technique works:
                    </p>
                    <ul style={{ textAlign: "left" }}>{listItems}</ul>
                </Typography>
            </Container>
        </div>
    );
};

export default AboutPage;