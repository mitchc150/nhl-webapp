import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';
import { TeamData } from "../pages/teams";

interface StandingsTableProps {
  teams: TeamData[];
  title: string;
}

const StandingsTable: React.FC<StandingsTableProps> = ({ teams, title }) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: '74vh' }}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label={`${title} conference table`}>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell align="right">Team</TableCell>
            <TableCell align="right">Games Played</TableCell>
            <TableCell align="right">Wins</TableCell>
            <TableCell align="right">Losses</TableCell>
            <TableCell align="right">OT Losses</TableCell>
            <TableCell align="right">Points</TableCell>
            <TableCell align="right">Points Percentage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((team) => (
            <TableRow key={team.rank}>
              <TableCell>{team.rank}</TableCell>
              <TableCell align="right">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={team.teamLogo} alt={team.teamName} width={40} style={{ marginRight: '8px' }} />
                    <Typography variant="body1">{team.teamName}</Typography>
                </Box>
                </TableCell>
              <TableCell align="right">{team.gamesPlayed}</TableCell>
              <TableCell align="right">{team.wins}</TableCell>
              <TableCell align="right">{team.losses}</TableCell>
              <TableCell align="right">{team.otLosses}</TableCell>
              <TableCell align="right">{team.points}</TableCell>
              <TableCell align="right">{team.pointsPctg}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StandingsTable;
