import NavBarHorizontalOne from "../../components/NavbarHorizantalOne";
import NavBarHorizontalTwo from "../../components/NavbarHorizantalTwo";
import { SchedulingDTO } from "../../models/scheduling";

const schedulings: SchedulingDTO[] = [
    {
       id: 100,
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
        id: 101,
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
        id: 102,
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
     }
]
export default function Scheduling(){
    return(    
    <>
        <div className="main">
            <NavBarHorizontalOne name="Agendamentos"/>  
            <NavBarHorizontalTwo name="Agendar" icon="bi bi-plus-square"  />             

            <div className="p-3 ">
                <div className="container p-3">
                        <table className="table table-hover table-responsive">
                            <thead>
                                <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Paciente</th>
                                <th scope="col">Professional</th>
                                <th scope="col">Data</th>
                                <th scope="col">Hora</th>
                                <th scope="col">Confirmado</th>
                                <th scope="col">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    schedulings.map(
                                        i => (
                                            <tr>
                                            <td scope="row">{i.id}</td>
                                            <td>{i.patient.name}</td>
                                            <td>{i.professional.name}</td>
                                            <td>{i.dateHour.split("T")[0]}</td>
                                            <td>{i.dateHour.split("T")[1]}</td>
                                            <td>Sim</td>
                                            <td>
                                                <a href="#" className="link-dark me-2"><i className="bi bi-person-fill"></i></a>
                                                <a href="#" className="link-dark me-2"><i className="bi bi-pencil-square"></i></a>
                                                <a href="#" className="link-dark me-2"><i className="bi bi-trash-fill"></i></a>
                                                <a href="#" className="link-dark me-2"><i className="bi bi-whatsapp"></i></a>
                                            </td>
                                            </tr>
                                        )
                                    )
                                }

                            </tbody>
                        </table>
                </div>                    
            </div>
        </div>
    </>
    );
}