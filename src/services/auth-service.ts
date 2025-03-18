/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosRequestConfig } from "axios";
import { AccessTokenPayLoadDTO, CredentialsDTO } from "../models/auth";
import { requestBackend } from "../utils/requests";
import * as accessTokenRepository from "../localstorage/access-token-repository"
import jwtDecode from "jwt-decode";

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

export function getAccessTokenPayload(): AccessTokenPayLoadDTO | undefined {
    try {
        const token = accessTokenRepository.get();
        return token == null ? undefined : (jwtDecode(token) as AccessTokenPayLoadDTO);
    } catch (error) {
        return undefined;
    }
}

export function isAuthenticated(): boolean {
    const tokenPayload = getAccessTokenPayload();
    return tokenPayload && tokenPayload.exp * 1000 > Date.now() ? true : false;
}