import React from 'react';
import './Teams.css';
import RoleCard from './RoleCard';
import InfoEditPopup from './InfoEditPopup';
import { Drawer, Toolbar, List, ListItem, Avatar, ListItemText, Typography, Button, Divider } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import CancelIcon from '@material-ui/icons/Cancel';
import { shortName } from './Utils';
import { v4 as uuidv4 } from 'uuid';
const emptyTeam = {
  name: "",
  description: "",
  privacy: "",
  members: [],
};

class Teams extends React.Component {
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
      roles: ["Admin", "Moderator", "Member"]
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

  editMember(member, index) {
    var teams = this.state.teams;
    teams[this.state.currentTeam].members[index] = { ...member };
    this.setState({
      teams: teams
    }, () => this.props.updateTeams(this.state.teams));
  }

  leaveTeam() {
    var filterTeams = this.state.teams;
    filterTeams.splice(this.state.currentTeam, 1);
    console.log(this.filterTeams);
    this.setState({
      teams: filterTeams,
      currentTeam: filterTeams.length-1
    }, () =>  this.props.updateTeams(this.state.teams));

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
              {this.state.teams.map((team, index) => (
                <ListItem key={"team-option" + index} data-key={index} button className="nav-item" onClick={this.changeCurrentTeam.bind(this)}>
                  <Avatar>{shortName(team.name)}</Avatar>
                  <ListItemText className="nav-item-text" primary={team.name} />
                </ListItem>
              ))}
              <ListItem
                button
                className="nav-item"
                onClick={this.openTeamPopup.bind(this, true, false, "Create Team")}
              >
                <Avatar>+</Avatar>
                <ListItemText className="nav-item-text" primary="New Team..." />
              </ListItem>
            </List>
          </div>
        </Drawer>
        {this.state.currentTeam !== -1 && <div className="content">
          <Toolbar className="team-header">
            <Avatar>{shortName(this.state.teams[this.state.currentTeam].name)}</Avatar>
            <Typography className="team-header-title" variant="h4">{this.state.teams[this.state.currentTeam].name}</Typography>
            <div className="header-actions">
              <Button
                color="default"
                className="action-button"
                startIcon={<EditIcon />}
                onClick={this.openTeamPopup.bind(this, true, true, "Edit Team")}
              >
                Edit
            </Button>
              <Button
                color="default"
                className="action-button"
                startIcon={<InfoIcon />}
                onClick={this.openTeamPopup.bind(this, false, true, "Team Info")}
              >
                Info
            </Button>
              <Button
                color="default"
                className="action-button"
                startIcon={<CancelIcon />}
                onClick={this.leaveTeam.bind(this)}
              >
                Leave Team
            </Button>
            </div>
          </Toolbar>
          <Divider />
          <div >
            {this.state.roles.map(role => (
              <RoleCard
                key={role}
                role={role}
                editMember={this.editMember.bind(this)}
                memberTotal={this.state.teams[this.state.currentTeam].members}
                members={this.state.teams[this.state.currentTeam].members.filter(member =>
                  member.role === role)}
              />
            ))}

          </div>
        </div>}
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

export default Teams;