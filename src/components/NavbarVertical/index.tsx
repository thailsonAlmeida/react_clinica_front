import { useState } from "react";
import logo from "../../assets/images/clinica_logo.svg";

export default function NavBarVertical(){
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
      setIsExpanded(!isExpanded); // Alterna o valor entre true/false
    };

    return(
        <>
        <aside id="sidebar" className={isExpanded ? 'expand' : ''}>
                
                <div className="d-flex">
                    <button className="toggle-btn" type="button" onClick={toggleSidebar}>
                        <i className="bi bi-list"></i>
                    </button>

                    <div className="sidebar-logo">                       
                        <a href="#"><img src={logo} alt="Clínica Saúde" /></a>                                         
                    </div>
                </div>

                <ul className="sidebar-nav">
                    <li className="sidebar-item" data-toggle="tooltip" data-placement="right" title="Pacientes">
                        <a href="#" className="sidebar-link">
                            <i className="bi bi-people-fill"></i>
                            <span>Pacientes</span>
                        </a>
                    </li>

                    <li className="sidebar-item" data-toggle="tooltip" data-placement="right" title="Profissionais">
                        <a href="#" className="sidebar-link">
                            <i className="bi bi-file-person"></i>
                            <span>Profissionais</span>
                        </a>
                    </li>

                    <li className="sidebar-item" data-toggle="tooltip" data-placement="right" title="Agendamentos">
                        <a href="#" className="sidebar-link">
                            <i className="bi bi-calendar-date-fill"></i>
                            <span>Agendamentos</span>
                        </a>
                    </li>

                    <li className="sidebar-item" data-toggle="tooltip" data-placement="right" title="Agenda">
                        <a href="#" className="sidebar-link">
                            <i className="bi bi-calendar-check-fill"></i>
                            <span>Agenda</span>
                        </a>
                    </li>
                </ul>

                <div className="sidebar-footer" data-toggle="tooltip" data-placement="right" title="Logout">
                    <a href="#" className="sidebar-link">
                        <i className="bi bi-box-arrow-left"></i>
                        <span>Logout</span>
                    </a>
                </div>
            </aside>
        </>
    );
}