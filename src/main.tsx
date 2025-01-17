import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Professionals from './routes/Professionals/index.tsx'
import Agenda from './routes/Agenda/index.tsx'
import Patients from './routes/Patients/index.tsx'
import Scheduling from './routes/Scheduling/index.tsx'
import Auth from './routes/Auth/index.tsx'
import Patient from './routes/Patients/Patient/index.tsx'
import Professional from './routes/Professionals/Professional/index.tsx'

createRoot(document.getElementById('root')!).render(  
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} >
                <Route path="profissionais" element={<Professionals />} /> 
                <Route path="profissionais/:profissionalId" element={<Professional />} />

                <Route path="pacientes" element={<Patients />} />
                <Route path="pacientes/:patientId" element={<Patient />} />

                <Route path="agendamentos" element={<Scheduling />} />
                <Route path="profissionais/id" element={<Agenda />} /> 
            </Route>
            <Route path="*" element={<Navigate to="/login" />} /> 
            <Route path="/login" element={<Auth />} />
        </Routes>        
    </BrowserRouter>
  
)
