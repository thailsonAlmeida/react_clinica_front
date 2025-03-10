/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import NavBarHorizontalOne from "../../components/NavbarHorizantalOne";
import * as schedulingService from "../../services/scheduling-service"
import * as professionalService from "../../services/professional-service"
import * as patientService from "../../services/patients-service"
import { SchedulingDTO } from "../../models/scheduling";
import { ProfessionalDTO } from "../../models/professional";
import { PatientDTO } from "../../models/patient";
import * as formats from "../../utils/formats";
import ButtonNextPage from "../../components/ButtonNextPage";

type FormData = {
    dateHour: string,
    professional: ProfessionalDTO,
    patient: PatientDTO,
    present: boolean,
    confirmed: boolean,
    cancel: boolean,
}

type QueryParams = {
    page : number,
    name : string,
}

export default function Schedulings(){
    const [schedulings, setSchedulings] = useState<SchedulingDTO[]>([]);
    const [professionals, setProfessionals] = useState<ProfessionalDTO[]>([]);
    const [patients, setPatients] = useState<PatientDTO[]>([]);
    const [selectedScheduling, setSelectedScheduling] = useState<SchedulingDTO | null>(null);// Store the entire scheduling object
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [selectedPatient, setSelectedPatient] = useState<PatientDTO | null>(null);
    const [selectedProfessional, setSelectedProfessional] = useState<ProfessionalDTO | null>(null);
    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        name: ""
    });
    const [isLastPage, setIsLastPage] = useState(false);

    useEffect(() => {
        schedulingService.findPageRequest(queryParams.page, queryParams.name)
            .then(
                (response) => {   
                    const nextPage = response.data.content;                 
                    setSchedulings(schedulings.concat(nextPage));
                    setIsLastPage(response.data.last)
                }
            )

            professionalService.findAll().then((response) => {
                setProfessionals(response.data.content)
            })

            patientService.findAll().then(response => {
                setPatients(response.data.content)
            })

        
    }, [queryParams]);

    const [formData, setFormData] = useState<FormData>({
            dateHour: '',
            professional: {
                id: 0,
                name: '',
                specialty: '',
                contact: '',
                schedulings: []
            },
            patient: {
                id: 0,
                name: '',
                address: '',
                contact: '',
                birthDay: '',
                reportHistory: []  
            },
            present: false,
            confirmed: false,
            cancel: false,
        });

    const handleShowScheduling = (professional: ProfessionalDTO, patient: PatientDTO) => {
        setSelectedPatient(patient);
        setSelectedProfessional(professional);
    }    

    function handleNextPageClick(){
        setQueryParams({...queryParams, page: queryParams.page + 1});
    }

    function validateForm() {
        const newErrors: { [key: string]: string } = {};
    
        if (!formData.dateHour) newErrors.dateHour = "A data é obrigatória!";
        if (!formData.professional.id) newErrors.professional = "Selecionar um profissional é obrigatório!";
        if (!formData.patient.id) newErrors.patient = "Selecionar um paciente é obrigatório!";
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retorna true se não houver erros
    }

    function handleInputChange(event: any) {
        const { name, value } = event.target;
    
        if (name === "professional") {
          const selectedProf = professionals.find((p) => p.id === Number(value));
          setFormData({ ...formData, professional: selectedProf || formData.professional }); // Handle if professional is not found
        } else if (name === "patient") {
          const selectedPat = patients.find((p) => p.id === Number(value));
          setFormData({ ...formData, patient: selectedPat || formData.patient });
        } else if (name === "present" || name === "confirmed" || name === "cancel") {
            setFormData({...formData, [name]: event.target.checked})
        }
         else {
          setFormData({ ...formData, [name]: value });
        }
    } 

    function handleUpdateScheduling() {
        if (!validateForm()) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        if (!selectedScheduling) {
            alert("Erro: Nenhum agendamento selecionado.");
            return;
        }

        const updatedScheduling = {
            ...selectedScheduling, // Spread existing scheduling data
            ...formData, // Override with form data
            confirmed: formData.confirmed, // Use boolean values
            cancel: formData.cancel,
            present: formData.present
        };

        schedulingService.update(selectedScheduling.id, updatedScheduling) // Use selectedScheduling.id
            .then(() => {
            window.location.reload();
            })
            .catch(() => {
            alert("Erro ao atualizar o agendamento.");
            });
    }

    function handleCancelScheduling(id: number) {
        if(selectedScheduling?.confirmed === true){

            alert(`Não é possivel cancelar o agendamento. A consulta está confirmada!`);
            window.location.reload(); 
            
        }

        if(selectedScheduling?.confirmed === false){
            schedulingService.cancelScheduling(id).then(() => {
                window.location.reload();
            }).catch((err) => {
                alert(`${err.response.data.message}: Não é possivel cancelar o agendamento`);
                window.location.reload(); 
            })
        }
        
    }

    const openUpdateModal = (scheduling: SchedulingDTO) => {
        setSelectedScheduling(scheduling);
        setFormData({
          dateHour: scheduling.dateHour,
          professional: scheduling.professional,
          patient: scheduling.patient,
          present: scheduling.present,
          confirmed: scheduling.confirmed,
          cancel: scheduling.cancel,
        });
    }

    function handlePostScheduling() {
        if (!validateForm()) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }
        schedulingService.post(formData)
            .then(() => {
                console.log(formData)
                window.location.reload(); 
            })
            .catch(error => {
                alert("Erro ao cadastrar realizar o agendamento. Verifique os dados e tente novamente.");
                console.error(error);
            });
    }

    function handleClearForm(){
        setFormData({
            dateHour: '',
            professional: {
                id: 0,
                name: '',
                specialty: '',
                contact: '',
                schedulings: []
            },
            patient: {
                id: 0,
                name: '',
                address: '',
                contact: '',
                birthDay: '',
                reportHistory: []  
            },
            present: false,
            confirmed: false,
            cancel: false,
        })
        setErrors({
            
        })
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
                                <th scope="col">Cancelado</th>
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
                                            <td>{i.cancel === true ? "Sim" : "Não"}</td>
                                            <td>
                                                <a 
                                                    href={"agendamentos/get/" + String(i.id)} 
                                                    title={"Ver mais sobre o agendamento " + i.id}
                                                    className="link-dark me-2"
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#modalSchedulingView"
                                                    onClick={() => handleShowScheduling(i.professional, i.patient)}
                                                >
                                                        <i className="bi bi-person-vcard-fill" />
                                                </a>
                                                
                                                <a 
                                                    href={"agendamentos/put/" + String(i.id)}  
                                                    className="link-dark me-2"
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#modalSchedulingPut"
                                                    onClick={() => openUpdateModal(i)}
                                                >
                                                    <i className="bi bi-pencil-square" />
                                                </a>
                                                
                                                <a 
                                                    href="#" 
                                                    className="link-dark me-2"
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#modalSchedulingDelete"
                                                    onClick={()=> setSelectedScheduling(i)}
                                                    >
                                                        <i className="bi bi-trash-fill" />
                                                </a>
                                                <a href="#" className="link-dark me-2"><i className="bi bi-whatsapp"></i></a>
                                            </td>
                                            </tr>
                                        )
                                    )
                                }

                            </tbody>
                        </table>

                        {
                            !isLastPage &&
                            <div onClick={handleNextPageClick}>
                                <ButtonNextPage />
                            </div>
                        }
                </div>                    
            </div>
        </div>
        
        <div className="modal fade" id="modalSchedulingView" tabIndex={-1} aria-labelledby="modalSchedulingViewLabel" aria-hidden="true">
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
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClearForm}></button>
                    </div>

                    <div className="modal-body"> 
                        <form>

                            <div className="col mb-3">
                                <label htmlFor="date">Defina a data e horarío</label>
                                <input 
                                    type="datetime-local" 
                                    className={`form-select ${errors.dateHour ? 'is-invalid' : ''}`}  
                                    id="dateHour" 
                                    name="dateHour" 
                                    value={formData.dateHour}
                                    onChange={handleInputChange}
                                    required
                                />
                                {errors.dateHour && <div className="invalid-feedback">{errors.dateHour}</div>} {/* Exibe a mensagem de erro */}
                            </div>

                            <div className="mb-3 col">
                                    <label htmlFor="patient">Selecione o paciente</label>
                                    <select 
                                        id="patient" 
                                        name="patient" 
                                        className={`form-select ${errors.patient ? 'is-invalid' : ''}`}  
                                        onChange={handleInputChange}                                        
                                        value={formData.patient.id} required>  
                                        <option value="">Selecione o paciente</option>                                     
                                        {
                                            patients.map((i) => (
                                                <option key={i.id} value={i.id}>
                                                    {i.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                    {errors.patient && <div className="invalid-feedback">{errors.patient}</div>} {/* Exibe a mensagem de erro */}
                            </div>

                            <div className="row">                                    
                                
                                <div className="mb-3 col">
                                    <label htmlFor="professional">Selecione o profissional</label>
                                    <select 
                                        id="professional" 
                                        name="professional" 
                                        className={`form-select ${errors.professional ? 'is-invalid' : ''}`} 
                                        onChange={handleInputChange}                                        
                                        value={formData.professional.id} required>   
                                        <option value="">Selecione o profissional</option>
                                        {
                                            professionals.map((i) => (
                                                
                                                <option key={i.id} value={i.id}>
                                                    {i.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                    {errors.professional && <div className="invalid-feedback">{errors.professional}</div>} {/* Exibe a mensagem de erro */}
                                </div>

                            </div>
                            
                        </form>              
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClearForm}>Cancelar</button>
                        <button type="button" className="btn btn-theme" onClick={handlePostScheduling}>Agendar</button>
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
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClearForm}></button>
                    </div>

                    <div className="modal-body"> 

                        
                        <form>
                            <div className="row">
                                <div className="col mb-3">
                                    <label htmlFor="date">Defina a data e horarío</label>
                                    <input 
                                        type="datetime-local" 
                                        className={`form-select ${errors.dateHour ? 'is-invalid' : ''}`}
                                        id="dateHour" 
                                        name="dateHour" 
                                        value={formData.dateHour}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errors.dateHour && <div className="invalid-feedback">{errors.dateHour}</div>} {/* Exibe a mensagem de erro */}
                                </div>

                                    <div className="mb-3 col">
                                        <label htmlFor="patient">Selecione o paciente</label>
                                        <select id="patient" name="patient" className="form-select" onChange={handleInputChange} value={formData.patient.name} required>                                            
                                            <option key={formData.patient.id} value={formData.patient.id}>
                                                {formData.patient.name}
                                            </option>
                                            
                                        </select>
                                    </div>
                            </div>

                            <div className="row">

                                <div className=" mb-3 col">
                                    <label htmlFor="patient">Confirmado?</label><br />
                                    <input type="checkbox" id="confirmed" name="confirmed" checked={formData.confirmed} onChange={handleInputChange} />

                                </div>

                                <div className="col">
                                    <label htmlFor="patient">Cancelado?</label><br />
                                    <input type="checkbox" id="cancel" name="cancel" checked={formData.cancel} onChange={handleInputChange} />

                                </div>  

                            </div>
                            

                            
                            <div className="row">
                                <div className="mb-3 col">
                                    <label htmlFor="professional">Selecione o profissional</label>
                                    <select 
                                        id="professional" 
                                        name="professional" 
                                        className="form-select" 
                                        onChange={handleInputChange} 
                                        value={formData.professional.id} required>
                                        
                                        {
                                            professionals.map((i) => (
                                                <option key={i.id} value={i.id}>
                                                    {i.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                                                    
                        </form>
                        
                                            
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClearForm}>Cancelar</button>
                        <button 
                            type="button" 
                            className="btn btn-theme"
                            onClick={handleUpdateScheduling}
                            >Agendar</button>
                    </div>

                </div>
            </div>
            
        </div>

        <div className="modal fade" id="modalSchedulingDelete" tabIndex={-1} aria-labelledby="modalSchedulingDeleteLabel" aria-hidden="true">
            <div className="modal-dialog">
                
                <div className="modal-content">
                
                <div className="modal-header">
                    <h5 className="modal-title" id="modalSchedulingDeleteLabel">
                        Deseja Cancelar o Agendamento?
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Não</button>
                    <button 
                        type="button" 
                        className="btn btn-theme"
                        onClick={() => handleCancelScheduling(Number(selectedScheduling?.id))} 
                        >Sim</button>
                </div>

                </div>
            </div>
        </div>
    </>
    );
}