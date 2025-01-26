import { useEffect, useState } from "react";
import NavBarHorizontalOne from "../../components/NavbarHorizantalOne";
import * as schedulingService from "../../services/scheduling-service"
import { SchedulingDTO } from "../../models/scheduling";
import { ProfessionalDTO } from "../../models/professional";
import { PatientDTO } from "../../models/patient";
import * as formats from "../../utils/formats";

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
            
            <nav className="navbar-horizontal navbar-horizontal-secondary ">
                    <a 
                        href="agendamentos/post"
                        title="Agendar"
                        data-bs-toggle="modal" 
                        data-bs-target="#modalSchedulingPost"

                    > Agendar 
                    <span> <i className="bi bi-calendar2-check-fill"/></span>
                    </a>
            </nav>             

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
                                            <td>{formats.dataBR(i.dateHour.split("T")[0])}</td>
                                            <td>{formats.hourBr(i.dateHour.split("T")[1])}</td>
                                            <td>{i.confirmed === true ? "Sim" : "Não"}</td>
                                            <td>
                                                <a 
                                                    href={"agendamentos/get/" + String(i.id)} 
                                                    title={"Ver mais sobre o agendamento " + i.id}
                                                    className="link-dark me-2"
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#modalScheduling"
                                                    onClick={() => handleShowScheduling(i.professional, i.patient)}
                                                >
                                                        <i className="bi bi-person-vcard-fill" />
                                                </a>
                                                
                                                <a 
                                                    href={"agendamentos/put/" + String(i.id)}  
                                                    className="link-dark me-2"
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#modalSchedulingPut"
                                                >
                                                    <i className="bi bi-pencil-square" />
                                                </a>
                                                
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

        <div className="modal fade" id="modalSchedulingPost" tabIndex={-1} aria-labelledby="modalSchedulingPostLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                
                <div className="modal-content">
                
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalSchedulingPostLabel">
                        <span> <i className="bi bi-calendar-event-fill" /> </span>
                            {"Agendar"}
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body"> 

                        
                        <form>

                            <div className="col mb-3">
                                <label htmlFor="paises">Defina a data e horarío</label>
                                <input 
                                    type="datetime-local" 
                                    className="form-control" 
                                    id="date" 
                                    placeholder="Data"
                                    required
                                />
                            </div>

                            <div className="row">
                                <label htmlFor="paises">Selecione o paciente</label>
                                <div className="mb-3 col">
                                    <select  id="patient"  name="pacientes" className="form-select" required >
                                        <option value="Ana Clara Silva">Ana Clara Silva</option>
                                        <option value="Ana Clara Silva">Joice Silva Carneiro</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">                                    
                                <div className="mb-3 col">
                                    <label htmlFor="paises">Selecione o profisisonal</label>
                                    <select  id="patient"  name="pacientes" className="form-select" required >
                                        <option value="Ana Clara Silva">Leila Beltrão Silva</option>
                                        <option value="Ana Clara Silva">Joane Freitas Assunção</option>
                                    </select>
                                </div>

                                
                                <div className="mb-3 col">
                                    <label htmlFor="paises">Especialidade</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="speciality" 
                                        value="Laringologia"
                                        required
                                    />
                                </div>
                            </div>
                            
                        </form>
                        
                                            
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-theme">Agendar</button>
                    </div>

                </div>
            </div>
        </div>

        <div className="modal fade" id="modalSchedulingPut" tabIndex={-1} aria-labelledby="modalSchedulingPutLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                
                <div className="modal-content">
                
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalSchedulingPutLabel">
                        <span> <i className="bi bi-calendar-event-fill" /> </span>
                            {"Agendar"}
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body"> 

                        
                        <form>

                            <div className="col mb-3">
                                <label htmlFor="date">Defina a data e horarío</label>
                                <input 
                                    type="datetime-local" 
                                    className="form-control" 
                                    id="date" 
                                    placeholder="Data"
                                    required
                                />
                            </div>

                            <div className="row">
                                
                                <div className="mb-3 col">
                                    <label htmlFor="patient">Selecione o paciente</label>
                                    <select  id="patient"  name="pacientes" className="form-select" required >
                                        <option value="Ana Clara Silva">Ana Clara Silva</option>
                                        <option value="Ana Clara Silva">Joice Silva Carneiro</option>
                                    </select>
                                </div>

                                <div className="mb-3 col">
                                    <label htmlFor="isConfirmed">Confirmado</label>                                    
                                    <select  id="isConfirmed"  name="isConfirmed" className="form-select" required >
                                        <option value="Não">Não</option>
                                        <option value="Sim">Sim</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">                                    
                                <div className="mb-3 col">
                                    <label htmlFor="professional">Selecione o profisisonal</label>
                                    <select  id="professional"  name="profissionais" className="form-select" required >
                                        <option value="Ana Clara Silva">Leila Beltrão Silva</option>
                                        <option value="Joane Freitas Assunção">Joane Freitas Assunção</option>
                                    </select>
                                </div>

                                
                                <div className="mb-3 col">
                                    <label htmlFor="speciality">Especialidade</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="speciality" 
                                        value="Laringologia"
                                        required
                                    />
                                </div>
                            </div>
                            
                        </form>
                        
                                            
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-theme">Agendar</button>
                    </div>

                </div>
            </div>
        </div>
    </>
    );
}