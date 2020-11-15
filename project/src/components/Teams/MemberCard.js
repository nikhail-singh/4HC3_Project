import React from 'react';
import './MemberCard.css';
import {
    Avatar,
    Typography,
    Button,
    Card,
    CardContent,
    CardActions,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    TextField,
    Select,
    MenuItem,
    InputLabel
} from '@material-ui/core';
import { shortName } from './Utils';
class MemberCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editPopupOpen: false,
            member: {...this.props.member}
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.member !== this.props.member) {
            this.setState({ member: {...this.props.member} });
        }
    }
    
    openEditPopup() {
        this.setState({
            editPopupOpen: true
        });
    }

    closeEditPopup() {
        this.setState({
            editPopupOpen: false,
            member: {...this.props.member}
        });
    }

    saveEditPopup() {
        const index = this.props.memberTotal.indexOf(this.props.member);
        this.props.editMember(this.state.member, index);
        this.closeEditPopup();
    }

    render() {
        return (
            <div>
                <Card className="member-card">
                    <Avatar className="member-avatar">{shortName(this.props.member.name)}</Avatar>
                    <CardContent>
                        <Typography className="member-name" gutterBottom variant="h5" component="h2">
                            {this.props.member.name}
                        </Typography>
                    </CardContent>

                    <CardActions>
                        <Button className="member-action"><a href={"mailto:" + this.props.member.email}>Contact</a></Button>
                        <Button className="member-action" onClick={this.openEditPopup.bind(this)}>Edit</Button>
                    </CardActions>
                </Card>
                <Dialog
                    open={this.state.editPopupOpen}
                    fullWidth={true}
                    maxWidth="sm">
                    <DialogTitle>Edit Member</DialogTitle>
                    <DialogContent>
                        <Avatar className="member-avatar-popup">{shortName(this.state.member.name)}</Avatar>

                        <InputLabel>Name:</InputLabel>
                        <TextField
                            className="text-input"
                            variant="outlined"
                            defaultValue={this.state.member.name}
                            onChange={(event) => {
                                var member = this.state.member;
                                member.name = event.target.value;
                                this.setState({ member: member });
                            }}
                        />

                        <InputLabel id="role-label">Role:</InputLabel>
                        <Select
                            className="role-select-popup"
                            labelId="role-label"
                            variant="outlined"
                            defaultValue={this.state.member.role}
                            onChange={(event) => {
                                var member = this.state.member;
                                member.role = event.target.value;
                                this.setState({ member: member });
                            }}>
                            <MenuItem value={"Admin"}>Admin</MenuItem>
                            <MenuItem value={"Moderator"}>Moderator</MenuItem>
                            <MenuItem value={"Member"}>Member</MenuItem>
                        </Select>

                        <InputLabel id="role-label">Email:</InputLabel>
                        <TextField
                            className="text-input"
                            variant="outlined"
                            defaultValue={this.state.member.email}
                            onChange={(event) => {
                                var member = this.state.member;
                                member.email = event.target.value;
                                this.setState({ member: member });
                            }}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeEditPopup.bind(this)} className="cancel-button">
                            Cancel
                        </Button>
                        <Button onClick={this.saveEditPopup.bind(this)} className="save-button">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default MemberCard;