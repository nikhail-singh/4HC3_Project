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
  Route,
  Redirect
} from "react-router-dom";

class SiteLayout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      teams: defaultTeams,
      rooms: roomAvailability,
      bookings: bookingDefaults,
      current_team: defaultTeams[0].id,
      showBookings: false,
      selectedTeamId: '0',
      nextBookId: 1,
    };
    this.readyToBook = this.readyToBook.bind(this);
  }

  updateTeams(newTeams, selectedTeamId) {
    var bookings = this.state.bookings;
    var teamIds = []
    newTeams.forEach(team => teamIds.push(team.id));
    bookings = bookings.filter(booking => teamIds.includes(booking.teamId));
    this.setState({
      bookings: bookings,
      teams: newTeams,
      selectedTeamId: selectedTeamId
    });
  }

  updateCurrentTeam(selectedTeamId){
    this.setState({
      selectedTeamId: selectedTeamId
    }, () => console.log(this.state));
  }

  selectedRoom(year, month, day, time, room) {
    const rooms = this.state.rooms;
    rooms[year][month][day][time][room] = false;
    var bookings = this.state.bookings;
    bookings.push({
      name: this.state.newMeetingName,
      year: year,
      month: month,
      day: day,
      time: time,
      teamId: this.state.selectedTeamId,
      room: room,
      bookingId: this.state.nextBookId
    })
    bookings.sort(function(a, b){
      if(a['year'] < b['year']){
        return -1;
      }else if(a['year'] > b['year']){
        return 1;
      }else if(a['month'] < b['month']){ // year is ===
        return -1;
      }else if(a['month'] > b['month']){
        return 1;
      }else if(a['day'] < b['day']){ // month is ===
        return -1;
      }else if(a['day'] > b['day']){
        return 1;
      }else if(parseInt(a['time']) < parseInt(b['time'])){ // day is ===
        return -1;
      }else if(parseInt(a['time']) > parseInt(b['time'])){
        return 1;
      }else{
        return 0;
      }
    });
    this.setState({
      rooms: rooms,
      showBookings: false,
      bookings: bookings,
      nextBookId: this.state.nextBookId + 1
    })
  }

  readyToBook(selectedTeamId, newMeetingName){
    this.setState({
      showBookings: true,
      selectedTeamId: selectedTeamId,
      newMeetingName: newMeetingName
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
                    <Home teams={this.state.teams} updateTeams={this.updateTeams.bind(this)} currentTeam={this.state.selectedTeamId} updateCurrentTeam={this.updateCurrentTeam.bind(this)}/>
                  </Route>
                  <Route exact path="/bookings">
                    {this.state.showBookings ? <Redirect to='/book-room' /> : <Bookings bookings={this.state.bookings} teams={this.state.teams} goToBooking={this.readyToBook} />}
                  </Route>
                  <Route exact path="/book-room">
                    {this.state.showBookings ? <BookRoom roomsAvailable={this.state.rooms} roomSelected={this.selectedRoom.bind(this)}/> : <Redirect to='/bookings' />}
                  </Route>
                  <Route exact path="/teams">
                    <Teams key={this.state.teams.length} teams={this.state.teams} updateTeams={this.updateTeams.bind(this)} currentTeam={this.state.selectedTeamId} current_team={this.state.current_team}/>
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
