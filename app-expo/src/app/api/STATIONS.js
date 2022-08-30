import markerGreen from '../../../assets/ev-green.png';
import markerYellow from '../../../assets/ev-yellow.png';
import markerRed from '../../../assets/ev-red.png';
import markerGray from '../../../assets/ev-gray.png';

export const sortStations = (location, stations) => {
    let temp = []
    stations?.map((station) => temp.push({
        ...station,
        ['distance']: getDistance(location?.latitude, location?.longitude, station?.lat, station?.lng)
    }))
    let sortedList = temp.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    return sortedList;
}

export const getDistance = (lat1, lon1, lat2, lon2) => {
    if ((lat1 == lat2) && (lon1 == lon2))
        return 0;

    var radLat1 = Math.PI * lat1 / 180;
    var radLat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radTheta = Math.PI * theta / 180;
    var dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    if (dist > 1)
        dist = 1;

    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344 * 1000;
    if (dist < 100) dist = Math.round(dist / 10) * 10;
    else dist = Math.round(dist / 100) * 100;

    return dist;
}

const findChargersCount = (stationsChargers, statNum) => { //특정 상태의 충전기를 찾아주는 함수
    return stationsChargers.filter((charger) => charger.stat == statNum).length
}

export const countChargers = (stations, chargers) => {
    let newStations = [];
    stations.map((station) => {
        const stationsChargers = chargers.filter((charger) => charger.statId == station.statId);
        const status1 = findChargersCount(stationsChargers, 1);
        const status2 = findChargersCount(stationsChargers, 2);
        const status3 = findChargersCount(stationsChargers, 3);
        const status4 = findChargersCount(stationsChargers, 4);
        const status5 = findChargersCount(stationsChargers, 5);
        const status9 = findChargersCount(stationsChargers, 9);
        // (1: 통신이상, 2: 충전대기, 3: 충전중, 4: 운영중지, 5: 점검중, 9: 상태미확인)
        let marker = null
        if (status3 + status2 == 0) { //정상적인 충전기가 하나도 없는 충전소
            marker = "gray";
        }
        else if (status2 == 0) { //가용 충전기가 없는 충전소
            marker = "red";
        }
        else if (status3 >= status2) { //사용중인 충전기가 50% 이상인 충전소
            marker = "yellow";
        }
        else { //이외
            marker = "green";
        }
        newStations.push({
            ...station,
            status: {
                status1: status1,
                status2: status2,
                status3: status3,
                status4: status4,
                status5: status5,
                status9: status9,
                marker: marker,
            }
        })
    })
    return newStations;
}

export const statColor = (stat) => {
    // (1: 통신이상, 2: 충전대기, 3: 충전중, 4: 운영중지, 5: 점검중, 9: 상태미확인)
    switch (stat) {
        case "1":
            return "yellow.500";
        case "2":
            return "green.500";
        case "3":
            return "red.500";
        case "4":
            return "black.500";
        case "5":
            return "yellow.500";
        default:
            return "gray.300";
    }
}

export const kind = (num) => {
    // (1: 통신이상, 2: 충전대기, 3: 충전중, 4: 운영중지, 5: 점검중, 9: 상태미확인)
    switch (num) {
        case "A0":
            return "공공시설";
        case "B0":
            return "주차시설";
        case "C0":
            return "휴게시설";
        case "D0":
            return "관광시설";
        case "E0":
            return "상업시설";
        case "F0":
            return "차량정비시설";
        case "G0":
            return "기타시설";
        case "H0":
            return "공동주택시설";
        case "I0":
            return "근린생활시설";
        case "J0":
            return "교육문화시설";
        default:
            return "미확인";
    }
}

export const kindDetail = (num) => {
    // (1: 통신이상, 2: 충전대기, 3: 충전중, 4: 운영중지, 5: 점검중, 9: 상태미확인)
    switch (num) {
        case "A001":
            return "관공서";
        case "A002":
            return "주민센터";
        case "A003":
            return "공공기관";
        case "A004":
            return "지자체시설";
        case "B001":
            return "공영주차장";
        case "B002":
            return "공원주차장";
        case "B003":
            return "환승주차장";
        case "B004":
            return "일반주차장";
        case "C001":
            return "고속도로 휴게소";
        case "C002":
            return "지방도로 휴게소";
        case "C003":
            return "쉼터";
        case "D001":
            return "공원";
        case "D002":
            return "전시관";
        case "D003":
            return "민속마을";
        case "D004":
            return "생태공원";
        case "D005":
            return "홍보관";
        case "D006":
            return "관광안내소";
        case "D007":
            return "관광지";
        case "D008":
            return "박물관";
        case "D009":
            return "유적지";
        case "E001":
            return "마트(쇼핑몰)";
        case "E002":
            return "백화점";
        case "E003":
            return "숙박시설";
        case "E004":
            return "골프장(CC)";
        case "E005":
            return "카페";
        case "E006":
            return "음식점";
        case "E007":
            return "주유소";
        case "E008":
            return "영화관";
        case "F001":
            return "서비스센터";
        case "F002":
            return "정비소";
        case "G001":
            return "군부대";
        case "G002":
            return "야영장";
        case "G003":
            return "공중전화부스";
        case "G004":
            return "기타";
        case "G005":
            return "오피스텔";
        case "G006":
            return "단독주택";
        case "H001":
            return "아파트";
        case "H002":
            return "빌라";
        case "H003":
            return "사업장(사옥)";
        case "H004":
            return "기숙사";
        case "H005":
            return "연립주택";
        case "I001":
            return "병원";
        case "I002":
            return "종교시설";
        case "I003":
            return "보건소";
        case "I004":
            return "경찰서";
        case "I005":
            return "도서관";
        case "I006":
            return "복지관";
        case "I007":
            return "수련원";
        case "I008":
            return "금융기관";
        case "J001":
            return "학교";
        case "J002":
            return "교육원";
        case "J003":
            return "학원";
        case "J004":
            return "공연장";
        case "J005":
            return "관람장";
        case "J006":
            return "동식물원";
        case "J007":
            return "경기장";
        default:
            return "미확인";
    }
}



