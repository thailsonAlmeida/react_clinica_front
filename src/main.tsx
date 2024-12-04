import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Professionals from './routes/Professionals/index.tsx'
import Agenda from './routes/Agenda/index.tsx'
import Patients from './routes/Patients/index.tsx'
import Scheduling from './routes/Scheduling/index.tsx'
import Auth from './routes/Auth/index.tsx'

createRoot(document.getElementById('root')!).render(  
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} >
                <Route path="profissionais" element={<Professionals />} />            
                <Route path="pacientes" element={<Patients />} />
                <Route path="agendamentos" element={<Scheduling />} />
                <Route path="agendamentos/id" element={<Agenda />} />                
            </Route>
            <Route path="/login" element={<Auth />} />
        </Routes>        
    </BrowserRouter>
  
)
