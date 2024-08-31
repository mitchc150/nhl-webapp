async function buildStandingsPage() {
    const container = document.getElementById('container');
    container.innerHTML = `
        <!-- Bootstrap Tabs -->
        <ul class="nav nav-tabs" id="standingsTabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="division-tab" data-bs-toggle="tab" data-bs-target="#division" type="button" role="tab" aria-controls="division" aria-selected="true">Division</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="wild-card-tab" data-bs-toggle="tab" data-bs-target="#wild-card" type="button" role="tab" aria-controls="wild-card" aria-selected="false">Wild Card</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="league-tab" data-bs-toggle="tab" data-bs-target="#league" type="button" role="tab" aria-controls="league" aria-selected="false">League</button>
            </li>        
        </ul>
        
        <!-- Tab Content -->
        <div class="tab-content" id="standingsTabsContent">
            <div class="tab-pane fade show active" id="division" role="tabpanel" aria-labelledby="division-tab">
                <!-- Division Standings Content -->
                <div id="division-container"></div>
            </div>
            <div class="tab-pane fade" id="wild-card" role="tabpanel" aria-labelledby="wildcard-tab">
                <!-- Wild Card Standings Content -->
                <div id="wild-card-container"></div>
            </div>
            <div class="tab-pane fade" id="league" role="tabpanel" aria-labelledby="league-tab">
                <!-- League Standings Content -->
                <div id="league-container"></div>
            </div>
        </div>
    `;

    buildDivisionStandings();
    buildWildCardStandings();
    buildLeagueStandings();
}

async function buildWildCardStandings() {
    const res = await fetch(`/api/standings/wildCard`);
    const standings = await res.json();

    const container = document.getElementById("wild-card-container");
    for (const [conferenceName, teams] of Object.entries(standings)) {
        const conferenceCard = document.createElement('div');
        conferenceCard.classList = "card my-3";

        const conferenceHeader = document.createElement("div");
        conferenceHeader.classList = "card-header text-white";
        conferenceHeader.setAttribute('data-toggle', 'collapse');
        conferenceHeader.setAttribute('data-target', `#collapse-${conferenceName}`);
        conferenceHeader.style.cursor = 'pointer';

        const conferenceHeadingText = document.createElement("h5");
        conferenceHeadingText.innerHTML = `<strong>${conferenceName.charAt(0).toUpperCase() + conferenceName.slice(1)} Conference</strong>`;
        conferenceHeader.appendChild(conferenceHeadingText);

        conferenceCard.appendChild(conferenceHeader);

        const collapseDiv = document.createElement('div');
        collapseDiv.id = `collapse-${conferenceName}`;
        collapseDiv.classList.add('collapse', 'show');

        var table = buildTableFromTeams(teams);

        collapseDiv.appendChild(table);
        conferenceCard.appendChild(collapseDiv);
        container.appendChild(conferenceCard);
    }
}

async function buildDivisionStandings() {
    const res = await fetch(`/api/standings/division`);
    const standings = await res.json();

    const container = document.getElementById(`division-container`);
    for (const [divisionName, teams] of Object.entries(standings)) {
        const divisionCard = document.createElement('div');
        divisionCard.classList = "card my-3";

        const divisionHeader = document.createElement("div");
        divisionHeader.classList = "card-header text-white";
        divisionHeader.setAttribute('data-toggle', 'collapse');
        divisionHeader.setAttribute('data-target', `#collapse-${divisionName}`);
        divisionHeader.style.cursor = 'pointer';

        const divisionHeadingText = document.createElement("h5");
        divisionHeadingText.innerHTML = `<strong>${divisionName.charAt(0).toUpperCase() + divisionName.slice(1)} Division</strong>`;
        divisionHeader.appendChild(divisionHeadingText);

        divisionCard.appendChild(divisionHeader);

        const collapseDiv = document.createElement('div');
        collapseDiv.id = `collapse-${divisionName}`;
        collapseDiv.classList.add('collapse', 'show');

        var table = buildTableFromTeams(teams);

        collapseDiv.appendChild(table);
        divisionCard.appendChild(collapseDiv);
        container.appendChild(divisionCard);
    }
}

async function buildLeagueStandings() {
    const res = await fetch(`/api/standings/league`);
    const standings = await res.json();

    const container = document.getElementById(`league-container`);
    const leagueCard = document.createElement('div');
    leagueCard.classList = "card my-3";

    const leagueHeader = document.createElement("div");
    leagueHeader.classList = "card-header text-white";
    const leagueHeadingText = document.createElement("h5");
    leagueHeadingText.innerHTML = `<strong>League</strong>`;
    leagueHeader.appendChild(leagueHeadingText);
    leagueCard.appendChild(leagueHeader);
        
    var table = buildTableFromTeams(standings);
    leagueCard.appendChild(table);  
    container.appendChild(leagueCard);
}

function buildTableFromTeams(teams) {    
    const table = document.createElement('table');
    table.classList = "table table-bordered table-striped bg-light text-black";

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Rank</th>
            <th>Team</th>
            <th>Games Played</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>OT Losses</th>
            <th>Points</th>
            <th>Point Percentage</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    teams.forEach((team, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <img src="${team.teamLogo}" alt="${team.teamName} logo" style="height: 24px; margin-right: 8px">
                <strong>${team.teamName}</strong>
            </td>
            <td>${team.gamesPlayed}</td>
            <td>${team.wins}</td>
            <td>${team.losses}</td>
            <td>${team.otLosses}</td>
            <td>${team.points}</td>
            <td>${team.pointPctg}</td>
        `;
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    return table;
}

async function initializeStandingsPage() {
    await buildStandingsPage();
    //await buildStandings('division');
}

initializeStandingsPage();