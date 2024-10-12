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
                <h1>tabela de pacientes</h1>
                </div>                    
            </div>
        </div>
    </>
    );
}