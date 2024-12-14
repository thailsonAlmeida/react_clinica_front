import NavBarHorizontalOne from "../../components/NavbarHorizantalOne";
import NavBarHorizontalTwo from "../../components/NavbarHorizantalTwo";
import * as agendaService from "../../services/professional-service"

export default function Agenda(){
    return(
    <>
        <div className="main">
            <NavBarHorizontalOne name="Agenda" />  
            <NavBarHorizontalTwo name={agendaService.findById(1)?.name || ""} icon=""  />             

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
                                agendaService.findById(1)?.schedulings.map(
                                    i => (
                                        <tr>
                                            <td scope="row">{i.id}</td>
                                            <td>{i.patient.name}</td>
                                            <td>{i.dateHour.split("T")[0]}</td>
                                            <td>{i.dateHour.split("T")[1]}</td>
                                            <td>Sim</td>
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