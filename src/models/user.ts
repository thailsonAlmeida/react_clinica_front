import { RoleEnum } from "./auth"
import { ProfessionalDTO } from "./professional"

export type UserDTO = {
    id: number,
    login: string,
    role: string,
    professional: ProfessionalDTO | null,
    authorities: RoleEnum[],
}