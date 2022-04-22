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
  1: { name: "Spatula", attack: 22, strongAgainst: "Egg" },
  2: { name: "Butter Knife", attack: 25 },
  3: { name: "Steak Knife", attack: 23, strongAgainst: "Steak" },
  4: { name: "Fry Press", attack: 24, strongAgainst: "Fries" },
  5: { name: "Pie Server", attack: 21, strongAgainst: "Pie" },
  6: { name: "Waffle Iron", attack: 26, strongAgainst: "Waffle" },
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
  for (const round of roundHistory) {
    for (const [index, roundAction] of round.entries()) {
      const roundElement = document.createElement("p");
      roundElement.textContent = roundAction.text;
      document.getElementById("showHistory").appendChild(roundElement);
    }
  }
}