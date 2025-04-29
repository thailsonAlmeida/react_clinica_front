export const dataBR = (data : string) => {
    return data.replace(/(\d{4})-(\d{2})-(\d{2})/g, "$3/$2/$1");
}

export const hourBr = (hour : string) => {
    return hour.replace(/(\d{2}):(\d{2}):\d{2}/, "$1:$2");
}

export const numberBr = (number : string) => {
    if (number.length === 10){
        const cleanedNumber = number.replace(/\D/g, '');
        const truncatedNumber = cleanedNumber.slice(0, 10);
        return truncatedNumber.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    const cleanedNumber = number.replace(/\D/g, '');
    const truncatedNumber = cleanedNumber.slice(0, 11);
    return truncatedNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

export const dateYYYYmmDD = (number : string) => {
    return number.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")
}

export const formatPhoneNumber55 = (rawNumber : string) => {
    // Remove tudo que não for número
    const cleaned = rawNumber.replace(/\D/g, '');
    
    // Adiciona o DDI do Brasil (55) se ainda não tiver
    return cleaned.startsWith('55') ? cleaned : '55' + cleaned;
  }