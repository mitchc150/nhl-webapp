import express from 'express';
import fetch from 'node-fetch';
import { getLeagueDataByDivision, getLeagueDataWildCard, getLeagueDataLeagueWide } from './shared/getLeagueData.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/standings/division', async (req, res) => {
    try {
        const standingsRes = await fetch("https://api-web.nhle.com/v1/standings/now");
        const standingsData = await standingsRes.json();
        const divisionData = getLeagueDataByDivision(standingsData.standings);
        res.json(divisionData);
    } catch (error) {
        console.error('Error fetching division standings:', error);
        res.status(500).send('Server Error');
    }
});

app.get('/api/standings/wildCard', async (req, res) => {
    try {
        const standingsRes = await fetch("https://api-web.nhle.com/v1/standings/now");
        const standingsData = await standingsRes.json();
        const wildCardData = getLeagueDataWildCard(standingsData.standings);
        res.json(wildCardData);
    } catch (error) {
        console.error("Error fetching wildcard standings: ", error)
        res.status(500).send('Server Error');
    }
})

app.get('/api/standings/league', async (req, res) => {
    try {
        const standingsRes = await fetch("https://api-web.nhle.com/v1/standings/now");
        const standingsData = await standingsRes.json();
        const leagueData = getLeagueDataLeagueWide(standingsData.standings);
        res.json(leagueData);
    } catch (error) {
        console.error("Error fetching league standings: ", error)
        res.status(500).send('Server Error');
    }
})

app.get('/api/teamNamesAndLogosByDivision', async (req, res) => {
    try {
        const apiRes = await fetch("https://api-web.nhle.com/v1/standings/now");
        const data = await apiRes.json();
        const teamNamesAndLogos = getLeagueDataByDivision(data.standings);
        res.json(teamNamesAndLogos);
    } catch (error) {
        console.error("Error fetching team names and logos: " + error)
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});