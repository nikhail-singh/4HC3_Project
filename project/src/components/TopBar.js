import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Select,
    Grid,
    InputLabel,
    MenuItem,
    TextField
} from '@material-ui/core';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Link } from "react-router-dom";

import './TopBar.css';

class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDialog: false,
            nameInputField: "",
            selectedTeamId: "",
            name: "User 1",
            email: "user1@mcmaster.ca"
        }
    }
    showDialog() {
        this.setState({ showDialog: true })
    }

    handleModalChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    closeEditPopup() {
        window.location.reload();
    }

    saveEditPopup() {
        this.setState({
            showDialog: false
        });
    }
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
                                onClick={this.showDialog.bind(this)}
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                    </Toolbar>
                </div>
                <Dialog
                    open={this.state.showDialog}
                    fullWidth={true}
                    maxWidth="sm">
                    <Grid container justify="center">
                    <DialogTitle>User Settings</DialogTitle>
                    </Grid>
                    <Grid container justify="center">
                    <IconButton>
                        <AccountCircle style={{ fontSize: 60, color:"#7A003C"}}/>
                    </IconButton>
                    </Grid>
                    <DialogContent>
                        <InputLabel>Name:</InputLabel>
                        <TextField
                            className="text-input"
                            variant="outlined"
                            defaultValue={this.state.name}
                            onChange={(event) => {
                                var newName = event.target.value;
                                this.setState({ name: newName });
                            }}
                        />
                        <InputLabel id="role-label">Email:</InputLabel>
                        <TextField
                            className="text-input"
                            variant="outlined"
                            defaultValue={this.state.email}
                            onChange={(event) => {
                                var newEmail = event.target.value;
                                this.setState({ email: newEmail });
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                    <Grid container justify="center">
                        <Button onClick={this.saveEditPopup.bind(this)} className="save-button">
                            Save
                        </Button>
                        </Grid>
                    </DialogActions>
                    <DialogActions>
                        <Grid container justify="center">
                            <Button onClick={this.closeEditPopup.bind(this)} className="cancel-button">
                                Sign out
                        </Button>
                        </Grid>

                    </DialogActions>
                </Dialog>
            </AppBar>

        )
    }
}

export default TopBar