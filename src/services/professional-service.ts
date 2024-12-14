import { ProfessionalDTO } from "../models/professional";

export function findAll(){
    return professionals;
}

export function findById(id: number) : ProfessionalDTO | undefined {
    return professionals.find( i => i.id === id );
}

const professionals: ProfessionalDTO[] = [
    {
        id: 1,
        name: "Luana Silva Assunção",
        specialty: "Audiologia",
        contact: "(15) 98965-7895",
        schedulings: [
            {
                id: 1,
                dateHour: "2024-09-10T10:14",
                //isConfirmed: true,
                //isPresent: true,
                professional: null,
                    patient: {
                    id: 5,
                    name: "Patricia Silver",
                    address: "Rua Fernão, n19",
                    contact: "(15) 99333-6932",
                    birthDay: "03/04/1994",
                    reportHistory: []
                }
            },
            {
                id: 2,
                dateHour: "2024-10-10T10:14",
                //isConfirmed: true,
                //isPresent: true,
                professional: null,
                patient: {
                id: 5,
                name: "Patricia Silver",
                address: "Rua Fernão, n19",
                contact: "(15) 99333-6932",
                birthDay: "03/04/1994",
                reportHistory: []
                }
            },
        ]
        },
        {
        id: 2,
        name: "Clara Almeida Teles",
        specialty: "Linguagem",
        contact: "(15) 94758-4656",
        schedulings: []
        },
        {
        id: 3,
        name: "Leticia Farias Assad",
        specialty: "Voz",
        contact: "(15) 99856-6985",
        schedulings: []
        },
        {
        id: 4,
        name: "Leila Fagundes Silva",
        specialty: "Disfagia",
        contact: "(15) 97856-8745",
        schedulings: []
        },
        {
        id: 5,
        name: "Laura Pereira Beltrão",
        specialty: "Fonoaudiologia Escolar",
        contact: "(15) 98974-6584",
        schedulings: []
        }
]