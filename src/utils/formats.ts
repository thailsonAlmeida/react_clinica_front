export const dataBR = (data : string) => {
    return data.replace(/(\d{4})-(\d{2})-(\d{2})/g, "$3/$2/$1");
}

export const hourBr = (hour : string) => {
    return hour.replace(/(\d{2}):(\d{2}):\d{2}/, "$1:$2");
}

export const numberBr = (number : string) => {
    return number.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

export const dateYYYYmmDD = (number : string) => {
    return number.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")
}