import { PatientDTO } from "./patient"
import { ProfessionalDTO } from "./professional"

export type SchedulingDTO = {
    id: number,
    dateHour: string,
    confirmed: boolean,
    present: boolean,
    professional: ProfessionalDTO,
    patient: PatientDTO
}
