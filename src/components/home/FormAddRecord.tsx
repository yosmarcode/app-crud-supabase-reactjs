import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { supabase } from '../../integrations/supabase'
import useAuth from '../../hooks/useAuth'

const FormAddRecord = () => {
    const session = useAuth()
    const locations = useLocation()
    const navigate = useNavigate()
    const id = locations.state.id
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [active, setActive] = React.useState(true)

    const handleAddContact = async () => {
        let user_id = session?.user.id
        const { error } = await supabase.from('contacts').insert({ name, email, phone, active, user_id })
        if (error) throw error
        alert('Contacto agregado correctamente')
        setTimeout(() => navigate('/home'), 1000)
    }

    const handleEditContact = async () => {
        let user_id = session?.user.id
        const { error } = await supabase.from('contacts').update({ name, email, phone, active, user_id }).eq('id', id)
        if (error) throw error
        alert('Contacto editado correctamente')
        setTimeout(() => navigate('/home'), 1000)
    }

    useEffect(() => {
        if (id) {
            const fetchContact = async () => {
                const { data, error } = await supabase.from('contacts').select('*').eq('id', id)
                if (error) throw error
                if (data) {
                    setName(data[0].name)
                    setEmail(data[0].email)
                    setPhone(data[0].phone)
                    setActive(data[0].active)
                }
            }
            fetchContact()
        }
    }, [id])

    const handleFormClear = () => {
        setName('')
        setEmail('')
        setPhone('')
        setActive(true)
        navigate('/home')
    }

    return (
        <div className='bg-white p-4 rounded-2xl shadow w-[400px]'>
            <div>
                <button type="button" onClick={handleFormClear} className='bg-green-500 hover:bg-green-600 transition-colors duration-200 text-white p-2 rounded-md'>Volver</button>
            </div>
            <form className='flex flex-col gap-4 mt-4' >
                <label htmlFor="name">Nombre</label>
                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500' />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500' />
                <label htmlFor="phone">Telefono</label>
                <input type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500' />
                <div className='flex items-center gap-2 bg-gray-50 p-2 rounded-md'>
                    <label htmlFor="active">{active ? 'Activo' : 'Inactivo'}</label>
                    <input type="checkbox" name="active" id="active" checked={active} onChange={(e) => setActive(e.target.checked)} />
                </div>
                <button type="button" onClick={id === null ? handleAddContact : handleEditContact} className='bg-green-500 hover:bg-green-600 transition-colors duration-200 text-white p-2 rounded-md'>{id === null ? 'Agregar Contacto' : 'Editar Contacto'}</button>
            </form>
        </div>
    )
}

export default FormAddRecord