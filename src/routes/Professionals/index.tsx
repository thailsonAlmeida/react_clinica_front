import NavBarHorizontalOne from "../../components/NavbarHorizantalOne";
import NavBarHorizontalTwo from "../../components/NavbarHorizantalTwo";
import { ProfessionalDTO } from "../../models/professional";

const professionals: ProfessionalDTO[] = [
    {
        id: 10,
        name: "Luana Silva Assunção",
        specialty: "Audiologia",
        contact: "(15) 98965-7895",
        schedulings: []
    },
    {
        id: 12,
        name: "Clara Almeida Teles",
        specialty: "Linguagem",
        contact: "(15) 94758-4656",
        schedulings: []
    },
    {
        id: 13,
        name: "Leticia Farias Assad",
        specialty: "Voz",
        contact: "(15) 99856-6985",
        schedulings: []
    }
]

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
                                
                                {
                                    professionals.map(
                                        i => (
                                            <tr>
                                                <td scope="row">{i.id}</td>
                                                <td>{i.name}</td>
                                                <td>{i.specialty}</td>
                                                <td>{i.contact}</td>
                                                <td>
                                                    <a href={"professional/" + i.id} className="link-dark me-2"><i className="bi bi-person-fill"></i></a>
                                                    <a href="#" className="link-dark me-2"><i className="bi bi-pencil-square"></i></a>
                                                    <a href="#" className="link-dark me-2"><i className="bi bi-trash-fill"></i></a>
                                                </td>
                                            </tr>
                                        )
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