import perfil from "../../assets/images/perfil-user.png";
import { PatientDTO } from "../../models/patient";

type Props = {
    patient: PatientDTO;
}

export default function PatientDetails({patient} : Props) {
    return(
        <>
        <div className="p-3">
                        
                        <div className="container-patient-perfil p-3">
                            <img src={perfil} alt="Perfil Paciente" className="img-fluid auth-logo" />
                            <hr />
                            <p>
                                <span><b>Nome</b></span><br />
                                <span>{patient.name}</span>
                            </p>

                            <p>
                                <span><b>Endereço</b></span><br />
                                <span>{patient.address}</span>
                            </p>

                            <p>
                                <span><b>Contato</b></span><br />
                                <span>{patient.contact}</span>
                            </p>

                            <p>
                                <span><b>Nascimento</b></span><br />
                                <span>{patient.birthDay}</span>
                            </p>

                        </div>   
                        
                        <div className="container-patient-list-report p-3">
                            <h1>Relatórios</h1>
                            <hr />

                            <table className="table table-hover table-borderless">
                            <thead>
                                <tr>
                                <th scope="col">Data</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Ações</th>
                                </tr>
                            </thead>
                            <tbody>                               
                                
                    
                            {
                                patient?.reportHistory.map(
                                    i => (
                                        <tr key={i.id}>
                                            <td>{i.dateReport.split("T")[0]}</td>
                                            <td>{i.reportType}</td>
                                            <td>
                                                <a href="#" className="link-dark me-2"><i className="bi bi-file-earmark-text-fill" /></a>
                                            </td>
                                        </tr>
                                    )
                                )
                            } 
                                                                                         
                            </tbody>
                              
                            
                            </table>
                            
                        </div> 
                                          
                    </div>
        </>
    );
}