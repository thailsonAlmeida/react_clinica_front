/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import NavBarHorizontalOne from "../../components/NavbarHorizantalOne";
import * as professionalService from "../../services/professional-service";
import { ProfessionalDTO } from "../../models/professional";
import * as formats from "../../utils/formats";
import SearchBar from "../../components/SearchBar";
import ButtonNextPage from "../../components/ButtonNextPage";

type FormData = {
    name: string,
    specialty: string,
    contact: string,
    email: string
}

type QueryParams = {
    page : number,
    name : string,
}

export default function Professionals(){
    

    const [professionals, setProfessionals] = useState<ProfessionalDTO[]>([]);   
    const [selectedProfessionalId, setSelectedProfessionalId] = useState<number | null>(null); 
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [queryParams, setQueryParams] = useState<QueryParams>({
            page: 0,
            name: ""
        });
    const [isLastPage, setIsLastPage] = useState(false);

    useEffect(() => {
        professionalService.findPageRequest(queryParams.page, queryParams.name)
            .then(
                response => {
                const nextPage = response.data.content;
                setProfessionals(professionals.concat(nextPage));
                setIsLastPage(response.data.last);
            }
        );
    }, [queryParams])   

    const [formData, setFormData] = useState<FormData>({
            name: '',
            specialty: '',
            contact: '',
            email:''
        });

    function validateForm() {
        const newErrors: { [key: string]: string } = {};
    
        if (!formData.name) newErrors.name = "O nome é obrigatório!";
        if (!formData.specialty) newErrors.specialty = "A especialidade é obrigatório!";
        if (!formData.contact) newErrors.contact = "A o número de contato é obrigatório!";
        if (!formData.email) newErrors.email = "O email é obrigatório!";
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retorna true se não houver erros
    }

    function handleInputChange(event : any) {
        const value = event.target.value;
        const name = event.target.name;
        setFormData({...formData, [name]: value});
    }

    function handleUpdateProfessional() {
            if (!validateForm()) {
                alert("Preencha todos os campos obrigatórios.");
                return;
            }

            if (selectedProfessionalId === null) {
                alert("Erro: Nenhum paciente selecionado.");
                return;
            }
        
            professionalService.update(selectedProfessionalId, formData)
                .then(() => {
                    window.location.reload(); 
                })
                .catch(() => {
                    alert("Erro ao atualizar o paciente.");
                });
        }
    
    function handleUnsubscribeProfessional(idProfessional : number){
        professionalService.unsubscribeProfessional(idProfessional).then(() => {
            window.location.reload();
        }).catch((err) => {
            alert(`${err.response.data.message}: Não é possivel descadastrar o profisional`);
            window.location.reload(); 
        });
    }

    function handleSearch(searchText: string){
        setProfessionals([]);
        setQueryParams({...queryParams, page: 0, name: searchText});
    }

    function handlePostProfessional() {        
            if (!validateForm()) {
                alert("Preencha todos os campos obrigatórios.");
                return;
            }

            professionalService.post(formData)
                .then(() => {
                    console.log(formData)
                    window.location.reload(); 
                })
                .catch(error => {
                    alert("Erro ao cadastrar o profissional. Verifique os dados e tente novamente.");
                    console.error(error);
                });
        }

    function handleNextPageClick(){
        setQueryParams({...queryParams, page: queryParams.page + 1});
    }

    function handleClearForm(){
        setFormData({
            name: '',
            specialty: '',
            contact: '',
            email:'',
        })
        setErrors({
            
        })
    }

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

                    >Cadastrar
                    <span> <i className="bi bi-person-plus-fill"></i></span>
                    </a>
                </nav>          

                <div className="p-3 ">
                    <div className="container p-3">
                        
                        <SearchBar onSearch={handleSearch} />
                        
                        <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Especialidade</th>
                                <th scope="col">Email</th>
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
                                                <td>{i.email}</td>
                                                <td>{formats.numberBr(i.contact)}</td>
                                                <td>
                                                    <a 
                                                        href={"profissionais/" + i.id} 
                                                        title={"Ver mais sobre " + i.name}
                                                        className="link-dark me-2">
                                                            <i className="bi bi-person-fill"></i>
                                                    </a>
                                                    
                                                    <a 
                                                        href={"profissionais/put/" + i.id} 
                                                        className="link-dark me-2"
                                                        title="Atualizar Dados do Profissional"
                                                        data-bs-toggle="modal" 
                                                        data-bs-target="#modalProfessionalPut"
                                                        onClick={
                                                            () => {
                                                                setSelectedProfessionalId(i.id);
                                                                setFormData({
                                                                    name: i.name,
                                                                    contact: i.contact,
                                                                    specialty: i.specialty,
                                                                    email: i.email,
                                                                })
                                                            }
                                                        }
                                                    >
                                                        <i className="bi bi-pencil-square"></i>
                                                    </a>
                                                    
                                                    <a 
                                                        href="" 
                                                        className="link-dark me-2"
                                                        data-bs-toggle="modal" 
                                                        data-bs-target="#modalProfessionalUnsubscribe"
                                                        onClick={() => setSelectedProfessionalId(Number(i.id))}
                                                    >
                                                            <i className="bi bi-trash-fill" />
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    )
                                }
                                                          
                            </tbody>
                        </table>
                    </div>

                        {
                            !isLastPage &&
                            <div onClick={handleNextPageClick}>
                                <ButtonNextPage />
                            </div>
                        }

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
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClearForm}></button>
                        </div>

                        <div className="modal-body"> 

                            
                            <form>
                                <div className="mb-3">
                                    <input 
                                        type="text" 
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                                        name="name"
                                        placeholder="Nome completo"
                                        onChange={handleInputChange}
                                        value={formData.name}
                                        required
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>} {/* Exibe a mensagem de erro */}
                                </div>

                                <div className="mb-3">
                                    <input 
                                        type="text" 
                                        className={`form-control ${errors.specialty ? 'is-invalid' : ''}`} 
                                        name="specialty"
                                        placeholder="Especialidade"
                                        onChange={handleInputChange}
                                        value={formData.specialty}
                                        required
                                    />
                                    {errors.specialty && <div className="invalid-feedback">{errors.specialty}</div>} {/* Exibe a mensagem de erro */}
                                </div>

                                <div className="mb-3">
                                    <input 
                                        type="email" 
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                                        name="email"
                                        placeholder="Email"
                                        onChange={handleInputChange}
                                        value={formData.email}
                                        required
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>} {/* Exibe a mensagem de erro */}
                                </div>

                                <div className="mb-3">
                                    <input 
                                        type="text" 
                                        className={`form-control ${errors.contact ? 'is-invalid' : ''}`} 
                                        name="contact"
                                        placeholder="Telefone"
                                        onChange={handleInputChange}
                                        value={formats.numberBr(formData.contact)}
                                        required
                                    />
                                    {errors.contact && <div className="invalid-feedback">{errors.contact}</div>} {/* Exibe a mensagem de erro */}
                                </div>
                            </form>
                            
                                                
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClearForm}>Cancelar</button>
                            <button 
                                type="button" 
                                className="btn btn-theme"
                                onClick={handlePostProfessional}                                
                                >Cadastrar</button>
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
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClearForm}></button>
                        </div>

                        <div className="modal-body"> 

                        
                            <form>
                                <div className="mb-3">
                                    <input 
                                        type="text" 
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        name="name"
                                        placeholder="Nome completo"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>} {/* Exibe a mensagem de erro */}
                                </div>

                                <div className="mb-3">
                                    <input 
                                        type="text" 
                                        className={`form-control ${errors.specialty ? 'is-invalid' : ''}`}
                                        name="specialty"
                                        placeholder="Especialidade"
                                        value={formData.specialty}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errors.specialty && <div className="invalid-feedback">{errors.specialty}</div>} {/* Exibe a mensagem de erro */}
                                </div>

                                <div className="mb-3">
                                    <input 
                                        type="email" 
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                                        name="email"
                                        placeholder="Email"
                                        onChange={handleInputChange}
                                        value={formData.email}
                                        required
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>} {/* Exibe a mensagem de erro */}
                                </div>

                                <div className="mb-3">
                                    <input 
                                        type="text" 
                                        className={`form-control ${errors.contact ? 'is-invalid' : ''}`}
                                        name="contact"
                                        placeholder="Telefone"
                                        value={formats.numberBr(formData.contact)}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errors.contact && <div className="invalid-feedback">{errors.contact}</div>} {/* Exibe a mensagem de erro */}
                                </div>
                            </form>
                            
                                                
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClearForm}>Cancelar</button>
                            <button 
                                type="button" 
                                className="btn btn-theme"
                                onClick={handleUpdateProfessional}
                                >Atualizar</button>
                        </div>

                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalProfessionalUnsubscribe" tabIndex={-1} aria-labelledby="modalProfessionalUnsubscribeLabel" aria-hidden="true">
            <div className="modal-dialog">
                
                <div className="modal-content">
                
                <div className="modal-header">
                    <h5 className="modal-title" id="modalProfessionalUnsubscribeLabel">
                        Deseja Descadastrar o Profissional?
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Não</button>
                    <button 
                        type="button" 
                        className="btn btn-theme"
                        onClick={() => handleUnsubscribeProfessional(Number(selectedProfessionalId))} 
                        >Sim</button>
                </div>

                </div>
            </div>
        </div>
        </>
    
    );
}