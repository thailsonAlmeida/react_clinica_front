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
import { PrivateRoute } from './components/PrivateRoute/index.tsx'

createRoot(document.getElementById('root')!).render(  
    <HistoryRouter history={history}>
        <Routes>
            <Route path="/" element={<App />} >            
                <Route  index element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
                <Route path="dash" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
                
                <Route path="profissionais" element={<PrivateRoute><Professionals /></PrivateRoute>} /> 
                <Route path="profissionais/:profissionalId" element={<PrivateRoute><Professional /></PrivateRoute>} />

                <Route path="pacientes" element={<PrivateRoute><Patients /></PrivateRoute>} />
                <Route path="pacientes/:patientId" element={<PrivateRoute><Patient /></PrivateRoute>} />

                <Route path="agendamentos" element={<PrivateRoute><Schedulings /></PrivateRoute>} />  
                <Route path="agenda/:profissionalId" element={<PrivateRoute><Agenda /></PrivateRoute>} />                 
            </Route>     
                 
            <Route path="*" element={<Navigate to="/login" />} /> 
            <Route path="/login" element={<Auth />} />
        </Routes>        
    </HistoryRouter>
  
)
