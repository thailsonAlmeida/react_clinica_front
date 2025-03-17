import "./style.css"
import * as localStorage from "../../localstorage/access-token-repository"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserDTO } from "../../models/user";
import * as useService from "../../services/user-service"

type Props = {
    name : string
}

export default function NavBarHorizontalOne( { name } : Props){
    const [user, setUser] = useState<UserDTO>();

    useEffect(() => {
        useService.findMe()
            .then(response => {
                setUser(response.data)
            })
            .catch(error => {
                console.log(error, "error")
            })
    },[])

    const logouf = () => {
            localStorage.remove()
        };

    return(
        <>
            <nav className="navbar-horizontal navbar-horizontal-primary ">                
                
                <div>
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        
                        <span>{name}</span>
                        

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        
                        </ul>
                       

                        <div className="dropdown text-end">
                           
                        <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="text-white me-2 login-name">{user?.login}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path>                            
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"></path>
                        </svg>
                        </a>                        
                        <ul className="dropdown-menu text-small text-white" aria-labelledby="dropdownUser1" >
                            <li><a className="dropdown-item" href="#">Perfil</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><Link to={"/login"} className="dropdown-item" onClick={logouf}>Sign out</Link></li>
                        </ul>
                        </div>
                    </div>
                </div>
            </nav>  
        </>
    );
}