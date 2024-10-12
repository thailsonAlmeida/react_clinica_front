import { Outlet } from "react-router-dom"
import NavBarVertical from "./components/NavbarVertical"

export default function App() {
  return (
    <>
        <div className="wrapper">
            <NavBarVertical /> 

            <div className="main">   
                <Outlet />   
            </div>
            
        </div>
        <script src="script.js"></script>
    </>

    
  )
}
