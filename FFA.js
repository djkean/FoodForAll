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

document.getElementById("beginRound").addEventListener("click", (e) => {
  e.preventDefault();
  playerEvent();
  console.log({ playerEvent });
});

window.onload = function () {
  document.getElementById("Page2").style.display = "none";
};

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
      <img class="foodDudesWeapon" src="images/` +
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
    document.getElementById("createRandomPlayer").innerText =
      "Create Random Player";
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

function getRandomPlayer() {
  const rolledPlayerIndex = Math.floor(
    Math.random() * Object.keys(playerInfo).length
  );
  const rolledPlayer = playerInfo.splice(rolledPlayerIndex, 1)[0];
  return rolledPlayer;
}

function eventRoll() {
  const rollNumber = Math.random();
  if (rollNumber < 0.6) return 1;
  //this is battle
  else if (rollNumber < 0.8) return 2;
  //this is heal
  else return 3; //this is injury
}

function healthColor(health) {
  if (health > 80) {
    return "green";
  } else if (health > 50) {
    return "yellow";
  }
  // TODO add more colors for different health levels
  // example from jacks project:
  // https://github.com/jackharrhy/Storefront/blob/master/storefront-frontend/src/Component/Damage.js
  // its react, but it works!
}

function createBattleAction(player, enemy) {
  return {
    type: "Battle",
    player,
    enemy,
    text: `${player.name} attacked ${enemy.name} with ${player.weapon.name}`,
  };
}

function createHealthAction(player) {
  // TODO add heal action
}

function createInjuryAction(player) {
  // TODO add injury action
}

function renderAction(action) {
  switch (action.type) {
    case "Battle":
      const container = document.createElement("div");
      container.classList.add("action");

      const imageContainer = document.createElement("div");
      imageContainer.classList.add("actionImage");

      // TODO show a bar for health below each image
      // TODO _extra_ create a function that returns colors based on health

      const playerImg = document.createElement("img");
      playerImg.src = `images/${action.player.icon}.png`;
      imageContainer.appendChild(playerImg);

      const enemyImg = document.createElement("img");
      enemyImg.src = `images/${action.enemy.icon}.png`;
      imageContainer.appendChild(enemyImg);

      // TODO if the player is dead, show a red bar for health for the enemy

      container.appendChild(imageContainer);

      const text = document.createElement("p");
      text.innerText = action.text;
      container.appendChild(text);

      document.getElementById("actionLog").appendChild(container);
      break;
    case "Heal":
      // TODO fill out UI
      document.getElementById("actionLog").appendChild("heal");
      break;
    case "Injury":
      // TODO fill out UI
      document.getElementById("actionLog").appendChild("injury");
      break;
    default:
      throw new Error("unknown action!");
  }
}

// TODO within an event, you want to ensure every single player has a chance to take an action
// what you should do, don't push players into the playerInfo list after they are involved in an action
// but instead, keep a separate list that is players that have taken an action
//
// then, you need to keep consuming players from playerInfo, until there is none left
// during this time you don't actually render anything to the screen, only once you
// have a big list of actions do you render all of them at once
function playerEvent() {
  const player = getRandomPlayer();
  const event = eventRoll();
  if (event == 1) {
    const enemy = getRandomPlayer();
    player.health -= enemy.weapon.attack;
    enemy.health -= player.weapon.attack;
    playerInfo.push(player);

    // TODO if enemy health is too low, don't add
    // but if it is ok, add enemy to playerInfo

    const action = createBattleAction(player, enemy);
    renderAction(action);
  } else if (event == 2) {
    player.health += 20;
    playerInfo.push(player);
    document.getElementById("eventText").textContent +=
      player.name + " rests and heals up to " + player.health + " health.";

    // TODO create createHealAction
    // const action = createHealthAction(player);
    // TODO render a heal action within renderAction
    // renderAction(action);
  } else {
    player.health -= 20;
    playerInfo.push(player);
    document.getElementById("eventText").textContent +=
      player.name +
      " sustained an injury and has fallen to " +
      player.health +
      " health.";

    // TODO create createInjuryAction
    // const action = createInjuryAction(player);
    // TODO render a injury action within renderAction
    // renderAction(action);
  }

  showActivePlayers();

  return player, event;
}

// TODO once you get to one single player, you display the third page
// for now the third page can just be a picture of them, with the text
// '<player> wins!'
//
// you can always expand on this later

/* function battleRound(players) {
  const killedPlayer = players.pop();
  const actions = { type: "Death", text: `${killedPlayer.name} was killed`, killedPlayer };
  return [players, actions]
}
*/
