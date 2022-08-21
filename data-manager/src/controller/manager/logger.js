import { StationLogs } from "../../models/StationLogs.js";


export const init = async (region, date, raw_data, page) => {
    let logsForBulk = []
    console.log("[" + page + "] 로거 시작");
    console.log('--' + page + ' logger--')
    console.log(page, date, raw_data.length)
    let logs = await StationLogs.find({
        $and: [
            { week: { $eq: date.week } },
            { region: { $eq: region } },
        ]
    }, '_id')
    // console.log(logs[0]);
    console.log('prev logs size ( ' + page + ' ) : ' + logs.length)
    raw_data.map((raw) => {
        const index = logs.findIndex((item) => {
            return (item._id == raw.statId+raw.chgerId)
        })
        if (index===-1) {
            logsForBulk.push(addDefaultLogJSON(region, date, raw));
        }
    })
    console.log('next logs size ( ' + page + ' ) : ' + logsForBulk.length)

    // 여기서 시간별 업데이트가 필요함
    await updateLogs(page, logsForBulk);
    console.log("[" + page + "] 로거 끝");
    return null;
}

// const findLogsById = (logs, raw) => {
//     logs.findIndex((item) => {
//         return (item.statId == raw.statId && item.chgerId == raw.chgerId)
//     })
// }

const addDefaultLogJSON = (region, date, raw) => {
    // console.log(raw.statId + ' | ' + raw.chgerId+' is new log!');
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
    "0": 0, "1": 0, "2": 0, "3": 0,
    "4": 0, "5": 0, "6": 0, "7": 0,
    "8": 0, "9": 0, "10": 0, "11": 0,
    "12": 0, "13": 0, "14": 0, "15": 0,
    "16": 0, "17": 0, "18": 0, "19": 0,
    "20": 0, "21": 0, "22": 0, "23": 0
}

const updateLogs = async (page, logs) => {
    console.log('[logs ' + page + '] 정보 업데이트 중 ...')
    await StationLogs.bulkWrite(logs).then(bulkWriteOpResult => {
        console.log('[logs ' + page + '] BULK update OK : ' + logs.length);
    }).catch(err => {
        console.log('[logs ' + page + '] BULK update error');
        console.log(JSON.stringify(err));
    });
    console.log('[logs ' + page + '] 데이터 입력 완료!')
    return null;
}

const day = ['일', '월', '화', '수', '목', '금', '토'];