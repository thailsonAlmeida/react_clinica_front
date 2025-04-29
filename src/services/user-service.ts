/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";

export function findMe(){    
    
    const config : AxiosRequestConfig = {
        url: "/auth/me",
        withCredentials: true
    }
    return requestBackend(config)
}

export function changePassword(dataChangePassword : any){    
    
    const config : AxiosRequestConfig = {
        method: "POST",
        url: "/auth/change-password",
        data: dataChangePassword,
        withCredentials: true
    }
    return requestBackend(config)
}