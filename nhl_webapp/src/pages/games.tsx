import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

interface TeamGameInfo {
    id: number;
    nameAbbrev: string;
    logo: string;
    score: number;
    sog: number;
}

interface Clock {
    timeRemaining: string;
    secondsRemaining: number;
    running: boolean;
    inIntermission: boolean;
}

enum PeriodDescriptor {
    reg = "REG",
    ot = "OT"
}

interface Period {
    periodNumber: number;
    periodDescriptor: PeriodDescriptor;
}

class BasicGameData {
    id: number;
    date: string;
    startTime: string;
    awayTeam: TeamGameInfo;
    homeTeam: TeamGameInfo;
    clock: Clock;
    period: Period

    constructor(apiData: any) {
        this.id = apiData.id;
        this.date = apiData.gameDate;
        this.startTime = apiData.startTimeUTC;
        this.awayTeam = apiData.awayTeam;
        this.homeTeam = apiData.homeTeam;
        this.clock = apiData.clock;
        this.period = apiData.period;
    }
}

export default function Games() {
    const [games, setGames] = React.useState<BasicGameData[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchGameData = async () => {
            try {
                const response = await fetch('/api/basicGameDataByDate');
                var data = await response.json();
                data = data.map((dataPoint: any) => new BasicGameData(dataPoint));
                setGames(data);
            } catch (error) {
                console.error('Error fetching game data from frontend:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGameData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        )
    }
    
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        mt: 4,
      }}
    >
        {games.map((game: BasicGameData) => (
            <Card key={game.id} sx={{ width: '50%', maxWidth: '600', padding: 2, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4  }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src={game.homeTeam.logo} alt={game.homeTeam.nameAbbrev} width={80} />
                            <Typography>{game.homeTeam.nameAbbrev}</Typography>
                        </Box>
                        <Typography variant='body2' sx={{ color: 'text-secondary' }}>
                            {`SOG: ${game.homeTeam.sog}`}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant='h4'>
                            {game.awayTeam.score} - {game.homeTeam.score}
                            </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4  }}>
                        <Typography variant='body2' sx={{ color: 'text-secondary' }}>
                            {`SOG: ${game.awayTeam.sog}`}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src={game.awayTeam.logo} alt={game.awayTeam.nameAbbrev} width={80} />
                            <Typography>{game.awayTeam.nameAbbrev}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Card>
        ))}
    </Box>
  );
}