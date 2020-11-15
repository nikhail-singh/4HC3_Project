import React from 'react';
import './CreateTeamPopup.css';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    FormControl,
    FormLabel,
    Radio,
    RadioGroup,
    FormControlLabel,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Select,
    MenuItem
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

class CreateTeamPopup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            team: {
                name: "",
                description: "",
                privacy: "",
                members: [],
            },
            error: false,
            title: "Create Team"
        }
        this.addMemberButtonRef = React.createRef();
    }

    addNewMember() {
        var team = this.state.team;
        team.members.push({
            name: "",
            email: "",
            role: "Member"
        })
        this.setState({
            team: team
        })

    }

    handleRemoveMember(event) {
        const removeIndex = event.currentTarget.getAttribute('data-key');

        var team = this.state.team;
        team.members.splice(removeIndex, 1);

        this.setState({
            team: team
        })
    }


    createTeam() {
        var team = this.state.team;
        var incompleteMembers = [...team.members]
        incompleteMembers.filter(member =>
            !(member.name && member.email))
        if (!team.name || incompleteMembers.length !== 0) {
            this.setState({
                error: true
            })
        }
        else {
            this.props.save(this.state.team);
        }
        this.setState({
            team: {
                name: "",
                description: "",
                privacy: "",
                members: [],
            },
            error: false
        });
    }

    cancelChanges() {
        this.setState({
            team: {
                name: "",
                description: "",
                privacy: "",
                members: [],
            },
            error: false
        });
        this.props.close();
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                className="create-team-popup"
                fullWidth={true}
                maxWidth="lg">
                <DialogTitle>{this.state.title}</DialogTitle>
                <DialogContent>
                    <TextField
                        className="text-input"
                        label="Team Name:"
                        variant="outlined"
                        defaultValue={this.state.team.name}
                        error={!this.state.team.name && this.state.error}
                        helperText="Required Field"
                        onChange={(event) => {
                            var team = this.state.team;
                            team.name = event.target.value;
                            this.setState({ team: team })
                        }}
                    />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Is the team public or private?</FormLabel>
                        <RadioGroup
                            defaultValue={this.state.team.privacy ? this.state.team.privacy : "public"}
                            onChange={(event) => {
                                var team = this.state.team;
                                team.privacy = event.target.value;
                                this.setState({ team: team })
                            }}
                        >
                            <FormControlLabel value="public" control={<Radio color="default" />} label="Public" />
                            <FormControlLabel value="private" control={<Radio color="default" />} label="Private" />
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        className="text-input"
                        label="Team Description:"
                        variant="outlined"
                        multiline
                        rows={4}
                        defaultValue={this.state.team.description}
                        onChange={(event) => {
                            var team = this.state.team;
                            team.description = event.target.value;
                            this.setState({ team: team })
                        }} />
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="center">Role</TableCell>
                                    <TableCell align="center">Email</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.team.members.map((member, index) =>
                                    <TableRow key={"row" + index + member.name}>
                                        <TableCell component="th" scope="row">
                                            <TextField
                                                defaultValue={member.name}
                                                error={!member.name && this.state.error}
                                                helperText="Required Field"
                                                placeholder="Input Name..."
                                                variant="outlined"
                                                onChange={(event) => member.name = event.target.value}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Select onChange={(e) => {
                                                var team = this.state.team;
                                                team.members[index].role = e.target.value;
                                                this.setState({
                                                    team: team
                                                });
                                            }
                                            }
                                                className="role-select"
                                                defaultValue={member.role ? member.role : "Member"}>
                                                <MenuItem value={"Admin"}>Admin</MenuItem>
                                                <MenuItem value={"Moderator"}>Moderator</MenuItem>
                                                <MenuItem value={"Member"}>Member</MenuItem>
                                            </Select>
                                        </TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                defaultValue={member.email}
                                                error={!member.email && this.state.error}
                                                helperText="Required Field"
                                                placeholder="Input Email..."
                                                variant="outlined"
                                                onChange={(event) => member.email = event.target.value}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                data-key={index}
                                                color="default"
                                                startIcon={<ClearIcon />}
                                                onClick={this.handleRemoveMember.bind(this)}
                                            >
                                                Remove
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )}

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button
                        onClick={this.addNewMember.bind(this)}
                        className="add-member-button"
                        variant="outlined"
                    >Add New Member</Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.cancelChanges.bind(this)} className="cancel-button">
                        Cancel
                    </Button>
                    <Button onClick={this.createTeam.bind(this)} className="save-button">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default CreateTeamPopup;

