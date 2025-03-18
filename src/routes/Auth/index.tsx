/* eslint-disable @typescript-eslint/no-explicit-any */
import logo from "../../assets/images/clinica_logo.svg";
import "./style.css";
import { useState } from "react";
import { loginRequest } from "../../services/auth-service";
import * as authService from "../../services/auth-service"

type dataLogin = {
    login : string,
    password : string,
}

export default function Auth() {
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [dataLogin, setDataLogin] = useState<dataLogin>({
        login: '',
        password: '',
    });
  
    function validateForm() {
      const newErrors: { [key: string]: string } = {};
  
      if (!dataLogin.login) newErrors.name = "O login é obrigatório!";
      if (!dataLogin.password) newErrors.address = "A senha é obrigatória!";
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0; // Retorna true se não houver erros
  }  

  function handleInputChange(event : any) {
    const value = event.target.value;
    const name = event.target.name;
    setDataLogin({...dataLogin, [name]: value});
}

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevenir recarregamento da página
    if (!validateForm()) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    loginRequest(dataLogin)
    event?.preventDefault();
    authService.loginRequest(dataLogin).then(response => {
        authService.saveAccessToken(response.data.token)
        window.location.href = 'http://localhost:5173/dash';
    }).catch(error => {
        console.log("Erro no login", error.message)
        setError('Credenciais inválidas');
    })
  };

  return (
    <>
      <div className="auth-bg1">
        <div className="auth-bg2 auth-form">                    
          <main className="form-signin w-25 m-auto">
            <form>    
              <img src={logo} alt="Clínica Saúde" className="img-fluid auth-logo" />
                
              <div className="form-floating mt-4">
                <input 
                  type="email" 
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}                                
                  placeholder="name@email.com" 
                  name="login"
                  value={dataLogin.login}
                  onChange={handleInputChange}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>} {/* Exibe a mensagem de erro */}
                <label htmlFor="floatingInput">Email</label>
              </div>

              <div className="form-floating mt-4">
                <input 
                  type="password" 
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="Password" 
                  name="password"
                  value={dataLogin.password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                />
                {errors.name && <div className="invalid-feedback">{errors.address}</div>} {/* Exibe a mensagem de erro */}
                <label htmlFor="floatingPassword">Senha</label>
              </div>

              <div className="form-floating mt-4">{error && <p style={{ color: 'red' }}>{error}</p>}</div>               
              
              <div className="form-check text-start my-3">
                <input className="form-check-input auth-check-theme" type="checkbox" value="remember-me" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Lembrar-me
                </label>
              </div>

              <button type="submit" className="btn auth-btn-theme w-100 py-2" onClick={handleLogin}>
                Acessar
              </button>    
                         
            </form>
          </main>
        </div>
      </div>
    </>
  );
}
