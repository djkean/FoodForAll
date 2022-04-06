let playerInfo = [];
let playerNext = [];
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
const iconList = [
  "Pizza",
  "Hotdog",
  "Burger",
  "Fries",
  "Steak",
  "Egg",
  "Waffle",
  "Pie",
];
const weaponList = {
  0: { name: "Pizza Cutter", attack: 20, strongAgainst: "Pizza" },
  1: { name: "Spatula", attack: 22, strongAgainst: "Egg" },
  2: { name: "Butter Knife", attack: 25 },
  3: { name: "Steak Knife", attack: 23, strongAgainst: "Steak" },
  4: { name: "Fry Press", attack: 24, strongAgainst: "Fries" },
  5: { name: "Pie Server", attack: 21, strongAgainst: "Pie" },
  6: { name: "Waffle Iron", attack: 26, strongAgainst: "Waffle" },
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

document.getElementById("beginRound").addEventListener("click", async (e) => {
  e.preventDefault();
  const playerInfoLength = playerInfo.length
  for (let i = 0; i < playerInfoLength; i++) {
    playerEvent();
  }
});

document.getElementById("nextRound").addEventListener("click", (e) => {
  e.preventDefault();
  nextRound();
  const actionLength = document.getElementsByClassName("actionContainer")
  while (actionLength.length > 0) {
    actionLength[0].remove();
  }
})

window.onload = function() {
  document.getElementById("Page2").style.display = "none";
}
// This the the function that handles manually creating new players
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
    document.getElementById("createRandomPlayer").innerText =
      "Max Players (20) Achieved";
  }
}
// This is for displaying players. Uses a table to proportionally show players and their values
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
      `.png" width="30" height="30" alt="a very dangerous looking weapon for your food"></th>
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
    document.getElementById("createRandomPlayer").innerText =
      "Create Random Player";
    playerInfo.splice(index, 1);
    showActivePlayers();
  }
}
//Creates a player by randomizing name, icon, and weapon
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
//Uses object.keys to get a random weapon from the object list
function getRandomWeapon() {
  const randomPlayerWeapon = Math.floor(
    Math.random() * Object.keys(weaponList).length
  );
  const weaponGrab = getWeaponData(randomPlayerWeapon);
  return weaponGrab;
}
//Uses object.keys .find to get all the values from a weapon via the object list
function getWeaponData(weaponIndex) {
  Object.keys(weaponList).find((key) => {
    if (key == weaponIndex) {
      weaponData = weaponList[key];
    }
  });
  return weaponData;
}
//Function handles displaying or hiding different html values to transition to "Page2" of the game
function beginGame() {
  if (confirm("Begin the game?") && playerInfo.length >= 2) {
    document.getElementById("beginGame").value;
    document.getElementById("Page1").style.display = "none";
    document.getElementById("Page2").style.display = "block";
    document.getElementById("playerCount").classList.remove("playerCountPage1");
    document.getElementById("playerCount").classList.add("playerCountPage2");
    document.body.classList.add("bodyPage2");
  } else {
    document.getElementById("beginGame").innerText =
      "You must have 2 or more players";
  }
}
//This chooses from existing players and the rolled player is used for an event
function getRandomPlayer() {
  const rolledPlayerIndex = Math.floor(
    Math.random() * Object.keys(playerInfo).length
  );
  const rolledPlayer = playerInfo.splice(rolledPlayerIndex, 1)[0];
  return rolledPlayer;
}
//This function is a random number generator. The number determines the event used
function eventRoll() {
  const rollNumber = Math.random();
  if (playerInfo.length < 2) {
    if (rollNumber < 0.5)
    return 2; //this is heal
    else 
    return 3; //this is injury
  }
  else {
    if (rollNumber < 0.6)
    return 1; //this is battle 
    else if (rollNumber < 0.8)
    return 2; //this is heal
    else
    return 3; //this is injury
  }
}
//Handles the "battle" event where two players fight each other
function createBattleAction(player, enemy) {
  console.log(player, enemy);
  player.health -= enemy.weapon.attack;
  enemy.health -= player.weapon.attack;
  if (player.health > 0) {
    playerNext.push(player);
  }
  if (enemy.health > 0) {
    playerNext.push(enemy);
  }
  return {
    type: "Battle",
    player,
    enemy, 
    text: `${player.name} attacks with ${player.weapon.name}. 
    ${enemy.name} fights back with ${enemy.weapon.name}`, 
  };
}
//Handles the "heal" event
function createHealAction(player) {
  player.health += 20;
  playerNext.push(player);
  return {
    type: "Heal",
    player,
    text: `${player.name} took a moment to rest and healed to ${player.health} health.`, 
  };
}
//Handles the "injury" event
function createInjuryAction(player) {
  player.health -= 20;
  if (player.health > 0) {
    playerNext.push(player);
  }
  return {
    type: "Injury",
    player,
    text: `${player.name} sustained an injury and has fallen to ${player.health} health.`,
  };
}
//The function uses a switch case to handle visual display of events as they happen, via text and images
function renderAction(action) {
  const container = document.createElement("div");
  container.className = "actionContainer";
  container.classList.add("action");

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("actionImage");

  const playerImage = document.createElement("img");
  playerImage.src = `images/${action.player.icon}.png`;
  imageContainer.appendChild(playerImage);

  switch (action.type) {
    case "Battle":
      const enemyImage = document.createElement("img")
      enemyImage.src = `images/${action.enemy.icon}.png`;
      imageContainer.appendChild(enemyImage);
      break;
    case "Heal":
      break;
    case "Injury":
      break;
    default:
      console.log("nothing happened?");
  }
  container.appendChild(imageContainer);

  const text = document.createElement("p");
  text.innerText = action.text;
  container.appendChild(text);

  document.getElementById("actionLog").appendChild(container);
}
//Tells the game what to do with the player and event when they are rolled
  function playerEvent() { 
  const player = getRandomPlayer();
  const event = eventRoll();
  console.log(playerInfo, event)
  let action;
  if (event == 1) {
    const enemy = getRandomPlayer();
    action = createBattleAction(player, enemy);
    console.log(player, enemy);
  }
  else if (event == 2) {
    action = createHealAction(player);
  }
  else {
    action = createInjuryAction(player);
  }
  renderAction(action);
  console.log(action);
  console.log({playerInfo});
  console.log({playerNext});
  showActivePlayers();

  return player, event;
}
//Once complete, this function will push the existing surviving players back into the array that lets them use actions again
function nextRound() { 
  if (playerInfo.length + playerNext.length <= 1 ) {
  alert("Game Over!"); }
  else {
    playerInfo = playerNext;
    showActivePlayers();
    playerNext = [];
    console.log({playerInfo}, {playerNext})
  }
}
