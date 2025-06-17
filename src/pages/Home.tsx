import { useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router'
import ContactListComponents from '../components/home/ContactListComponents'
import { supabase } from '../integrations/supabase'
import { KEY_STORAGE } from '../const/constants'

const Home = () => {
    const navigate = useNavigate()
    const session = useAuth()

    useEffect(() => {
        if (!session) navigate('/auth')
    }, [])

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        localStorage.removeItem(KEY_STORAGE)
        navigate('/auth')
    }

    return (
        <div>
            <div className='flex items-center justify-center mb-4 gap-4'>
                <button type="button" onClick={handleLogout} className='bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white p-2 rounded-md'>Cerrar Sesión</button>
            </div>
            <div className='bg-white p-4 rounded-2xl shadow w-[400px]'>

                <ContactListComponents />
            </div>
        </div>
    )
}

export default Home