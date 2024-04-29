import { useState, useEffect } from 'react'
import axios from 'axios'
import Server from '../Server'

const Topbar = () => {
    const [mode, setMode] = useState('Online')

    const chckMode = async () => {
        try {
            const res = await axios.get(`${Server}/chckstat`)
            const data = await res.data
            // console.log(data)
            if (data.statuscode === 200) {
                setMode('Online')
                // console.log(data.message)
            }
            else {
                setMode('Offline')
                console.log(`Server is Offline...!`)
            }
        } catch (error) {
            setMode('Offline')
            console.error(error)
        }
    }
    useEffect(() => {
        chckMode()
    }, [])
    setInterval(() => {
        chckMode()
    }, 10000);

  return (
    <>
        <div className='topbar'>
            <div className="stat">
                {
                    (mode==='Offline') ? <div className='offln'>Offline Mode</div> : null
                }
            </div>
            <div className="topr">
                <span style={{fontWeight:'bold'}}>Contact Us @</span>&nbsp;&nbsp;<span><a href="tel:1800 202 2233" style={{fontStyle:'italic'}}>1800 202 2233</a></span>
            </div>
        </div>
    </>
  )
}

export default Topbar