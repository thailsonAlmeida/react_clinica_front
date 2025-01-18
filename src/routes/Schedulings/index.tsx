import { useEffect, useState } from "react";
import NavBarHorizontalOne from "../../components/NavbarHorizantalOne";
import NavBarHorizontalTwo from "../../components/NavbarHorizantalTwo";
import * as schedulingService from "../../services/scheduling-service"
import { SchedulingDTO } from "../../models/scheduling";
import { ProfessionalDTO } from "../../models/professional";
import { PatientDTO } from "../../models/patient";

export default function Schedulings(){
    const [schedulings, setSchedulings] = useState<SchedulingDTO[]>([]);

    useEffect(() => {
        schedulingService.findAll()
            .then(
                (response) => {                    
                    setSchedulings(response.data.content);
                }
            )
    }, []);

    const [selectedPatient, setSelectedPatient] = useState<PatientDTO | null>(null);
    const [selectedProfessional, setSelectedProfessional] = useState<ProfessionalDTO | null>(null);

    const handleShowScheduling = (professional: ProfessionalDTO, patient: PatientDTO) => {
        setSelectedPatient(patient);
        setSelectedProfessional(professional);
    }

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
                                            <td>{i.confirmed === true ? "Sim" : "Não"}</td>
                                            <td>
                                                <a 
                                                    href={"agendamentos/" + String(i.id)} 
                                                    title={"Ver mais sobre o agendamento " + i.id}
                                                    className="link-dark me-2"
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#modalScheduling"
                                                    onClick={() => handleShowScheduling(i.professional, i.patient)}
                                                >
                                                        <i className="bi bi-person-vcard-fill" />
                                                </a>
                                                
                                                <a href="#" className="link-dark me-2"><i className="bi bi-pencil-square" /></a>
                                                
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
        <div className="modal fade" id="modalScheduling" tabIndex={-1} aria-labelledby="modalSchedulingLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                
                <div className="modal-content">
                
                <div className="modal-header">
                    <h5 className="modal-title" id="modalSchedulingLabel">
                        <i className="bi bi-person-vcard-fill" />
                        {" Paciente"}
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div className="modal-body"> 
                    {
                        selectedPatient ? (
                            <>
                                    <div className="row">
                                        <div className="col">
                                            <b>Nome:</b> {selectedPatient?.name}
                                        </div>
                                        <div className="col">
                                            <b>Contato:</b> {selectedPatient?.contact}
                                        </div>
                                        <div className="col">
                                            <b>Endereço:</b> {selectedPatient?.address}
                                        </div>                                        
                                    </div>                    
                            </>
                        ) : (
                            <p>Selecione um agendamento para visualizar.</p>
                        )
                    }                   
                </div>

                <div className="modal-header">
                    <h5 className="modal-title" id="modalSchedulingLabel">
                        <i className="bi bi-person-badge-fill" />
                        {" Profissional"}
                    </h5>
                </div>
                <div className="modal-body"> 
                    {
                        selectedProfessional ? (
                            <>
                                    <div className="row">
                                        <div className="col">
                                            <b>Nome:</b> {selectedProfessional?.name}
                                        </div>
                                        <div className="col">
                                            <b>Contato:</b> {selectedProfessional?.contact}
                                        </div>
                                        <div className="col">
                                            <b>Especialidade:</b> {selectedProfessional?.specialty}
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