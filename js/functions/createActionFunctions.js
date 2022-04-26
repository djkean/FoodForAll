import { playerNext } from "../data/playerData.js"

export const createBattleAction = (player, enemy) => {
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
    text: `${player.name} attacks with ${player.weapon.name}. ${enemy.name} now has ${enemy.health} hp
    ${enemy.name} fights back with ${enemy.weapon.name}. ${player.name} now has ${player.health} hp`,
  };
}

export const createHealAction = (player) => {
  player.health += 20;
  playerNext.push(player);
  return {
    type: "Heal",
    player,
    text: `${player.name} took a moment to rest and healed to ${player.health} health`,
  };
}

export const  createInjuryAction = (player) => {
  player.health -= 20;
  if (player.health > 0) {
    playerNext.push(player);
  }
  return {
    type: "Injury",
    player,
    text: `${player.name} sustained an injury and has fallen to ${player.health} health`,
  };
}