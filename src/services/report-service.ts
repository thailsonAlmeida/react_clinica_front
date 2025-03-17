/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";

export function post(reportData: any) {
    const config : AxiosRequestConfig = {
            method: "POST",
            url: `/relatorios`,
            data: reportData,
            withCredentials: true
        }
        return requestBackend(config);
}