export const chargerStat = (n) => {
    if (n == '1') { return "통신이상" }
    else if (n == '2') { return "충전대기" }
    else if (n == '3') { return "충전중" }
    else if (n == '4') { return "운영중지" }
    else if (n == '5') { return "점검중" }
    else if (n == '9') { return "상태미확인" }
    else { return "?" }
}

export const chargerType = (n) => {
    if (n == '01') { return "DC차데모" }
    else if (n == '02') { return "AC완속" }
    else if (n == '03') { return "DC차데모+AC3상" }
    else if (n == '04') { return "DC콤보" }
    else if (n == '05') { return "DC차데모+DC콤보" }
    else if (n == '06') { return "DC차데모+AC3상+DC콤보" }
    else if (n == '07') { return "AC3상" }
    else { return "?" }
}

export const statTextAvatar = (stat) => {
    // (1: 통신이상, 2: 충전대기, 3: 충전중, 4: 운영중지, 5: 점검중, 9: 상태미확인)
    switch (stat) {
        case "1":
            return "이상";
        case "2":
            return "대기중";
        case "3":
            return "충전중";
        case "4":
            return "중단";
        case "5":
            return "점검중";
        default:
            return "미확인";
    }
}
export const statText = (stat) => {
    // (1: 통신이상, 2: 충전대기, 3: 충전중, 4: 운영중지, 5: 점검중, 9: 상태미확인)
    switch (stat) {
        case "1":
            return "통신이상";
        case "2":
            return "충전대기";
        case "3":
            return "충전중";
        case "4":
            return "운영중지";
        case "5":
            return "점검중";
        default:
            return "상태미확인";
    }
}
export const markerImage = (station) => {
    const using = station.status.status3;
    const available = station.status.status2;
    if (using + available == 0) { //정상적인 충전기가 하나도 없는 충전소
        return markerGray;
    }
    else if (available == 0) { //가용 충전기가 없는 충전소
        return markerRed;
    }
    else if (using >= available) { //사용중인 충전기가 50% 이상인 충전소
        return markerYellow;
    }
    else { //이외
        return markerGreen;
    }
}

export const zCode  = [
    {
        value: '11',
        label: '서울특별시'
    },
    {
        value: '26',
        label: '부산광역시'
    },
    {
        value: '27',
        label: '대구광역시'
    },
    {
        value: '28',
        label: '인천광역시'
    },
    {
        value: '29',
        label: '광주광역시'
    },
    {
        value: '30',
        label: '대전광역시'
    },
    {
        value: '31',
        label: '울산광역시'
    },
    {
        value: '36',
        label: '세종특별자치시'
    },
    {
        value: '41',
        label: '경기도'
    },
    {
        value: '42',
        label: '강원도'
    },
    {
        value: '43',
        label: '충청북도'
    },
    {
        value: '44',
        label: '충청남도'
    },
    {
        value: '45',
        label: '전라북도'
    },
    {
        value: '46',
        label: '전라남도'
    },
    {
        value: '47',
        label: '경상북도'
    },
    {
        value: '48',
        label: '경상남도'
    },
    {
        value: '50',
        label: '제주특별자치도'
    }
]

export const getKind = [
    {
        value: 'A0',
        label: '공공시설'
    },
    {
        value: 'B0',
        label: '주차시설'
    },
    {
        value: 'C0',
        label: '휴게시설'
    },
    {
        value: 'D0',
        label: '관광시설'
    },
    {
        value: 'E0',
        label: '상업시설'
    },
    {
        value: 'F0',
        label: '차량정비시설'
    },
    {
        value: 'G0',
        label: '기타시설'
    },
    {
        value: 'H0',
        label: '공동주택시설'
    },
    {
        value: 'I0',
        label: '근린생활시설'
    },
    {
        value: 'J0',
        label: '교육문화시설'
    },
]

