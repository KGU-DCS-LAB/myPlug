import { StationLogs } from "../../models/StationLogs.js";

let logs = []
let logsForBulk = []

export const init = async (date, raw_data) => {
    console.log(date)
    logs = await StationLogs.find({ week: { $eq: date.week } })
    console.log('prev logs size : '+logs.length)
    raw_data.map((raw) => {
        if (!findLogsById(raw)) {
            addDefaultLogJSON(raw, date);
        }
    })
    console.log('next logs size : '+logsForBulk.length)
    // 여기서 시간별 업데이트가 필요함
    await updateLogs(logsForBulk);
}

const findLogsById = (raw) => {
    let val = logs.find((item) => {
        return (item.statId == raw.statId && item.chgerId == raw.chgerId)
    })
}

const addDefaultLogJSON = (raw, date) => {
    const upsertDoc = {
        'updateOne': {
            'filter': { _id: { $eq: raw.statId + '' + raw.chgerId } },
            'update': {
                "_id": raw.statId + '' + raw.chgerId,
                "statId": raw.statId,
                "chgerId": raw.chgerId,
                "week": date.week,
                "logs": {
                    "mon": defaultTimeTable,
                    "tue": defaultTimeTable,
                    "wed": defaultTimeTable,
                    "thu": defaultTimeTable,
                    "fri": defaultTimeTable,
                    "sat": defaultTimeTable,
                    "sun": defaultTimeTable
                }
            },
            'upsert': true
        }
    }
    logsForBulk.push(upsertDoc)
}

const defaultTimeTable = {
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
    "10": 0,
    "11": 0,
    "12": 0,
    "13": 0,
    "14": 0,
    "15": 0,
    "16": 0,
    "17": 0,
    "18": 0,
    "19": 0,
    "20": 0,
    "21": 0,
    "22": 0,
    "23": 0
}

const updateLogs = async (logs) => {
    console.log('[logs] 정보 업데이트 중 ...')
    await StationLogs.bulkWrite(logs).then(bulkWriteOpResult => {
        console.log('[logs] BULK update OK : '+logs.length);
    }).catch(err => {
        console.log('[logs] BULK update error');
        console.log(JSON.stringify(err));
    });
    console.log('[logs] 데이터 입력 완료!')
}

const day = ['일', '월', '화', '수', '목', '금', '토'];