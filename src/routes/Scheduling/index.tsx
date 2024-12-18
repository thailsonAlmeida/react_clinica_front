import { useEffect, useState } from "react";
import NavBarHorizontalOne from "../../components/NavbarHorizantalOne";
import NavBarHorizontalTwo from "../../components/NavbarHorizantalTwo";
import * as schedulingService from "../../services/scheduling-service"
import { SchedulingDTO } from "../../models/scheduling";

export default function Scheduling(){
    const [schedulings, setSchedulings] = useState<SchedulingDTO[]>([]);

    useEffect(() => {
        schedulingService.findAll()
            .then(
                (response) => {                    
                    setSchedulings(response.data.content);
                }
            )
    }, []);

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
                                            <tr key={i.id}>
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