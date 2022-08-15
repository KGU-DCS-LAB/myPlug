import * as receiver from './controller/receiver/receiver.js'
export const run = async () => {
    await receiver.init();
}

