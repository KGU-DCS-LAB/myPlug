import * as receiver from './controller/manager/receiver.js'
import * as saver from './controller/manager/saver.js'
import * as logger from './controller/manager/logger.js'

// Using ES6 imports
import mongoose from 'mongoose';

export const run = async () => {

    await mongoose.connect(`mongodb+srv://gabrielyoon7:0000@gabrielyoon7.aq0fu.mongodb.net/myplug?retryWrites=true&w=majority`, {})
    .then(() => console.log('MongoDB Connected!!'))
    .catch(err => console.log(err))

    const date = new Date();
    console.log(date);

    const raw_data = await receiver.init();
    console.log('raw data : '+raw_data.length);

    await saver.init(date, raw_data);
    await logger.init(date, raw_data);

    // await logger.init(date, []);

}

// 우리가 봐 온것 처럼, Garbage collection은 복잡한 프로세스이고 그리고 유효한 코드가 메모리를 야기시키게 할 수 있다. 
// 크롬 디벨로퍼 툴에서 제공되는 기능들을 이용해서 메모리 누수의 근원을 찾을 수 있다. 
// 그리고 당신의 어플리케이션안에 그러한 기능을 넣게 되면, 문제가 발생했을 때 해결할 수 있는 모든 것을 갖게 된다. 그러나 한가지 의문이 남는다.
// 우리는 어떻게 이 문제를 해결 할 수 있을까? 이것은 간단하다. 단순히 함수 맨 마지막에 theThing = null을 넣는 것이다. 그러면 당신의 시간을 아낄 수 있을 것이다.