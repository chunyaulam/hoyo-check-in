import { IConfig } from "../interface/IConfig.ts";
import { IScheduler } from "../interface/IScheduler.ts";

const _PATH = {
    MIHOYO_CONFIG: './config/miHoYo.json',
    HOYOLAB_CONFIG: './config/HoYoLab.json',
}

const getMiHoYoConfig = async (): Promise<IConfig> => {
    return JSON.parse(await Deno.readTextFile(_PATH.MIHOYO_CONFIG))
}

const getHoYoLabConfig = async (): Promise<IConfig> => {
    return JSON.parse(await Deno.readTextFile(_PATH.HOYOLAB_CONFIG))
}

export { getMiHoYoConfig, getHoYoLabConfig }