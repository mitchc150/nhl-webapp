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

export class BasicGameData {
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
        this.awayTeam = {
            id: apiData.awayTeam.id,
            nameAbbrev: apiData.awayTeam.abbrev,
            logo: apiData.awayTeam.logo,
            score: apiData.awayTeam.score,
            sog: apiData.awayTeam.sog
        };
        this.homeTeam = {
            id: apiData.homeTeam.id,
            nameAbbrev: apiData.homeTeam.abbrev,
            logo: apiData.homeTeam.logo,
            score: apiData.homeTeam.score,
            sog: apiData.homeTeam.sog
        };
        this.clock = {
            timeRemaining: apiData.clock.timeRemaining,
            secondsRemaining: apiData.clock.secondsRemaining,
            running: apiData.clock.running,
            inIntermission: apiData.clock.inIntermission
        };
        this.period = {
            periodNumber: apiData.periodDescriptor.number,
            periodDescriptor: apiData.periodDescriptor.periodType
        };
    }
}

export function getBasicGameDataForDate(apiData: any) {
    var games = apiData.games;
    return games.map((game: any) => new BasicGameData(game));
}