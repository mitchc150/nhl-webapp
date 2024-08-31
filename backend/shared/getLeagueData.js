import { TeamData } from "../model/teamData.js";

export function getLeagueDataByDivision(apiData) {
    var central = filterTeamDataByDivision(apiData, "C");
    var pacific = filterTeamDataByDivision(apiData, "P");
    var metropolitan = filterTeamDataByDivision(apiData, "M");
    var atlantic = filterTeamDataByDivision(apiData, "A");

    return {
        central: central,
        pacific: pacific,
        metropolitan: metropolitan,
        atlantic: atlantic
    }
}

export function getLeagueDataLeagueWide(apiData) {
    var leagueData = apiData.map(TeamData);
    leagueData.sort((team1, team2) => {
        return team2.points - team1.points;
    });
    return leagueData;
}

export function getLeagueDataWildCard(apiData) {
    var western = filterTeamDataByConference(apiData, "W");
    var eastern = filterTeamDataByConference(apiData, "E");

    return {
        western: western,
        eastern: eastern
    }
}

function filterTeamDataByConference(apiData, conferenceAbbrev) {
    var conferenceData = apiData.filter((team) => team.conferenceAbbrev === conferenceAbbrev);
    conferenceData = conferenceData.map(TeamData);
    conferenceData.sort((team1, team2) => {
        return team2.points - team1.points;
    });
    return conferenceData;
}

function filterTeamDataByDivision(apiData, divisionAbbrev) {
    var divisionData = apiData.filter((team) => team.divisionAbbrev === divisionAbbrev);
    divisionData = divisionData.map(TeamData);
    divisionData.sort((team1, team2) => {
        return team2.points - team1.points;
    });
    return divisionData;
}
