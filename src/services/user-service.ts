
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";

export function findMe(){    
    
    const config : AxiosRequestConfig = {
        url: "/auth/me",
        withCredentials: true
    }

    return requestBackend(config)
}