import constant from "./const.json" with { type: "json" }
import { ICookie } from "./interface/IConfig.ts";
import { IConfig, IGame } from "./interface/IConfig.ts";

const CONFIG_PATH = './config.json'

const getConfig = async (): Promise<IConfig> => {
  return JSON.parse(await Deno.readTextFile(CONFIG_PATH))
}

const getEnabledGameList = (config: IConfig): IGame[] => {
  const gameList = config.games.filter(game => game.enable)

  console.log(`\n============== Enabled Game Count: ${gameList.length} ===============`)
  if (gameList.length > 0) {
    gameList.forEach((game, index) => console.log(`[${index + 1}] ${game.platform} - ${game.name}`))
  }
  return gameList
}


const dailyCheckInTask = async () => {
  const config = await getConfig()
  const gameList = getEnabledGameList(config)

  if (gameList.length > 0) {
    gameList.forEach(game => dailyCheckIn(game, config.cookie))
  }

}

const dailyCheckIn = async (game: IGame, cookie: ICookie) => {
  console.log(`\n============== Start of Check-In ${game.platform} - ${game.name} ===============`)

  const response = await fetch(
    game.url,
    {
      method: "POST",
      headers: {
        'Cookie':
          game.platform === constant.platform.miHoYo.name ? cookie.miHoYo : cookie.hoYoLab
      },
      body: JSON.stringify({ act_id: game.actId })
    }
  )

  if (response.ok) {
    const responseJson = await response.json()
    console.log(responseJson)
  }

  console.log(`=============== End of Check-In ${game.platform} - ${game.name} ================\n`)
}

Deno.cron("Sample cron job", "*/1 * * * *", () => {
  console.log("This will run every 1 minute");
  dailyCheckInTask()
});

// dailyCheckInTask()