export type RoleEnum = "ROLE_MANAGER" | "ROLE_PROFESSIONAL";

export type CredentialsDTO = {
    login: string,
    password: string,
}

export type AccessTokenPayLoadDTO = {
    "iss": string,
    "sub": string,
    "authorities": RoleEnum[],
    "exp": number
}