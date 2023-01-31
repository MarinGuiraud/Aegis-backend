import { URL_LIVE_STATUS, CLIENT_ID, AUTH_BEARER } from "./data.js";
import axios from "axios";
export class TwitchApiService {
    constructor(){
    }
    getLiveStatus(){
        console.log("In function getLiveStatus")
        const config = {
            method: "get",
            headers:{
                "Client-ID": CLIENT_ID,
                "Authorization": "Bearer " + AUTH_BEARER
            }
        }
        return axios.get(URL_LIVE_STATUS, config)
    }
}