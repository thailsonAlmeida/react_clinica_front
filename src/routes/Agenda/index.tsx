import NavBarHorizontalOne from "../../components/NavbarHorizantalOne";
import NavBarHorizontalTwo from "../../components/NavbarHorizantalTwo";
import { ProfessionalDTO } from "../../models/professional";

const agenda: ProfessionalDTO[] = [
    {
        id: 10,
        name: "Luana Silva Assunção",
        specialty: "Audiologia",
        contact: "(15) 98965-7895",
        schedulings: [
            {
                id: 1,
                dateHour: "2024-09-10T10:14:03",
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
                },
            },
            {
                id: 2,
                dateHour: "2024-10-10T10:14:03",
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
]

export default function Agenda(){
    return(
    <>
        <div className="main">
            <NavBarHorizontalOne name="Agenda" />  
            <NavBarHorizontalTwo name="Luana Silva Assunção" icon=""  />             

            <div className="p-3 ">
                <div className="container p-3">
                    <table className="table table-hover table-responsive">
                        <thead>
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Paciente</th>
                            <th scope="col">Data</th>
                            <th scope="col">Hora</th>
                            <th scope="col">Presente</th>
                            <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                agenda.map( 
                                    i => (
                                        i.schedulings.map(
                                            n => (
                                                <tr>
                                                    <th scope="row">{n.id}</th>
                                                    <td>{n.patient.name}</td>
                                                    <td>{n.dateHour.split("T")[0]}</td>
                                                    <td>{n.dateHour.split("T")[1]}</td>
                                                    <td>Sim</td>
                                                    <td>
                                                        <a href="#" className="link-dark me-2"><i className="bi bi-person-fill"></i></a>
                                                        <a href="#" className="link-dark me-2"><i className="bi bi-pencil-square"></i></a>
                                                    </td>
                                                </tr>
                                            )
                                        )
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