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
        this.date = apiData.date;
        this.startTime = apiData.startTime;
        this.awayTeam = apiData.awayTeam;
        this.homeTeam = apiData.homeTeam;
        this.clock = apiData.clock;
        this.period = apiData.period;
    }
}