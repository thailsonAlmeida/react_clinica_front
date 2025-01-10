import { useState } from "react";
import perfil from "../../assets/images/perfil-user.png";
import { PatientDTO } from "../../models/patient";
import { ReportDTO } from "../../models/report";
import { ProfessionalDTO } from "../../models/professional";

type Props = {
    patient: PatientDTO;
}

export default function PatientDetails({patient} : Props) {
    
    const [selectedReport, setSelectedReport] = useState<ReportDTO | null>(null); // Estado para o relatório selecionado
    const [professionalReport, setProfessionalReport] = useState<ProfessionalDTO | null>(null); // Estado para o relatório selecionado

    const handleShowReport = (report: ReportDTO, professional: ProfessionalDTO) => {
        setSelectedReport(report); // Armazena o relatório clicado
        setProfessionalReport(professional); // Armazena o relatório clic
    };

    return(
        <>
            <div className="p-3">
                
                <div className="container-patient-perfil p-3">
                    <img src={perfil} alt="Perfil Paciente" className="img-fluid auth-logo" />
                    <hr />
                    <p>
                        <span><b>Nome</b></span><br />
                        <span>{patient.name}</span>
                    </p>

                    <p>
                        <span><b>Endereço</b></span><br />
                        <span>{patient.address}</span>
                    </p>

                    <p>
                        <span><b>Contato</b></span><br />
                        <span>{patient.contact}</span>
                    </p>

                    <p>
                        <span><b>Nascimento</b></span><br />
                        <span>{patient.birthDay}</span>
                    </p>

                </div>   
                
                <div className="container-patient-list-report p-3">
                    <h1>Relatórios</h1>
                    <hr />

                    <table className="table table-hover table-borderless">
                    <thead>
                        <tr>
                        <th scope="col">Data</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>                               
                        
            
                    {
                        patient?.reportHistory.map(
                            i => (
                                <tr key={i.id}>
                                    <td>{i.dateReport.split("T")[0]}</td>
                                    <td>{i.reportType}</td>
                                    <td>
                                        <a 
                                            href="#" 
                                            className="link-dark me-2"  
                                            data-bs-toggle="modal" 
                                            data-bs-target="#exampleModal"
                                            onClick={() => handleShowReport(i, i.professional)}
                                        >
                                        <i className="bi bi-file-earmark-text-fill" /></a>
                                    </td>                                    
                                </tr>
                            )
                        )
                    } 
                                                                                    
                    </tbody>
                        
                    
                    </table>
                    
                </div> 
                                    
            </div>

            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                
                <div className="modal-content">
                
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        {selectedReport ? selectedReport.reportType : "Relatório"}
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div className="modal-body"> 
                    {
                        selectedReport ? (
                            <>
                                    <div className="row">
                                        <div className="col">
                                            <b>Profissional:</b> {professionalReport?.name}
                                        </div>
                                        <div className="col">
                                            <b>Especialidade:</b> {professionalReport?.specialty}
                                        </div>
                                        <div className="col">
                                            <b>Data:</b> {selectedReport.dateReport.split("T")[0]}
                                        </div>                                        
                                    </div>
                                    <hr />
                                    <div className="row">
                                    <p><b>Descrição:</b> {selectedReport.description}</p> 
                                    </div>
                                <p></p>
                                                               
                            </>
                        ) : (
                            <p>Selecione um relatório para visualizar.</p>
                        )
                    }                   
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                </div>

                </div>
            </div>
            </div>
        </>
    );
}