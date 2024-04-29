import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Autohome = () => {
    const navig = useNavigate()
    useEffect(() => {
        return navig('/admin/home')
    }, [navig])
}

export default Autohome