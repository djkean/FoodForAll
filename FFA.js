const playerInfo = [];
const nameList = [
  "bob",
  "joe",
  "mark",
  "frank",
  "billy",
  "steve",
  "fred",
  "eggbert",
  "karen",
  "lisa",
  "ashley",
  "lucy",
  "daisy",
  "amy",
  "meghan",
  "rebecca",
];
const iconList = ["Pizza", "Hotdog", "Burger", "Fries", "Steak", "Egg", "Waffle", "Pie"];
const weaponList = {
  0: { name: "Pizza Cutter", attack: 20, strongAgainst: "Pizza" },
  1: { name: "Spatula", attack: 22, strongAgainst: "Egg" },
  2: { name: "Butter Knife", attack: 25 },
  3: { name: "Steak Knife", attack: 23, strongAgainst: "Steak" },
  4: { name: "Fry Press", attack: 24, strongAgainst: "Fries" },
  5: { name: "Pie Server", attack: 21, strongAgainst: "Pie" },
  6: { name: "Waffle Iron", attack: 26, strongAgainst: "Waffle" }
};

document.getElementById("createRandomPlayer").addEventListener("click", (e) => {
  e.preventDefault();
  createRandomPlayer();
});
  
document.getElementById("addNewPlayer").addEventListener("submit", (e) => {
  e.preventDefault();
  const playerName = document.getElementById("playerName").value;
  const playerIcon = document.getElementById("playerClass").value;
  const playerWeapon = document.getElementById("weaponClass").value;
  addNewPlayer(playerName, playerIcon, playerWeapon);
  showActivePlayers();
});

document.getElementById("beginGame").addEventListener("click", (e) => {
  e.preventDefault();
  beginGame();
});

document.getElementById("beginRound").addEventListener("click", (e) => {
  e.preventDefault();
  playerEvent();
  console.log({playerEvent})
});

window.onload = function() {
  document.getElementById("Page2").style.display = "none";
}

function addNewPlayer(playerName, playerIcon, playerWeapon) {
  if (playerInfo.length < 20 && playerName == "") {
    playerInfo.push({
      name: getRandomName(nameList),
      icon: playerIcon,
      health: 100,
      attack: 20,
      weapon: getWeaponData(playerWeapon),
    });
  } else if (playerInfo.length < 20) {
    playerInfo.push({
      name: playerName,
      icon: playerIcon,
      health: 100,
      attack: 20,
      weapon: getWeaponData(playerWeapon),
    });
  } else {
    document.getElementById("inputButton").disabled = true;
    document.getElementById("createRandomPlayer").disabled = true;
    document.getElementById("createRandomPlayer").innerText = "Max Players (20) Achieved";
  }
}

function showActivePlayers() {
  const playerCount = document.getElementById("playerCount");
  playerCount.innerHTML = " ";
  for (const [index, player] of playerInfo.entries()) {
    playerCount.innerHTML +=
      `
        <table>
            <tr>
                <th colspan="2">
                    <button onclick="removePlayer(` +
      index +
      `);"> 
                        <img class="foodDudes" src="images/` +
      player.icon +
      `.png" width="96" height="96" alt="a delicious looking picture of food">
      <img class="foodDudesWeapon" src="images/`+ 
      player.weapon.name + 
      `.png" width="30" height="30" alt="a very dangerous looking weapon for your food to wield... somehow."></th>
                    </button>
                </th>
            </tr>
            <tr>
                <th colspan="2">` +
      player.name +
      `</th>
            </tr>
            <tr>
                <th>Health: </th>
                <td>` +
      player.health + 
      `</td>
            </tr>
            <tr>
                <th>Attack: </th>
                <td>` +
      player.weapon.attack +
      `</td>
            </tr>
            <tr>
                <th>Weapon: 
                  <td>` + 
      player.weapon.name +
      `</td>
            </tr>
        </table> `;
  }
}

function removePlayer(index) {
  if (confirm("Delete this player?")) {
    document.getElementById("inputButton").disabled = false;
    document.getElementById("createRandomPlayer").disabled = false;
    document.getElementById("createRandomPlayer").innerText = "Create Random Player";
    playerInfo.splice(index, 1);
    showActivePlayers();
  }
}

function createRandomPlayer(createAmountPlaceholder = null) {
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
  const randomPlayerWeapon = Math.floor(
    Math.random() * Object.keys(weaponList).length
  );
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

function beginGame() {
  if (confirm("Begin the game?") && (playerInfo.length >= 2)) {
    document.getElementById("beginGame").value;
    document.getElementById("Page1").style.display = "none";
    document.getElementById("Page2").style.display = "block";
    document.getElementById("playerCount").classList.remove("playerCountPage1");
    document.getElementById("playerCount").classList.add("playerCountPage2");
    document.body.classList.add("bodyPage2");
  }
  else {
    document.getElementById("beginGame").innerText = "You must have 2 or more players";
  }
}

function getRandomPlayer() {
  const rolledPlayerIndex = Math.floor(
  Math.random() * Object.keys(playerInfo).length);
  const rolledPlayer = playerInfo.splice(rolledPlayerIndex, 1) [0];
  return rolledPlayer;
}

function eventRoll() {
  const rollNumber = Math.random();
  if (rollNumber < 0.6)
  return 1; //this is battle 
  else if (rollNumber < 0.8)
  return 2; //this is heal
  else
  return 3; //this is injury
}

function playerEvent() { 
  const player = getRandomPlayer();
  const event = eventRoll();
  if (event == 1) {
    const enemy = getRandomPlayer();
    console.log("Battle! ", { player, enemy });
    playerInfo.push(player);
  }
  else if (event == 2) {
    player.health += 20;
    console.log("Heal ", { player });
    return player.health;
  }
  else {
    player.health -= 20;
    console.log("Injury ", { player });
    return player.health;
  }
  console.log({ player, event });

  showActivePlayers();

  return player, event;
}

/* function battleRound(players) {
  const killedPlayer = players.pop();
  const actions = { type: "Death", text: `${killedPlayer.name} was killed`, killedPlayer };
  return [players, actions]
}
*/
