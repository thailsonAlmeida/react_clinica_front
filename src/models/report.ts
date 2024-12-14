import { PatientDTO } from "./patient"
import { ProfessionalDTO } from "./professional"

export type ReportDTO = {
    id: number,
    dateReport: string,
    description: string,
    patient: PatientDTO,
    professional: ProfessionalDTO    
}