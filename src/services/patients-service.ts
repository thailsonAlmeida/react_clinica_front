/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../utils/system";

export function findAll() {
    return axios.get(`${BASE_URL}/pacientes?size=12`);
}

export function findPageRequest(page: number, name: string, size = 12, sort = "name") {
    const config : AxiosRequestConfig = {
        method: "GET",
        baseURL: BASE_URL,
        url: "/pacientes",
        params: {
            page: page,
            name: name,
            size: size,
            sort: sort,
        }
    }
    return axios(config);
}

export function findById(id : number){
    return axios.get(`${BASE_URL}/pacientes/${id}`);
}

export function update(patientId: number, data: any) {
    return axios.put(`${BASE_URL}/pacientes/${patientId}`, data);
}

export function unsubscribePatient(patientId: number) {
    return axios.delete(`${BASE_URL}/pacientes/${patientId}`);
}

export function post(patientData: any) {
    return axios.post(`${BASE_URL}/pacientes`, patientData);
}