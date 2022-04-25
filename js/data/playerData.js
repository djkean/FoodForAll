import { getRandomName } from "../functions/getRandomFunctions.js";
//This array holds all players before they take place in an action for the round
export let playerInfo = [];
//This array holds all living players after they have taken place in an event during the round
export let playerNext = [];
//This array holds all actions done by players in the recent round
export let roundActions = [];
//This array holds all actions done by players over the course of the whole game
export let roundHistory = [];
//This list is the list used for getRandomName()
export const nameList = [
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
//This is the list used for getRandomIcon()
export const iconList = [
  "Pizza",
  "Hotdog",
  "Burger",
  "Fries",
  "Steak",
  "Egg",
  "Waffle",
  "Pie",
];
//These are all the weapons in the game and their stats
export const weaponList = {
  0: { name: "Pizza Cutter", attack: 20, strongAgainst: "Pizza" },
  1: { name: "Spatula", attack: 20, strongAgainst: "Egg" },
  2: { name: "Butter Knife", attack: 20 },
  3: { name: "Steak Knife", attack: 20, strongAgainst: "Steak" },
  4: { name: "Fry Press", attack: 20, strongAgainst: "Fries" },
  5: { name: "Pie Server", attack: 20, strongAgainst: "Pie" },
  6: { name: "Waffle Iron", attack: 20, strongAgainst: "Waffle" },
};
// This the the function that handles manually creating new players
export const addNewPlayer = (playerName, playerIcon, playerWeapon) => {
  if (playerInfo.length < 20 && playerName == "") {
    playerInfo.push({
      name: getRandomName(nameList),
      icon: playerIcon,
      health: 100,
      attack: 20,
      weapon: playerWeapon,
    });
  } else if (playerInfo.length < 20) {
    playerInfo.push({
      name: playerName,
      icon: playerIcon,
      health: 100,
      attack: 20,
      weapon: playerWeapon,
    });
  } else {
    document.getElementById("inputButton").disabled = true;
    document.getElementById("createRandomPlayer").disabled = true;
    document.getElementById("createRandomPlayer").innerText =
      "Max Players (20) Achieved";
  }
}
// This is for displaying players. Uses a table to proportionally show players and their values
export const showPlayers = (players) => {
  const playerCount = document.getElementById("playerCount");
  playerCount.innerHTML = " ";
  for (const [index, player] of players.entries()) {
    const table = document.createElement("table");
    const trImage = document.createElement("tr");
    const thImage = document.createElement("th");
    thImage.setAttribute("colspan", 2);
    const button = document.createElement("button");
    button.onclick = () => removePlayer(index);
    const playerImage = document.createElement("img");
    playerImage.setAttribute("class", "foodDudes");
    playerImage.setAttribute("src", `images/${player.icon}.png`);
    playerImage.setAttribute("width", "96");
    playerImage.setAttribute("height", "96");
    playerImage.setAttribute("alt", "a delicious looking picture of food");
    const weaponImage = document.createElement("img");
    weaponImage.setAttribute("class", "foodDudesWeapon");
    weaponImage.setAttribute("src", `images/${player.weapon.name}.png`);
    weaponImage.setAttribute("width", "30");
    weaponImage.setAttribute("height", "30");
    weaponImage.setAttribute("alt", "a very dangerous looking weapon for your food");
    trImage.appendChild(thImage);
    thImage.appendChild(button);
    button.appendChild(playerImage);
    thImage.appendChild(weaponImage);
    table.appendChild(trImage);

    const trName = document.createElement("tr");
    const thName = document.createElement("th");
    thName.setAttribute("colspan", 2);
    thName.innerText = player.name;
    trName.appendChild(thName);
    table.appendChild(trName);

    const trHealth = document.createElement("tr");
    const thHealth = document.createElement("th");
    thHealth.innerText = "Health: ";
    const tdHealth = document.createElement("td");
    tdHealth.innerText = player.health;
    trHealth.appendChild(thHealth);
    trHealth.appendChild(tdHealth);
    table.appendChild(trHealth);

    const trWeaponAttack = document.createElement("tr");
    table.appendChild(trWeaponAttack);

    const thWeaponAttack = document.createElement("th");
    thWeaponAttack.innerText = "Attack: ";
    const tdWeaponAttack = document.createElement("td");
    tdWeaponAttack.innerText = player.weapon.attack;
    trWeaponAttack.appendChild(thWeaponAttack);
    trWeaponAttack.appendChild(tdWeaponAttack);
    const trWeaponName = document.createElement("tr");
    table.appendChild(trWeaponName);

    const thWeaponName = document.createElement("th");
    thWeaponName.innerText = "Weapon: ";
    const tdWeaponName = document.createElement("td");
    tdWeaponName.innerText = player.weapon.name;
    trWeaponName.appendChild(thWeaponName);
    trWeaponName.appendChild(tdWeaponName);
    playerCount.appendChild(table);
  }
}
export const removePlayer = (index) => {
  if (confirm("Delete this player?")) {
    document.getElementById("inputButton").disabled = false;
    document.getElementById("createRandomPlayer").disabled = false;
    document.getElementById("createRandomPlayer").innerText =
      "Create Random Player";
    playerInfo.splice(index, 1);
    showPlayers(playerInfo);
  }
}
//REMOVE ONCE DONE CONVERTING innerHTML to createElement() for showPlayers()!!!!
window.removePlayer = removePlayer;
/* This function will pushes the existing surviving players back into the array that lets them use actions again
If 0 or 1 player(s) are left the game is over. */
export const nextRound = () => {
  if (playerInfo.length + playerNext.length <= 1) {
    alert("Game Over!");
    showHistory();
  } else {
    playerInfo = playerNext;
    showPlayers(playerInfo);
    playerNext = [];
    roundHistory.push(roundActions);
    roundActions = [];
  }
}
//Handles looping through the arrays for the text of the objects and displaying them at the end of the game
export const showHistory = () => {
  const titleElement = document.createElement("p");
  titleElement.textContent = "Game History:";
  document.getElementById("historyTitle").appendChild(titleElement);
  for (const round of roundHistory) {
    for (const [index, roundAction] of round.entries()) {
      const roundElement = document.createElement("p");
      roundElement.textContent = roundAction.text;
      document.getElementById("showHistory").appendChild(roundElement);
    }
  }
}