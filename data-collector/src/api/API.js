import axios from "axios";

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
