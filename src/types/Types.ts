export type courseType = {
    id: number;
    name: string;
    description: string;
    price: number;
    dateOfBeginning: string;
    picOfCourse: string;
}
export type sortType = 'price-high' | 'price-low' | 'date'

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