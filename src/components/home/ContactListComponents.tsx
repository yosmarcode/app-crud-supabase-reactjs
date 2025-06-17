import React from 'react'
import { supabase } from '../../integrations/supabase'
import { useNavigate } from 'react-router'
import useAuth from '../../hooks/useAuth'

const ContactListComponents = () => {
    const navigate = useNavigate()
    const session = useAuth()
    const [contacts, setContacts] = React.useState<any>([])
    const [loading, setLoading] = React.useState(false)


    const fetchContacts = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase.from('contacts').select('*').eq('user_id', session?.user.id)
            if (error) throw error
            setContacts(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddContact = () => {
        navigate('/add-contact', { state: { id: null /* new Record */ } })
    }

    const handleEditContact = (id: string) => {
        navigate('/add-contact', { state: { id } })
    }
    const handleDeleteContact = async (id: string) => {
        try {
            const { error } = await supabase.from('contacts').delete().eq('id', id)
            if (error) throw error
            alert('Contacto eliminado correctamente')
            setTimeout(() => fetchContacts(), 1000)
        } catch (error) {
            console.log(error)
        }
    }


    React.useEffect(() => {
        fetchContacts()
    }, [])

    return (
        <div>
            <div className='flex items-center justify-between mb-4 gap-4'>
                <h1>Lista de contactos</h1>
                <button type="button" onClick={handleAddContact} className='bg-green-500 hover:bg-green-600 transition-colors duration-200 text-white p-2 rounded-md'>Agregar contacto</button>
            </div>

            <hr />
            {loading && <p>Cargando...</p>}
            <div className='flex flex-col gap-4 mt-4'>
                {contacts.map((contact: any) => (
                    <div key={contact.id} className='flex flex-col gap-2 bg-white p-4 rounded-2xl shadow'>
                        <div className='flex flex-col gap-2 mb-2'>
                            <p>{contact.name}</p>
                            <p>{contact.email}</p>
                            <p>{contact.phone}</p>
                            <p>Activo: {contact.active ? '✅' : '❌'}</p>
                        </div>
                        <button type="button" onClick={() => handleEditContact(contact.id)} className='bg-green-500 hover:bg-green-600 transition-colors duration-200 text-white p-2 rounded-md'>Editar</button>
                        <button type="button" onClick={() => handleDeleteContact(contact.id)} className='bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white p-2 rounded-md'>Eliminar</button>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default ContactListComponents