import NavBarHorizontalOne from "../../components/NavbarHorizantalOne";
import NavBarHorizontalTwo from "../../components/NavbarHorizantalTwo";

export default function Professionals(){
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
                                <tr>
                                <th scope="row">1</th>
                                <td>Luana Silva Assunção</td>
                                <td>Audiologia</td>
                                <td>(15) 98965-7895</td>
                                <td>
                                    <a href="#" className="link-dark me-2"><i className="bi bi-person-fill"></i></a>
                                    <a href="#" className="link-dark me-2"><i className="bi bi-pencil-square"></i></a>
                                    <a href="#" className="link-dark me-2"><i className="bi bi-trash-fill"></i></a>
                                </td>
                                </tr>

                                <tr>
                                <th scope="row">2</th>
                                <td>Clara Almeida Teles</td>
                                <td>Linguagem</td>
                                <td>(15) 94758-4656</td>
                                <td>
                                    <a href="#" className="link-dark me-2"><i className="bi bi-person-fill"></i></a>
                                    <a href="#" className="link-dark me-2"><i className="bi bi-pencil-square"></i></a>
                                    <a href="#" className="link-dark me-2"><i className="bi bi-trash-fill"></i></a>
                                </td>
                                </tr> 

                                <tr>
                                <th scope="row">3</th>
                                <td>Leticia Farias Assad</td>
                                <td>Voz</td>
                                <td>(15) 99856-6985</td>
                                <td>
                                    <a href="#" className="link-dark me-2"><i className="bi bi-person-fill"></i></a>
                                    <a href="#" className="link-dark me-2"><i className="bi bi-pencil-square"></i></a>
                                    <a href="#" className="link-dark me-2"><i className="bi bi-trash-fill"></i></a>
                                </td>
                                </tr>                            
                            </tbody>
                        </table>
                    </div>                    
                </div>
            </div>
        </>
    
    );
}