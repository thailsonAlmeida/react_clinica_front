import NavBarHorizontalOne from "../../components/NavbarHorizantalOne";
import NavBarHorizontalTwo from "../../components/NavbarHorizantalTwo";

export default function Scheduling(){
    return(    
    <>
        <div className="main">
            <NavBarHorizontalOne name="Agendamentos"/>  
            <NavBarHorizontalTwo name="Agendar" icon="bi bi-plus-square"  />             

            <div className="p-3 ">
                <div className="container p-3">
                <h1>Tabela de agendamentos</h1>
                </div>                    
            </div>
        </div>
    </>
    );
}