const fs = require('fs');
const ini = require('ini');
const exec = require('child_process').exec;
const RPC = require('discord-rpc');
const rpc = new RPC.Client({
    transport: "ipc"
})

var timeStamp = Date.now() / 1000 | 0;

const isRunning = (query, cb) => {
    let platform = process.platform;
    let cmd = '';
    switch (platform) {
        case 'win32' : cmd = `tasklist`; break;
        case 'darwin' : cmd = `ps -ax | grep ${query}`; break;
        case 'linux' : cmd = `ps -A`; break;
        default: break;
    }
    exec(cmd, (err, stdout, stderr) => {
        cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
    });
}

class Info
{
    constructor(level, levelText, PlayerScores, state, time, money)
    {
        this.levelText = levelText,
        this.level = level,
        this.PlayerScores = PlayerScores,
        this.state = state,
        this.time = time,
        this.money = money
    }
}

const info = new Info("","","", "", "", "");

rpc.on('ready', () => {
    isRunning('AlienShooter.exe', (run) => {
        if (run === true)
        {
            setInterval(function(){
                const file = "C:\\Program Files (x86)\\Steam\\steamapps\\common\\Alien Shooter\\saves\\save.ini";
                const FILE = ini.parse(fs.readFileSync(file, 'utf-8'));
                info.PlayerScores = FILE.CAMPAIGN.PlayerScores;
                info.money = FILE.CAMPAIGN.PlayerMoney;
                info.level = FILE.common.LevelNumber;
                var scoreSurvival = FILE.common.SurviveScores1;
                async function level(){
                    if (info.level === "-9")
                    {
                        info.levelText = "On Main Menu";
                        info.state = "Idle.";
                        info.time = "";
                    }
                    if (info.level === "-10")
                    {
                        info.levelText = "In Survival Mode";
                        info.state = `Max-Score: ${scoreSurvival}`;
                        info.time = timeStamp;
                    }
                    if (info.level === "1" || info.level === "2" || info.level === "3" || info.level === "4" || info.level === "5" || info.level === "6" || info.level === "7" || info.level === "8" || info.level === "9" || info.level === "10" || info.level === "11")
                    {
                        info.levelText = "In Campaign";
                        info.time = timeStamp;
                    }
                }
                async function state()
                {
                    if(info.levelText === "In Campaign")
                    {
                        info.state = "In Level: " + info.level + " | Score: " + info.PlayerScores;
                    }
                }
                level()
                state()
                rpc.setActivity({
                    details: info.levelText,
                    state: info.state,
                    startTimestamp: info.time,
                    largeImageKey: "as",
                    largeImageText: "Alien Shooter",
                    smallImageKey: "alien",
                    smallImageText: "Money: " + info.money
                })
                
                isRunning('AlienShooter.exe', (quit) => {
                    if (quit === false)
                    {
                        console.log("Game Exiting... Exiting RPC.");
                        rpc.destroy();
                        process.exit();
                    }
                })
            }, 2000); // 15e3
            console.log('RPC Connected!');
        }
        else
        {
            console.log("Game is not running, open the game and restart the RPC");
            process.exit()
        }
    })
})

rpc.login({
    clientId: "862908381760585730"
})