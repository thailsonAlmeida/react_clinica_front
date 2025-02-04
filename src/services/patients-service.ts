/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { BASE_URL } from "../utils/system";

export function findAll() {
    return axios.get(`${BASE_URL}/pacientes?size=12`);
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