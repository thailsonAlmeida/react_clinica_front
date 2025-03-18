export type CredentialsDTO = {
    login: string,
    password: string,
}

export type AccessTokenPayLoadDTO = {
    "iss": string,
    "sub": string,
    "authorities": string,
    "exp": number
}