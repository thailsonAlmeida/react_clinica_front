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
                    <h1>Tabela de profissionais</h1>
                    </div>                    
                </div>
            </div>
        </>
    
    );
}