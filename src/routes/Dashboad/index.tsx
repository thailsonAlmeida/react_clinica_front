import { useEffect, useState } from "react";
import NavBarHorizontalOne from "../../components/NavbarHorizantalOne";
import { PatientDTO } from "../../models/patient";
import * as patientsService from "../../services/patients-service"; 
import * as professionalService from "../../services/professional-service"; 
import * as schedulingService from "../../services/scheduling-service"; 
import { NavLink } from "react-router-dom";
import { ProfessionalDTO } from "../../models/professional";
import "./style.css"

export default function Dashboard(){
    const [patients, setPatients] = useState<PatientDTO[]>([]);
    const [professionals, setProfessionals] = useState<ProfessionalDTO[]>([]); 

    const [schedulingsPendent, setSchedulingsPendent] = useState(Number);
    const [schedulingsConfirm, setSchedulingsConfirm] = useState(Number);
    const [schedulingsCancel, setSchedulingsCancel] = useState(Number);

    useEffect(() => {
        patientsService.findAll()
            .then(
                response => {
                    setPatients(response.data.content);
                }
            );

        professionalService.findAll()
            .then(
                response => {
                setProfessionals(response.data.content);
                }
            );

        schedulingService.findAll()
            .then(
                (response) => {   
                    const schedulingData = response.data.content;  
                    setSchedulingsPendent(schedulingData.filter((s: { confirmed: boolean; }) => s.confirmed === false).length)
                    setSchedulingsConfirm(schedulingData.filter((s: { confirmed: boolean; }) => s.confirmed === true).length)
                    setSchedulingsCancel(schedulingData.filter((s: { cancel: boolean; }) => s.cancel === true).length)
                }
            )
    },[]);

    return(
        <div className="main">
            <NavBarHorizontalOne name="Dashboard" /> 

            <div className="row">
                
                <div className="col-4">
                    <div className="p-3 ">
                        <div className="container p-3">  
                            <div className="row">
                                <div className="col-2"><h1><i className="bi bi-calendar-plus-fill orange-ico" /></h1></div>
                                <div className="col-10"><b> Agendamentos Pendentes</b></div>
                            </div>

                            <div className="row">
                                <div className="col-12 card-txt-center mt-3">
                                    <NavLink to={"/agendamentos"} className="card-link-theme">                                  
                                        <b className="card-number-theme">
                                            {
                                              schedulingsPendent                                         
                                            }
                                        </b>
                                    </NavLink>
                                </div>
                            </div>   
                        </div>                    
                    </div>
                </div>

                <div className="col-4">
                    <div className="p-3 ">
                        <div className="container p-3">   
                            <div className="row">
                                <div className="col-2"><h1><i className="bi bi-calendar-check-fill green-ico"/></h1></div>
                                <div className="col-10"><b>Agendamentos Confirmados</b></div>
                            </div> 

                            <div className="row">
                                <div className="col-12 card-txt-center mt-3">
                                    <NavLink to={"/agendamentos"} className="card-link-theme">                                  
                                        <b className="card-number-theme">
                                            {
                                                schedulingsConfirm
                                            }
                                        </b>
                                    </NavLink>
                                </div>
                            </div>  
                        </div>                    
                    </div>
                </div>

                <div className="col-4">
                    <div className="p-3 ">
                        <div className="container p-3">
                            <div className="row">
                                <div className="col-2"><h1><i className="bi-calendar-x-fill red-ico" /></h1></div>
                                <div className="col-10"><b>Agendamentos Cancelados</b></div>
                            </div> 

                            <div className="row">
                                <div className="col-12 card-txt-center mt-3">
                                    <NavLink to={"/agendamentos"} className="card-link-theme">                                  
                                        <b className="card-number-theme">
                                            {
                                                schedulingsCancel
                                            }
                                        </b>
                                    </NavLink>
                                </div>
                            </div>  
                        </div>             
                    </div>
                </div>

            </div>


            <div className="row">

                <div className="col-4">
                    <div className="p-3 ">
                        <div className="container p-3">  
                            <div className="row">
                                <div className="col-1"><h1><i className="bi bi-people-fill" /></h1></div>
                                <div className="col-11"><b>Total Pacientes</b></div>
                            </div>

                            <div className="row">
                                <div className="col-12 card-txt-center mt-3">
                                    <NavLink to={"/pacientes"} className="card-link-theme">                                  
                                        <b className="card-number-theme">
                                            {
                                                patients.length
                                            }
                                        </b>
                                    </NavLink>
                                </div>
                            </div> 
                        </div>                    
                    </div>
                </div>

                <div className="col-4">
                    <div className="p-3 ">
                        <div className="container p-3">    
                            <div className="row">
                                <div className="col-1"><h1><i className="bi bi-file-person" /></h1></div>
                                <div className="col-11"><b>Total Profissionais</b></div>
                            </div>

                            <div className="row">                                
                                <div className="col-12 card-txt-center mt-3">  
                                    <NavLink to={"/profissionais"} className="card-link-theme">                                  
                                        <b className="card-number-theme">
                                            {
                                                professionals.length
                                            }
                                        </b>
                                    </NavLink>
                                </div>
                            </div>  
                        </div>                    
                    </div>
                </div>

            </div>

        </div>
    );
}