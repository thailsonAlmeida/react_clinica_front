import { Link } from "react-router-dom";
import logo from "../../assets/images/clinica_logo.svg";
import "./style.css";
export default function Auth(){
    return(
        <> 
        <div className="auth-bg1">
            <div className="auth-bg2 auth-form">                    
                <main className="form-signin w-25 m-auto">
                    <form>    
                        
                        <img src={logo} alt="Clínica Saúde" className="img-fluid auth-logo" />
                        
                        <div className="form-floating mt-4">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" wfd-id="id0" />
                            <label htmlFor="floatingInput">Email</label>
                        </div>
                        
                        <div className="form-floating mt-4">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" wfd-id="id1" />
                            <label htmlFor="floatingPassword">Senha</label>
                        </div>

                        <div className="form-check text-start my-3">
                            <input className="form-check-input auth-check-theme" type="checkbox" value="remember-me" id="flexCheckDefault" wfd-id="id2" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Lembrar-me
                            </label>
                        </div>

                        <button className="btn auth-btn-theme w-100 py-2" type="submit">
                            <Link className="text-white" to={"/"}>Acessar</Link>
                        </button>                   
                        
                    </form>
                </main>
            </div>
        </div>
        </>
    );
}