import { BasicTeamData } from "./basicTeamData";

interface DivisionData {
    central: BasicTeamData[];
    pacific: BasicTeamData[];
    metropolitan: BasicTeamData[];
    atlantic: BasicTeamData[];
}

export function getLeagueDataByDivision(apiData: any): DivisionData {
    var leagueData = apiData.map((data: any) => new BasicTeamData(data));

    var central = leagueData.filter((team: BasicTeamData) => team.division == "C");
    var pacific = leagueData.filter((team: BasicTeamData) => team.division == "P");
    var metropolitan = leagueData.filter((team: BasicTeamData) => team.division == "M");
    var atlantic = leagueData.filter((team: BasicTeamData) => team.division == "A");
    central.sort((team1: BasicTeamData, team2: BasicTeamData) => {
        return team2.points - team1.points;
    });
    pacific.sort((team1: BasicTeamData, team2: BasicTeamData) => {
        return team2.points - team1.points;
    });
    metropolitan.sort((team1: BasicTeamData, team2: BasicTeamData) => {
        return team2.points - team1.points;
    });
    atlantic.sort((team1: BasicTeamData, team2: BasicTeamData) => {
        return team2.points - team1.points;
    });
    
    return {
        central: central,
        pacific: pacific,
        metropolitan: metropolitan,
        atlantic: atlantic
    }
}

export function getLeagueDataLeagueWide(apiData: any): BasicTeamData[] {
    var leagueData = apiData.map((data: any) => new BasicTeamData(data));
    leagueData.sort((team1: BasicTeamData, team2: BasicTeamData) => {
        return team2.points - team1.points;
    });
    return leagueData;
}

interface WildCardData {
    western: BasicTeamData[];
    eastern: BasicTeamData[];
}

export function getLeagueDataWildCard(apiData: any): WildCardData {
    var leagueData = apiData.map((data: any) => new BasicTeamData(data));
    var westernConferenceData = leagueData.filter((team: BasicTeamData) => team.conference == "W");
    var easternConferenceData = leagueData.filter((team: BasicTeamData) => team.conference == "E");
    westernConferenceData.sort((team1: BasicTeamData, team2: BasicTeamData) => {
        return team2.points - team1.points;
    });
    easternConferenceData.sort((team1: BasicTeamData, team2: BasicTeamData) => {
        return team2.points - team1.points;
    });

    return {
        western: westernConferenceData,
        eastern: easternConferenceData
    }
}