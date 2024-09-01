import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress

interface TeamData {
  rank: number;
  teamName: string;
  teamLogo: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  otLosses: number;
  points: number;
  pointsPctg: number;
  conference?: string;
  division?: string;
}

interface ConferenceData {
  eastern: TeamData[];
  western: TeamData[];
}

interface DivisionData {
  central: TeamData[];
  pacific: TeamData[];
  atlantic: TeamData[];
  metropolitan: TeamData[];
}

export default function Teams() {
    const [rows, setRows] = React.useState<TeamData[]>([]);
    const [conferenceData, setConferenceData] = React.useState<ConferenceData | null>(null);
    const [divisionData, setDivisionData] = React.useState<DivisionData | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [view, setView] = React.useState<'league' | 'conference' | 'division'>('league');
    const [selectedToggle, setSelectedToggle] = React.useState<string>('Eastern'); // State for selected toggle
  
    React.useEffect(() => {
      async function fetchStandings() {
        try {
          setLoading(true);
          if (view === 'league') {
            const res = await fetch('/api/standings/league');
            const data = await res.json();
            setRows(data.map((item: any, index: number) => ({ ...item, rank: index + 1 })));
          } else if (view === 'conference') {
            const res = await fetch('/api/standings/wildCard');
            const data: ConferenceData = await res.json();
            data.eastern = data.eastern.map((team, index) => ({ ...team, rank: index + 1 }));
            data.western = data.western.map((team, index) => ({ ...team, rank: index + 1 }));
            setConferenceData(data);
          } else if (view === 'division') {
            const res = await fetch('/api/standings/division');
            const data: DivisionData = await res.json();
            data.central = data.central.map((team, index) => ({ ...team, rank: index + 1 }));
            data.pacific = data.pacific.map((team, index) => ({ ...team, rank: index + 1 }));
            data.atlantic = data.atlantic.map((team, index) => ({ ...team, rank: index + 1 }));
            data.metropolitan = data.metropolitan.map((team, index) => ({ ...team, rank: index + 1 }));
            setDivisionData(data);
          }
        } catch (error) {
          console.error("Error fetching standings:", error);
        } finally {
          setLoading(false);
        }
      }
  
      fetchStandings();
    }, [view]);

  const handleViewChange = (event: React.ChangeEvent<{}>, newValue: 'league' | 'conference' | 'division') => {
    setView(newValue);
    if (newValue === 'conference') {
      setSelectedToggle('Eastern');
    } else if (newValue === 'division') {
      setSelectedToggle('Central');
    }
  };

  const handleToggleChange = (event: React.MouseEvent<HTMLElement>, newToggle: string) => {
    if (newToggle !== null) {
      setSelectedToggle(newToggle);
    }
  };

  const renderTableBody = (filteredRows: TeamData[]) => {
    return filteredRows.map((row) => (
      <TableRow key={row.teamName}>
        <TableCell component="th" scope="row">{row.rank}</TableCell>
        <TableCell align="right">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={row.teamLogo} alt={row.teamName} width={40} style={{ marginRight: '8px' }} />
            <Typography variant="body1">{row.teamName}</Typography>
          </Box>
        </TableCell>
        <TableCell align="right">{row.gamesPlayed}</TableCell>
        <TableCell align="right">{row.wins}</TableCell>
        <TableCell align="right">{row.losses}</TableCell>
        <TableCell align="right">{row.otLosses}</TableCell>
        <TableCell align="right">{row.points}</TableCell>
        <TableCell align="right">{row.pointsPctg}</TableCell>
      </TableRow>
    ));
  };

  const renderContent = () => {
    if (view === 'league') {
      return (
        <TableContainer component={Paper} sx={{ maxHeight: '80vh' }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="league table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: 'background.paper' }}>Rank</TableCell>
                <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: 'background.paper' }} align="right">Team</TableCell>
                <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: 'background.paper' }} align="right">Games Played</TableCell>
                <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: 'background.paper' }} align="right">Wins</TableCell>
                <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: 'background.paper' }} align="right">Losses</TableCell>
                <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: 'background.paper' }} align="right">OT Losses</TableCell>
                <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: 'background.paper' }} align="right">Points</TableCell>
                <TableCell sx={{ position: 'sticky', top: 0, backgroundColor: 'background.paper' }} align="right">Points Percentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderTableBody(rows)}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

    if (view === 'conference' && conferenceData) {
      const easternTeams = conferenceData.eastern;
      const westernTeams = conferenceData.western;

      return (
        <Box sx={{ width: '100%' }}>
          <ToggleButtonGroup
            value={selectedToggle}
            exclusive
            onChange={handleToggleChange}
            aria-label="conference toggle"
            sx={{ marginBottom: 2 }}
          >
            <ToggleButton value="Eastern">Eastern Conference</ToggleButton>
            <ToggleButton value="Western">Western Conference</ToggleButton>
          </ToggleButtonGroup>
          {selectedToggle === 'Eastern' && (
            <TableContainer component={Paper} sx={{ maxHeight: '74vh' }}>
              <Table stickyHeader sx={{ minWidth: 650 }} aria-label="eastern conference table">
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
                  {renderTableBody(easternTeams)}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {selectedToggle === 'Western' && (
            <TableContainer component={Paper} sx={{ maxHeight: '74vh' }}>
              <Table stickyHeader sx={{ minWidth: 650 }} aria-label="western conference table">
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
                  {renderTableBody(westernTeams)}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      );
    }

    if (view === 'division' && divisionData) {
      return (
        <Box sx={{ width: '100%' }}>
          <ToggleButtonGroup
            value={selectedToggle}
            exclusive
            onChange={handleToggleChange}
            aria-label="division toggle"
            sx={{ marginBottom: 2 }}
          >
            <ToggleButton value="Central">Central Division</ToggleButton>
            <ToggleButton value="Pacific">Pacific Division</ToggleButton>
            <ToggleButton value="Atlantic">Atlantic Division</ToggleButton>
            <ToggleButton value="Metropolitan">Metropolitan Division</ToggleButton>
          </ToggleButtonGroup>
          {selectedToggle === 'Central' && (
            <TableContainer component={Paper}>
              <Table stickyHeader sx={{ minWidth: 650 }} aria-label="central division table">
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
                  {renderTableBody(divisionData.central)}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {selectedToggle === 'Pacific' && (
            <TableContainer component={Paper}>
              <Table stickyHeader sx={{ minWidth: 650 }} aria-label="pacific division table">
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
                  {renderTableBody(divisionData.pacific)}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {selectedToggle === 'Atlantic' && (
            <TableContainer component={Paper}>
              <Table stickyHeader sx={{ minWidth: 650 }} aria-label="atlantic division table">
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
                  {renderTableBody(divisionData.atlantic)}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {selectedToggle === 'Metropolitan' && (
            <TableContainer component={Paper}>
              <Table stickyHeader sx={{ minWidth: 650 }} aria-label="metropolitan division table">
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
                  {renderTableBody(divisionData.metropolitan)}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      );
    }

    return null;
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, margin: 'auto', paddingTop: '20px', display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Tabs value={view} onChange={handleViewChange} aria-label="view tabs">
        <Tab label="League" value="league" />
        <Tab label="Conference" value="conference" />
        <Tab label="Division" value="division" />
      </Tabs>
      <Box sx={{ flexGrow: 1, overflow: 'auto', marginTop: 2 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : (
          renderContent()
        )}
      </Box>
    </Box>
  );
}
