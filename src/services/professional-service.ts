/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

import { BASE_URL } from "../utils/system";

export function findAll(){
    return axios.get(`${BASE_URL}/profissionais`);
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