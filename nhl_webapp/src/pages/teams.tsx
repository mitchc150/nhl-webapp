import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';
import StandingsTable from "../components/standingsTable"

export interface TeamData {
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

enum View {
    league = "league",
    conference = "conference",
    division = "division"
}

enum Division {
    central = "central",
    pacific = "pacific",
    metropolitan = "metropolitan",
    atlantic = "atlantic"
}

enum Conference {
    eastern = "eastern",
    western = "western"
}

export default function Teams() {
    const [rows, setRows] = React.useState<TeamData[]>([]);
    const [conferenceData, setConferenceData] = React.useState<ConferenceData | null>(null);
    const [divisionData, setDivisionData] = React.useState<DivisionData | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [view, setView] = React.useState<View>(View.league);
    const [selectedToggle, setSelectedToggle] = React.useState<Conference | Division>(Conference.eastern);
  
    React.useEffect(() => {
      async function fetchStandings() {
        try {
          setLoading(true);
          if (view === View.league) {
            const res = await fetch('/api/standings/league');
            const data = await res.json();
            setRows(data.map((item: any, index: number) => ({ ...item, rank: index + 1 })));
          } else if (view === View.conference) {
            const res = await fetch('/api/standings/wildCard');
            const data: ConferenceData = await res.json();
            data.eastern = data.eastern.map((team, index) => ({ ...team, rank: index + 1 }));
            data.western = data.western.map((team, index) => ({ ...team, rank: index + 1 }));
            setConferenceData(data);
          } else if (view === View.division) {
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

  const handleViewChange = (event: React.ChangeEvent<{}>, newValue: View) => {
    setView(newValue);
    if (newValue === View.conference) {
      setSelectedToggle(Conference.eastern);
    } else if (newValue === View.division) {
      setSelectedToggle(Division.central);
    }
  };

  const handleToggleChange = (event: React.MouseEvent<HTMLElement>, newToggle: Conference | Division) => {
    if (newToggle !== null) {
      setSelectedToggle(newToggle);
    }
  };

  const renderContent = () => {
    if (view === View.league) {
      return (
        <StandingsTable teams={rows} title='league'></StandingsTable>
      );
    }

    if (view === View.conference && conferenceData) {
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
            <ToggleButton value="eastern">Eastern Conference</ToggleButton>
            <ToggleButton value="western">Western Conference</ToggleButton>
          </ToggleButtonGroup>
          {selectedToggle === Conference.eastern && (
            <StandingsTable teams={easternTeams} title="eastern" />
          )}
          {selectedToggle === Conference.western && (
            <StandingsTable teams={westernTeams} title="western" />
          )}
        </Box>
      );
    }

    if (view === View.division && divisionData) {
        const centralTeams = divisionData.central;
        const pacificTeams = divisionData.pacific;
        const atlanticTeams = divisionData.atlantic;
        const metropolitanTeams = divisionData.metropolitan;

        return (
            <Box sx={{ width: '100%' }}>
            <ToggleButtonGroup
              value={selectedToggle}
              exclusive
              onChange={handleToggleChange}
              aria-label="division toggle"
              sx={{ marginBottom: 2 }}
            >
              <ToggleButton value="central">Central Division</ToggleButton>
              <ToggleButton value="pacific">Pacific Division</ToggleButton>
              <ToggleButton value="atlantic">Atlantic Division</ToggleButton>
              <ToggleButton value="metropolitan">Metropolitan Division</ToggleButton>
            </ToggleButtonGroup>
                {selectedToggle === Division.central && (
                <StandingsTable teams={centralTeams} title="central" />
              )}
              {selectedToggle === Division.pacific && (
                <StandingsTable teams={pacificTeams} title="pacific" />
              )}
              {selectedToggle === Division.atlantic && (
                <StandingsTable teams={atlanticTeams} title="atlantic" />
              )}
              {selectedToggle === Division.metropolitan && (
                <StandingsTable teams={metropolitanTeams} title="metropolitan" />
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
