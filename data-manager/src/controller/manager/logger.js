import { StationLogs } from "../../models/StationLogs.js";


export const init = async (date, raw_data) => {
    console.log(date)
    console.log(raw_data.length);
    let result = await StationLogs.find()
    console.log('result.length : '+result.length)
}

const day = ['일', '월', '화', '수', '목', '금', '토'];