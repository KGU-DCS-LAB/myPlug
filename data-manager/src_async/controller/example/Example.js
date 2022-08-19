export default class Example {
    constructor(){
        console.log('프로그램을 실행합니다.')
    }

    run () {
        console.log('Node.js + MongoDB Only')
        this.next()
    }

    next () {
        console.log('--------------------')
    }

}