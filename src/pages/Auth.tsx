import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '../integrations/supabase'
import useAuth from '../hooks/useAuth'

const Auth = () => {
    const navigate = useNavigate()
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    useEffect(() => {
        const session = useAuth()
        if (session) navigate('/home')
    }, [])

    const handleSubmit = async () => {
        setLoading(true)
        try {
            if (email === '' || password === '') {
                alert('Por favor, completa todos los campos')
                setLoading(false)
                return
            }
            const { error } = await supabase.auth.signInWithPassword({ email, password })
            if (error) {
                alert(error.message)
                setLoading(false)
                return
            }
            setTimeout(() => navigate('/home'), 1000)
        } catch (error) {
            alert((error as Error).message)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='bg-white p-4 rounded-2xl shadow w-[400px]'>
            {loading && <p>Cargando...</p>}
            <div className='flex items-center justify-between mb-4 gap-4'>
                <div className='flex flex-col items-center gap-2 bg-gray-100 p-2 rounded-lg'>
                    <p>Si no tienes cuenta </p>
                    <button type="button" onClick={() => navigate('/register')} className='bg-green-500 hover:bg-green-600 transition-colors duration-200 text-white p-2 rounded-md'>REGISTRESE</button>
                </div>
                <h1>Login</h1>
            </div>
            <form className='flex flex-col gap-4 mt-4' >
                <label htmlFor="name">Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500' />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500' />
                <button type="button" onClick={handleSubmit} className='bg-green-500 hover:bg-green-600 transition-colors duration-200 text-white p-2 rounded-md'>Login</button>
            </form>
        </div>
    )
}

export default Auth