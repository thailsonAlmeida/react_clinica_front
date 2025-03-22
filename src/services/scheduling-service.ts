/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from "axios"
import { requestBackend } from "../utils/requests";

export function findAll(){
    const config : AxiosRequestConfig = {
        method: "GET",
        url: "/agendamentos",
        withCredentials: true
    }
    return requestBackend(config);
}

export function findPageRequest(page: number, name: string, size = 100, sort = "dateHour,asc", startDate?: string, endDate?: string) {
    const config : AxiosRequestConfig = {
        method: "GET",
        url: "/agendamentos",
        params: {
            page: page,
            name: name,
            size: size,
            sort: sort,
            ...(startDate && { startDate }), 
            ...(endDate && { endDate })
        },
        withCredentials: true
    }
    return requestBackend(config);
}

export function update(schedulingId: number, data: any) {
    const config : AxiosRequestConfig = {
        method: "PUT",
        url: `/agendamentos/${schedulingId}`,
        data: data,
        withCredentials: true
    }
    return requestBackend(config);
}

export function cancelScheduling(schedulingId: number) {
    const config : AxiosRequestConfig = {
        method: "DELETE",
        url: `/agendamentos/${schedulingId}`,
        withCredentials: true
    }
    return requestBackend(config);
}

export function post(schedulingData: any) {
    const config : AxiosRequestConfig = {
        method: "POST",
        url: `/agendamentos`,
        data: schedulingData,
        withCredentials: true
    }
    return requestBackend(config);
}