import { SchedulingDTO } from "./scheduling"

export type ProfessionalDTO = {
    id: number,
    name: string,
    specialty: string,
    contact: string,
    schedulings: SchedulingDTO[]
}