// login page styling from material UI --> https://mui.com/getting-started/templates/

import React from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';


const Login = (props) => {

    const { email, setEmail, password, setPassword, handleLogin, handleSignup, hasAccount, emailError, passwordError, changeAccountStatus } = props;

    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
            textAlign: 'center'
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper} >
                <Avatar className={classes.avatar} style={{ textAlign: "center" }}>
                    <LockOutlinedIcon />
                </Avatar>

                <div>
                    {hasAccount ? (
                        <p style={{fontSize: "23px"}}>Sign In</p>
                    ) : (
                        <p style={{fontSize: "23px"}}>Sign Up</p>
                    )}
                </div>

                <form className={classes.form}>
                    <div ClassName='loginContainer'>

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p className='errorMsg'>{emailError}</p>

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <p className='errorMsg'>{passwordError}</p>

                        <div className='btnContainer'>
                            {hasAccount ? (
                                <>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={handleLogin}
                                    >
                                        Sign In
                                    </Button>
                                    <p style={{ paddingTop: "10px" }}>Don't have an account? <span style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => changeAccountStatus()}>Sign Up</span></p>
                                </>
                            ) : (
                                <>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={handleSignup}
                                    >
                                        Sign Up
                                    </Button>
                                    <p style={{ paddingTop: "10px" }}>Have an account? <span style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => changeAccountStatus()}>Sign In</span></p>
                                </>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </Container>
    )
}

export default Login;