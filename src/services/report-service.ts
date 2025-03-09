/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { BASE_URL } from "../utils/system";

export function post(reportData: any) {
    return axios.post(`${BASE_URL}/relatorios`, reportData);
}