export const getKindDetail = {
    A0: [
        {
            value: 'A001',
            label: '관공서'
        },
        {
            value: 'A002',
            label: '주민센터'
        },
        {
            value: 'A003',
            label: '공공기관'
        },
        {
            value: 'A004',
            label: '지자체시설'
        },
    ],
    B0: [
        {
            value: 'B001',
            label: '공영주차장'
        },
        {
            value: 'B002',
            label: '공원주차장'
        },
        {
            value: 'B003',
            label: '환승주차장'
        },
        {
            value: 'B004',
            label: '일반주차장'
        },
    ],
    C0: [
        {
            value: 'C001',
            label: '고속도로 휴게소'
        },
        {
            value: 'C002',
            label: '지방도로 휴게소'
        },
        {
            value: 'C003',
            label: '쉼터'
        }
    ],
    D0: [
        {
            value: 'D001',
            label: '공원'
        },
        {
            value: 'D002',
            label: '전시관'
        },
        {
            value: 'D003',
            label: '민속마을'
        },
        {
            value: 'D004',
            label: '생태공원'
        },
        {
            value: 'D005',
            label: '홍보관'
        },
        {
            value: 'D006',
            label: '관광안내소'
        },
        {
            value: 'D007',
            label: '관광지'
        },
        {
            value: 'D008',
            label: '박물관'
        },
        {
            value: 'D009',
            label: '유적지'
        }
    ],
    E0: [
        {
            value: 'E001',
            label: '마트(쇼핑몰)'
        },
        {
            value: 'E002',
            label: '백화점'
        },
        {
            value: 'E003',
            label: '숙박시설'
        },
        {
            value: 'E004',
            label: '골프장(CC)'
        },
        {
            value: 'E005',
            label: '카페'
        },
        {
            value: 'E006',
            label: '음식점'
        },
        {
            value: 'E007',
            label: '주유소'
        },
        {
            value: 'E008',
            label: '영화관'
        },
    ],
    F0: [
        {
            value: 'F001',
            label: '서비스센터'
        },
        {
            value: 'F002',
            label: '정비소'
        }
    ],
    G0: [
        {
            value: 'G001',
            label: '군부대'
        },
        {
            value: 'G002',
            label: '야영장'
        },
        {
            value: 'G003',
            label: '공중전화부스'
        },
        {
            value: 'G004',
            label: '기타'
        },
        {
            value: 'G005',
            label: '오피스텔'
        },
        {
            value: 'G006',
            label: '단독주택'
        }
    ],
    H0: [
        {
            value: 'H001',
            label: '아파트'
        },
        {
            value: 'H002',
            label: '빌라'
        },
        {
            value: 'H003',
            label: '사업장(사옥)'
        },
        {
            value: 'H004',
            label: '기숙사'
        },
        {
            value: 'H005',
            label: '연립주택'
        }
    ],
    I0: [
        {
            value: 'I001',
            label: '병원'
        },
        {
            value: 'I002',
            label: '종교시설'
        },
        {
            value: 'I003',
            label: '보건소'
        },
        {
            value: 'I004',
            label: '경찰서'
        },
        {
            value: 'I005',
            label: '도서관'
        },
        {
            value: 'I006',
            label: '복지관'
        },
        {
            value: 'I007',
            label: '수련원'
        },
        {
            value: 'I008',
            label: '금융기관'
        }
    ],
    J0: [
        {
            value: 'J001',
            label: '학교'
        },
        {
            value: 'J002',
            label: '교육원'
        },
        {
            value: 'J003',
            label: '학원'
        },
        {
            value: 'J004',
            label: '공연장'
        },
        {
            value: 'J005',
            label: '관람장'
        },
        {
            value: 'J006',
            label: '동식물원'
        },
        {
            value: 'J007',
            label: '경기장'
        }
    ],
}

export const parkingFree = [
    {
        value: 'Y',
        label: '무료'
    },
    {
        value: 'N',
        label: '유료'
    }
]

export const chgerType = [
    {
        value: '01',
        label: 'DC차데모'
    },
    {
        value: '02',
        label: 'AC완속'
    },
    {
        value: '03',
        label: 'DC차데모+AC3상'
    },
    {
        value: '04',
        label: 'DC콤보'
    },
    {
        value: '05',
        label: 'DC차데모+DC콤보'
    },
    {
        value: '06',
        label: 'DC차데모+AC3상+DC콤보'
    },
    {
        value: '07',
        label: 'AC3상'
    },
]

export const output = [
    {
        value: '3',
        label: '3kW'
    },
    {
        value: '7',
        label: '7kW'
    },
    {
        value: '50',
        label: '50kW'
    },
    {
        value: '100',
        label: '100kW'
    },
    {
        value: '200',
        label: '200kW'
    },
]

export const method = [
    {
        value: '단독',
        label: '단독 충전'
    },
    {
        value: '동시',
        label: '동시 충전'
    }
]

export const stat = [
    {
        value: '1',
        label: '통신이상'
    },
    {
        value: '2',
        label: '충전대기'
    },
    {
        value: '3',
        label: '충전 중'
    },
    {
        value: '4',
        label: '운영중지'
    },
    {
        value: '5',
        label: '점검 중'
    },
    {
        value: '9',
        label: '상태미확인'
    },
]

export const limitYn = [
    {
        value: 'Y',
        label: '이용제한'
    },
    {
        value: 'N',
        label: '누구나 사용가능'
    }
]