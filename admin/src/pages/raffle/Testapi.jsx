import { useState, useEffect, useRef } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import Server from '../../Server'
// import emailjs from '@emailjs/browser'

const Testapi = () => {
  const form = useRef()
  // const service_id = 'service_4stis0v'
  // const template_id = 'template_22skr74'
  // const public_key = 'IH4dYCARDEmnRB-FY'

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`${Server}/mail`)
      const dta = await res.data
      console.log(dta)
    } catch (error) {
      console.error(error)
    }

    // emailjs
    //   .sendForm(service_id, template_id, form.current, {
    //     publicKey: public_key,
    //   })
    //   .then(
    //     () => {
    //       console.log('SUCCESS!');
    //     },
    //     (error) => {
    //       console.log('FAILED...', error.text);
    //     },
    //   );
  };

  return (
    <>
        <div className="wbpg">
            <Header/>

            <div className="main">
              <div className="mailersec" style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',width:'50%',height:'50rem',padding:'2rem'}}>
                <form ref={form} onSubmit={sendEmail} style={{display:'flex',justifyContent:'space-evenly',alignItems:'center',flexDirection:'column',width:'90%',height:'90%',padding:'2rem'}}>
                  <div className="frmgrp">
                    <label className='form-label'>Name</label>
                    <input className='form-control' type="text" name="from_name" />
                  </div>
                  <div className="frmgrp">
                    <label className='form-label'>Email</label>
                    <input className='form-control' type="email" name="reply_to" />
                  </div>
                  <div className="frmgrp">
                    <label className='form-label'>Message</label>
                    <textarea className='form-control' name="mail_msg" />
                  </div>
                  <input type="submit" value="Send" />
                </form>
              </div>
            </div>

            <Footer/>
        </div>
    </>
  )
}

export default Testapi