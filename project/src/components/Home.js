import React from 'react';
import './Home.css';
import { Drawer, 
  Toolbar, 
  List, 
  ListItem, 
  Avatar, 
  ListItemText, 
  Grid, 
  Button,  
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions, 
  TextField,
  Select,
  InputLabel,
  MenuItem } from '@material-ui/core';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format } from 'date-fns'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import InfoEditPopup from './Teams/InfoEditPopup';
import { shortName } from './Teams/Utils';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { v4 as uuidv4 } from 'uuid';
import {Link} from "react-router-dom";


const emptyTeam = {
  name: "",
  description: "",
  privacy: "",
  members: [],
};

const locales = { //use canadian time format
  'en-Ca': require('date-fns/locale/en-Ca'),
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: this.props.teams,
      currentTeam: this.props.currentTeam,
      teamPopupOpen: false,
      teamPopupTitle: "",
      teamPopupEdit: false,
      teamPopupCurrent: false,
      eventPopup:false,
      teamPopupSave: this.saveTeamChanges.bind(this),
      showDialog: false,
      scopeInputField: "",
      descriptionInputField: "",
      nameInputField: "",
      selectedTeamId: "",
      bookingTitle: "",
      bookingStart: "",
      bookingEnd:"",
      bookingScope:"",
      bookingDesc:"",
      bookingRoom:"",
      events: this.props.bookings.map(function(b){
        var start = new Date(b.month + '/' + b.day + '/' + b.year + ' ' + b.time.slice(0, -2) + ':' + b.time.slice(-2));
        return {
          'title': b.name,
          'start': start,
          'end': new Date(start.getTime() + (30 * 60 * 1000)),
          'bookingId': b.bookingId
        };
      }),
    };
    this.handleClose = this.handleClose.bind(this);
    this.showBookingInformationModal = this.showBookingInformationModal.bind(this);
    this.closeBooking = this.closeBooking.bind(this);
    this.showDialog = this.showDialog.bind(this);
    this.goToBooking = this.goToBooking.bind(this);
  }

  handleClose() {
    this.setState({
      nameInputField: "",
      selectedTeamId: "",
      scopeInputField: "",
      descriptionInputField: "",
      showDialog: false
    })
  }
  handleModalChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  goToBooking(){
    if (!this.state.selectedTeamId || !this.state.nameInputField){
      alert("Please fill out both the team ID and meeting name.")
    }else{
      this.handleClose()
      this.props.goToBooking(this.state.selectedTeamId, this.state.nameInputField, this.state.scopeInputField, this.state.descriptionInputField)
    }
  }

  changeCurrentTeam(event) {
    this.props.updateCurrentTeam(event.currentTarget.getAttribute('data-key'));
  }

  openTeamPopup(editEnabled, currentTeam, popupTitle) {
    this.setState({
      teamPopupEdit: editEnabled,
      teamPopupCurrent: currentTeam,
      teamPopupTitle: popupTitle,
      teamPopupSave: currentTeam ? this.saveTeamChanges.bind(this) : this.addTeam.bind(this),
      currentTeam: this.state.currentTeam
    }, () => this.setState({ teamPopupOpen: true }));
  }
  saveTeamChanges(newTeam) {
    var teams = [];
    this.state.teams.forEach(team => {
      if(team.id === newTeam.id){
        teams.push(newTeam);
      }
      else{
        teams.push(team);
      }
    });

    this.setState({
      teams: teams
    }, () => {
      this.closeTeamPopup();
      this.props.updateTeams(this.state.teams, this.state.currentTeam);
    });
  }
  closeTeamPopup() {
    this.setState({
      teamPopupCurrent: false,
      teamPopupEdit: true,
      teamPopupTitle: ""
    }, () => this.setState({ teamPopupOpen: false }));
  }

  addTeam(newTeam) {
    var teams = this.state.teams;
    teams.push(newTeam);
    this.setState({
      teams: teams,
    }, () => this.props.updateTeams(this.state.teams, this.state.currentTeam));
    this.closeTeamPopup();
  }
  showDialog() {
    this.setState({ showDialog: true })
  }

  // Show selected booking information clicked on from the calendar...
  showBookingInformationModal(bookingId){
    const showingBooking = this.props.bookings.find(b => b.bookingId === bookingId);
    var startTime = new Date(showingBooking.month + '/' + showingBooking.day + '/' + showingBooking.year + ' ' + showingBooking.time.slice(0, -2) + ':' + showingBooking.time.slice(-2));
    var start =format((startTime.getTime()),"Pp")
    var end =format((startTime.getTime() + (30 * 60 * 1000)),"Pp");

    this.setState({
      bookingTitle:showingBooking.name,
      bookingDesc:showingBooking.description,
      bookingStart:start,
      bookingEnd:end,
      bookingScope:showingBooking.scope,
      bookingRoom:showingBooking.room
    },
    () => console.log(end));
    this.setState({eventPopup:true})
  }
  closeBooking() {
    this.setState({ 
      eventPopup:false,
      bookingEnd:"",
      bookingStart:"",
      bookingScope:"",
      bookingDesc:"",
      BookingRoom:"",
      bookingTitle:""
    })
  }

  render() {
    return (
        <div className='root'>
        <Drawer
          className='drawer'
          variant="permanent"
        >
          <Toolbar />
          <div className='drawer-container'>
            <List>
              <ListItem
                button
                className="nav-item"
              >
                <Avatar>+</Avatar>
                <ListItemText className="nav-item-text" primary="New Meeting" onClick={this.showDialog}/>
              </ListItem>
              <ListItem
                button
                className="nav-item"
                onClick={this.openTeamPopup.bind(this, true, false, "Create Team")}
              >
                <Avatar>+</Avatar>
                <ListItemText className="nav-item-text" primary="New Team..." />
              </ListItem>
              <ListItem
                button
                className="nav-item"
                onClick={()=> window.open("https://google.com", "_blank")} //todo make the help open our demo video
              >
                <Avatar>?</Avatar>
                <ListItemText className="nav-item-text" primary="Help" />
              </ListItem>
            </List>
          </div>
        </Drawer>
        <div className="content">
        <Grid container>
        <Grid item xs={3}>
        <h1 className="section_header">Teams</h1>
        {this.state.teams.map((team, index) => (
                <ListItem key={"team-option" + index} data-key={team.id} component={Link} button className="nav-item" to="/teams" onClick={this.changeCurrentTeam.bind(this)}>
                  <Avatar>{shortName(team.name)}</Avatar>
                  <ListItemText className="nav-item-text" primary={team.name} />
                </ListItem>
              ))}
        </Grid>
        <Grid item xs={9}>
          <h1 className="section_header">Calendar</h1>
          <div className="center">
          <Calendar
          defaultView="month"
          eventPropGetter={event => ({style:{backgroundColor:"#7A003C", color:"white", paddingLeft: "10px",}})}
          events={this.state.events}
          localizer={localizer}
          onSelectEvent={(event) => this.showBookingInformationModal(event.bookingId)}
          selectable
          style={{ height: "50vh" }}
          ></Calendar>
          </div>
        </Grid>
        </Grid>
        </div>
        <InfoEditPopup
          key={"infoeditpopup-" + this.state.currentTeam}
          open={this.state.teamPopupOpen}
          team={this.state.teamPopupCurrent ? this.state.teams[this.state.currentTeam] : { ...emptyTeam, id: uuidv4() }}
          title={this.state.teamPopupTitle}
          edit={this.state.teamPopupEdit}
          close={this.closeTeamPopup.bind(this)}
          save={this.state.teamPopupSave}
        />
        <Dialog open={this.state.showDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Book A Meeting</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a meeting name and select a team to book the meeting for.
          </DialogContentText>
            <TextField
              autoFocus
              id="input-name"
              label="Meeting Name"
              type="text"
              margin='normal'
              name='nameInputField'
              onChange={e => this.handleModalChange(e)}
              fullWidth
            />
            <InputLabel id="demo-simple-select-label">Team</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.selectedTeamId ? this.state.selectedTeamId : ''}
              name='selectedTeamId'
              onChange={e => this.handleModalChange(e)}
              fullWidth
            >
              {this.state.teams.map((team) => 
                <MenuItem value={team.id} key={team.id}>{team.name}</MenuItem>
              )}
            </Select>
            <TextField
              id="input-scope"
              label="Meeting Scope (Optional)"
              type="text"
              margin='normal'
              name='scopeInputField'
              onChange={e => this.handleModalChange(e)}
              value={this.state.scopeInputField}
              fullWidth
            />
            <TextField
              id="input-desc"
              label="Meeting Description (Optional)"
              type="text"
              margin='normal'
              name='descriptionInputField'
              onChange={e => this.handleModalChange(e)}
              value={this.state.descriptionInputField}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} className="cancel-button">
              Cancel
          </Button>
            <Button component={Link} to="/bookings"onClick={this.goToBooking} className="save-button">
              Book Room
          </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.state.eventPopup} onClose={this.closeBooking} aria-labelledby="form-dialog-title"  fullWidth={true} maxWidth="xs">
        <DialogContent>
        <Grid container justify="center">
        <DialogTitle id="form-dialog-title">Booking Information:</DialogTitle>
        </Grid>
            <DialogContentText className="event-popup-text">
                <strong>Meeting Name:</strong> {this.state.bookingTitle}
            </DialogContentText>
            <DialogContentText className="event-popup-text">
                <strong>Meeting Room:</strong> {this.state.bookingRoom}
            </DialogContentText>
            <DialogContentText className="event-popup-text">
            <strong>Meeting Start Time:</strong> {this.state.bookingStart}
            </DialogContentText>
            <DialogContentText className="event-popup-text">
            <strong>Meeting End Time:</strong> {this.state.bookingEnd}
            </DialogContentText>
            <DialogContentText className="event-popup-text">
            <strong>Meeting Scope:</strong> {this.state.bookingScope}
            </DialogContentText>
            <DialogContentText className="event-popup-text">
            <strong>Meeting Description:</strong> {this.state.bookingDesc}
            </DialogContentText>
              <DialogActions>
            <Button onClick={this.closeBooking} className="save-button">
              Close
          </Button>
          </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

export default Home;
