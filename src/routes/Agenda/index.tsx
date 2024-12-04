import NavBarHorizontalOne from "../../components/NavbarHorizantalOne";
import NavBarHorizontalTwo from "../../components/NavbarHorizantalTwo";

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
                                <tr>
                                <th scope="row">1</th>
                                <td>Sandro Almeida</td>
                                <td>09/12/2024</td>
                                <td>10:00</td>
                                <td>Sim</td>
                                <td>
                                    <a href="#" className="link-dark me-2"><i className="bi bi-person-fill"></i></a>
                                    <a href="#" className="link-dark me-2"><i className="bi bi-pencil-square"></i></a>
                                </td>
                                </tr>

                                <tr>
                                <th scope="row">2</th>
                                <td>Marina Silva</td>
                                <td>10/12/2024</td>
                                <td>11:00</td>
                                <td>Sim</td>
                                <td>
                                    <a href="#" className="link-dark me-2"><i className="bi bi-person-fill"></i></a>
                                    <a href="#" className="link-dark me-2"><i className="bi bi-pencil-square"></i></a>
                                </td>
                                </tr> 

                                <tr>
                                <th scope="row">3</th>
                                <td>Carlos Beltrão</td>
                                <td>11/12/2024</td>
                                <td>11:30</td>
                                <td>Não</td>
                                <td>
                                    <a href="#" className="link-dark me-2"><i className="bi bi-person-fill"></i></a>
                                    <a href="#" className="link-dark me-2"><i className="bi bi-pencil-square"></i></a>
                                </td>
                                </tr>                            
                            </tbody>
                        </table>
                </div>                    
            </div>
        </div>
    </>
    );
}