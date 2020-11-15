import React from 'react';
import './Bookings.css';
import { 
  Button, 
  Container, 
  Typography, 
  TableContainer, 
  Table, 
  TableHead, 
  TableBody, 
  TableCell, 
  Paper, 
  TableRow, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions, 
  TextField,
  Select,
  InputLabel,
  MenuItem
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: this.props.bookings,
      teams: this.props.teams,
      showDialog: false,
      nameInputField: "",
      selectedTeamId: "",
      editing: false,
      editId: 0,
    };
    this.handleClose = this.handleClose.bind(this);
    this.showDialog = this.showDialog.bind(this);
    this.goToEditBooking = this.goToEditBooking.bind(this);
    this.goToNewBooking = this.goToNewBooking.bind(this);
    this.deleteMeeting = this.deleteMeeting.bind(this);
    this.saveEditChanges = this.saveEditChanges.bind(this);
  }

  getNameTeamWithID(teamID) {
    for (var i = 0; i < this.state.teams.length; i++) {
      if (this.state.teams[i]['id'] === teamID) {
        return this.state.teams[i]['name'];
      }
    }
  }

  handleClose() {
    this.setState({
      nameInputField: "",
      selectedTeamId: "",
      showDialog: false,
      editing: false,
      editId: null
    })
  }

  handleModalChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  showDialog() {
    this.setState({ showDialog: true })
  }

  goToNewBooking(){
    if (!this.state.selectedTeamId || !this.state.nameInputField){
      alert("Please fill out both the team ID and meeting name.")
    }else{
      this.handleClose()
      this.props.goToBooking(this.state.selectedTeamId, this.state.nameInputField, false, 0)
    }
  }

  goToEditBooking(){
    if (!this.state.selectedTeamId || !this.state.nameInputField){
      alert("Please fill out both the team ID and meeting name.")
    }else{
      this.handleClose()
      this.props.goToBooking(this.state.selectedTeamId, this.state.nameInputField, true, this.state.editId)
    }
  }

  saveEditChanges(){
    if (!this.state.selectedTeamId || !this.state.nameInputField){
      alert("Please fill out both the team ID and meeting name.")
    }else{
      var bookings = this.state.bookings;
      for(var i = 0; i < bookings.length; i++){
        if(bookings[i]['bookingId'] === this.state.editId){
          bookings[i]['name'] = this.state.nameInputField;
          bookings[i]['teamId'] = this.state.selectedTeamId;
          break;
        }
      }
      console.log(bookings)
      this.setState({
        bookings: bookings
      })
      this.handleClose()
    }
  }

  edit(bookingId){
    const editBooking = this.state.bookings.find(b => b.bookingId === bookingId);
    console.log(editBooking)
    this.setState({
      nameInputField: editBooking.name,
      selectedTeamId: editBooking.teamId,
      editing: true,
      editId: bookingId,
      showDialog: true
    });
  }

  deleteMeeting(bookingId){
    const removedBooking = this.state.bookings.find(b => b.bookingId === bookingId);
    const bookings = this.state.bookings.filter(b => b.bookingId !== bookingId);
    this.setState({
      bookings: bookings
    });
    this.props.updateBookings(bookings);
    this.props.toggleRoomAvailability(removedBooking.year, removedBooking.month, removedBooking.day, removedBooking.time, removedBooking.room);
  }

  render() {
    return (
      <>
        <Container style={{ textAlign: 'center' }}>
          <Typography align="center" variant='h2' gutterBottom>Bookings</Typography>
          <Button className='member-action' onClick={this.showDialog}>Book a Meeting</Button>
          <Typography align="center" variant='body2' gutterBottom >See all of your bookings below. To modify a booking, click the pencil icon. To delete a booking. select the trash can icon.</Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Meeting - Team (Room)</TableCell>
                  <TableCell align="center">Date (MM/DD/YYYY)</TableCell>
                  <TableCell align="center">Time (24 Hours)</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.bookings.map((row) => (
                  <TableRow key={row.bookingId}>
                    <TableCell component="th" scope="row">
                      {row.name} - {this.getNameTeamWithID(row.teamId)} ({row.room})
                  </TableCell>
                    <TableCell align="center">{row.month}/{row.day}/{row.year}</TableCell>
                    <TableCell align="center">{row.time.slice(0, -2)}:{row.time.slice(-2)}</TableCell>
                    <TableCell align="center"><CreateIcon id='editIcon' onClick={() => this.edit(row.bookingId)} /><DeleteIcon key={row.bookingId} id='deleteIcon' onClick={() => this.deleteMeeting(row.bookingId)} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
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
              value={this.state.nameInputField}
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
            <Button onClick={this.handleClose} className='cancel-button'>
              Cancel
          </Button>
          {this.state.editing ? <Button onClick={this.saveEditChanges} className='save-button'>Save Change</Button> : ''}
          {this.state.editing ? <Button onClick={this.goToEditBooking} className='save-button'>Modify Room</Button> : <Button onClick={this.goToNewBooking} className='save-button'>Book Room</Button>}
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

export default Bookings;
