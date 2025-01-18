/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import NavBarHorizontalOne from "../../../components/NavbarHorizantalOne";
import NavBarHorizontalTwo from "../../../components/NavbarHorizantalTwo";
import * as schedulingService from "../../../services/professional-service"
import { ProfessionalDTO } from "../../../models/professional";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import * as formats from "../../../utils/formats";

export default function Scheduling(){
    const params = useParams();
    const navigete = useNavigate();
    
    const [scheduling, setScheduling] = useState<ProfessionalDTO>();

    useEffect(() => {
        schedulingService.findById(Number(params.profissionalId))
            .then( 
                response => {
                    setScheduling(response.data)
                }
            ).catch(() => {
                navigete("/profissionais");
           });
    }, [])

     return(
    <>
        <div className="main">
            <NavBarHorizontalOne name="Agenda" />  
            <NavBarHorizontalTwo name={String(scheduling?.name) || ""} icon=""  />             

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
                                                    href="" 
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