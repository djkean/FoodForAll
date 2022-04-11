import { playerInfo, nameList, iconList, weaponList } from "../data/dataLists.js"

//This function randomly chooses a name from the nameList array when generating a name for a player
export const getRandomName = () => {
  return Math.floor(Math.random() * nameList.length);
}
//This randomly selects an image to be used as the player icon for random players
export const getRandomIcon = () => {
  return Math.floor(Math.random() * iconList.length);
}
//Uses object.keys to get a random weapon from the object list
export const  getRandomWeapon = () => {
  const randomPlayerWeapon = Math.floor(
    Math.random() * Object.keys(weaponList).length
  );
  const weaponGrab = getWeaponData(randomPlayerWeapon);
  return weaponGrab;
}
//Uses object.keys .find to get all the values from a weapon via the object list
export const getWeaponData = (weaponIndex) => {
  Object.keys(weaponList).find((key) => {
    if (key == weaponIndex) {
      return weaponList[key];
    }
  });
}
//This chooses from existing players and the rolled player is used for an event
export const getRandomPlayer = () => {
  const rolledPlayerIndex = Math.floor(
    Math.random() * Object.keys(playerInfo).length
  );
  const rolledPlayer = playerInfo.splice(rolledPlayerIndex, 1)[0];
  return rolledPlayer;
}
