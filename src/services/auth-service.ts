import { AxiosRequestConfig } from "axios";
import { CredentialsDTO } from "../models/auth";
import { requestBackend } from "../utils/requests";
import * as accessTokenRepository from "../localstorage/access-token-repository"

export function loginRequest(loginData: CredentialsDTO){

    const headers = {
        'Content-Type': 'application/json',
    }

    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/auth/login",
        data: loginData,
        headers: headers
    }

    return requestBackend(config)
}

export function logout(){
    accessTokenRepository.remove();
}

export function saveAccessToken(token: string){
    accessTokenRepository.save(token);
}

export function getAccessToken(){
    return accessTokenRepository.get();
}