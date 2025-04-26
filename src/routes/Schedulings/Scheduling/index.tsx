/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import NavBarHorizontalOne from "../../../components/NavbarHorizantalOne";
import * as professionalService from "../../../services/professional-service";
import * as schedulingService from "../../../services/scheduling-service";
import * as reportService from "../../../services/report-service";
import { ProfessionalDTO } from "../../../models/professional";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as formats from "../../../utils/formats";
import { SchedulingDTO } from "../../../models/scheduling";
import { PatientDTO } from "../../../models/patient";
import * as useService from "../../../services/user-service"
import { UserDTO } from "../../../models/user";


type FormDataReport = {
    dateReport: string,
    reportType: string,
    professional: ProfessionalDTO,
    patient: PatientDTO,
    description: string,    
}

type FormDataSDcheduling = {
    dateHour: string,
    professional: ProfessionalDTO,
    patient: PatientDTO,
    present: boolean,
    confirmed: boolean,
    cancel: boolean,
}


export default function Scheduling(){
    const navigete = useNavigate();    
    const [scheduling, setScheduling] = useState<ProfessionalDTO>();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [user, setUser] = useState<UserDTO>();

    useEffect(() => {        
        useService.findMe()
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.log("Erro ao buscar usuário:", error);
            });
    }, []);

    useEffect(() => {
        if (user && user.professional?.id) {
            professionalService.findById(user.professional.id)
                .then(response => {
                    setScheduling(response.data);
                })
                .catch(() => {
                    navigete("/dash");
                });
        }
    }, [user]);
    
    const [formData, setFormData] = useState<FormDataReport>({
        dateReport: '',
        reportType:'',
        description: '',
        professional: {
            id: 0,
            name: '',
            specialty: '',
            contact: '',
            schedulings: [],
            user: null
        },
        patient: {
            id: 0,
            name: '',
            address: '',
            contact: '',
            birthDay: '',
            reportHistory: []  
        },             
    })

    function handleInputChange(event : any) {
        const value = event.target.value;
        const name = event.target.name;        
        setFormData({...formData, [name]: value});
    }
 
    function validateForm() {
        const newErrors: { [key: string]: string } = {};
    
        if (!formData.dateReport) newErrors.dateReport = "A data é obrigatória!";
        if (!formData.reportType) newErrors.reportType = "Selecione o tipo de relatório!";
        if (!formData.description) newErrors.description = "O relato é obrigatória!";
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retorna true se não houver erros
    }

    const handleConfirmPresence = (id: number, thisScheduling: SchedulingDTO, thisProfessionalId: number) => {
        if (!scheduling) return;
    
        
    
        if(thisScheduling.present == false){

            // Atualiza localmente a lista de agendamentos
            const updatedSchedulings = scheduling.schedulings.map((item) =>
                item.id === id ? { ...item, present: true } : item
            );
        
            setScheduling({ ...scheduling, schedulings: updatedSchedulings });

            const updatedData: FormDataSDcheduling = {
                dateHour: thisScheduling.dateHour,
                professional: { 
                    id: thisProfessionalId, 
                    name: '',
                    specialty: '',
                    contact: '',
                    schedulings: [],
                    user: null

                }, 
                patient: { 
                    id: thisScheduling.patient.id,
                    name: '',
                    address: '',
                    contact: '',
                    birthDay: '',
                    reportHistory: []
                },
                present: true,
                confirmed: thisScheduling.confirmed,
                cancel: thisScheduling.cancel,
            };
                
            // Chama a API para atualizar no backend
            schedulingService.update(id, updatedData)
                .then(() => {
                    
                })
                .catch((error) => {
                    console.error("Erro ao atualizar o agendamento:", error);
                    alert("Erro ao atualizar o agendamento.");
                });

        }

        if(thisScheduling.present == true){

            // Atualiza localmente a lista de agendamentos
            const updatedSchedulings = scheduling.schedulings.map((item) =>
                item.id === id ? { ...item, present: false } : item
            );
        
            setScheduling({ ...scheduling, schedulings: updatedSchedulings });

            const updatedData: FormDataSDcheduling = {
                dateHour: thisScheduling.dateHour,
                professional: { 
                    id: thisProfessionalId, 
                    name: '',
                    specialty: '',
                    contact: '',
                    schedulings: [],
                    user: null

                }, 
                patient: { 
                    id: thisScheduling.patient.id,
                    name: '',
                    address: '',
                    contact: '',
                    birthDay: '',
                    reportHistory: []
                },
                present: false,
                confirmed: thisScheduling.confirmed,
                cancel: thisScheduling.cancel,
            };
                
            // Chama a API para atualizar no backend
            schedulingService.update(id, updatedData)
                .then(() => {
                    
                })
                .catch((error) => {
                    console.error("Erro ao atualizar o agendamento:", error);
                    alert("Erro ao atualizar o agendamento.");
                });

        }
        
    }

    function handlePostReport(){
        if (!validateForm()) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        reportService.post(formData).then(
            () => {
                window.location.reload(); 
            }
        ).catch(error => {
            alert("Erro ao registra o relatório. Verifique os dados e tente novamente.");
            console.error(error);
        });
    }

    const handlePostReportModal = (scheduling: SchedulingDTO, professional: ProfessionalDTO) => {
        const hourNow = new Date();
        const y = hourNow.getFullYear();
        const m = String(hourNow.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
        const d = String(hourNow.getDate()).padStart(2, '0');
        const hr = String(hourNow.getHours()).padStart(2, '0');
        const mn = String(hourNow.getMinutes()).padStart(2, '0');
        const isDateNow = `${y}-${m}-${d}T${hr}:${mn}`;           
        
        setFormData({
          dateReport: isDateNow,
          reportType: '',
          description: '',
          professional: {...scheduling.professional, id:professional.id, name:professional.name},
          patient: scheduling.patient,          
        });
    }

    function handleClearForm(){
        setFormData({
            dateReport: '',
            reportType:'',
            description: '',
            professional: {
                id: 0,
                name: '',
                specialty: '',
                contact: '',
                schedulings: [],
                user: null
            },
            patient: {
                id: 0,
                name: '',
                address: '',
                contact: '',
                birthDay: '',
                reportHistory: []  
            },  
        })
        setErrors({
            
        })
    }
   
    return(
    <>
        <div className="main">
            <NavBarHorizontalOne name="Agenda" />  
            <nav className="navbar-horizontal navbar-horizontal-secondary ">
                {
                    user &&
                    <div>
                        Especialidade: {user.professional?.specialty}
                    </div>
                }                    
            </nav> 

            <div className="p-3 ">
                <div className="container p-3">
                    <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">Data</th>
                            <th scope="col">Hora</th>
                            <th scope="col">Paciente</th> 
                            <th scope="col">Presente</th>
                            <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                scheduling?.schedulings
                                .filter(i => i.confirmed)
                                .map(
                                    i => (
                                        <tr key={i.id}>
                                            <td>{formats.dataBR(i.dateHour.split("T")[0])}</td>
                                            <td>{formats.hourBr(i.dateHour.split("T")[1])}</td>
                                            <td>{i.patient.name}</td>
                                            
                                            <td>{i.present === true ? "Sim" : "Não"}</td>
                                            <td>
                                                <Link 
                                                    to={"../pacientes/" + i.patient.id} 
                                                    title="Histórico do paciente"
                                                    className="link-dark me-2">
                                                        <i className="bi bi-person-fill" />
                                                </Link>                                                
                                                
                                                <a 
                                                    href={"agendamento/" + i.id} 
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleConfirmPresence(i.id, i, scheduling.id);
                                                    }}
                                                    title="Confirmar presenção do paciente"
                                                    className="link-dark me-2">
                                                        {
                                                            i.present === true ? <i className="bi bi-check-circle" /> : <i className="bi bi-circle" />
                                                        }
                                                        
                                                </a>
                                                
                                                <a 
                                                    href="" 
                                                    title="Adicionar relatório ao paciente"
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#modalReportPost"
                                                    onClick={() => handlePostReportModal(i, scheduling)}
                                                    className="link-dark me-2">
                                                        {
                                                            i.present === true ? <i className="bi bi-file-earmark-plus" /> : ""
                                                        }
                                                        
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
            </div>
        </div>

        <div className="modal fade" id="modalReportPost" tabIndex={-1} aria-labelledby="modalReportPostLabel">
            <div className="modal-dialog modal-xl">
                
                <div className="modal-content">
                
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalReportPostLabel">
                        <span> <i className="bi bi-calendar-event-fill" /> </span>
                            {"Relatório"}
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClearForm}></button>
                    </div>

                    <div className="modal-body"> 
                        <form>
                            <div className="col mb-3">
                                <label htmlFor="dateHour">Data</label>
                                    <input 
                                        type="datetime-local" 
                                        className={`form-control ${errors.dateReport ? 'is-invalid' : ''}`}
                                        id="dateHour" 
                                        name="dateHour"                                         
                                        value={formData.dateReport}
                                        onChange={handleInputChange}
                                        aria-readonly
                                    />
                            </div>

                             <div className="mb-3 col">
                                <label htmlFor="patient">Paciente</label>
                                <select 
                                    id="patient" 
                                    name="patient" 
                                    className="form-select" 
                                    onChange={handleInputChange}                                      
                                    value={formData.patient.id}                                  
                                    aria-readonly
                                >    
                                    <option>{formData.patient.name}</option>                               
                                </select>
                                
                            </div>
                            
                            <div className="mb-3 col">
                                <label htmlFor="reportType">Tipo</label>
                                <select 
                                    id="reportType" 
                                    name="reportType" 
                                    className={`form-select ${errors.reportType ? 'is-invalid' : ''}`} 
                                    onChange={handleInputChange}                                      
                                    value={formData.reportType}  
                                >    
                                    <option value="" disabled>Selecione o tipo de relatório</option>   
                                    <option value="Avaliativo">Avaliativo</option>  
                                    <option value="Evolutivo">Evolutivo</option>               
                                </select>
                                {errors.reportType && <div className="invalid-feedback">{errors.reportType}</div>} {/* Exibe a mensagem de erro */}
                                
                            </div>
                            
                            <div className="col mb-3">
                                <label htmlFor="description">Relatar</label>
                                <textarea  
                                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                    id="description" 
                                    name="description" 
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                />
                                {errors.description && <div className="invalid-feedback">{errors.description}</div>} {/* Exibe a mensagem de erro */}
                            </div>

                            <div className="row">
                                <div className="mb-3 col">
                                    <label htmlFor="professional">Profissional</label>
                                    <select 
                                        id="professional" 
                                        name="professional" 
                                        className="form-select" 
                                        onChange={handleInputChange}                                        
                                        value={formData.professional.id} 
                                        aria-readonly                                     
                                        >  
                                        <option>{formData.professional.name}</option>
                                    </select>
                                </div>
                            </div>
                        </form>                
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClearForm}>Cancelar</button>
                        <button type="button" className="btn btn-theme" onClick={handlePostReport}>Relatar</button>
                    </div>

                </div>
            </div>
        </div>

    </>
    );
}