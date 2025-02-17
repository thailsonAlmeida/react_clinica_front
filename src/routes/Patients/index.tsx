/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import NavBarHorizontalOne from "../../components/NavbarHorizantalOne";
import * as patientsService from "../../services/patients-service";
import { PatientDTO } from "../../models/patient";
import * as formats from "../../utils/formats";
import SearchBar from "../../components/SearchBar";
import ButtonNextPage from "../../components/ButtonNextPage";

type FormData = {
    name: string,
    address: string,
    contact: string,
    birthDay: string,
}

type QueryParams = {
    page : number,
    name : string,
}

export default function Patients(){    

    const [patients, setPatients] = useState<PatientDTO[]>([]);
    const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
    const [isLastPage, setIsLastPage] = useState(false);
    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        name: ""
    });
    
  
    useEffect(() => {
        patientsService.findPageRequest(queryParams.page, queryParams.name)
            .then(
                response => {
                    const nextPage = response.data.content;
                    setPatients(patients.concat(nextPage));
                    setIsLastPage(response.data.last)
                }
            );
    },[queryParams]);

    const [formData, setFormData] = useState<FormData>({
        name: '',
        address: '',
        contact: '',
        birthDay: '',
    });

    function handleInputChange(event : any) {
        const value = event.target.value;
        const name = event.target.name;
        setFormData({...formData, [name]: value});
    }

    function handleUpdatePatient() {
        if (selectedPatientId === null) {
            alert("Erro: Nenhum paciente selecionado.");
            return;
        }
    
        patientsService.update(selectedPatientId, formData)
            .then(() => {
                window.location.reload(); 
            })
            .catch(() => {
                alert("Erro ao atualizar o paciente.");
            });
    }

    function handleUnsubscribePatient(id: number){
        patientsService.unsubscribePatient(id).then(() => {            
            window.location.reload(); 
        })
        .catch((err) => {
            alert(`${err.response.data.message}: Não é possivel descadastrar o paciente`);
            window.location.reload(); 
        });
    }

    function handlePostPatient() {
        patientsService.post(formData)
            .then(() => {
                console.log(formData)
                window.location.reload(); 
            })
            .catch(error => {
                alert("Erro ao cadastrar o paciente. Verifique os dados e tente novamente.");
                console.error(error);
            });
    }

    function handleNextPageClick(){
        setQueryParams({...queryParams, page: queryParams.page + 1});
    }

    function handleSearch(searchText: string){
        setPatients([]);
        setQueryParams({...queryParams, page: 0, name: searchText});
    }
        
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
                
                    <SearchBar onSearch={handleSearch} />

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
                                                onClick={() => 
                                                {setSelectedPatientId(i.id);
                                                    setFormData({
                                                    name: i.name,
                                                    address: i.address,
                                                    contact: i.contact,
                                                    birthDay: formats.dateYYYYmmDD(i.birthDay.split('T')[0]),                                                                                                        
                                                })}}
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </a>
                                            <a 
                                                href="" 
                                                title="Descadastrar Paciente"
                                                className="link-dark me-2"
                                                data-bs-toggle="modal" 
                                                data-bs-target="#modalPatientUnsubscribe"
                                                onClick={() => setSelectedPatientId(Number(i.id))}
                                            >
                                                <i className="bi bi-trash-fill"></i>
                                            </a>
                                        </td>
                                    </tr>
                                )
                            }    
                        </tbody>
                    </table>
                    
                    {
                        !isLastPage &&
                        <div onClick={handleNextPageClick}>
                            <ButtonNextPage />
                        </div>
                    }
                    
                    
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
                                    name="name" 
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Nome completo"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="address" 
                                    name="address" 
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Endereço"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="contact" 
                                    name="contact" 
                                    value={formats.numberBr(formData.contact)}
                                    onChange={handleInputChange}
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
                                    name="birthDay" 
                                    value={formData.birthDay}
                                    onChange={handleInputChange}
                                    placeholder="Data de Nacimento"
                                    required
                                />
                            </div>
                        </form>
                    
                                        
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" className="btn btn-theme" onClick={handlePostPatient}>Cadastrar</button>
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
                                    name="name"
                                    value={formData.name}
                                    className="form-control" 
                                    id="name" 
                                    placeholder="Nome completo"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <input 
                                    type="text" 
                                    name="address"
                                    value={formData.address}
                                    className="form-control" 
                                    id="address" 
                                    placeholder="Endereço"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <input 
                                    type="text" 
                                    name="contact" 
                                    value={formData.contact}
                                    className="form-control" 
                                    id="contact" 
                                    placeholder="Telefone"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="name">Data de Nascimento</label>
                                <input 
                                    type="date" 
                                    name="birthDay"
                                    value={formData.birthDay}
                                    className="form-control" 
                                    id="birthDay" 
                                    placeholder="Data de Nacimento"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                        </form>
                    
                                        
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button 
                        type="button" 
                        className="btn btn-theme"
                        onClick={handleUpdatePatient} 
                        >Atualizar</button>
                </div>

                </div>
            </div>
        </div>

        <div className="modal fade" id="modalPatientUnsubscribe" tabIndex={-1} aria-labelledby="modalPatientUnsubscribeLabel" aria-hidden="true">
            <div className="modal-dialog">
                
                <div className="modal-content">
                
                <div className="modal-header">
                    <h5 className="modal-title" id="modalPatientUnsubscribeLabel">
                        Deseja Descadastrar o cliente?
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Não</button>
                    <button 
                        type="button" 
                        className="btn btn-theme"
                        onClick={() => handleUnsubscribePatient(Number(selectedPatientId))} 
                        >Sim</button>
                </div>

                </div>
            </div>
        </div>
    </>
    );
}