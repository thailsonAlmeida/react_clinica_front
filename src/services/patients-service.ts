import { PatientDTO } from "../models/patient";

export function findAll() : PatientDTO[]{
    return patients;
}

export function findById(id : number) : PatientDTO | undefined {
    return patients.find(i => i.id === id);
}

const patients: PatientDTO[] = [
    {
        id: 1,
        name: "Sandro Almeida",
        address: "Rua Canada, n45",
        contact: "(15) 98546-2079",
        birthDay: "10/08/1994",
        reportHistory: []
    },
    {
        id: 2,
        name: "Marina Silva",
        address: "Rua Brazil, n121",
        contact: "(15) 99653-1820",
        birthDay: "20/07/1994",
        reportHistory: []
    },
    {
        id: 3,
        name: "Carlos Beltrão",
        address: "Rua Alaska, n361",
        contact: "(15) 99845-1478",
        birthDay: "16/06/1994",
        reportHistory: []
    },
    {
        id: 4,
        name: "Leticia Carmargo",
        address: "Rua Jamaica, n87",
        contact: "(15) 99475-8525",
        birthDay: "12/05/1994",
        reportHistory: []
    },
    {
        id: 5,
        name: "Patricia Silver",
        address: "Rua Fernão, n19",
        contact: "(15) 99333-6932",
        birthDay: "03/04/1994",
        reportHistory: []
    },
    {
        id: 6,
        name: "Camila Teles",
        address: "Rua São Paulo, n89",
        contact: "(15) 99365-4785",
        birthDay: "09/03/1994",
        reportHistory: []
    },
    {
        id: 7,
        name: "Anderson Marson",
        address: "Rua Lopes, n36",
        contact: "(15) 99253-5565",
        birthDay: "13/02/1994",
        reportHistory: []
    },
    {
        id: 8,
        name: "Freitas Pereira",
        address: "Rua Miriam, n465",
        contact: "(15) 99365-6632",
        birthDay: "14/01/1994",
        reportHistory: []
    },
    {
        id: 9,
        name: "Alex Azevedo",
        address: "Rua EUA, n265",
        contact: "(15) 99456-9859",
        birthDay: "19/12/1994",
        reportHistory: []
    },
    {
        id: 10,
        name: "Silva Almeida",
        address: "Rua Canada, n51",
        contact: "(15) 99485-0203",
        birthDay: "20/11/1994",
        reportHistory: []
    },
    {
        id: 11,
        name: "Julio Castro",
        address: "Rua Azerbaijão, n165",
        contact: "(15) 99498-2521",
        birthDay: "21/10/1994",
        reportHistory: []
    } 
]