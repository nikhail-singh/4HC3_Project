import React from 'react';
import './Home.css';
import { Drawer, Toolbar, List, ListItem, Avatar, ListItemText, Grid, Typography, Button, Divider } from '@material-ui/core';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
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

const localizer = momentLocalizer(moment);
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: this.props.teams,
      currentTeam: this.props.teams.length-1,
      teamPopupOpen: false,
      teamPopupTitle: "",
      teamPopupEdit: false,
      teamPopupCurrent: false,
      teamPopupSave: this.saveTeamChanges.bind(this),
      events: [
        {
          start: moment().toDate(),
          end: moment().add(1, "hours").toDate(),
          title: "Some title",
        },
      ]
    };
  }
  changeCurrentTeam(event) {
    this.setState({
      currentTeam: event.currentTarget.getAttribute('data-key')
    });

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
    var teams = this.state.teams;
    teams[this.state.currentTeam] = newTeam;
    this.setState({
      teams: teams
    }, () => {
      this.closeTeamPopup();
      this.props.updateTeams(this.state.teams);
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
    }, () => this.props.updateTeams(this.state.teams));
    this.closeTeamPopup();
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
                <ListItemText className="nav-item-text" primary="New Meeting" />
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
                <ListItem key={"team-option" + index} data-key={index} component={Link} button className="nav-item" to="/teams" onClick={this.changeCurrentTeam.bind(this)}>
                  <Avatar>{shortName(team.name)}</Avatar>
                  <ListItemText className="nav-item-text" primary={team.name} />
                </ListItem>
              ))}
        </Grid>
        <Grid item xs={9}>
          <h1 className="section_header">Calendar</h1>
          <div className="center">
          <Calendar
          defaultDate={moment().toDate()}
          defaultView="month"
          events={this.state.events}
          localizer={localizer}
          onSelectEvent={event => alert(event.title)} //todo open edit event
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
      </div>
    )
  }
}

export default Home;
