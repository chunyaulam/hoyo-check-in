export interface IGame {
    code: string
    name: string
    enabled: boolean
    url: string
    cookie: string
    actId: string
}
export interface IScheduler {
    enabled: boolean
    expression: string
}
export interface IConfig {
    platform: string
    cookie: string
    scheduler: IScheduler
    games: IGame[]
}