const playerInfo = []
const nameList = ["bob", "joe", "mark", "frank", "billy", "steve", "fred", "eggbert", "karen", "lisa", "ashley", "lucy", "daisy", "amy", "meghan", "rebecca"]
const iconList = ["Pizza", "Hotdog", "Burger", "Fries"]

    document.getElementById("addNewPlayer").addEventListener("submit", (e) => {
        e.preventDefault();
        const playerName = document.getElementById("playerName").value;
        const playerIcon = document.getElementById("playerClass").value;
        addNewPlayer(playerName, playerIcon);
        showActivePlayers();
    });

function addNewPlayer(playerName, playerIcon) {
    if (playerInfo.length < 20) {
    
        playerInfo.push({
            name: playerName,
            icon: playerIcon,
            health: 100,
            attack: 20,
            weapon: null
        });
    }

}

function showActivePlayers() {
    const playerCount = document.getElementById("playerCount");
    playerCount.innerHTML = " ";
    for (const [index, player] of playerInfo.entries()) {
        playerCount.innerHTML += `
        <table>
        <tr>
            <th colspan="2">
                <button onclick="removePlayer(` + index + `);"> 
                    <img src="images/`+ player.icon +`.png">
                </button>
            </th>
        </tr>
        <tr>
            <th colspan="2">` + player.name + `</th>
        </tr>
        <tr>
            <th>Health: </th>
            <td>`+ player.health + `</td>
        </tr>
        <tr>
            <th>Attack: </th>
            <td>`+ player.attack + `</td>
        </tr>
        <tr>
            <th>Weapon: </th>
            <td>` + player.weapon + `</td>
        </tr>
    </table> `
        console.log(player);
    }
}

function removePlayer(index) {
    if (confirm("Delete this player?")) {
        playerInfo.splice(index, 1);
        showActivePlayers();
    }
}

function createRandomPlayer(createAmountPlaceholder) {
    let randomPlayerName = nameList[getRandomName()];
    let randomPlayerIcon = iconList[getRandomIcon()];
    addNewPlayer(randomPlayerName, randomPlayerIcon);
    console.log(randomPlayerName, randomPlayerIcon);
    showActivePlayers();
}

function getRandomName() {
    return Math.floor(Math.random() * nameList.length);
}

function getRandomIcon() {
    return Math.floor(Math.random() * iconList.length);
}