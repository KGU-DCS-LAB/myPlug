import axios from "axios";

/**
 * 전달받은 url을 사용하여 axios로 데이터를 받아온다.
 * @param {String} url 
 * @returns 
 */
export const getChargerInfo = async (url) => {
    try {
        const response = await axios.get(url)
        // console.log("response >>", response.data)
        // return response.data
        const header = response.data.header[0];
        const item = response.data.items[0].item;
        return {header, item}
    } catch (err) {
        console.log("Error >>", err);
        const temp = null;
        return {temp, temp}
    }
}
