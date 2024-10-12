import NavBarHorizontalOne from "../../components/NavbarHorizantalOne";
import NavBarHorizontalTwo from "../../components/NavbarHorizantalTwo";

export default function Agenda(){
    return(
    <>
        <div className="main">
            <NavBarHorizontalOne name="Agenda" />  
            <NavBarHorizontalTwo name="Pacientes" icon=""  />             

            <div className="p-3 ">
                <div className="container p-3">
                <h1>Agenda do profissional</h1>
                </div>                    
            </div>
        </div>
    </>
    );
}