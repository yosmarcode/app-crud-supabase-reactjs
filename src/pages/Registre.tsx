import React from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '../integrations/supabase'

const Registre = () => {
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const email = e.currentTarget.email.value
        const password = e.currentTarget.password.value

        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setTimeout(() => navigate('/home'), 1000)
    }
    return (
        <div className='bg-white p-4 rounded-2xl shadow w-[400px]'>
            <div className='flex items-center justify-center mb-4 gap-4'>
                <button type="button" onClick={() => navigate('/auth')} className='bg-green-500 hover:bg-green-600 transition-colors duration-200 text-white p-2 rounded-md'>Volver</button>
                <h1>Registre</h1>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4' >
                <label htmlFor="name">Email</label>
                <input type="email" placeholder="Email" name="email" className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500' />
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" name="password" className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500' />
                <button type="submit" className='bg-green-500 hover:bg-green-600 transition-colors duration-200 text-white p-2 rounded-md'>Registre</button>
            </form>
        </div>
    )
}
export default Registre
