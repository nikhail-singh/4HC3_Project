import React from 'react';
import './InfoEditPopup.css';
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

class InfoEditPopup extends React.Component {
    constructor(props) {
        super(props)
        var members = this.props.team.members.slice()
        this.state = {
            team: {...this.props.team, members: members},
            edit: this.props.edit,
            title: this.props.title,
            error: false,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.team !== this.props.team) {
            var members = this.props.team.members.slice();
            this.setState({ team: {...this.props.team, members: members} });
        }
    }

    addNewMember() {
        var team = {...this.state.team};
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

        var team = {...this.state.team};
        team.members.splice(removeIndex, 1);

        this.setState({
            team: team
        })
    }

    cancelChanges() {
        this.setState({
            team: {...this.props.team},
            error: false
        });
        this.props.close();
    }

    saveChanges() {
        var team = {...this.state.team};
        const incompleteMembers = team.members.filter(member =>
            !(member.name && member.email)).length
        if (!team.name || incompleteMembers !== 0) {
            this.setState({
                error: true
            })
        }
        else {
            this.props.save(this.state.team);
            this.setState({
                team: {...this.props.team},
                error: false
            });
        }
    }

    render() {
        return (
            <Dialog key={this.props.team}
                open={this.props.open}
                className="create-team-popup"
                fullWidth={true}
                maxWidth="lg">
                <DialogTitle>{this.props.title}</DialogTitle>
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
                        InputProps={{
                            readOnly: !this.props.edit,
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
                            className="privacy-selection"
                        >
                            <FormControlLabel value="public" control={<Radio color="default" />} label="Public" disabled={!this.props.edit} />
                            <FormControlLabel value="private" control={<Radio color="default" />} label="Private" disabled={!this.props.edit} />
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        className="text-input"
                        label="Team Description:"
                        variant="outlined"
                        multiline
                        rows={2}
                        defaultValue={this.state.team.description}
                        onChange={(event) => {
                            var team = this.state.team;
                            team.description = event.target.value;
                            this.setState({ team: team })
                        }}
                        InputProps={{
                            readOnly: !this.props.edit,
                        }} />
                    <TableContainer className="table" component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="cell">Name</TableCell>
                                    <TableCell className="cell" align="center">Role</TableCell>
                                    <TableCell className="cell" align="center">Email</TableCell>
                                    <TableCell className="cell" align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody key={this.state.team.members.length}>
                                {this.state.team.members.map((member, index) =>
                                    <TableRow key={"row" + index}>
                                        <TableCell className="cell" component="th" scope="row">
                                            <TextField
                                                defaultValue={member.name}
                                                error={!member.name && this.state.error}
                                                helperText="Required Field"
                                                placeholder="Input Name..."
                                                variant="outlined"
                                                onChange={(event) => member.name = event.target.value}
                                            />
                                        </TableCell>
                                        <TableCell className="cell" align="center">
                                            <Select onChange={(e) => {
                                                var team = this.state.team;
                                                team.members[index].role = e.target.value;
                                                this.setState({
                                                    team: team
                                                });
                                            }
                                            }
                                                className="role-select"
                                                variant="outlined"
                                                defaultValue={member.role ? member.role : "Member"}
                                                disabled={!this.props.edit}>
                                                <MenuItem value={"Admin"}>Admin</MenuItem>
                                                <MenuItem value={"Moderator"}>Moderator</MenuItem>
                                                <MenuItem value={"Member"}>Member</MenuItem>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="cell" align="center">
                                            <TextField
                                                defaultValue={member.email}
                                                error={!member.email && this.state.error}
                                                helperText="Required Field"
                                                placeholder="Input Email..."
                                                variant="outlined"
                                                onChange={(event) => member.email = event.target.value}
                                            />
                                        </TableCell>
                                        <TableCell className="cell" align="center">
                                            <Button
                                                data-key={index}
                                                color="default"
                                                startIcon={<ClearIcon />}
                                                onClick={this.handleRemoveMember.bind(this)}
                                                disabled={!this.props.edit}
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
                        disabled={!this.props.edit}
                    >Add New Member</Button>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={this.cancelChanges.bind(this)}
                        style={{ display: (this.props.title.includes("Create") || !this.props.edit) ? 'block' : 'none' }}
                        className="cancel-button">
                        Close
                    </Button>
                    <Button
                        onClick={this.saveChanges.bind(this)}
                        style={{ display: this.props.edit ? 'block' : 'none' }}
                        className="save-button">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default InfoEditPopup;

