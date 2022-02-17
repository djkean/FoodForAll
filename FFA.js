/* using this array to store values for player stats */
const playerInfo = []

    document.getElementById("addNewPlayer").addEventListener("submit", (e) => {
        e.preventDefault();
        const playerName = document.getElementById("playerName").value;
        const playerIcon = document.getElementById("playerClass").value;
        addNewPlayer(playerName, playerIcon);
        showActivePlayers();
    });

/* this function creates a new player and updates the array with the values of 
    each stat given up to the player cap of 20 */

function addNewPlayer(playerName, playerIcon) {
    if (playerInfo.length <= 20) {
    
        playerInfo.push({
            name: playerName,
            icon: playerIcon,
            health: 100,
            attack: 20,
            weapon: null
        });
    }
}

/* this function shows us the players we have made
    we update the div with string literals to use the objects */

function showActivePlayers() {
    const playerCount = document.getElementById("playerCount");
    playerCount.innerHTML = " ";
    for (const [index, player] of playerInfo.entries()) {
        playerCount.innerHTML += `
        <div>
            `+ player.name + `
            <br>
                <img src="images/`+ player.icon +`.png" width="96" height="96" alt="a delicious looking picture of food">
            <br>
                health: ` + player.health + `
            <br>
                attack: ` + player.attack + `
            <br>
                weapon: ` + player.weapon + `
        </div>    
        `
        console.log(player);

/* tried using the remove from the brainstorm but couldnt get EventListener working
    so this was my work around */

    const removePlayer = document.createElement("button");
    removePlayer.setAttribute("onclick", `removePlayer(${index})`);
    removePlayer.innerText += "X";
    playerCount.appendChild(removePlayer);
    }
}

/* removing players by splicing our player(s) */

function removePlayer(index) {
    playerInfo.splice(index, 1);
    showActivePlayers();
}


