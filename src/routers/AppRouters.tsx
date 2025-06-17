import { Navigate, Route, Routes } from 'react-router'
import Home from '../pages/Home'
import Registre from '../pages/Registre'
import Auth from '../pages/Auth'
import ProtectedRouters from './ProtectedRouters'
import FormAddRecord from '../components/home/FormAddRecord'

const AppRouters = () => {
    return (
        <div>
            <Routes>
                <Route element={<Navigate to="/home" />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/register" element={<Registre />} />
                <Route path="/home" element={<ProtectedRouters><Home /></ProtectedRouters>} />
                <Route path="/add-contact" element={<ProtectedRouters><FormAddRecord /></ProtectedRouters>} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </div>
    )
}

export default AppRouters