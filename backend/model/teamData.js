export function TeamData(apiData) {
    return {
        teamName: apiData.teamName.default,
        teamAbbrev: apiData.teamAbbrev,
        teamLogo: apiData.teamLogo,
        gamesPlayed: apiData.gamesPlayed,
        wins: apiData.wins,
        losses: apiData.losses,
        otLosses: apiData.otLosses,
        points: apiData.points,
        pointPctg: apiData.pointPctg
    };
}