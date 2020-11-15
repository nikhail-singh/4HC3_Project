import React from 'react';
import './RoleCard.css';
import MemberCard from './MemberCard';
import { Typography, Card, CardContent, CardHeader, Toolbar, Collapse, Divider, IconButton } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

class RoleCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: true,
            members: this.props.members
        }
    }

    toggleExpanded(){
        this.setState({
            expanded: !this.state.expanded
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.members !== this.props.members) {
            this.setState({ members: this.props.members });
        }
    }
    
    render() {
        return (
            <Card className="role-card" key={this.props.members}>
                <CardHeader
                    title={
                        <Toolbar className="role-header">
                            <IconButton onClick={this.toggleExpanded.bind(this)}>
                                <ArrowDropDownIcon/>
                            </IconButton>
                            <Typography variant="h5">{this.props.role}</Typography>
                        </Toolbar>}
                    className="role-card-header" />
                <Divider />
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Toolbar className="member-bar" key={this.props.members.length}>
                            {this.state.members.map((member, index) => (
                                <MemberCard key={member} className="member-card" memberTotal={this.props.memberTotal} editMember={this.props.editMember.bind(this)} member={member}/>
                            ))}
                        </Toolbar>
                    </CardContent>
                </Collapse>
            </Card>
        )
    }
}

export default RoleCard;




