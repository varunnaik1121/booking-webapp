import { HotelType } from "../models/models"

export type HotelSearchResponse={
    data:HotelType[];
    pagination:{
        total:number;
        page:number;
        pages:number;
    }
}