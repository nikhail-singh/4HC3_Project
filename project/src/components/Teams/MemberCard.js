import React from 'react';
import './MemberCard.css';
import { Avatar, Typography, Button, Card, CardContent, CardActions } from '@material-ui/core';

class MemberCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className="member-card">
                <Avatar className="member-avatar">{this.props.member.shortName}</Avatar>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {this.props.member.name}
                        </Typography>
                </CardContent>

                <CardActions>
                    <Button className="member-action">Contact</Button>
                    <Button className="member-action">Edit</Button>
                </CardActions>
            </Card>
        )
    }
}

export default MemberCard;