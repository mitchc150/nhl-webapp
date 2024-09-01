import { getBasicGameDataForDate } from "./model/games/basicGameData";

const express = require('express');
const { BasicGameData } = require("./model/games/basicGameData");
const { getLeagueDataByDivision, getLeagueDataWildCard, getLeagueDataLeagueWide } = require('./model/teams/rankings');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/standings/division', async (req: any, res: any) => {
    try {
        const standingsRes = await fetch("https://api-web.nhle.com/v1/standings/now");
        const standingsData: any = await standingsRes.json();
        const divisionData = getLeagueDataByDivision(standingsData.standings);
        res.json(divisionData);
    } catch (error) {
        console.error('Error fetching division standings:', error);
        res.status(500).send('Server Error');
    }
});

app.get('/api/standings/wildCard', async (req: any, res: any) => {
    try {
        const standingsRes = await fetch("https://api-web.nhle.com/v1/standings/now");
        const standingsData: any = await standingsRes.json();
        const wildCardData = getLeagueDataWildCard(standingsData.standings);
        res.json(wildCardData);
    } catch (error) {
        console.error("Error fetching wildcard standings: ", error)
        res.status(500).send('Server Error');
    }
})

app.get('/api/standings/league', async (req: any, res: any) => {
    try {
        const standingsRes = await fetch("https://api-web.nhle.com/v1/standings/now");
        const standingsData: any = await standingsRes.json();
        const leagueData = getLeagueDataLeagueWide(standingsData.standings);
        res.json(leagueData);
    } catch (error) {
        console.error("Error fetching league standings: ", error)
        res.status(500).send('Server Error');
    }
})

app.get('/api/teamNamesAndLogosByDivision', async (req: any, res: any) => {
    try {
        const apiRes = await fetch("https://api-web.nhle.com/v1/standings/now");
        const data: any = await apiRes.json();
        const teamNamesAndLogos = getLeagueDataByDivision(data.standings);
        res.json(teamNamesAndLogos);
    } catch (error) {
        console.error("Error fetching team names and logos: " + error)
    }
})

app.get('/api/basicGameDataByDate', async (req: any, res: any) => {
    try {
        const date = req.query.date;
        console.log(date);
        const apiRes = await fetch(`https://api-web.nhle.com/v1/score/${date}`);
        console.log(`https://api-web.nhle.com/v1/score/${date}`);
        const data: any = await apiRes.json();
        const gameData = getBasicGameDataForDate(data);
        res.json(gameData);
    } catch (error) {
        console.error("Error fetching basic game data: " + error)
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});