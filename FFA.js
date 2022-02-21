const playerInfo = []
const nameList = ["bob", "joe", "mark", "frank", "billy", "steve", "fred", "eggbert", "karen", "lisa", "ashley", "lucy", "daisy", "amy", "meghan", "rebecca"]
const iconList = ["Pizza", "Hotdog", "Burger", "Fries"]
const weaponList = {
    0: { name: "Pizza Cutter", attack: 20, strongAgainst: "Pizza" },
    1: { name: "Spatula", attack: 22, strongAgainst: "Egg" },
    2: { name: "Butter Knife", attack: 25, },
};

document.getElementById("addNewPlayer").addEventListener("submit", (e) => {
    e.preventDefault();
    const playerName = document.getElementById("playerName").value;
    const playerIcon = document.getElementById("playerClass").value;
    const playerWeapon = document.getElementById("weaponClass").value;
    addNewPlayer(playerName, playerIcon, playerWeapon);
    showActivePlayers();
});

function addNewPlayer(playerName, playerIcon, playerWeapon) {
    if (playerInfo.length < 20) {
        const playerWeaponValue = getWeaponData(playerWeapon);
        playerInfo.push({
            name: playerName,
            icon: playerIcon,
            health: 100,
            attack: 20,
            weapon: playerWeaponValue,
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
                        <img src="images/` + player.icon + `.png">
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
                <td>`+ player.weapon.attack + `</td>
            </tr>
            <tr>
                <th>Weapon: </th>
                <td>` + player.weapon.name + `</td>
            </tr>
        </table> `
    }
}

function removePlayer(index) {
    if (confirm("Delete this player?")) {
        playerInfo.splice(index, 1);
        showActivePlayers();
    }
}

function createRandomPlayer(createAmountPlaceholder) {
    const randomPlayerName = nameList[getRandomName()];
    const randomPlayerIcon = iconList[getRandomIcon()];
    const randomPlayerWeapon = getRandomWeapon();
    addNewPlayer(randomPlayerName, randomPlayerIcon, randomPlayerWeapon);
    showActivePlayers();
}

function getRandomName() {
    return Math.floor(Math.random() * nameList.length);
}

function getRandomIcon() {
    return Math.floor(Math.random() * iconList.length);
}

function getRandomWeapon() {
    const randomPlayerWeapon = Math.floor(Math.random() * Object.keys(weaponList).length);
    const weaponGrab = getWeaponData(randomPlayerWeapon);
    return weaponGrab;
}

function getWeaponData(weaponIndex) {
    Object.keys(weaponList).find((key) => {
        if (key == weaponIndex) {
            weaponData = weaponList[key];
        }
    });
    return weaponData;
}