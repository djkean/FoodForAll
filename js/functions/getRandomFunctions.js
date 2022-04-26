import { playerInfo, nameList, iconList, weaponList } from "../data/playerData.js"

export const getRandomName = () => {
  return Math.floor(Math.random() * nameList.length);
}

export const getRandomIcon = () => {
  return Math.floor(Math.random() * iconList.length);
}
//Gets a random weapon from the object list
export const getRandomWeapon = () => {
  const randomPlayerWeapon = Math.floor(
    Math.random() * Object.keys(weaponList).length
  );
  const weaponGrab = weaponList[randomPlayerWeapon.toString()];
  return weaponGrab;
}
//Gets the values from a weapon via the object list
export const getWeaponData = (weaponIndex) => {
  Object.keys(weaponList).find((key) => {
    if (key == weaponIndex) {
      return weaponList[key];
    }
  });
}

export const getRandomPlayer = () => {
  const rolledPlayerIndex = Math.floor(
    Math.random() * Object.keys(playerInfo).length
  );
  const rolledPlayer = playerInfo.splice(rolledPlayerIndex, 1)[0];
  return rolledPlayer;
}
