import axios from "axios";
let clientId = 'TjmARGkpjfymTRCvG-FSEMuhTEz4V6_oSpITSpqmmEg'
export type DataType = {
    "id": string,
    "created_at": string,
    "updated_at": string,
    "promoted_at": string,
    "width": number,
    "height": number,
    "color": string,
    "blur_hash": string,
    "description": string,
    "alt_description": string,
    "urls": {
        "raw": string,
        "full": string,
        "regular": string,
        "small": string,
        "thumb": string
    }
}

export const imgAPI = {
    getImages(title: string, pageNumber: number, per_page: number){
        return axios.get(`https://api.unsplash.com/search/photos?page=${pageNumber}&per_page=${per_page}&query=${title}&client_id=${clientId}`)
    }
}