import axios from "axios";
let clientId = 'TjmARGkpjfymTRCvG-FSEMuhTEz4V6_oSpITSpqmmEg'


export const imgAPI = {
    getImages(title: string, pageNumber: number, per_page: number){
        return axios.get(`https://api.unsplash.com/search/photos?page=${pageNumber}&per_page=${per_page}&query=${title}&client_id=${clientId}`)
    }
}