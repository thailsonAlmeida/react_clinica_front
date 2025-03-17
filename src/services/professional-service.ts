/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";

export function findAll(){
    const config : AxiosRequestConfig = {
        method: "GET",
        url: "/profissionais",
        withCredentials: true
    }
    return requestBackend(config);
}

export function findPageRequest(page: number, name: string, size = 12, sort = "name") {
    const config : AxiosRequestConfig = {
        method: "GET",
        url: "/profissionais",
        params: {
            page: page,
            name: name,
            size: size,
            sort: sort,
        },
        withCredentials: true
    }
    return requestBackend(config);
}

export function findById(id: number){
    const config : AxiosRequestConfig = {
        method: "GET",
        url: `/profissionais/${id}`,
        withCredentials: true
    }
    return requestBackend(config);
}

export function update(professionalId: number, data: any) {
    const config : AxiosRequestConfig = {
        method: "PUT",
        url: `/profissionais/${professionalId}`,
        data: data,
        withCredentials: true
    }
    return requestBackend(config);
}

export function unsubscribeProfessional(professionalId: number) {
    const config : AxiosRequestConfig = {
        method: "DELETE",
        url: `/profissionais/${professionalId}`,
        withCredentials: true
    }
    return requestBackend(config);
}

export function post(professionalData: any) {
    const config : AxiosRequestConfig = {
        method: "POST",
        url: `/profissionais`,
        data: professionalData,
        withCredentials: true
    }
    return requestBackend(config);
}