

export const init = async (date, raw_data) => {
    console.log(day[date.getDay()])
    console.log(raw_data.length);

}

const day = ['일', '월', '화', '수', '목', '금', '토'];