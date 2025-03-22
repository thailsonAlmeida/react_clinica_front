/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import NavBarHorizontalOne from "../../components/NavbarHorizantalOne";
import { PatientDTO } from "../../models/patient";
import * as patientsService from "../../services/patients-service"; 
import * as professionalService from "../../services/professional-service"; 
import * as schedulingService from "../../services/scheduling-service"; 
import { NavLink, useNavigate } from "react-router-dom";
import { ProfessionalDTO } from "../../models/professional";
import { UserDTO } from "../../models/user";
import * as useService from "../../services/user-service"
import "./style.css"

export default function Dashboard(){
    const navigete = useNavigate(); 

    const [user, setUser] = useState<UserDTO>();
    const [patients, setPatients] = useState<PatientDTO[]>([]);
    const [professionals, setProfessionals] = useState<ProfessionalDTO[]>([]); 
    const [, setScheduling] = useState<ProfessionalDTO>();

    const [schedulingsPendent, setSchedulingsPendent] = useState(Number);
    const [schedulingsConfirm, setSchedulingsConfirm] = useState(Number);
    const [schedulingsCancel, setSchedulingsCancel] = useState(Number);

    const [schedulingsProfessionalPendent, setSchedulingsProfessionalPendent] = useState(Number);
    const [schedulingsProfessionalConfirm, setSchedulingsProfessionalConfirm] = useState(Number);
    const [schedulingsProfessionalCancel, setSchedulingsProfessionalCancel] = useState(Number);
    
    useEffect(() => {
        useService.findMe()
            .then(response => {
                setUser(response.data)
            })
            .catch(error => {
                console.log(error, "error")
            });      
     
    },[]);

    useEffect(() => {       
        
        if(user?.role === "MANAGER"){

            patientsService.findAll()
                .then(
                    response => {
                        setPatients(response.data.content);
                    }
                ).catch(error => {
                    console.log(error.message)
                });

            professionalService.findAll()
                .then(
                    response => {
                        setProfessionals(response.data.content);
                    }
                ).catch(error => {
                    console.log(error.message)
                });

            schedulingService.findAll()
                .then(
                    (response) => {   
                        const schedulingData = response.data.content;  
                        setSchedulingsPendent(schedulingData.filter((s: { confirmed: boolean; }) => s.confirmed === false).length)
                        setSchedulingsConfirm(schedulingData.filter((s: { confirmed: boolean; }) => s.confirmed === true).length)
                        setSchedulingsCancel(schedulingData.filter((s: { cancel: boolean; }) => s.cancel === true).length)
                    }
                ).catch(error => {
                    console.log(error, "error")
                });
        }        
           
        if (user?.role === "PROFESSIONAL") {           
            professionalService.findById(Number(user.professional?.id))
                .then(response => {
                    setScheduling(response.data);
                    const schedulingData = response.data.schedulings;  
                    
                    setSchedulingsProfessionalPendent(
                        schedulingData.filter((s: { confirmed: boolean; cancel: boolean }) => 
                            s.confirmed === false && s.cancel !== true
                        ).length
                    );
        
                    setSchedulingsProfessionalConfirm(
                        schedulingData.filter((s: { confirmed: boolean }) => s.confirmed === true).length
                    );
        
                    setSchedulingsProfessionalCancel(
                        schedulingData.filter((s: { cancel: boolean }) => s.cancel === true).length
                    );
                })
                .catch(() => {
                    navigete("/dash");
                });
        }

    },[user]);

    return(
        <div className="main">
            <NavBarHorizontalOne name="Dashboard" />   
            <nav className="navbar-horizontal navbar-horizontal-secondary ">
                {
                    user?.professional?.specialty &&
                    <div>
                        Especialidade: {user.professional?.specialty}
                    </div>
                }                    
            </nav>                  
            {
                user?.role === "MANAGER" ?
                <section>
                    <div className="row">
                        
                        <div className="col-12 col-sm-6 col-md-4">
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

                        <div className="col-12 col-sm-6 col-md-4">
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

                        <div className="col-12 col-sm-6 col-md-4">
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
                        <div className="col-12 col-sm-6 col-md-4">
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

                        <div className="col-12 col-sm-6 col-md-4">
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
                </section>
                
                :
                
                <section>
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-4">
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
                                                    schedulingsProfessionalPendent
                                                    }
                                                </b>
                                            </NavLink>
                                        </div>
                                    </div>   
                                </div>                    
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4">
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
                                                        schedulingsProfessionalConfirm
                                                    }
                                                </b>
                                            </NavLink>
                                        </div>
                                    </div>  
                                </div>                    
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4">
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
                                                        schedulingsProfessionalCancel
                                                    }
                                                </b>
                                            </NavLink>
                                        </div>
                                    </div>  
                                </div>             
                            </div>
                        </div>

                    </div>
                </section>
            }

           
        </div>
    );
}