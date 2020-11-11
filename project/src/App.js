import React from 'react';
import './App.css';
import SiteLayout from './components/SiteLayout';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
        <SiteLayout />
    )
  }
}

export default App;
