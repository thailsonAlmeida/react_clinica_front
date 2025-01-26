import { useEffect, useState } from "react";
import NavBarHorizontalOne from "../../components/NavbarHorizantalOne";
import * as patientsService from "../../services/patients-service";
import { PatientDTO } from "../../models/patient";
import * as formats from "../../utils/formats";

export default function Patients(){    

    const [patients, setPatients] = useState<PatientDTO[]>([]);
  
    useEffect(() => {
        patientsService.findAll()
            .then(
                response => {
                    setPatients(response.data.content);
                }
            );
    },[]);
    
    return(    
    <>
        <div className="main">
            <NavBarHorizontalOne name="Pacientes" />  
            
            <nav className="navbar-horizontal navbar-horizontal-secondary ">
                <a 
                    href="pacientes/post"
                    title="Cadastrar Paciente"
                    data-bs-toggle="modal" 
                    data-bs-target="#modalPatientPost"

                >Cadastrar
                <span> <i className="bi bi-person-plus-fill"></i></span>
                </a>
            </nav>         

            <div className="p-3 ">
                <div className="container p-3">
                    <table className="table table-hover table-responsive">
                        <thead>
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Contato</th>                        
                            <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {                     
                                patients.map( i =>                                     
                                    <tr key={i.id}>
                                        <td>{i.id}</td>
                                        <td>{i.name}</td>
                                        <td>{formats.numberBr(i.contact)}</td>                                      
                                        <td>
                                            <a 
                                                href={"pacientes/" + i.id}
                                                title={"Ver mais sobre " + i.name}
                                                className="link-dark me-2">
                                                    <i className="bi bi-person-fill"></i>
                                            </a>
                                            <a 
                                                href={"pacientes/put/" + i.id} 
                                                title="Atualizar Dados do Paciente"
                                                data-bs-toggle="modal" 
                                                data-bs-target="#modalPatientPut"
                                                className="link-dark me-2"
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </a>
                                            <a 
                                                href="" 
                                                title="Descadastrar Paciente"
                                                className="link-dark me-2"
                                            >
                                                <i className="bi bi-trash-fill"></i>
                                            </a>
                                        </td>
                                    </tr>
                                )
                            }    
                        </tbody>
                    </table>
                </div>                    
            </div>
        </div>

        <div className="modal fade" id="modalPatientPost" tabIndex={-1} aria-labelledby="modalPatientPostLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                
                <div className="modal-content">
                
                <div className="modal-header">
                    <h5 className="modal-title" id="modalPatientPostLabel">
                        <i className="bi bi-person-fill" /> <b/>
                        {"Cadastrar Paciente"}
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
                                    id="address" 
                                    placeholder="Endereço"
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

                            <div className="mb-3">
                                <label htmlFor="name">Data de Nascimento</label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    id="birthDay" 
                                    placeholder="Data de Nacimento"
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


        <div className="modal fade" id="modalPatientPut" tabIndex={-1} aria-labelledby="modalPatientPutLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                
                <div className="modal-content">
                
                <div className="modal-header">
                    <h5 className="modal-title" id="modalPatientPutLabel">
                        <i className="bi bi-person-fill" /> <b/>
                        {"Atualizar Dados do Paciente"}
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
                                    id="address" 
                                    placeholder="Endereço"
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

                            <div className="mb-3">
                                <label htmlFor="name">Data de Nascimento</label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    id="birthDay" 
                                    placeholder="Data de Nacimento"
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