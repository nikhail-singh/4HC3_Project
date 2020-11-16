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
      teamPopupSave: this.saveTeamChanges.bind(this),
      showDialog: false,
      nameInputField: "",
      selectedTeamId: "",
      redirect:false,
      events: this.props.bookings.map(function(b){
        var start = new Date(b.month + '/' + b.day + '/' + b.year + ' ' + b.time.slice(0, -2) + ':' + b.time.slice(-2));
        return {
          'title': b.name,
          'start': start,
          'end': new Date(start.getTime() + (30 * 60 * 1000))
        };
      }),
    };
    this.handleClose = this.handleClose.bind(this);
    this.showDialog = this.showDialog.bind(this);
    this.goToBooking = this.goToBooking.bind(this);
  }

  handleClose() {
    this.setState({
      nameInputField: "",
      selectedTeamId: "",
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
      this.props.goToBooking(this.state.selectedTeamId, this.state.nameInputField)
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
          eventPropGetter={event => ({style: {backgroundColor:"maroon", paddingLeft: "10px",}})}
          events={this.state.events}
          localizer={localizer}
          onSelectEvent={(event) =>alert(`${event.title} \n Start: ${event.start}\n End: ${event.end}`)}
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
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
          </Button>
            <Button component={Link} to="/bookings"onClick={this.goToBooking} color="primary">
              Book Room
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default Home;
