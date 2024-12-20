import { useEffect, useState } from "react";
import NavBarHorizontalOne from "../../components/NavbarHorizantalOne";
import NavBarHorizontalTwo from "../../components/NavbarHorizantalTwo";
import * as agendaService from "../../services/professional-service"
import { ProfessionalDTO } from "../../models/professional";

export default function Agenda(){
    const [agenda, setAgenda] = useState<ProfessionalDTO>();
    useEffect(() => {
        agendaService.findById(Number(1))
            .then( 
                response => {
                    console.log(response.data)
                    setAgenda(response.data)
                }
            )
    }, [])
    return(
    <>
        <div className="main">
            <NavBarHorizontalOne name="Agenda" />  
            <NavBarHorizontalTwo name={String(agenda?.name) || ""} icon=""  />             

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
                                agenda?.schedulings.map(
                                    i => (
                                        <tr key={i.id}>
                                            <td scope="row">{i.id}</td>
                                            <td>{i.patient.name}</td>
                                            <td>{i.dateHour.split("T")[0]}</td>
                                            <td>{i.dateHour.split("T")[1]}</td>
                                            <td>{i.present === true ? "Sim" : "Não"}</td>
                                            <td>
                                                <a href="#" className="link-dark me-2"><i className="bi bi-person-fill"></i></a>
                                                <a href="#" className="link-dark me-2"><i className="bi bi-pencil-square"></i></a>
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