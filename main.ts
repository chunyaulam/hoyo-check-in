import { getMiHoYoConfig, getHoYoLabConfig } from "./src/Config.ts"
import { DailyCheckInTask } from "./src/DailyCheckInTask.ts";

getMiHoYoConfig().then(config => {
  // console.log(config)
  const miHoYoTask = new DailyCheckInTask(config)
  miHoYoTask.setup()
})

getHoYoLabConfig().then(config => {
  // console.log(config)
  const miHoYoTask = new DailyCheckInTask(config)
  miHoYoTask.setup()
})