import NavBarHorizontalOne from "../../components/NavbarHorizantalOne";
import NavBarHorizontalTwo from "../../components/NavbarHorizantalTwo";

export default function Patients(){
    return(
    
    <>
        <div className="main">
            <NavBarHorizontalOne name="Pacientes" />  
            <NavBarHorizontalTwo name="Cadastrar" icon="bi bi-plus-square"  />             

            <div className="p-3 ">
                <div className="container p-3">
                    <table className="table table-hover table-responsive">
                        <thead>
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Endereço</th>
                            <th scope="col">Contato</th>
                            <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>Sandro Almeida</td>
                            <td>Rua Canada, n45</td>
                            <td>(15) 98546-2079</td>
                            <td>
                                <a href="#" className="link-dark me-2"><i className="bi bi-person-fill"></i></a>
                                <a href="#" className="link-dark me-2"><i className="bi bi-pencil-square"></i></a>
                                <a href="#" className="link-dark me-2"><i className="bi bi-trash-fill"></i></a>
                            </td>
                            </tr>

                            <tr>
                            <th scope="row">2</th>
                            <td>Marina Silva</td>
                            <td>Rua Brazil, n121</td>
                            <td>(15) 99653-1820</td>
                            <td>
                                <a href="#" className="link-dark me-2"><i className="bi bi-person-fill"></i></a>
                                <a href="#" className="link-dark me-2"><i className="bi bi-pencil-square"></i></a>
                                <a href="#" className="link-dark me-2"><i className="bi bi-trash-fill"></i></a>
                            </td>
                            </tr> 

                            <tr>
                            <th scope="row">3</th>
                            <td>Carlos Beltrão</td>
                            <td>Rua Alaska, n361</td>
                            <td>(15) 99845-1478</td>
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