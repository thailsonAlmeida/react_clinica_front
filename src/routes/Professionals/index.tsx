import { useEffect, useState } from "react";
import NavBarHorizontalOne from "../../components/NavbarHorizantalOne";
import * as professionalService from "../../services/professional-service";
import { ProfessionalDTO } from "../../models/professional";
import * as formats from "../../utils/formats";

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
                
                <nav className="navbar-horizontal navbar-horizontal-secondary ">
                    <a 
                        href="profissionais/post"
                        title="Cadastrar Profissional"
                        data-bs-toggle="modal" 
                        data-bs-target="#modalProfessionalPost"

                    >Cadastrar</a>
                    <span> <i className="bi bi-person-plus-fill"></i></span>
                </nav>          

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
                                                <td>{formats.numberBr(i.contact)}</td>
                                                <td>
                                                    <a 
                                                        href={"profissionais/" + i.id} 
                                                        title={"Ver mais sobre " + i.name}
                                                        className="link-dark me-2">
                                                            <i className="bi bi-person-fill"></i>
                                                    </a>
                                                    <a 
                                                        href="#" 
                                                        className="link-dark me-2"
                                                        title="Atualizar Dados do Profissional"
                                                        data-bs-toggle="modal" 
                                                        data-bs-target="#modalProfessionalPut"
                                                    ><i className="bi bi-pencil-square"></i></a>
                                                    <a href="" className="link-dark me-2"><i className="bi bi-trash-fill"></i></a>
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

            <div className="modal fade" id="modalProfessionalPost" tabIndex={-1} aria-labelledby="modalProfessionalPostLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    
                    <div className="modal-content">
                    
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalProfessionalPostLabel">
                                <i className="bi bi-person-fill" /> <b/>
                                {"Cadastrar Profissional"}
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body"> 

                            
                            <form>
                                <div className="mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="name" 
                                        placeholder="Nome completo"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="specialty" 
                                        placeholder="Especialidade"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="contact" 
                                        placeholder="Telefone"
                                        required
                                    />
                                </div>
                            </form>
                            
                                                
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-theme">Cadastrar</button>
                        </div>

                    </div>
                </div>
            </div>


            <div className="modal fade" id="modalProfessionalPut" tabIndex={-1} aria-labelledby="modalProfessionalPutLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    
                    <div className="modal-content">
                    
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalProfessionalPutLabel">
                                <i className="bi bi-person-fill" /> <b/>
                                {"Atualizar Dados do Profissional"}
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body"> 

                        
                            <form>
                                <div className="mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="name" 
                                        placeholder="Nome completo"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="specialty" 
                                        placeholder="Especialidade"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="contact" 
                                        placeholder="Telefone"
                                        required
                                    />
                                </div>
                            </form>
                            
                                                
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-theme">Cadastrar</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    
    );
}