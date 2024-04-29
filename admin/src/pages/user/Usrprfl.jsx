import React from 'react'
import { useParams } from 'react-router-dom'
import '../../styles/User.css'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import Server from '../../Server'

const Usrprfl = () => {
    const {id} = useParams()

  return (
    <>
        <div className="wbpg">
            <Header/>

            <div className="main container">
                <div className="content" id='usrsec'>
                    <div className="hdng">My Profile</div>
                </div>
            </div>

            <Footer/>
        </div>
    </>
  )
}

export default Usrprfl