import React from 'react';
import TopBar from './TopBar';
import Home from './Home';
import Bookings from './Bookings';
import BookRoom from './BookRoom';
import Teams from './Teams/Teams';
import { defaultTeams } from '../data/DefaultTeams';
import { roomAvailability } from '../data/roomAvailability';
import { bookingDefaults } from '../data/bookingsSample';
import './SiteLayout.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class SiteLayout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      teams: defaultTeams,
      rooms: roomAvailability,
      bookings: bookingDefaults,
      current_team: this.teams.length-1
    };
  }

  updateTeams(newTeams) {
    /*
    var bookings = this.state.bookings;
    var teamIds = []
    newTeams.forEach(team => teamIds.push(team.id));
    bookings.filter(booking => teamIds.includes(booking.teamId));
    */
    
    this.setState({
      teams: newTeams
    }, () => console.log(this.state.teams));
  }

  selectedRoom(year, month, day, time, room) {
    const rooms = this.state.rooms;
    rooms[year][month][day][time][room] = false;
    this.setState({
      rooms: rooms
    })
  }

  render() {
    return (
      <div className='root'>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <Router>
          <TopBar />
          <div className='wrapper'>
            <div className='content-container'>
              <div className='content'>
                <Switch>
                  <Route exact path="/">
                    <Home teams={this.state.teams} />
                  </Route>
                  <Route exact path="/bookings">
                    <Bookings bookings={this.state.bookings} />
                  </Route>
                  <Route exact path="/book-room">
                    <BookRoom roomsAvailable={this.state.rooms} roomSelected={this.selectedRoom.bind(this)}/>
                  </Route>
                  <Route exact path="/teams">
                    <Teams key={this.state.teams.length} teams={this.state.teams} updateTeams={this.updateTeams.bind(this)}/>
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

export default SiteLayout;
