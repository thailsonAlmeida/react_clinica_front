/* eslint-disable react-hooks/exhaustive-deps */
import NavBarHorizontalOne from "../../../components/NavbarHorizantalOne";
import NavBarHorizontalTwo from "../../../components/NavbarHorizantalTwo";
import "./style.css"
import * as professionalService from "../../../services/professional-service"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProfessionalDTO } from "../../../models/professional";
import ProfessionalDetails from "../../../components/ProfessionalDetails";

export default function Professional(){

    const params = useParams();

    const [professional, setProfessional] = useState<ProfessionalDTO>();

    const navigete = useNavigate();

    useEffect(() => {
        professionalService.findById(Number(params.profissionalId)).then(response => {
            setProfessional(response.data);
       })
       .catch(() => {
            navigete("/profissionais");
       });
        
    }, [])    
    
    return(
        <>
                <div className="main">
                    <NavBarHorizontalOne name="Profissional" />  
                    <NavBarHorizontalTwo name=" " icon=" "  />  
                    
                    {
                        professional && <ProfessionalDetails professional={professional} />                  
                    }   

                </div>
            </>
    );
}