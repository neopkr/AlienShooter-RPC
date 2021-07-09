# AlienShooter-RPC
Discord Rich Presence for Alien Shooter (STEAM VERSION). I made this for one of my favorite games and i planning to do with all aliens shooters.
DISCLAIMER: This is a own proyect without license of SIGMA-TEAM.
# For NO-STEAM users
In rpc.js more especific:
```sh
const file = "C:\\Program Files (x86)\\Steam\\steamapps\\common\\Alien Shooter\\saves\\save.ini";
```
Select your save.ini in your game directory and test, any bugs or problems with no-steam version send it in Issues.
# Installing
* This app require NodeJS.
* If you have problems opening the app try to:
* - Open the game before the app
* - Install NodeJS
# How works:
First took the save.ini file in ```saves/save.ini``` and grab the data from there. All the data update while the game is open except in this case:
- When you go to main menu in a campaign level the .ini file don't update anything, so in RPC should say you still in the level when you are in the main menu.
# Alpha Release
*IMPORTANT*: this is the first release of this proyect, may containt a lot of bugs or errors.
