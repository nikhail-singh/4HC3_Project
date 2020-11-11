import React from 'react';
import TopBar from './TopBar';
import Home from './Home';
import Bookings from './Bookings';
import BookRoom from './BookRoom';
import Teams from './Teams';
import './SiteLayout.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class SiteLayout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
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
                    <Home/>
                  </Route>
                  <Route exact path="/bookings">
                    <Bookings/>
                  </Route>
                  <Route exact path="/book-room">
                    <BookRoom/>
                  </Route>
                  <Route exact path="/teams">
                    <Teams/>
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
