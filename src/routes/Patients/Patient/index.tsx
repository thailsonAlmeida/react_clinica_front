/* eslint-disable react-hooks/exhaustive-deps */
import NavBarHorizontalOne from "../../../components/NavbarHorizantalOne";
import NavBarHorizontalTwo from "../../../components/NavbarHorizantalTwo";
import "./style.css"
import PatientDetails from "../../../components/PatientDetails";
import * as patientService from "../../../services/patients-service"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PatientDTO } from "../../../models/patient";

export default function Patient(){

    const params = useParams();

    const [patient, setPatient] = useState<PatientDTO>();

    const navigete = useNavigate();

    useEffect(() => {
        patientService.findById(Number(params.patientId)).then(response => {
            setPatient(response.data);
       })
       .catch(() => {
            navigete("/pacientes");
       });
        
    }, [])    
    
    return(
        <>
                <div className="main">
                    <NavBarHorizontalOne name="Paciente" />  
                    <NavBarHorizontalTwo name=" " icon=" "  />  
                    
                    {
                        patient && <PatientDetails patient={patient} />                  
                    }           
                    
                    
                </div>
            </>
    );
}