import { IConfig, IGame } from "../interface/IConfig.ts";

export class DailyCheckInTask {
    private config: IConfig;

    constructor(config: IConfig) {
        this.config = config
    }

    private getEnabledGameList(): IGame[] {
        const gameList = this.config.games.filter((game) => game.enabled);

        console.log(
            `Enabled Game Count: ${gameList.length}`
        );
        if (gameList.length > 0) {
            gameList.forEach((game, index) =>
                console.log(`[${index + 1}] ${this.config.platform} - ${game.name}`)
            );
        } else {
            console.log(`No enabled game found for ${this.config.platform}`)
        }
        return gameList;
    }

    private async dailyCheckIn(game: IGame, body: any) {
        console.log(`\n============ Start of Check-In ${this.config.platform} - ${game.name} =============`)

        const response = await fetch(
            game.url,
            {
                method: "POST",
                headers: {
                    'Cookie': game.cookie
                },
                body: JSON.stringify(body)
            }
        )

        if (response.ok) {
            const responseJson = await response.json()
            console.log(responseJson)
        }

        console.log(`============= End of Check-In ${this.config.platform} - ${game.name} ===============\n`)
    }

    private async honkaiImpactDailyCheckIn(game: IGame) { }
    private async genshinImpactDailyCheckIn(game: IGame) {
        const body = { act_id: game.actId }
        await this.dailyCheckIn(game, body)
    }
    private async starRailDailyCheckIn(game: IGame) { }
    private async zenlessZoneZeroDailyCheckIn(game: IGame) {
        const body = { act_id: game.actId, lang: "en-us" }
        await this.dailyCheckIn(game, body)
    }

    private execute() {
        console.log(`\n=============== Execute Scheduled task of ${this.config.platform} ================`);
        const gameList = this.getEnabledGameList()
        if (gameList.length > 0) {
            gameList.forEach(async game => {
                switch (game.code) {
                    case 'HI3': await this.honkaiImpactDailyCheckIn(game); break;
                    case 'GI': await this.genshinImpactDailyCheckIn(game); break;
                    case 'SR': await this.starRailDailyCheckIn(game); break;
                    case 'ZZZ': await this.zenlessZoneZeroDailyCheckIn(game); break;
                    default: console.log(`No daily check-in function found for ${this.config.platform} - ${game.name}`); break;
                }
            })
        }
        console.log(`\n=========== End of Execute Scheduled task of ${this.config.platform} =============`);
    }

    public setup() {
        if (this.config.scheduler.enabled) {
            console.log(`********** Setup Scheduled task of ${this.config.platform} **********`);
            Deno.cron(this.config.platform, this.config.scheduler.expression, () => {
                this.execute()
            });

        } else {
            console.log(`********** Scheduled task of ${this.config.platform} is disabled **********`);
        }
    }
}



