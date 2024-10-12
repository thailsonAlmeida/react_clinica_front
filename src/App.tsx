import NavBarHorizontalOne from "./components/NavbarHorizantalOne"
import NavBarHorizontalTwo from "./components/NavbarHorizantalTwo"
import NavBarVertical from "./components/NavbarVertical"

export default function App() {
  return (
    <>
      <div className="wrapper">
            <NavBarVertical />            
            
            <div className="main">
                <NavBarHorizontalOne />  
                <NavBarHorizontalTwo />             

                <div className="p-3 ">
                    <div className="container p-3">
                        <h1>Conteudo aqui</h1>
                    </div>                    
                </div>
            </div>
        </div>
        <script src="script.js"></script>
    </>
  )
}
