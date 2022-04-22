import { playerInfo, playerNext, nameList, iconList, weaponList, addNewPlayer, removePlayer, showPlayers, nextRound, roundActions } from "./data/playerData.js"
import { getRandomName, getRandomIcon, getRandomWeapon, getRandomPlayer } from "./functions/getRandomFunctions.js"
import { createBattleAction, createHealAction, createInjuryAction } from "./functions/createActionFunctions.js"

document.getElementById("createRandomPlayer").addEventListener("click", (e) => {
  e.preventDefault();
  createRandomPlayer();
});

document.getElementById("addNewPlayer").addEventListener("submit", (e) => {
  e.preventDefault();
  const playerName = document.getElementById("playerName").value;
  const playerIcon = document.getElementById("playerClass").value;
  const playerWeaponKey = document.getElementById("weaponClass").value;
  const playerWeapon = weaponList[playerWeaponKey.toString()];
  addNewPlayer(playerName, playerIcon, playerWeapon);
  showPlayers(playerInfo);
});

document.getElementById("beginGame").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("nextRound").style.display = "none";
  beginGame();
});
//Loops until every player has done something this round
document.getElementById("beginRound").addEventListener("click", async (e) => {
  e.preventDefault();
  document.getElementById("nextRound").style.display = "block";
  document.getElementById("beginRound").style.display = "none";
while (playerInfo.length >= 1) {
    playerEvent();
  }
  showPlayers(playerNext);
});
/* When starting a new round this clears the past round events in order to make room for the new one
In the future the "history" of the round(s) will be saved in order to show all the events that ocurred
in chronological order at the end of the game. */
document.getElementById("nextRound").addEventListener("click", (e) => {
  e.preventDefault();
  nextRound();
  document.getElementById("beginRound").style.display = "block";
  document.getElementById("nextRound").style.display = "none";
  const actionLength = document.getElementsByClassName("actionContainer");
  while (actionLength.length > 0) {
    actionLength[0].remove();
  }
});

window.onload = function () {
  document.getElementById("Page2").style.display = "none";
};
//Creates a player by randomizing name, icon, and weapon
function createRandomPlayer(createAmountPlaceholder = null) {
  const randomPlayerName = nameList[getRandomName()];
  const randomPlayerIcon = iconList[getRandomIcon()];
  const randomPlayerWeapon = getRandomWeapon();
  addNewPlayer(randomPlayerName, randomPlayerIcon, randomPlayerWeapon);
  showPlayers(playerInfo);
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
//This function is a random number generator. The number determines the event used
function eventRoll() {
  const rollNumber = Math.random();
  if (playerInfo.length < 2) {
    if (rollNumber < 0.5) return 2; //this is heal
    else return 3; //this is injury
  } else {
    if (rollNumber < 0.6) return 1; //this is battle
    else if (rollNumber < 0.8) return 2; //this is heal
    else return 3; //this is injury
  }
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
      const enemyImage = document.createElement("img");
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
  text.classList.add("roundText");
  text.innerText = action.text;
  container.appendChild(text);
  
  document.getElementById("actionLog").appendChild(container);
}
//Tells the game what to do with the player and event when they are rolled
function playerEvent() {
  const event = eventRoll();
  const player = getRandomPlayer();
  let action;
  if (event == 1) {
    const enemy = getRandomPlayer();
    action = createBattleAction(player, enemy);
  } else if (event == 2) {
    action = createHealAction(player);
  } else {
    action = createInjuryAction(player);
  }
  renderAction(action);
  console.log(action, playerInfo, playerNext);
  showPlayers(playerInfo);
  roundActions.push(action);
  return player, event;
}
