import React from 'react';
import './RoleCard.css';
import MemberCard from './MemberCard';
import { Typography, Button, Card, CardContent, CardHeader, Toolbar, Collapse, Divider, IconButton } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';

class RoleCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className="role-card">
                <CardHeader
                    action={
                        <div className="role-actions">
                            <Button
                                className="role-action"
                                startIcon={<SettingsIcon />}
                            >
                                Settings
                            </Button>
                            <Button
                                className="role-action"
                                startIcon={<InfoIcon />}
                            >
                                Info
                            </Button>
                        </div>
                    }
                    title={
                        <Toolbar className="role-header">
                            <IconButton>
                                <ArrowDropDownIcon />
                            </IconButton>
                            <Typography variant="h5">{this.props.role}</Typography>
                        </Toolbar>}
                    className="role-card-header" />
                <Divider />
                <Collapse in={true} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Toolbar>
                            {this.props.members.map((member, index) => (
                                <MemberCard key={'member-' + index} member={member}/>
                            ))}
                        </Toolbar>
                    </CardContent>
                </Collapse>
            </Card>
        )
    }
}

export default RoleCard;




