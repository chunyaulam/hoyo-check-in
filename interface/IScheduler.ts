export interface ISchedulerPlatform {
    name: string
    enabled: boolean,
    expression: string
}

export interface IScheduler {
    platform: ISchedulerPlatform[]
}