import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button
} from '@material-ui/core';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Link } from "react-router-dom";

import './TopBar.css';

class TopBar extends React.Component {
    render() {
        return (
            <AppBar className="header" position="fixed">
                <div className="left">

                    <Toolbar>
                        <MeetingRoomIcon className="title-icon" fontSize="large" />
                        <Typography className="title" variant="h6">
                            The Hub
                        </Typography>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/bookings">Bookings</Button>
                        <Button color="inherit" component={Link} to="/teams">Teams</Button>
                        <div className="left" />
                        <div className="right">
                            <IconButton
                                color="inherit"
                                className="right"
                            >
                                <NotificationsIcon />
                            </IconButton>
                            <IconButton
                                color="inherit"
                                className="right"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                    </Toolbar>
                </div>
            </AppBar>

        )
    }
}

export default TopBar