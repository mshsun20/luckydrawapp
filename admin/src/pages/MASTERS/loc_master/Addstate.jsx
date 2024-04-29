import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import axios from 'axios'
import Server from '../../../Server'

const Addstate = () => {
    const [vl, setVl] = useState()
    let name, value
    const navig = useNavigate()

    const hndlinp = (e) => {
        name = e.target.name
        value = e.target.value
        setVl({...vl, [name]:value})
    }
    const hndlsub = async (e) => {
        e.preventDefault()
        const {state_code, state_name, state_abbr} = vl

        try {
            const res = await axios.post(`${Server}/statem/add`, {state_code, state_name, state_abbr})
            const dta = await res.data
            // console.log(dta.data)

            if (dta.statuscode === 220) {
                window.alert(dta.success)
                navig('/admin/master/loc')
            }
            else {
                window.alert(dta.error)
            }
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <>
        <div className="wbpg">
            <Header/>

            <div className="main container">
                <div className='content' id="usrsec">
                    <div className="hdr">Add User</div>
                    <div className="frmsec">
                        <form className='frm'>
                            <div className="frmgrp">
                                <label htmlFor="state_code" className='frmlbl form-label w-25'>State Code</label>
                                <input type="text" className='frminp form-control form-control-lg w-50' name="state_code" id="state_code" onChange={hndlinp} />
                            </div>
                            <div className="frmgrp">
                                <label htmlFor="state_name" className='frmlbl form-label w-25'>State Name</label>
                                <input type="text" className='frminp form-control form-control-lg w-50' name="state_name" id="state_name" onChange={hndlinp} />
                            </div>
                            <div className="frmgrp">
                                <label htmlFor="state_abbr" className='frmlbl form-label w-25'>Abbreviation</label>
                                <input type="text" className='frminp form-control form-control-lg w-50' name="state_abbr" id="state_abbr" onChange={hndlinp} />
                            </div>
                            <div className="frmbtngrp gap-5">
                                <input className='btn btn-outline-primary btn-lg mbtn' type="submit" value="Add" onClick={hndlsub} />
                                <input className='btn btn-outline-secondary btn-lg mbtn' type="reset" value="Refresh" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    </>
  )
}

export default Addstate