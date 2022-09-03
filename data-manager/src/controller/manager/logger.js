import { StationLogs } from "../../models/StationLogs.js";

export const init = async (region, date, raw_data, page) => {
    let logsForBulk = []
    console.log(`[logger] ${page} 로그 저장 시작`);
    console.log(page, date, raw_data.length)
    let logs = await StationLogs.find({
        $and: [
            { week: { $eq: date.week } },
            { region: { $eq: region } },
            { statId: { "$in": raw_data.map((data) => data.statId) } }
        ]
    }, '_id')
    console.log(`[logger] ${page} raw data size : ${raw_data.length}`)
    console.log(`[logger] ${page} prev logs size : ${logs.length}`)
    raw_data.map((raw) => {
        const index = logs.findIndex((item) => {
            return (item._id == date.week + '' + raw.statId + '' + raw.chgerId)
        })
        if (index === -1) {
            logsForBulk.push(addDefaultLogJSON(region, date, raw));
        }
    })
    console.log(`[logger] ${page} next logs size : ${logsForBulk.length}`)

    // 신규 충전기에 대한 기본 로그 데이터를 추가해준다.
    await addDefaultLogs(page, logsForBulk);

    // 사용중인 충전기들은 요일/시간별로 로그를 업데이트 해준다.
    logsForBulk = [];
    raw_data.filter((data) => data.stat == 3).map((data) => {
        logsForBulk.push(addStat3LogJSON(date, date.week + '' + data.statId + '' + data.chgerId));
    })
    console.log(page + ' 사용중인 충전기 수 : ' + logsForBulk.length);
    await updateStat3Logs(page, logsForBulk);

    return null;
}

/**
 * 사용중인 충전기 업데이트
 * @param {*} date 
 * @param {*} logId 
 * @returns 
 */
const addStat3LogJSON = (date, logId) => {
    // https://github.com/Automattic/mongoose/issues/9268 여기 참고해서 다시 도전해보기 --> 해결
    // console.log(logId);
    const day = date.day;
    const hour = date.hour;
    const temp = 'logs.' + day + '.' + hour;
    const doc = {
        'updateOne': {
            'filter': {
                $and: [
                    { _id: { $eq: logId } },
                    { week: { $eq: date.week } },
                ],
            },
            'update': {
                $set: {
                    [temp]: 1,
                }
            },
        }
    }
    return doc;
}

/**
 * 처음 발견한 충전기에 대한 기본 로그 추가
 * @param {*} region 
 * @param {*} date 
 * @param {*} raw 
 * @returns 
 */
const addDefaultLogJSON = (region, date, raw) => {
    const upsertDoc = {
        'updateOne': {
            'filter': { _id: { $eq: date.week + '' + raw.statId + '' + raw.chgerId } },
            'update': {
                "_id": date.week + '' + raw.statId + '' + raw.chgerId,
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
    console.log(`[logger] [신규 충전소 기본 로그 추가] ${page} 기본 로그 데이터 추가 중 ...`.yellow)
    await StationLogs.bulkWrite(logs).then(bulkWriteOpResult => {
        console.log(`[logger] [신규 충전소 기본 로그 추가] ${page} MongoDB BULK update OK : ${logs.length}`.green);
    }).catch(err => {
        console.log('>> Logs [신규 충전소 기본 로그 추가] ' + page + ' BULK update error');
        console.log(JSON.stringify(err));
    });
    return null;
}

const updateStat3Logs = async (page, logs) => {
    console.log(`[logger] [사용중인 충전소 로그 업데이트] ${page} ' 사용중인 충전기 로그 업데이트 중 ...`.yellow)
    await StationLogs.bulkWrite(logs).then(bulkWriteOpResult => {
        console.log(`[logger] [사용중인 충전소 로그 업데이트] ${page} MongoDB BULK update OK : ${logs.length}`.green);
    }).catch(err => {
        console.log('>> Logs [사용중인 충전소 로그 업데이트] ' + page + ' BULK update error');
        console.log(JSON.stringify(err));
    });
    return null;
}

const day = ['일', '월', '화', '수', '목', '금', '토'];