import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';

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

function getDateString(date: Dayjs): string {
    const year = date.year();
    const month = date.format('MM');
    const day = date.format('DD');
    return `${year}-${month}-${day}`;
}

export default function Games() {
    const [games, setGames] = React.useState<BasicGameData[]>([]);
    const [date, setDate] = React.useState<Dayjs>(dayjs());
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchGameData = async (date: Dayjs) => {
            try {
                var dateString = getDateString(date);
                console.log(dateString);
                const response = await fetch(`/api/basicGameDataByDate?date=${dateString}`);
                var data = await response.json();
                console.log(data);
                data = data.map((dataPoint: any) => new BasicGameData(dataPoint));
                setGames(data);
            } catch (error) {
                console.error('Error fetching game data from frontend:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGameData(date);
    }, [date]);

    
    const handlePreviousDay = () => {
        setDate(prevDate => {
            return prevDate ? prevDate.subtract(1, 'day') : dayjs().subtract(1, 'day');
        });
    };

    const handleNextDay = () => {
        setDate(prevDate => {
            return prevDate ? prevDate.add(1, 'day') : dayjs().add(1, 'day');
        });
    };

    const handleDateChange = (newDate: Dayjs | null) => {
        if (newDate) {
            setDate(newDate);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        )
    }
    
    return (
        <Box sx={{ display: 'flex', width: '100%', maxWidth: 1200, alignItems: 'left', margin: 'auto', mt: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', mr: 8 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                        value={date}
                        onChange={handleDateChange}
                    />
                </LocalizationProvider>
            </Box>
            <Box sx={{ flexGrow: 1, ml: 'auto', mr: 'auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
                    <IconButton onClick={handlePreviousDay}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Typography variant="h6">
                        {getDateString(date)}
                    </Typography>
                    <IconButton onClick={handleNextDay}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
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
                        <Card key={game.id} sx={{ width: '100%', maxWidth: '600px', padding: 2, textAlign: 'center' }}>
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
            </Box>
        </Box>
    );
}
