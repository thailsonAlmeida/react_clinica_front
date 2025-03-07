/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import NavBarHorizontalOne from "../../../components/NavbarHorizantalOne";
import * as professionalService from "../../../services/professional-service"
import * as schedulingService from "../../../services/scheduling-service"
import { ProfessionalDTO } from "../../../models/professional";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import * as formats from "../../../utils/formats";
import { SchedulingDTO } from "../../../models/scheduling";
import { PatientDTO } from "../../../models/patient";

type FormData = {
    dateHour: string,
    professional: ProfessionalDTO,
    patient: PatientDTO,
    present: boolean,
    confirmed: boolean,
    cancel: boolean,
}


export default function Scheduling(){
    const params = useParams();
    const navigete = useNavigate();
    
    const [scheduling, setScheduling] = useState<ProfessionalDTO>();

    useEffect(() => {
        professionalService.findById(Number(params.profissionalId))
            .then( 
                response => {
                    setScheduling(response.data)
                }
            ).catch(() => {
                navigete("/profissionais");
           });
    }, [])    
 

    const handleConfirmPresence = (id: number, thisScheduling: SchedulingDTO, thisProfessionalId: number) => {
        if (!scheduling) return;
    
        
    
        if(thisScheduling.present == false){

            // Atualiza localmente a lista de agendamentos
            const updatedSchedulings = scheduling.schedulings.map((item) =>
                item.id === id ? { ...item, present: true } : item
            );
        
            setScheduling({ ...scheduling, schedulings: updatedSchedulings });

            const updatedData: FormData = {
                dateHour: thisScheduling.dateHour,
                professional: { 
                    id: thisProfessionalId, 
                    name: '',
                    specialty: '',
                    contact: '',
                    schedulings: []

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
        
            console.log("Enviando atualização:", updatedData);
        
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

            const updatedData: FormData = {
                dateHour: thisScheduling.dateHour,
                professional: { 
                    id: thisProfessionalId, 
                    name: '',
                    specialty: '',
                    contact: '',
                    schedulings: []

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
        
            console.log("Enviando atualização:", updatedData);
        
            // Chama a API para atualizar no backend
            schedulingService.update(id, updatedData)
                .then(() => {
                    
                })
                .catch((error) => {
                    console.error("Erro ao atualizar o agendamento:", error);
                    alert("Erro ao atualizar o agendamento.");
                });

        }
        
    };
    

     return(
    <>
        <div className="main">
            <NavBarHorizontalOne name="Agenda" />  
            <nav className="navbar-horizontal navbar-horizontal-secondary ">
                    
            </nav> 

            <div className="p-3 ">
                <div className="container p-3">
                    <table className="table table-hover table-responsive">
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
                                scheduling?.schedulings.map(
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
    </>
    );
}