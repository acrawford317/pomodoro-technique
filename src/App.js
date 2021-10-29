import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import fire from "./firebase.js";
import "firebase/auth";
import MainPage from './pages/main.js';
import AboutPage from './pages/about.js';
import LeaderboardPage from './pages/leaderboard.js';
import ProfilePage from './pages/profile.js';
import PageNotFound from './pages/404.js';
import Home from './Home.js'
import Login from './Login.js'
import 'firebase/firestore';
import firebase from 'firebase/app'


function App() {

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);
  const [userID, setUserID] = useState('');

  const db = fire.firestore();

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const changeAccountStatus = () => {
    clearInputs();
    clearErrors();
    setHasAccount(!hasAccount)
  }

  const handleLogin = e => {
    e.preventDefault();
    clearErrors();
    fire.auth().signInWithEmailAndPassword(email, password)
      .catch(err => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    clearErrors();
    fire.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.collection("users").doc(firebase.auth().currentUser.uid).set({
          email: email,
          pomodoroCount: 0
        })
      })
      .catch(err => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleLogout = () => {
    clearInputs();
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setUserID(user.uid);
      } else {
        setUser("");
        setUserID("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <div className="App">
      <Router>
        {user ? (
          <div>
            <Home
              handleLogout={handleLogout}
              email={email}
            />
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/leaderboard" component={LeaderboardPage} />
              <Route exact path="/profile" render={(props) => (<ProfilePage userID={userID} {...props} />)} />
              <Route exact path="/404" component={PageNotFound} />
              <Redirect to="/404" />
            </Switch>
          </div>
        ) : (
          <div>
            <Login
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              handleSignup={handleSignup}
              hasAccount={hasAccount}
              emailError={emailError}
              passwordError={passwordError}
              changeAccountStatus={changeAccountStatus}
            />
            <Switch>
              <Route exact path="/" />
              <Redirect to="/" />
            </Switch>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;