import { SchedulingDTO } from "../models/scheduling"

export function findAll(){
    return schedulings
}

export function findById(id : number) : SchedulingDTO | undefined{
    return schedulings.find(i => i.id === id)
}

const schedulings: SchedulingDTO[] = [
    {
       id: 1,
       dateHour: "2024-09-10T08:00",
       //isConfirmed: true,
       //isPresent: true,
       professional: {
            id: 10,
            name: "Luana Silva Assunção",
            specialty: "Audiologia",
            contact: "(15) 98965-7895",
            schedulings: []
       },
       patient: {
            id: 1,
            name: "Sandro Almeida",
            address: "Rua Canada, n45",
            contact: "(15) 98546-2079",
            birthDay: "10/08/1994",
            reportHistory: []
       }
    },
    {
        id: 2,
        dateHour: "2024-09-11T10:00",
        //isConfirmed: true,
        //isPresent: true,
        professional: {
            id: 12,
            name: "Clara Almeida Teles",
            specialty: "Linguagem",
            contact: "(15) 94758-4656",
            schedulings: []
        },
        patient: {
            id: 2,
            name: "Marina Silva",
            address: "Rua Brazil, n121",
            contact: "(15) 99653-1820",
            birthDay: "20/07/1994",
            reportHistory: []
        }
     },
     {
        id: 3,
        dateHour: "2024-09-11T10:00",
        //isConfirmed: true,
        //isPresent: true,
        professional: {
            id: 13,
            name: "Leticia Farias Assad",
            specialty: "Voz",
            contact: "(15) 99856-6985",
            schedulings: []
        },
        patient: {
            id: 3,
            name: "Silvana Freitas",
            address: "Rua Canada, n221",
            contact: "(11) 99742-2731",
            birthDay: "15/08/1990",
            reportHistory: []
        }
     },
        {
        id: 4,
        dateHour: "2024-11-11T13:14",
        professional: {
        id: 2,
        name: "Clara Almeida Teles",
        specialty: "Linguagem",
        contact: "(15) 94758-4656",
        schedulings: []
        },
        patient: {
        id: 4,
        name: "Leticia Carmargo",
        address: "Rua Jamaica, n87",
        contact: "(15) 99475-8525",
        birthDay: "12/05/1994",
        reportHistory: []
        }
        },
        {
        id: 5,
        dateHour: "2024-11-13T07:14",
        professional: {
        id: 3,
        name: "Leticia Farias Assad",
        specialty: "Voz",
        contact: "(15) 99856-6985",
        schedulings: []
        },
        patient: {
        id: 3,
        name: "Carlos Beltrão",
        address: "Rua Alaska, n361",
        contact: "(15) 99845-1478",
        birthDay: "16/06/1994",
        reportHistory: []
        }
        },
        {
        id: 6,
        dateHour: "2024-11-14T08:14",
        professional: {
        id: 4,
        name: "Leila Fagundes Silva",
        specialty: "Disfagia",
        contact: "(15) 97856-8745",
        schedulings: []
        },
        patient: {
        id: 2,
        name: "Marina Silva",
        address: "Rua Brazil, n121",
        contact: "(15) 99653-1820",
        birthDay: "20/07/1994",
        reportHistory: []
        }
        },
        {
        id: 7,
        dateHour: "2024-11-15T09:14",
        professional: {
        id: 5,
        name: "Laura Pereira Beltrão",
        specialty: "Fonoaudiologia Escolar",
        contact: "(15) 98974-6584",
        schedulings: []
        },
        patient: {
        id: 1,
        name: "Sandro Almeida",
        address: "Rua Canada, n45",
        contact: "(15) 98546-2079",
        birthDay: "10/08/1994",
        reportHistory: []
        }
        }
]