import { useState } from "react";
import logo from "../../assets/images/clinica_logo.svg";
import { Link } from "react-router-dom";

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
                        <Link to="/" ><img src={logo} alt="Clínica Saúde" /></Link>                                         
                    </div>
                </div>

                <ul className="sidebar-nav">
                    <li className="sidebar-item" data-toggle="tooltip" data-placement="right" title="Pacientes">
                        <Link to="/pacientes" className="sidebar-link">
                            <i className="bi bi-people-fill"></i>
                            <span>Pacientes</span>
                        </Link>
                    </li>

                    <li className="sidebar-item" data-toggle="tooltip" data-placement="right" title="Profissionais">
                        <Link to="/profissionais" className="sidebar-link">
                            <i className="bi bi-file-person"></i>
                            <span>Profissionais</span>
                        </Link>
                    </li>

                    <li className="sidebar-item" data-toggle="tooltip" data-placement="right" title="Agendamentos">
                        <Link to="/agendamentos" className="sidebar-link">
                            <i className="bi bi-calendar-date-fill"></i>
                            <span>Agendamentos</span>
                        </Link>
                    </li>

                    <li className="sidebar-item" data-toggle="tooltip" data-placement="right" title="Agenda">
                        <Link to="profissionais/id" className="sidebar-link">
                            <i className="bi bi-calendar-check-fill"></i>
                            <span>Agenda</span>
                        </Link>
                    </li>
                </ul>

                <div className="sidebar-footer" data-toggle="tooltip" data-placement="right" title="Logout">
                    <Link to="/login" className="sidebar-link">
                        <i className="bi bi-box-arrow-left"></i>
                        <span>Logout</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}