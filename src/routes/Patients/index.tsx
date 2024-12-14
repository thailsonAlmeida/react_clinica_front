import NavBarHorizontalOne from "../../components/NavbarHorizantalOne";
import NavBarHorizontalTwo from "../../components/NavbarHorizantalTwo";
import { PatientDTO } from "../../models/patient";

const patients: PatientDTO[] = [
    {
        id: 1,
        name: "Sandro Almeida",
        address: "Rua Canada, n45",
        contact: "(15) 98546-2079",
        birthDay: "10/08/1994",
        reportHistory: []
    },
    {
        id: 2,
        name: "Marina Silva",
        address: "Rua Brazil, n121",
        contact: "(15) 99653-1820",
        birthDay: "20/07/1994",
        reportHistory: []
    },
    {
        id: 3,
        name: "Silvana Freitas",
        address: "Rua Canada, n221",
        contact: "(11) 99742-2731",
        birthDay: "15/08/1990",
        reportHistory: []
    }  
]

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
                            {
                                patients.map( i => 
                                    <tr>
                                        <td>{i.id}</td>
                                        <td>{i.name}</td>
                                        <td>{i.address}</td>
                                        <td>{i.name}</td>
                                        <td>
                                            <a href="#" className="link-dark me-2"><i className="bi bi-person-fill"></i></a>
                                            <a href="#" className="link-dark me-2"><i className="bi bi-pencil-square"></i></a>
                                            <a href="#" className="link-dark me-2"><i className="bi bi-trash-fill"></i></a>
                                        </td>
                                    </tr>
                                )
                            }    
                        </tbody>
                    </table>
                </div>                    
            </div>
        </div>
    </>
    );
}