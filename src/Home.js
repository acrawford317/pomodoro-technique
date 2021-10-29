// code for app-bar from material UI --> https://mui.com/components/app-bar/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';


const Home = (props) => {

    const { handleLogout, email } = props;

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }));

    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl1, setAnchorEl1] = React.useState(null);

    const open = Boolean(anchorEl);
    const open1 = Boolean(anchorEl1);


    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenu1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleClose1 = () => {
        setAnchorEl1(null);
    };

    return (
        <section className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" aria-controls="menu-appbar1"
                                aria-haspopup="true"
                                onClick={handleMenu1}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                                id="menu-appbar1"
                                anchorEl1={anchorEl1}
                                getContentAnchorEl={null}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={open1}
                                onClose={handleClose1}
                            >
                                <MenuItem onClick={handleClose1}> <Link to='/about' style={{color:"black", textDecoration:"none"}}>About</Link> </MenuItem>
                                <MenuItem onClick={handleClose1}> <Link to='/leaderboard' style={{color:"black", textDecoration:"none"}}>Leaderboard</Link> </MenuItem>
                            </Menu>
                    <Typography variant="h6" className={classes.title} style={{textAlign:"left"}}>
                        <Link to="/" style={{color:"white", textDecoration:"none"}}>Pomodoro</Link>
                    </Typography>
                    {auth && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}> <Link to='/profile' style={{color:"black", textDecoration:"none"}}>My Profile</Link> </MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <div style={{ paddingBottom: "50px" }} />
        </section>
    )
}

export default Home;