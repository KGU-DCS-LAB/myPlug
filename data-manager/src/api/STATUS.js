let logs = [];
// let maxRegions = 0;

export const addStatus = (result) => {
    logs.push(result);
    logs.sort();
    console.log('******************************');
    console.log('완료된 작업 명단')
    // console.log('완료된 작업 ('+logs.length+'/'+maxRegions+')');
    console.log(logs);
    console.log('******************************');
}

export const addRegions = () => {
    // maxRegions+=1;
}

/**
 * 마지막으로 작업한 상태 로그를 초기화하기 위한 메소드
 */
export const initStatus = () => {
    logs = [];
    // maxRegions = 0;
}