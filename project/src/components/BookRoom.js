import React from 'react';
import './BookRoom.css';
import { Container, Grid, Typography } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import withSizes from 'react-sizes'
import DateFnsUtils from '@date-io/date-fns';



class BookRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0,
      roomAvailabile: {'201': false, '203': true, '204A': true, '204B': false, '205': true},
      selectedDate: Date.now()
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  getCheckMarkSVG(width, height, x, y){
    return <svg aria-hidden="true" width={width} height={height} x={x} y={y} focusable="false" data-prefix="far" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="auto" d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"></path></svg>;
  }

  getXCircleSVG(width, height, x, y){
    return <svg aria-hidden="true" width={width} height={height} x={x} y={y} focusable="false" data-prefix="far" data-icon="times-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="auto" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"></path></svg>;;
  }

  mapRoomClicked(roomNumber){
    console.log(roomNumber)
  }

  handleDateChange = (date) => {
    this.setState({
      selectedDate: date
    })
  };

  render() {
    const horizontalMap = 
      <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" version="1.1" width="100%" height="100%" viewBox="-0.5 -0.5 1282 722" id="floor-outline"><defs/>
        <g>
          <rect x="0" y="0" width="1280" height="720" className='map-outline' fill="none" stroke="#000000" pointerEvents="all"/>
          <svg className={this.state.roomAvailabile['201'] ? 'map-available-room clickable' : 'map-unavailable-room clickable'} id="map-room-201" x="0" y="400" width="200" height="200" onClick={() => this.mapRoomClicked('201')}>
            <rect width="100%" height="100%" className={this.state.roomAvailabile['201'] ? 'map-available-room-background' : 'map-unavailable-room-background'} fille='none' stroke="#000000" pointerEvents="all"/>
            <text className="map-text" x="50%" y="40%" dominantBaseline="middle" textAnchor="middle">Room: 201</text>
            <text className="map-text" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">Capacity: 6</text>
            {this.state.roomAvailabile['201'] ? this.getCheckMarkSVG("12%", "12%", "21%", "60%") : this.getXCircleSVG("12%", "12%", "21%", "60%")}
            <text className="map-text" x="57%" y="67%" dominantBaseline="middle" textAnchor="middle">{this.state.roomAvailabile['201'] ? 'Available' : 'Unavailable'}</text>
          </svg>
          <svg  className={this.state.roomAvailabile['203'] ? 'map-available-room clickable' : 'map-unavailable-room clickable'} id="map-room-203" x="200" y="0" width="200" height="200" onClick={() => this.mapRoomClicked('203')}>
            <rect width="100%" height="100%" className={this.state.roomAvailabile['203'] ? 'map-available-room-background' : 'map-unavailable-room-background'} fille='none' stroke="#000000" pointerEvents="all"/>
            <text className="map-text" x="50%" y="40%" dominantBaseline="middle" textAnchor="middle">Room: 203</text>
            <text className="map-text" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">Capacity: 4</text>
            {this.state.roomAvailabile['203'] ? this.getCheckMarkSVG("12%", "12%", "21%", "60%") : this.getXCircleSVG("12%", "12%", "21%", "60%")}
            <text className="map-text" x="57%" y="67%" dominantBaseline="middle" textAnchor="middle">{this.state.roomAvailabile['203'] ? 'Available' : 'Unavailable'}</text>
          </svg>
          <svg  className={this.state.roomAvailabile['204A'] ? 'map-available-room clickable' : 'map-unavailable-room clickable'} id="map-room-204A" x="400" y="0" width="240" height="280" onClick={() => this.mapRoomClicked('204A')}>
            <rect width="100%" height="100%" className={this.state.roomAvailabile['204A'] ? 'map-available-room-background' : 'map-unavailable-room-background'} fille='none' stroke="#000000" pointerEvents="all"/>
            <text className="map-text" x="50%" y="40%" dominantBaseline="middle" textAnchor="middle">Room: 204-A</text>
            <text className="map-text" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">Capacity: 6</text>
            {this.state.roomAvailabile['204A'] ? this.getCheckMarkSVG("12%", "12%", "23%", "60%") : this.getXCircleSVG("12%", "12%", "23%", "60%")}
            <text className="map-text" x="58%" y="67%" dominantBaseline="middle" textAnchor="middle">{this.state.roomAvailabile['204A'] ? 'Available' : 'Unavailable'}</text>
          </svg>
          <svg  className={this.state.roomAvailabile['204B'] ? 'map-available-room clickable' : 'map-unavailable-room clickable'} id="map-room-204A" x="640" y="0" width="240" height="280" onClick={() => this.mapRoomClicked('204B')}>
            <rect width="100%" height="100%" className={this.state.roomAvailabile['204B'] ? 'map-available-room-background' : 'map-unavailable-room-background'} fille='none' stroke="#000000" pointerEvents="all"/>
            <text className="map-text" x="50%" y="40%" dominantBaseline="middle" textAnchor="middle">Room: 204-B</text>
            <text className="map-text" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">Capacity: 6</text>
            {this.state.roomAvailabile['204B'] ? this.getCheckMarkSVG("12%", "12%", "23%", "60%") : this.getXCircleSVG("12%", "12%", "23%", "60%")}
            <text className="map-text" x="58%" y="67%" dominantBaseline="middle" textAnchor="middle">{this.state.roomAvailabile['204B'] ? 'Available' : 'Unavailable'}</text>
          </svg>
          <svg  className={this.state.roomAvailabile['205'] ? 'map-available-room clickable' : 'map-unavailable-room clickable'} id="map-room-204A" x="880" y="0" width="200" height="200" onClick={() => this.mapRoomClicked('205')}>
            <rect width="100%" height="100%" className={this.state.roomAvailabile['205'] ? 'map-available-room-background' : 'map-unavailable-room-background'} fille='none' stroke="#000000" pointerEvents="all"/>
            <text className="map-text" x="50%" y="40%" dominantBaseline="middle" textAnchor="middle">Room: 205</text>
            <text className="map-text" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">Capacity: 4</text>
            {this.state.roomAvailabile['205'] ? this.getCheckMarkSVG("12%", "12%", "21%", "60%") : this.getXCircleSVG("12%", "12%", "21%", "60%")}
            <text className="map-text" x="57%" y="67%" dominantBaseline="middle" textAnchor="middle">{this.state.roomAvailabile['205'] ? 'Available' : 'Unavailable'}</text>
          </svg>
          <svg className="map-staris map-stairs-left" x="0" y="0" width="200" height="320" >
            <rect width="100%" height="100%" className='map-mes-office' fill="#ddd" stroke="#000000" pointerEvents="all"/>
            <text className="map-text" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">MES Office</text>
          </svg>
          <svg className="map-staris map-stairs-right" x="0" y="320" width="200" height="80" >
            <svg x="15%" y="25%" width="40%" height="40%" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="walking" className="svg-inline--fa fa-walking fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M208 96c26.5 0 48-21.5 48-48S234.5 0 208 0s-48 21.5-48 48 21.5 48 48 48zm94.5 149.1l-23.3-11.8-9.7-29.4c-14.7-44.6-55.7-75.8-102.2-75.9-36-.1-55.9 10.1-93.3 25.2-21.6 8.7-39.3 25.2-49.7 46.2L17.6 213c-7.8 15.8-1.5 35 14.2 42.9 15.6 7.9 34.6 1.5 42.5-14.3L81 228c3.5-7 9.3-12.5 16.5-15.4l26.8-10.8-15.2 60.7c-5.2 20.8.4 42.9 14.9 58.8l59.9 65.4c7.2 7.9 12.3 17.4 14.9 27.7l18.3 73.3c4.3 17.1 21.7 27.6 38.8 23.3 17.1-4.3 27.6-21.7 23.3-38.8l-22.2-89c-2.6-10.3-7.7-19.9-14.9-27.7l-45.5-49.7 17.2-68.7 5.5 16.5c5.3 16.1 16.7 29.4 31.7 37l23.3 11.8c15.6 7.9 34.6 1.5 42.5-14.3 7.7-15.7 1.4-35.1-14.3-43zM73.6 385.8c-3.2 8.1-8 15.4-14.2 21.5l-50 50.1c-12.5 12.5-12.5 32.8 0 45.3s32.7 12.5 45.2 0l59.4-59.4c6.1-6.1 10.9-13.4 14.2-21.5l13.5-33.8c-55.3-60.3-38.7-41.8-47.4-53.7l-20.7 51.5z"></path></svg>
            <text className="map-text" x="55%" y="50%" dominantBaseline="middle" textAnchor="middle">Stairs</text>
            <rect width="100%" height="100%" fill="none" stroke="#000000" pointerEvents="all"/>
          </svg>
          <svg className="map-staris map-stairs-left" x="1080" y="400" width="200" height="80">
            <svg x="15%" y="25%" width="40%" height="40%" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="walking" className="svg-inline--fa fa-walking fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M208 96c26.5 0 48-21.5 48-48S234.5 0 208 0s-48 21.5-48 48 21.5 48 48 48zm94.5 149.1l-23.3-11.8-9.7-29.4c-14.7-44.6-55.7-75.8-102.2-75.9-36-.1-55.9 10.1-93.3 25.2-21.6 8.7-39.3 25.2-49.7 46.2L17.6 213c-7.8 15.8-1.5 35 14.2 42.9 15.6 7.9 34.6 1.5 42.5-14.3L81 228c3.5-7 9.3-12.5 16.5-15.4l26.8-10.8-15.2 60.7c-5.2 20.8.4 42.9 14.9 58.8l59.9 65.4c7.2 7.9 12.3 17.4 14.9 27.7l18.3 73.3c4.3 17.1 21.7 27.6 38.8 23.3 17.1-4.3 27.6-21.7 23.3-38.8l-22.2-89c-2.6-10.3-7.7-19.9-14.9-27.7l-45.5-49.7 17.2-68.7 5.5 16.5c5.3 16.1 16.7 29.4 31.7 37l23.3 11.8c15.6 7.9 34.6 1.5 42.5-14.3 7.7-15.7 1.4-35.1-14.3-43zM73.6 385.8c-3.2 8.1-8 15.4-14.2 21.5l-50 50.1c-12.5 12.5-12.5 32.8 0 45.3s32.7 12.5 45.2 0l59.4-59.4c6.1-6.1 10.9-13.4 14.2-21.5l13.5-33.8c-55.3-60.3-38.7-41.8-47.4-53.7l-20.7 51.5z"></path></svg>
            <text className="map-text" x="55%" y="50%" dominantBaseline="middle" textAnchor="middle">Stairs</text>
            <rect width="100%" height="100%" fill="none" stroke="#000000" pointerEvents="all"/>
          </svg>
          <svg className="map-washroom map-left-washroom" x="1080" y="560" width="100" height="80">
            <rect width="100%" height="100%" fill="none" stroke="#000000" pointerEvents="all"/>
            <svg aria-hidden="true" x="30%" y="20%" width="40%" height="40%" focusable="false" data-prefix="fas" data-icon="restroom" className="svg-inline--fa fa-restroom fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#000" d="M128 128c35.3 0 64-28.7 64-64S163.3 0 128 0 64 28.7 64 64s28.7 64 64 64zm384 0c35.3 0 64-28.7 64-64S547.3 0 512 0s-64 28.7-64 64 28.7 64 64 64zm127.3 226.5l-45.6-185.8c-3.3-13.5-15.5-23-29.8-24.2-15 9.7-32.8 15.5-52 15.5-19.2 0-37-5.8-52-15.5-14.3 1.2-26.5 10.7-29.8 24.2l-45.6 185.8C381 369.6 393 384 409.2 384H464v104c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24V384h54.8c16.2 0 28.2-14.4 24.5-29.5zM336 0h-32c-8.8 0-16 7.2-16 16v480c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16zM180.1 144.4c-15 9.8-32.9 15.6-52.1 15.6-19.2 0-37.1-5.8-52.1-15.6C51.3 146.5 32 166.9 32 192v136c0 13.3 10.7 24 24 24h8v136c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V352h8c13.3 0 24-10.7 24-24V192c0-25.1-19.3-45.5-43.9-47.6z"></path></svg>
            <text className="map-text" x="50%" y="80%" dominantBaseline="middle" textAnchor="middle">Restroom</text>
          </svg>
          <svg className="map-washroom map-right-washroom" x="1180" y="560" width="100" height="80">
            <rect width="100%" height="100%" fill="none" stroke="#000000" pointerEvents="all"/>
            <svg aria-hidden="true" x="30%" y="20%" width="40%" height="40%" focusable="false" data-prefix="fas" data-icon="restroom" className="svg-inline--fa fa-restroom fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#000" d="M128 128c35.3 0 64-28.7 64-64S163.3 0 128 0 64 28.7 64 64s28.7 64 64 64zm384 0c35.3 0 64-28.7 64-64S547.3 0 512 0s-64 28.7-64 64 28.7 64 64 64zm127.3 226.5l-45.6-185.8c-3.3-13.5-15.5-23-29.8-24.2-15 9.7-32.8 15.5-52 15.5-19.2 0-37-5.8-52-15.5-14.3 1.2-26.5 10.7-29.8 24.2l-45.6 185.8C381 369.6 393 384 409.2 384H464v104c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24V384h54.8c16.2 0 28.2-14.4 24.5-29.5zM336 0h-32c-8.8 0-16 7.2-16 16v480c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16zM180.1 144.4c-15 9.8-32.9 15.6-52.1 15.6-19.2 0-37.1-5.8-52.1-15.6C51.3 146.5 32 166.9 32 192v136c0 13.3 10.7 24 24 24h8v136c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V352h8c13.3 0 24-10.7 24-24V192c0-25.1-19.3-45.5-43.9-47.6z"></path></svg>
            <text className="map-text" x="50%" y="80%" dominantBaseline="middle" textAnchor="middle">Restroom</text>
          </svg>
          <rect x="1080" y="0" width="200" height="400" fill="#000" stroke="#000000" pointerEvents="all"/>
          <rect x="1080" y="480" width="200" height="80" fill="#000" stroke="#000000" pointerEvents="all"/>
          <rect x="0" y="600" width="960" height="120" fill="#000" stroke="#000000" pointerEvents="all"/>
          <rect x="800" y="360" width="200" height="160" fill="#000000" stroke="#000000" pointerEvents="all"/>
          <rect x="620" y="450" width="40" height="40" fill="#000000" stroke="#000000" pointerEvents="all"/>
          <rect x="680" y="390" width="40" height="100" fill="#000000" stroke="#000000" pointerEvents="all"/>
          <rect x="560" y="390" width="40" height="100" fill="#000000" stroke="#000000" pointerEvents="all"/>
          <rect x="600" y="390" width="80" height="40" fill="#000000" stroke="#000000" pointerEvents="all"/>
          <rect x="380" y="450" width="40" height="40" fill="#000000" stroke="#000000" pointerEvents="all"/>
          <rect x="440" y="390" width="40" height="100" fill="#000000" stroke="#000000" pointerEvents="all"/>
          <rect x="320" y="390" width="40" height="100" fill="#000000" stroke="#000000" pointerEvents="all"/>
          <rect x="360" y="390" width="80" height="40" fill="#000000" stroke="#000000" pointerEvents="all"/>
        </g>
      </svg>
    const verticalMap = 
      <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" version="1.1" width="auto" height="auto" viewBox="-0.5 -0.5 722 1282" id="floor-outline"><defs/>
        <g>
          <rect x="0" y="0" height="1280" width="720" className='map-outline' fill="none" stroke="#000000" pointerEvents="all"/>
          <svg  className={this.state.roomAvailabile['201'] ? 'map-available-room clickable' : 'map-unavailable-room clickable'} id="map-room-201" y="0" x="120" width="200" height="200" >
            <rect width="100%" height="100%" className={this.state.roomAvailabile['201'] ? 'map-available-room-background' : 'map-unavailable-room-background'} fille='none' stroke="#000000" pointerEvents="all"/>
            <text className="map-text" x="50%" y="30%" dominantBaseline="middle" textAnchor="middle">Room: 201</text>
            <text className="map-text" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">Capacity: 6</text>
            {this.state.roomAvailabile['201'] ? this.getCheckMarkSVG("22%", "22%", "5%", "60%") : this.getXCircleSVG("22%", "22%", "5%", "60%")}
            <text className="map-text" x="59%" y="73%" dominantBaseline="middle" textAnchor="middle">{this.state.roomAvailabile['201'] ? 'Available' : 'Unavailable'}</text>
          </svg>
          <svg  className={this.state.roomAvailabile['203'] ? 'map-available-room clickable' : 'map-unavailable-room clickable'} id="map-room-203" y="200" x="520" width="200" height="200" >
            <rect width="100%" height="100%" className={this.state.roomAvailabile['203'] ? 'map-available-room-background' : 'map-unavailable-room-background'} fille='none' stroke="#000000" pointerEvents="all"/>
            <text className="map-text" x="50%" y="30%" dominantBaseline="middle" textAnchor="middle">Room: 203</text>
            <text className="map-text" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">Capacity: 4</text>
            {this.state.roomAvailabile['203'] ? this.getCheckMarkSVG("22%", "22%", "5%", "60%") : this.getXCircleSVG("22%", "22%", "5%", "60%")}
            <text className="map-text" x="59%" y="73%" dominantBaseline="middle" textAnchor="middle">{this.state.roomAvailabile['203'] ? 'Available' : 'Unavailable'}</text>
          </svg>
          <svg  className={this.state.roomAvailabile['204A'] ? 'map-available-room clickable' : 'map-unavailable-room clickable'} id="map-room-204A" y="400" x="440" height="240" width="280" >
            <rect width="100%" height="100%" className={this.state.roomAvailabile['204A'] ? 'map-available-room-background' : 'map-unavailable-room-background'} fille='none' stroke="#000000" pointerEvents="all"/>
            <text className="map-text" x="50%" y="30%" dominantBaseline="middle" textAnchor="middle">Room: 204-A</text>
            <text className="map-text" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">Capacity: 6</text>
            {this.state.roomAvailabile['204A'] ? this.getCheckMarkSVG("22%", "22%", "5%", "60%") : this.getXCircleSVG("22%", "22%", "5%", "60%")}
            <text className="map-text" x="59%" y="73%" dominantBaseline="middle" textAnchor="middle">{this.state.roomAvailabile['204A'] ? 'Available' : 'Unavailable'}</text>
          </svg>
          <svg  className={this.state.roomAvailabile['204B'] ? 'map-available-room clickable' : 'map-unavailable-room clickable'} id="map-room-204A" y="640" x="440" height="240" width="280" >
            <rect width="100%" height="100%" className={this.state.roomAvailabile['204B'] ? 'map-available-room-background' : 'map-unavailable-room-background'} fille='none' stroke="#000000" pointerEvents="all"/>
            <text className="map-text" x="50%" y="30%" dominantBaseline="middle" textAnchor="middle">Room: 204-B</text>
            <text className="map-text" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">Capacity: 6</text>
            {this.state.roomAvailabile['204B'] ? this.getCheckMarkSVG("22%", "22%", "5%", "60%") : this.getXCircleSVG("22%", "22%", "5%", "60%")}
            <text className="map-text" x="59%" y="73%" dominantBaseline="middle" textAnchor="middle">{this.state.roomAvailabile['204B'] ? 'Available' : 'Unavailable'}</text>
          </svg>
          <svg  className={this.state.roomAvailabile['205'] ? 'map-available-room clickable' : 'map-unavailable-room clickable'} id="map-room-204A" y="880" x="520" width="200" height="200" >
            <rect width="100%" height="100%" className={this.state.roomAvailabile['205'] ? 'map-available-room-background' : 'map-unavailable-room-background'} fille='none' stroke="#000000" pointerEvents="all"/>
            <text className="map-text" x="50%" y="30%" dominantBaseline="middle" textAnchor="middle">Room: 205</text>
            <text className="map-text" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">Capacity: 4</text>
            {this.state.roomAvailabile['205'] ? this.getCheckMarkSVG("22%", "22%", "5%", "60%") : this.getXCircleSVG("22%", "22%", "5%", "60%")}
            <text className="map-text" x="59%" y="73%" dominantBaseline="middle" textAnchor="middle">{this.state.roomAvailabile['205'] ? 'Available' : 'Unavailable'}</text>
          </svg>
          <svg className="map-staris map-stairs-left" y="0" x="400" height="200" width="320" >
            <rect width="100%" height="100%" className='map-mes-office' fill="#ddd" stroke="#000000" pointerEvents="all"/>
            <text className="map-text" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">MES Office</text>
          </svg>
          <svg className="map-staris map-stairs-right" y="0" x="320" height="200" width="80" >
            <svg x="36%" y="20%" width="30%" height="30%" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="walking" className="svg-inline--fa fa-walking fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M208 96c26.5 0 48-21.5 48-48S234.5 0 208 0s-48 21.5-48 48 21.5 48 48 48zm94.5 149.1l-23.3-11.8-9.7-29.4c-14.7-44.6-55.7-75.8-102.2-75.9-36-.1-55.9 10.1-93.3 25.2-21.6 8.7-39.3 25.2-49.7 46.2L17.6 213c-7.8 15.8-1.5 35 14.2 42.9 15.6 7.9 34.6 1.5 42.5-14.3L81 228c3.5-7 9.3-12.5 16.5-15.4l26.8-10.8-15.2 60.7c-5.2 20.8.4 42.9 14.9 58.8l59.9 65.4c7.2 7.9 12.3 17.4 14.9 27.7l18.3 73.3c4.3 17.1 21.7 27.6 38.8 23.3 17.1-4.3 27.6-21.7 23.3-38.8l-22.2-89c-2.6-10.3-7.7-19.9-14.9-27.7l-45.5-49.7 17.2-68.7 5.5 16.5c5.3 16.1 16.7 29.4 31.7 37l23.3 11.8c15.6 7.9 34.6 1.5 42.5-14.3 7.7-15.7 1.4-35.1-14.3-43zM73.6 385.8c-3.2 8.1-8 15.4-14.2 21.5l-50 50.1c-12.5 12.5-12.5 32.8 0 45.3s32.7 12.5 45.2 0l59.4-59.4c6.1-6.1 10.9-13.4 14.2-21.5l13.5-33.8c-55.3-60.3-38.7-41.8-47.4-53.7l-20.7 51.5z"></path></svg>
            <text className="map-text" x="50%" y="60%" dominantBaseline="middle" textAnchor="middle">Stairs</text>
            <rect width="100%" height="100%" fill="none" stroke="#000000" pointerEvents="all"/>
          </svg>
          <svg className="map-staris map-stairs-left" y="1080" x="240" height="200" width="80">
            <svg x="36%" y="20%" width="30%" height="30%" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="walking" className="svg-inline--fa fa-walking fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M208 96c26.5 0 48-21.5 48-48S234.5 0 208 0s-48 21.5-48 48 21.5 48 48 48zm94.5 149.1l-23.3-11.8-9.7-29.4c-14.7-44.6-55.7-75.8-102.2-75.9-36-.1-55.9 10.1-93.3 25.2-21.6 8.7-39.3 25.2-49.7 46.2L17.6 213c-7.8 15.8-1.5 35 14.2 42.9 15.6 7.9 34.6 1.5 42.5-14.3L81 228c3.5-7 9.3-12.5 16.5-15.4l26.8-10.8-15.2 60.7c-5.2 20.8.4 42.9 14.9 58.8l59.9 65.4c7.2 7.9 12.3 17.4 14.9 27.7l18.3 73.3c4.3 17.1 21.7 27.6 38.8 23.3 17.1-4.3 27.6-21.7 23.3-38.8l-22.2-89c-2.6-10.3-7.7-19.9-14.9-27.7l-45.5-49.7 17.2-68.7 5.5 16.5c5.3 16.1 16.7 29.4 31.7 37l23.3 11.8c15.6 7.9 34.6 1.5 42.5-14.3 7.7-15.7 1.4-35.1-14.3-43zM73.6 385.8c-3.2 8.1-8 15.4-14.2 21.5l-50 50.1c-12.5 12.5-12.5 32.8 0 45.3s32.7 12.5 45.2 0l59.4-59.4c6.1-6.1 10.9-13.4 14.2-21.5l13.5-33.8c-55.3-60.3-38.7-41.8-47.4-53.7l-20.7 51.5z"></path></svg>
            <text className="map-text" x="50%" y="60%" dominantBaseline="middle" textAnchor="middle">Stairs</text>
            <rect width="100%" height="100%" fill="none" stroke="#000000" pointerEvents="all"/>
          </svg>
          <svg className="map-washroom map-left-washroom" y="1080" x="80" height="100" width="80">
            <rect width="100%" height="100%" fill="none" stroke="#000000" pointerEvents="all"/>
            <svg aria-hidden="true" x="30%" y="20%" width="40%" height="40%" focusable="false" data-prefix="fas" data-icon="restroom" className="svg-inline--fa fa-restroom fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#000" d="M128 128c35.3 0 64-28.7 64-64S163.3 0 128 0 64 28.7 64 64s28.7 64 64 64zm384 0c35.3 0 64-28.7 64-64S547.3 0 512 0s-64 28.7-64 64 28.7 64 64 64zm127.3 226.5l-45.6-185.8c-3.3-13.5-15.5-23-29.8-24.2-15 9.7-32.8 15.5-52 15.5-19.2 0-37-5.8-52-15.5-14.3 1.2-26.5 10.7-29.8 24.2l-45.6 185.8C381 369.6 393 384 409.2 384H464v104c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24V384h54.8c16.2 0 28.2-14.4 24.5-29.5zM336 0h-32c-8.8 0-16 7.2-16 16v480c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16zM180.1 144.4c-15 9.8-32.9 15.6-52.1 15.6-19.2 0-37.1-5.8-52.1-15.6C51.3 146.5 32 166.9 32 192v136c0 13.3 10.7 24 24 24h8v136c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V352h8c13.3 0 24-10.7 24-24V192c0-25.1-19.3-45.5-43.9-47.6z"></path></svg>
            <text x="50%" y="80%" dominantBaseline="middle" textAnchor="middle">Restroom</text>
          </svg>
          <svg className="map-washroom map-right-washroom" y="1180" x="80" height="100" width="80">
            <rect width="100%" height="100%" fill="none" stroke="#000000" pointerEvents="all"/>
            <svg aria-hidden="true" x="30%" y="20%" width="40%" height="40%" focusable="false" data-prefix="fas" data-icon="restroom" className="svg-inline--fa fa-restroom fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#000" d="M128 128c35.3 0 64-28.7 64-64S163.3 0 128 0 64 28.7 64 64s28.7 64 64 64zm384 0c35.3 0 64-28.7 64-64S547.3 0 512 0s-64 28.7-64 64 28.7 64 64 64zm127.3 226.5l-45.6-185.8c-3.3-13.5-15.5-23-29.8-24.2-15 9.7-32.8 15.5-52 15.5-19.2 0-37-5.8-52-15.5-14.3 1.2-26.5 10.7-29.8 24.2l-45.6 185.8C381 369.6 393 384 409.2 384H464v104c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24V384h54.8c16.2 0 28.2-14.4 24.5-29.5zM336 0h-32c-8.8 0-16 7.2-16 16v480c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16zM180.1 144.4c-15 9.8-32.9 15.6-52.1 15.6-19.2 0-37.1-5.8-52.1-15.6C51.3 146.5 32 166.9 32 192v136c0 13.3 10.7 24 24 24h8v136c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V352h8c13.3 0 24-10.7 24-24V192c0-25.1-19.3-45.5-43.9-47.6z"></path></svg>
            <text x="50%" y="80%" dominantBaseline="middle" textAnchor="middle">Restroom</text>
          </svg>
          <rect y="1080" x="320" height="200" width="400" fill="#000" stroke="#000000" pointerEvents="all"/>
          <rect y="1080" x="160" height="200" width="80" fill="#000" stroke="#000000" pointerEvents="all"/>
          <rect y="0" x="0" height="960" width="120" fill="#000" stroke="#000000" pointerEvents="all"/>
          <rect y="800" x="200" height="200" width="160" fill="#000000" stroke="#000000" pointerEvents="all"/>
          <rect y="620" x="230" height="40" width="40" fill="#000000" stroke="#000000" pointerEvents="all"/>
          <rect y="680" x="230" height="40" width="100" fill="#000000" stroke="#000000" pointerEvents="all"/>
          <rect y="560" x="230" height="40" width="100" fill="#000000" stroke="#000000" pointerEvents="all"/>
          <rect y="600" x="290" height="80" width="40" fill="#000000" stroke="#000000" pointerEvents="all"/>
          <rect y="380" x="230" height="40" width="40" fill="#000000" stroke="#000000" pointerEvents="all"/>
          <rect y="440" x="230" height="40" width="100" fill="#000000" stroke="#000000" pointerEvents="all"/>
          <rect y="320" x="230" height="40" width="100" fill="#000000" stroke="#000000" pointerEvents="all"/>
          <rect y="360" x="290" height="80" width="40" fill="#000000" stroke="#000000" pointerEvents="all"/>
        </g>
      </svg>
    return (
      <Container alignItems="center">
        <Typography align="center" variant='h2' gutterBottom>Book a Room</Typography>
        <Typography align="center" variant='body2' gutterBottom >To get started, select a date and time then click on an available room.</Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-evenly">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={this.state.selectedDate}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              variant="inline"
              value={this.state.selectedDate}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        {this.props.isMobile ? verticalMap : horizontalMap}
      </Container>
    )
  }
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 720,
})

export default withSizes(mapSizesToProps)(BookRoom);
