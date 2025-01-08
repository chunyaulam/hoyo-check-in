export interface IGame {
    platform: string
    code: string
    name: string
    enable: boolean
    url: string
    actId: string
}

export interface ICookie {
    miHoYo: string
    hoYoLab: string
}

export interface IConfig {
    games: IGame[]
    cookie: ICookie
}