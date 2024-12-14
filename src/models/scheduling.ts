import { PatientDTO } from "./patient"
import { ProfessionalDTO } from "./professional"

export type SchedulingDTO = {
    id: number,
    dateHour: string,
    professional: ProfessionalDTO,
    patient: PatientDTO
}
