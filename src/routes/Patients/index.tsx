import { useEffect, useState } from "react";
import NavBarHorizontalOne from "../../components/NavbarHorizantalOne";
import NavBarHorizontalTwo from "../../components/NavbarHorizantalTwo";
import * as patientsService from "../../services/patients-service";
import { PatientDTO } from "../../models/patient";

export default function Patients(){    

    const [patients, setPatients] = useState<PatientDTO[]>([]);

    useEffect(() => {
        patientsService.findAll()
            .then(
                response => {
                    setPatients(response.data.content);
                }
            );
    },[]);
    
    
    return(    
    <>
        <div className="main">
            <NavBarHorizontalOne name="Pacientes" />  
            <NavBarHorizontalTwo name="Cadastrar" icon="bi bi-plus-square"  />             

            <div className="p-3 ">
                <div className="container p-3">
                    <table className="table table-hover table-responsive">
                        <thead>
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Contato</th>                        
                            <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {                     
                                patients.map( i =>                                     
                                    <tr key={i.id}>
                                        <td>{i.id}</td>
                                        <td>{i.name}</td>
                                        <td>{i.contact}</td>                                      
                                        <td>
                                            <a href={"pacientes/" + i.id}className="link-dark me-2"><i className="bi bi-person-fill"></i></a>
                                            <a href="#" className="link-dark me-2"><i className="bi bi-pencil-square"></i></a>
                                            <a href="#" className="link-dark me-2"><i className="bi bi-trash-fill"></i></a>
                                        </td>
                                    </tr>
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