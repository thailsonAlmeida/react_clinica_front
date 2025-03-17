import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Professionals from './routes/Professionals/index.tsx'
import Agenda from './routes/Schedulings/Scheduling/index.tsx'
import Patients from './routes/Patients/index.tsx'
import Auth from './routes/Auth/index.tsx'
import Patient from './routes/Patients/Patient/index.tsx'
import Professional from './routes/Professionals/Professional/index.tsx'
import Schedulings from './routes/Schedulings/index.tsx'
import Dashboard from './routes/Dashboad/index.tsx'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { history } from './utils/history.ts'

createRoot(document.getElementById('root')!).render(  
    <HistoryRouter history={history}>
        <Routes>
            <Route path="/" element={<App />} >            
                <Route  index element={<Dashboard />}/>
                <Route path="dash" element={<Dashboard />}/>
                <Route path="profissionais" element={<Professionals />} /> 
                <Route path="profissionais/:profissionalId" element={<Professional />} />

                <Route path="pacientes" element={<Patients />} />
                <Route path="pacientes/:patientId" element={<Patient />} />

                <Route path="agendamentos" element={<Schedulings />} />
                <Route path="agenda/:profissionalId" element={<Agenda />} /> 
            </Route>
            <Route path="*" element={<Navigate to="/login" />} /> 
            <Route path="/login" element={<Auth />} />
        </Routes>        
    </HistoryRouter>
  
)
