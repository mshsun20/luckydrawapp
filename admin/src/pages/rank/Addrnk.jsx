import { useState, useEffect } from 'react'
import '../../styles/Rank.css'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import Server from '../../Server'

const Addrnk = () => {
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
        const {rnk_val, rnk_info} = vl

        try {
            const res = await axios.post(`${Server}/rank/add`, {rnk_val, rnk_info})
            const dta = await res.data
            // console.log(dta.data)

            if (dta.statuscode === 220) {
                window.alert(dta.success)
                navig('/admin/ranks')
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
                <div className='content' id='tcktsec'>
                    <div className="hdr">Book Ticket</div>
                    <div className="frmsec">
                        <form className='frm'>
                            <div className='frmgrp'>
                                <label htmlFor="rnk_val" className="frmlbl form-label w-25">Rank Value</label>
                                <input type="text" className="frminp form-control form-control-lg w-50" name="rnk_val" id="rnk_val" onChange={hndlinp} />
                                <div className="frmvald"></div>
                            </div>
                            <div className='frmgrp'>
                                <label htmlFor="rnk_info" className="frmlbl form-label w-25">Rank Info</label>
                                <input type="text" className="frminp form-control form-control-lg w-50" name="rnk_info" id="rnk_info" onChange={hndlinp} />
                                <div className="frmvald"></div>
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

export default Addrnk