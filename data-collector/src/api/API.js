import axios from "axios";

export const getChargerInfo = async (url) => {
    try {
        const response = await axios.get(url)
        // console.log("response >>", response.data)
        return response.data
    } catch (err) {
        console.log("Error >>", err);
        return []
    }
}
