

const useAuth = () => {
    try {
        const _locaStorage = localStorage.getItem('sb-dlmqpagzzszmmfrhjzpa-auth-token') ?? ''
        if (_locaStorage) {
            const session = _locaStorage ? JSON.parse(_locaStorage) : null
            return session
        }
    } catch (error) {
        console.log(error)
    }
    return null
}

export default useAuth