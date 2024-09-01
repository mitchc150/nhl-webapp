enum Division {
    central = "C",
    pacific = "P",
    metropolitan = "M",
    atlantic = "A"
}

enum Conference {
    western = "W",
    eastern = "E"
}

export class BasicTeamData {
    teamName: string
    teamAbbrev: string
    teamLogo: string
    gamesPlayed: number
    wins: number
    losses: number
    otLosses: number
    points: number
    pointsPctg: number
    division: Division
    conference: Conference

    constructor(apiData: any) {
        this.teamName = apiData.teamName.default;
        this.teamAbbrev = apiData.teamAbbreviation;
        this.teamLogo = apiData.teamLogo;
        this.gamesPlayed = apiData.gamesPlayed;
        this.wins = apiData.wins;
        this.losses = apiData.losses;
        this.otLosses = apiData.otLosses;
        this.points = apiData.points;
        this.pointsPctg = apiData.pointsPctg;
        this.division = apiData.divisionAbbrev;
        this.conference = apiData.conferenceAbbrev;
    }
}