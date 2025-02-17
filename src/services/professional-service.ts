/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios";

import { BASE_URL } from "../utils/system";

export function findAll(){
    return axios.get(`${BASE_URL}/profissionais`);
}

export function findPageRequest(page: number, name: string, size = 12, sort = "name") {
    const config : AxiosRequestConfig = {
        method: "GET",
        baseURL: BASE_URL,
        url: "/profissionais",
        params: {
            page: page,
            name: name,
            size: size,
            sort: sort,
        }
    }
    return axios(config);
}

export function findById(id: number){
    return axios.get(`${BASE_URL}/profissionais/${id}`);
}

export function update(professionalId: number, data: any) {
    return axios.put(`${BASE_URL}/profissionais/${professionalId}`, data);
}

export function unsubscribeProfessional(professionalId: number) {
    return axios.delete(`${BASE_URL}/profissionais/${professionalId}`);
}

export function post(professionalData: any) {
    return axios.post(`${BASE_URL}/profissionais`, professionalData);
}