import { ReportDTO } from "./report"

export type PatientDTO = {
    id: number,
    name: string,
    address: string,
    contact: string,
    birthDay: string,
    email: string,
    reportHistory : ReportDTO[] | null
}