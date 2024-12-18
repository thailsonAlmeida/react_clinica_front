import axios from "axios";
import { BASE_URL } from "../utils/system";

export function findAll() {
    return axios.get(`${BASE_URL}/pacientes?size=12`);
}

export function findById(id : number){
    return axios.get(`${BASE_URL}/pacientes/${id}`);
}