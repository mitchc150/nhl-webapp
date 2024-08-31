async function setupNavbarWithTeamData() {
    const data = await fetch(`/api/teamNamesAndLogosByDivision`);
    const teamsData = await data.json();
    console.log(teamsData);
    Object.keys(teamsData).forEach(division => {
        console.log(division);
        const divisionColumn = document.querySelector(`#dropdown-${division.toLowerCase()}`);
        console.log(divisionColumn);
        teamsData[division].forEach(team => {
            const teamItem = document.createElement("a");
            teamItem.classList.add("dropdown-item");
            teamItem.href = "#";
            const teamImage = document.createElement("img");
            teamImage.src = team.teamLogo;
            teamImage.alt = team.teamName;
            teamImage.style.width = "35px";
            teamImage.style.marginRight = "8px";
            const teamText = document.createElement("div");
            teamText.textContent = team.teamAbbrev.default;
            teamItem.appendChild(teamImage);
            teamItem.appendChild(teamText);
            divisionColumn.appendChild(teamItem);
            console.log(divisionColumn);
        });
    });
};

setupNavbarWithTeamData();