/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";

export function findAll() {
    const config : AxiosRequestConfig = {
        method: "GET",
        url: "/pacientes",
        withCredentials: true
    }
    return requestBackend(config);
}

export function findPageRequest(page: number, name: string, size = 12, sort = "name") {    
    const config : AxiosRequestConfig = {
        method: "GET",
        url: "/pacientes",
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

export function findById(id : number){
    const config : AxiosRequestConfig = {
        method: "GET",
        url: `/pacientes/${id}`,
        withCredentials: true
    }
    return requestBackend(config);
}

export function update(patientId: number, data: any) {
    const config : AxiosRequestConfig = {
        method: "PUT",
        url: `/pacientes/${patientId}`,
        data: data,
        withCredentials: true
    }
    return requestBackend(config);
}

export function unsubscribePatient(patientId: number) {
    const config : AxiosRequestConfig = {
        method: "DELETE",
        url: `/pacientes/${patientId}`,
        withCredentials: true
    }
    return requestBackend(config);
}

export function post(patientData: any) {
    const config : AxiosRequestConfig = {
        method: "POST",
        url: `/pacientes`,
        data: patientData,
        withCredentials: true
    }
    return requestBackend(config);
}