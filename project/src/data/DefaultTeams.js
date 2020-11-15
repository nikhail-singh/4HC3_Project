import { v4 as uuidv4 } from 'uuid';

export var defaultTeams = [
    {
        id: uuidv4(),
        name: "Team 1",
        description: "Description of Team 11",
        privacy: "public",
        members: [
            {
                name: "Person 1",
                email: "p1@mcmaster.ca",
                role: "Admin"
            }
        ]
    }
]