import { Link } from "react-router-dom";
import logo from "../../assets/images/clinica_logo.svg";
export default function Auth(){
    return(
        <>      
            <main className="form-signin w-25 m-auto">
                <form>    
                    
                    <img src={logo} alt="Clínica Saúde" className="img-fluid" />
                    
                    <div className="form-floating mt-4">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" wfd-id="id0" />
                        <label htmlFor="floatingInput">Email</label>
                    </div>
                    <div className="form-floating mt-4">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" wfd-id="id1" />
                        <label htmlFor="floatingPassword">Senha</label>
                    </div>

                    <div className="form-check text-start my-3">
                        <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" wfd-id="id2" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Lembrar-me
                        </label>
                    </div>

                    <button className="btn btn-dark w-100 py-2" type="submit"><Link className="text-white" to={"/"}>Acessar</Link></button>                    
                    <p className="mt-5 mb-3 text-body-secondary">© 2024</p>
                </form>
            </main>
        </>
    );
}