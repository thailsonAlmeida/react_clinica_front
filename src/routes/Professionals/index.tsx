import { useEffect, useState } from "react";
import NavBarHorizontalOne from "../../components/NavbarHorizantalOne";
import NavBarHorizontalTwo from "../../components/NavbarHorizantalTwo";
import * as professionalService from "../../services/professional-service";
import { ProfessionalDTO } from "../../models/professional";

export default function Professionals(){
    

    const [professionals, setProfessionals] = useState<ProfessionalDTO[]>([]);    

    useEffect(() => {
        professionalService.findAll()
            .then(
                response => {
                setProfessionals(response.data.content);
            }
        );
    }, [])   

    return(
        <>
            <div className="main">
                <NavBarHorizontalOne name="Profissionais" />  
                <NavBarHorizontalTwo name="Cadastrar" icon="bi bi-plus-square"  />             

                <div className="p-3 ">
                    <div className="container p-3">
                        <table className="table table-hover table-responsive">
                            <thead>
                                <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Especialidade</th>
                                <th scope="col">Contato</th>
                                <th scope="col">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {
                                    professionals.map(
                                        i => (
                                            <tr key={i.id}>
                                                <td scope="row">{i.id}</td>
                                                <td>{i.name}</td>
                                                <td>{i.specialty}</td>
                                                <td>{i.contact}</td>
                                                <td>
                                                    <a 
                                                        href={"profissionais/" + i.id} 
                                                        title={"Ver mais sobre " + i.name}
                                                        className="link-dark me-2">
                                                            <i className="bi bi-person-fill"></i>
                                                    </a>
                                                    <a href="#" className="link-dark me-2"><i className="bi bi-pencil-square"></i></a>
                                                    <a href="#" className="link-dark me-2"><i className="bi bi-trash-fill"></i></a>
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