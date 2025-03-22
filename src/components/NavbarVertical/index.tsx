import { useEffect, useState } from "react";
import logo from "../../assets/images/clinica_logo.svg";
import { NavLink } from "react-router-dom";
import * as localStorage from "../../localstorage/access-token-repository"
import * as useService from "../../services/user-service"
import { UserDTO } from "../../models/user";

export default function NavBarVertical(){
    const [isExpanded, setIsExpanded] = useState(false);
    const [user, setUser] = useState<UserDTO>();

    const toggleSidebar = () => {
      setIsExpanded(!isExpanded); // Alterna o valor entre true/false
    };

    const logouf = () => {
        localStorage.remove()
    };

    useEffect(() => {
            useService.findMe()
                .then(response => {
                    setUser(response.data)
                })
                .catch(error => {
                    console.log(error, "error")
                });
        },[]);

    return(
        <>
        <aside id="sidebar" className={isExpanded ? 'expand' : ''}>
                
                <div className="d-flex">
                    <button className="toggle-btn" type="button" onClick={toggleSidebar}>
                        <i className="bi bi-list"></i>
                    </button>

                    <div className="sidebar-logo">                       
                        <NavLink to="/"><img src={logo} alt="Clínica Saúde" /></NavLink>                                         
                    </div>
                </div>

                {
                    user?.role === "MANAGER" ?

                    <ul className="sidebar-nav">                    
                        <li className="sidebar-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
                            <NavLink to="/dash" className={({isActive}) => isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"}>
                                <i className="bi bi-grid-1x2-fill"></i>
                                <span>DashBoard</span>
                            </NavLink>
                        </li>

                        <li className="sidebar-item" data-toggle="tooltip" data-placement="right" title="Pacientes">
                            <NavLink to="/pacientes" className={({isActive}) => isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"}>
                                <i className="bi bi-people-fill"></i>
                                <span>Pacientes</span>
                            </NavLink>
                        </li>

                        <li className="sidebar-item" data-toggle="tooltip" data-placement="right" title="Profissionais">
                            <NavLink to="/profissionais" className={({isActive}) => isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"}>
                                <i className="bi bi-file-person"></i>
                                <span>Profissionais</span>
                            </NavLink>
                        </li>

                        <li className="sidebar-item" data-toggle="tooltip" data-placement="right" title="Agendamentos">
                            <NavLink to="/agendamentos" className={({isActive}) => isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"}>
                                <i className="bi bi-calendar-date-fill"></i>
                                <span>Agendamentos</span>
                            </NavLink>
                        </li>
                    </ul>

                    :

                    <ul className="sidebar-nav">                    
                        <li className="sidebar-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
                            <NavLink to="/dash" className={({isActive}) => isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"}>
                                <i className="bi bi-grid-1x2-fill"></i>
                                <span>DashBoard</span>
                            </NavLink>
                        </li>   

                        <li className="sidebar-item" data-toggle="tooltip" data-placement="right" title="Agenda">
                            <NavLink to="/agenda/1" className={({isActive}) => isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"}>
                                <i className="bi bi-calendar-check-fill"></i>
                                <span>Agenda</span>
                            </NavLink>
                        </li>
                    </ul>
                }

                

                <div className="sidebar-footer" data-toggle="tooltip" data-placement="right" title="Logout">
                    <NavLink to="/login" className="sidebar-link" onClick={logouf}>
                        <i className="bi bi-box-arrow-left"></i>
                        <span>Logout</span>
                    </NavLink>
                </div>
            </aside>
        </>
    );
}