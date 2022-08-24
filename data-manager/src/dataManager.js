import * as receiver from './controller/manager/receiver.js'
import * as saver from './controller/manager/saver.js'
import * as logger from './controller/manager/logger.js'
// Using ES6 imports
import mongoose from 'mongoose';

/**
 * 데이터 작업을 지시하는 함수
 * */
export const run = async () => {
    let start = new Date();  // 시간 측정 시작
    //  Mongoose Connection (여기서만 해주면 전역 설정 됨)
    await mongoose
        .connect(`mongodb+srv://gabrielyoon7:0000@gabrielyoon7.aq0fu.mongodb.net/myplug?retryWrites=true&w=majority`, {})
        .then(() => console.log('MongoDB Connected!!'))
        .catch(err => console.log(err));
    const date = await makeDateJSON(new Date());
    await receiver.init(date); //데이터 수집 시작
    console.log('작업 끝');
    let end = new Date();  // 시간 측정 종료
    console.log('걸린 시간 : ' + (end - start) + 'ms');
    return null;
}

/**
 *  모든 작업에서 사용할 공통된 Date 정보 
 * 이 데이터를 다음 함수에게 넘겨서, 일정한 Date 정보를 활용할 수 있도록 한다.
 * 원본 date, 이번 주가 몇번 째 주 인지, 요일이 언제인지, 현재 몇시인지를 미리 계산해놓은 JSON
 * @param {Date} date
 * @return JSON
 * */
const makeDateJSON = (date) => {
    const day = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const dateJSON = {
        date: date,
        week: date.getFullYear() + '' + date.getWeek(),
        day: day[date.getDay()],
        hour: date.getHours()
    }
    return dateJSON;
}

/**
 * 업데이트 기록을 남기기 위한 메소드.
 * @todo 앞선 기능들이 안정화 되면 이후에 구현 예정
 * @param {Date} date 
 * @param {int} rawDataCount 
 * @param {int} stationsCount 
 * @param {int} chargersCount 
 */
const updateVersion = (date, rawDataCount, stationsCount, chargersCount) => {
    console.log(rawDataCount)
    console.log(stationsCount)
    console.log(chargersCount)
}

/**
 * Returns the week number for this date.  dowOffset is the day of week the week
 * "starts" on for your locale - it can be from 0 to 6. If dowOffset is 1 (Monday),
 * the week returned is the ISO 8601 week number.
 * @param int dowOffset
 * @return int
 */
Date.prototype.getWeek = function (dowOffset) {
    /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

    dowOffset = typeof (dowOffset) == 'number' ? dowOffset : 0; //default dowOffset to zero
    var newYear = new Date(this.getFullYear(), 0, 1);
    var day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((this.getTime() - newYear.getTime() -
        (this.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) / 86400000) + 1;
    var weeknum;
    //if the year starts before the middle of a week
    if (day < 4) {
        weeknum = Math.floor((daynum + day - 1) / 7) + 1;
        if (weeknum > 52) {
            nYear = new Date(this.getFullYear() + 1, 0, 1);
            nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
            /*if the next year starts before the middle of
              the week, it is week #1 of that year*/
            weeknum = nday < 4 ? 1 : 53;
        }
    }
    else {
        weeknum = Math.floor((daynum + day - 1) / 7);
    }
    return weeknum;
};