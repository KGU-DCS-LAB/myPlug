import * as receiver from './controller/manager/receiver.js'
import * as saver from './controller/manager/saver.js'
import * as logger from './controller/manager/logger.js'
// Using ES6 imports
import mongoose from 'mongoose';

export const run = async () => {

    //  Mongoose Connection
    await mongoose.connect(`mongodb+srv://gabrielyoon7:0000@gabrielyoon7.aq0fu.mongodb.net/myplug?retryWrites=true&w=majority`, {})
        .then(() => console.log('MongoDB Connected!!'))
        .catch(err => console.log(err))

    const date = await makeDateJSON(new Date());
    await receiver.init(date);
    console.log('작업 끝');

}

// 우리가 봐 온것 처럼, Garbage collection은 복잡한 프로세스이고 그리고 유효한 코드가 메모리를 야기시키게 할 수 있다. 
// 크롬 디벨로퍼 툴에서 제공되는 기능들을 이용해서 메모리 누수의 근원을 찾을 수 있다. 
// 그리고 당신의 어플리케이션안에 그러한 기능을 넣게 되면, 문제가 발생했을 때 해결할 수 있는 모든 것을 갖게 된다. 그러나 한가지 의문이 남는다.
// 우리는 어떻게 이 문제를 해결 할 수 있을까? 이것은 간단하다. 단순히 함수 맨 마지막에 theThing = null을 넣는 것이다. 그러면 당신의 시간을 아낄 수 있을 것이다.

const makeDateJSON = (date) => {
    // 모든 작업에서 사용할 공통된 Date 정보 (모든 메소드에서 시간을 통일하기 위한 조치)
    const day = ['일', '월', '화', '수', '목', '금', '토'];
    const dateJSON = {
        date: date,
        week: date.getFullYear() + '' + date.getWeek(),
        day: day[date.getDay()],
        hour: date.getHours()
    }
    return dateJSON;
}

const updateVersion = (date, rawDataCount, stationsCount, chargersCount) => {
    // 업데이트 기록을 남기기 위한 메소드
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