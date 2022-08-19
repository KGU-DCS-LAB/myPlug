import { StationLogs } from "../../models/StationLogs.js";


export const init = async (region, date, raw_data) => {
    let logsForBulk = []
    console.log('--' + region + ' logger--')
    console.log(region)
    console.log(date)
    console.log(raw_data.length)
    let logs = await StationLogs.find({$and: [
        { week: { $eq: date.week } },
        { region: { $eq: region } },
    ]})
    console.log('prev logs size : ' + logs.length)
    raw_data.map((raw) => {
        if (!findLogsById(logs, raw)) {
            logsForBulk.push(addDefaultLogJSON(region, date, raw));
        }
    })
    console.log('next logs size : ' + logsForBulk.length)
    // 여기서 시간별 업데이트가 필요함
    let ul = await updateLogs(region, logsForBulk);
    ul = null;
    logsForBulk = [];
    console.log('굳바이 : '+region)
    return null;
}

const findLogsById = (logs, raw) => {
    let val = logs.find((item) => {
        return (item.statId == raw.statId && item.chgerId == raw.chgerId)
    })
}

const addDefaultLogJSON = (region, date, raw) => {
    const upsertDoc = {
        'updateOne': {
            'filter': { _id: { $eq: raw.statId + '' + raw.chgerId } },
            'update': {
                "_id": raw.statId + '' + raw.chgerId,
                "statId": raw.statId,
                "chgerId": raw.chgerId,
                "week": date.week,
                "region": region,
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
    return upsertDoc;
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

const updateLogs = async (region, logs) => {
    console.log('[logs ' + region + '] 정보 업데이트 중 ...')
    await StationLogs.bulkWrite(logs).then(bulkWriteOpResult => {
        console.log('[logs ' + region + '] BULK update OK : ' + logs.length);
    }).catch(err => {
        console.log('[logs ' + region + '] BULK update error');
        console.log(JSON.stringify(err));
    });
    console.log('[logs ' + region + '] 데이터 입력 완료!')
    return null;
}

const day = ['일', '월', '화', '수', '목', '금', '토'];