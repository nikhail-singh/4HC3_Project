import React from 'react';
import './Teams.css';
import RoleCard from './RoleCard';
import { Drawer, Toolbar, List, ListItem, Avatar, ListItemText, Typography, Button, Divider } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import { teams } from './data';

class Teams extends React.Component {
  constructor(props) {
    super(props);
    this.state = { teams: teams, currentTeam: 0 };
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
                <ListItem button className="nav-item">
                  <Avatar>{team.shortName}</Avatar>
                  <ListItemText className="nav-item-text" primary={team.teamName} />
                </ListItem>
              ))}
              <ListItem button className="nav-item">
                  <Avatar>+</Avatar>
                  <ListItemText className="nav-item-text" primary="New Team..." />
                </ListItem>
            </List>
          </div>
        </Drawer>
        <div className="content">
          <Toolbar className="team-header">
            <Avatar>{this.state.teams[this.state.currentTeam].shortName}</Avatar>
            <Typography className="team-header-title" variant="h4">{this.state.teams[this.state.currentTeam].teamName}</Typography>
            <div className="header-actions">
              <Button
                color="default"
                className="action-button"
                startIcon={<SettingsIcon />}
              >
                Settings
            </Button>
              <Button
                color="default"
                className="action-button"
                startIcon={<InfoIcon />}
              >
                Info
            </Button>
            </div>
          </Toolbar>
          <Divider />
          {this.state.teams[this.state.currentTeam].roles.map(role =>(
            <RoleCard role={role} members={this.state.teams[this.state.currentTeam].members.filter(member => member.role === role)}/>
          ))}


        </div>
      </div>
    )
  }
}

export default Teams;
