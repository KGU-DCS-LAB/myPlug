import { StationLogs } from "../../models/StationLogs.js";


export const init = async (region, date, raw_data, page) => {
    let logsForBulk = []
    console.log("[" + page + "] 로그 저장 시작");
    console.log(page, date, raw_data.length)
    let logs = await StationLogs.find({
        $and: [
            { week: { $eq: date.week } },
            { region: { $eq: region } },
            { statId: { "$in": raw_data.map((data)=>data.statId) } }
        ]
    }, '_id')
    console.log('raw data size : ' + raw_data.length)
    console.log('prev logs size ' + page + ' : ' + logs.length)
    raw_data.map((raw) => {
        const index = logs.findIndex((item) => {
            return (item._id == raw.statId+raw.chgerId)
        })
        if (index===-1) {
            logsForBulk.push(addDefaultLogJSON(region, date, raw));
        }
    })
    console.log('next logs size ' + page + ' : ' + logsForBulk.length)

    await addDefaultLogs(page, logsForBulk);
    
    // 여기서 시간별 업데이트가 필요함 (제작중)
    logsForBulk = [];
    raw_data.filter((data)=>data.stat==3).map((data)=>{
        // logsForBulk.push(addStat3LogJSON(data.statId + '' + data.chgerId));
    })

    return null;
}

const addStat3LogJSON = (logId) => {
    const doc = {
        'updateOne': {
            'filter': { _id: { $eq: logId } },
            'update': {

            },
        }
    }
    return doc;
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
    "0": 0, "1": 0, "2": 0, "3": 0,
    "4": 0, "5": 0, "6": 0, "7": 0,
    "8": 0, "9": 0, "10": 0, "11": 0,
    "12": 0, "13": 0, "14": 0, "15": 0,
    "16": 0, "17": 0, "18": 0, "19": 0,
    "20": 0, "21": 0, "22": 0, "23": 0
}

const addDefaultLogs = async (page, logs) => {
    console.log('>> Logs ' + page + ' 정보 업데이트 중 ...')
    await StationLogs.bulkWrite(logs).then(bulkWriteOpResult => {
        console.log('>> Logs ' + page + ' BULK update OK : ' + logs.length);
    }).catch(err => {
        console.log('>> Logs ' + page + ' BULK update error');
        console.log(JSON.stringify(err));
    });
    return null;
}

const day = ['일', '월', '화', '수', '목', '금', '토'];