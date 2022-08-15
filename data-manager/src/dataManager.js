import * as receiver from './controller/manager/receiver.js'
// Using ES6 imports
import mongoose from 'mongoose';

export const run = async () => {

    await mongoose.connect(`mongodb+srv://gabrielyoon7:0000@gabrielyoon7.aq0fu.mongodb.net/myplug?retryWrites=true&w=majority`, {})
    .then(() => console.log('MongoDB Connected!!'))
    .catch(err => console.log(err))

    await receiver.init();
}

