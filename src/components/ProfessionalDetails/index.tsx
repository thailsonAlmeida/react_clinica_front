import { useState } from "react";
import perfil from "../../assets/images/perfil-user.png";
import { ProfessionalDTO } from "../../models/professional";
import { PatientDTO } from "../../models/patient";

type Props = {
    professional: ProfessionalDTO;
}

export default function ProfessionalDetails({professional} : Props) {
    
    const [selectedSchedulingPatient, setSelectedSchedulingPatient] = useState<PatientDTO | null>(null); 

    const handleShowReport = (schedulingPatient: PatientDTO) => {
        setSelectedSchedulingPatient(schedulingPatient);
    };

    return(
        <>
            <div className="p-3">
                
                <div className="container-patient-perfil p-3">
                    <img src={perfil} alt="Perfil Paciente" className="img-fluid auth-logo" />
                    <hr />
                    <p>
                        <span><b>Nome</b></span><br />
                        <span>{professional.name}</span>
                    </p>

                    <p>
                        <span><b>Especialidade</b></span><br />
                        <span>{professional.specialty}</span>
                    </p>

                    <p>
                        <span><b>Contato</b></span><br />
                        <span>{professional.contact}</span>
                    </p>                    
                </div>   
                
                <div className="container-patient-list-report p-3">
                    <h1>Agendamentos</h1>
                    <hr />

                    <table className="table table-hover table-borderless">
                    <thead>
                        <tr>
                        <th scope="col">Data</th>
                        <th scope="col">Hora</th>
                        <th scope="col">Paciente</th>
                        <th scope="col">Confirmado</th>
                        <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>                               
                        
            
                    {
                        professional?.schedulings.map(
                            i => (
                                <tr key={i.id}>
                                    <td>{i.dateHour.split("T")[0]}</td>
                                    <td>{i.dateHour.split("T")[1]}</td>
                                    <td>{i.patient.name}</td>
                                    <td>{i.confirmed == true ? "Sim" : "Não"}</td>
                                    <td>
                                        <a 
                                            href={"agendamento/" + String(i.id)} 
                                            title={"Ver mais sobre agendamento " + i.id}
                                            className="link-dark me-2"  
                                            data-bs-toggle="modal" 
                                            data-bs-target="#modalAgendament"
                                            onClick={() => handleShowReport(i.patient)
                                            }
                                        >
                                        <i className="bi bi-person-vcard-fill" />
                                        </a>
                                    </td>                                    
                                </tr>
                            )
                        )
                    } 
                                                                                    
                    </tbody>
                        
                    
                    </table>
                    
                </div> 
                                    
            </div>

            <div className="modal fade" id="modalAgendament" tabIndex={-1} aria-labelledby="modalAgendamentLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                
                <div className="modal-content">
                
                <div className="modal-header">
                    <h5 className="modal-title" id="modalAgendamentLabel">
                        <i className="bi bi-person-vcard-fill" />
                        {" Paciente"}
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div className="modal-body"> 
                    {
                        selectedSchedulingPatient ? (
                            <>
                                    <div className="row">
                                        <div className="col">
                                            <b>Nome:</b> {selectedSchedulingPatient?.name}
                                        </div>
                                        <div className="col">
                                            <b>Contato:</b> {selectedSchedulingPatient?.contact}
                                        </div>
                                        <div className="col">
                                            <b>Endereço:</b> {selectedSchedulingPatient?.address}
                                        </div>                                        
                                    </div>
                                <p></p>
                                                               
                            </>
                        ) : (
                            <p>Selecione um agendamento para visualizar.</p>
                        )
                    }                   
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                </div>

                </div>
            </div>
            </div>
        </>
    );
}