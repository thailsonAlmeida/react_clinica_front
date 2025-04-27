import { SchedulingDTO } from "./scheduling"
import { UserDTO } from "./user"

export type ProfessionalDTO = {
    id: number,
    name: string,
    specialty: string,
    contact: string,
    email: string,
    schedulings: SchedulingDTO[],
    user: UserDTO | null,
}