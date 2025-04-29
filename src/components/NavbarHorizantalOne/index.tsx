import "./style.css"
import * as localStorage from "../../localstorage/access-token-repository"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserDTO } from "../../models/user";
import * as userService from "../../services/user-service"

type Props = {
    name : string
}

type FormData = {
    userId: number,
    login: string,
    role: string
}

type FormDataPassword = {
    password: string,
    passwordNew: string,
}

export default function NavBarHorizontalOne( { name } : Props){
    const [user, setUser] = useState<UserDTO>();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});    
    const [formData, setFormData] = useState<FormData>({
        userId: 0,
        login: '',
        role: '',
        });
    const [fomDataPassword, setFomDataPassword] = useState<FormDataPassword>({
        password: '',
        passwordNew: '',
        });

    useEffect(() => {
        userService.findMe()
            .then(response => {
                setUser(response.data)          
            })
            .catch(error => {
                console.log(error, "error")
            })
    },[])

    useEffect(() => {
        if (user) {
            setFormData({
                userId: user.id,
                login: user.login,
                role: user.role,
            });
        }
    }, [user]);

    

    function handleFormDataChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFomDataPassword(prev => ({ ...prev, [name]: value }));
    }

    function handleUserChangePassword() {
        if (!validateForm()) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }
    
        userService.changePassword({
            oldPassword: fomDataPassword.password,
            newPassword: fomDataPassword.passwordNew
        })
        .then(() => {
            alert("Senha alterada com sucesso!");
            window.location.reload(); 
        })
        .catch(error => {
            console.error("Erro ao redefinir a senha:", error);
            alert("Não foi possivel redefinir a senha, por favor verifique!");
        });
    }

    const logout = () => {
            localStorage.remove()
        };

    function validateForm() {
        const newErrors: { [key: string]: string } = {};
    
        if (!formData.login) newErrors.login = "O login é obrigatório!";
        if (!formData.role) newErrors.role = "A role é obrigatória!";
        if (!fomDataPassword.password) newErrors.password = "A senha atual é obrigatória!";
        if (!fomDataPassword.passwordNew) newErrors.passwordNew = "A nova senha é obrigatória!";
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retorna true se não houver erros
    }

    function handleClearForm(){        
        setErrors({
            
        })
        setFomDataPassword({
            password:'',
            passwordNew:''
        })
    }
    
    return(
        <>
            <nav className="navbar-horizontal navbar-horizontal-primary ">                
                
                <div>
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        
                        <span>{name}</span>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"></ul>
                       

                        <div className="dropdown text-end">                           
                            <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="text-white me-2 login-name">{user?.login}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path>                            
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"></path>
                                </svg>
                            </a>                        
                            <ul className="dropdown-menu text-small text-white" aria-labelledby="dropdownUser1" >
                                <li>
                                    <a 
                                        className="dropdown-item" 
                                        href="#"
                                        data-bs-toggle="modal" 
                                        data-bs-target="#modalUserPerfilGetAndPost"
                                        >Perfil</a>                                
                                </li>
                                <li>
                                    <a 
                                        className="dropdown-item" 
                                        href="#"
                                        data-bs-toggle="modal" 
                                        data-bs-target="#modalUserNewPassword"
                                        >Redefinir Senha</a>                                
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link to={"/login"} className="dropdown-item" onClick={logout}>Sign out</Link></li>
                            </ul>
                        </div>

                    </div>
                </div>

            </nav> 

            <div className="modal fade" id="modalUserPerfilGetAndPost" tabIndex={-1} aria-labelledby="modalUserPerfilGetAndPostLabel">
                <div className="modal-dialog modal-xl">
                    
                    <div className="modal-content">
                    
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalUserPerfilGetAndPostLabel">
                                <i className="bi bi-person-fill" /> <b/>
                                {"Perfil"}
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClearForm}></button>
                        </div>

                        <div className="modal-body"> 

                            
                            <form>
                                <div className="mb-3">
                                    <input 
                                        type="email" 
                                        className={`form-control ${errors.login ? 'is-invalid' : ''}`} 
                                        name="login"
                                        placeholder="Login"
                                        onChange={handleFormDataChange}
                                        value={formData.login}
                                        disabled
                                    />
                                    {errors.login && <div className="invalid-feedback">{errors.login}</div>} {/* Exibe a mensagem de erro */}
                                </div>                                 

                                <div className="mb-3 col">
                                    <label htmlFor="patient">Tipo de usuário</label>
                                    <select 
                                        name="role" 
                                        className={`form-select ${errors.role ? 'is-invalid' : ''}`}  
                                        onChange={handleFormDataChange}                                        
                                        value={formData.role} disabled>
                                        
                                        <option key={formData.role} value={formData.role}>
                                            {formData.role == 'MANAGER' ? 'Gestor' : 'Profissional'}
                                        </option>
                                    
                                    </select>
                                    {errors.role && <div className="invalid-feedback">{errors.role}</div>} {/* Exibe a mensagem de erro */}
                                </div>  
                            </form>
                            
                                                
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >OK</button>                        
                        </div>

                    </div>
                </div>
            </div> 

            <div className="modal fade" id="modalUserNewPassword" tabIndex={-1} aria-labelledby="modalUserNewPasswordLabel">
                <div className="modal-dialog modal-xl">
                    
                    <div className="modal-content">
                    
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalUserNewPasswordLabel">
                                <i className="bi bi-person-fill" /> <b/>
                                {"Redefinição de Senha"}
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClearForm}></button>
                        </div>

                        <div className="modal-body"> 
                            <form>
                                <div className="mb-3">
                                    <input 
                                        type="password" 
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                                        name="password"
                                        placeholder="Senha Atual"
                                        onChange={handlePasswordChange}
                                        value={fomDataPassword.password}
                                        required
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>} {/* Exibe a mensagem de erro */}
                                </div> 

                                <div className="mb-3">
                                    <input 
                                        type="password" 
                                        className={`form-control ${errors.passwordNew ? 'is-invalid' : ''}`} 
                                        name="passwordNew"
                                        placeholder="Senha Nova"
                                        onChange={handlePasswordChange}
                                        value={fomDataPassword.passwordNew}
                                        required
                                    />
                                    {errors.passwordNew && <div className="invalid-feedback">{errors.passwordNew}</div>} {/* Exibe a mensagem de erro */}
                                </div>                                

                                
                            </form>
                            
                                                
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClearForm}>Cancelar</button>
                            <button 
                                type="button" 
                                className="btn btn-theme"    
                                onClick={handleUserChangePassword}                           
                                >Redefinir</button>
                        </div>

                    </div>
                </div>
            </div> 
        </>
    );
}