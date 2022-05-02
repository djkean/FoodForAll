import { playerInfo, playerNext, nameList, iconList, weaponList, addNewPlayer, removePlayer, showPlayers, nextRound, roundActions } from "./data/playerData.js"
import { getRandomName, getRandomIcon, getRandomWeapon, getRandomPlayer } from "./functions/getRandomFunctions.js"
import { createBattleAction, createHealAction, createInjuryAction } from "./functions/createActionFunctions.js"

document.getElementById("Dismiss").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("About").style.display = "none";
});

document.getElementById("createRandomPlayer").addEventListener("click", (e) => {
  e.preventDefault();
  createRandomPlayer();
});

document.getElementById("addNewPlayer").addEventListener("submit", (e) => {
  e.preventDefault();
  const playerName = document.getElementById("playerName").value;
  const playerIcon = document.getElementById("playerClass").value;
  const playerWeaponKey = document.getElementById("weaponClass").value;
  const playerWeapon = weaponList[playerWeaponKey];
  addNewPlayer(playerName, playerIcon, playerWeapon);
  showPlayers(playerInfo);
    if (playerInfo <= 2) {
      document.getElementById("beginGame").innerText = "Begin Game";
    }
});

document.getElementById("beginGame").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("nextRound").style.display = "none";
  document.getElementById("About").style.display = "none";
  beginGame();
});

document.getElementById("beginRound").addEventListener("click", async (e) => {
  e.preventDefault();
  if (playerInfo.length + playerNext.length <= 1) {
    document.getElementById("nextRound").style.display = "none";
    document.getElementById("beginRound").style.disabled = true;
    document.getElementById("beginRound").innerText = "Game Over!";
    showPlayers(playerInfo); 
  } else {
    document.getElementById("nextRound").style.display = "block";
    document.getElementById("beginRound").style.display = "none";
    while (playerInfo.length >= 1) {
      playerEvent();
    }
    showPlayers(playerNext); 
  }
});

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

function createRandomPlayer(createAmountPlaceholder = null) {
  const randomPlayerName = nameList[getRandomName()];
  const randomPlayerIcon = iconList[getRandomIcon()];
  const randomPlayerWeapon = getRandomWeapon();
  addNewPlayer(randomPlayerName, randomPlayerIcon, randomPlayerWeapon);
  showPlayers(playerInfo);
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
//1 is battle, 2 is heal, 3 is injury
function eventRoll() {
  const rollNumber = Math.random();
  if (playerInfo.length < 2) {
    if (rollNumber < 0.5) return 2;
    else return 3;
  } else {
    if (rollNumber < 0.6) return 1;
    else if (rollNumber < 0.8) return 2;
    else return 3;
  }
}

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
