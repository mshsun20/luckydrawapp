import { useState, useEffect } from 'react'
import '../../styles/Contest.css'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import Server from '../../Server'
import locm from '../../data/Locm'

const Addcntst = () => {
    const [vl, setVl] = useState()
    const [usr, setUsr] = useState()
    const [sttm, setSttm] = useState()
    let name, value
    const navig = useNavigate()

    const fetchUsr = async () => {
        try {
            const res = await axios.get(`${Server}/user/view`)
            const dta = await res.data
            // console.log(dta)
            setUsr(dta.data)
        } catch (error) {
            console.error(error)
        }
    }
    const fetchStatem = async () => {
        try {
            const res = await axios.get(`${Server}/statem/view`)
            const dta = await res.data
            // console.log(dta)
            setSttm(dta.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchUsr()
        fetchStatem()
    }, [])

    const hndlinp = (e) => {
        name = e.target.name
        value = e.target.value
        setVl({...vl, [name]:value})
    }
    const hndlsub = async (e) => {
        e.preventDefault()
        const {cntst_name, scheme_name, state, cntst_start_dt, cntst_validity, added_by} = vl
        const cntstdt = new Date(cntst_start_dt).toISOString()
        // console.log(cntstdt)

        try {
            const res = await axios.post(`${Server}/contest/add`, {cntst_name, scheme_name, state, cntst_start_dt:cntstdt, cntst_validity, added_by})
            const dta = await res.data
            // console.log(dta.data)

            if (dta.statuscode === 220) {
                window.alert(dta.success)
                navig('/admin/contests')
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
                <div className='content' id='cntstsec'>
                    <div className="hdr">Add Contest</div>
                    <div className="frmsec">
                        <form className='frm'>
                            <div className='frmgrp'>
                                <label htmlFor="cntst_name" className="frmlbl form-label w-25">Contest Name</label>
                                <input type="text" className="frminp form-control form-control-lg w-50" name="cntst_name" id="cntst_name" onChange={hndlinp} />
                                <div className="frmvald"></div>
                            </div>
                            <div className='frmgrp'>
                                <label htmlFor="scheme_name" className="frmlbl form-label w-25">Scheme Name</label>
                                <input type="text" className="frminp form-control form-control-lg w-50" name="scheme_name" id="scheme_name" onChange={hndlinp} />
                                <div className="frmvald"></div>
                            </div>
                            <div className='frmgrp'>
                                <label htmlFor="state" className="frmlbl form-label w-25">State</label>
                                <select className='frmslct form-select form-select-lg w-50' name="state" id="state" onChange={hndlinp}>
                                    <option value="0">Select State</option>
                                    {
                                        sttm&&sttm.map((elm, i) => (
                                            <option value={elm._id} key={i}>{elm.state_name}</option>
                                        ))
                                    }
                                </select>
                                <div className="frmvald"></div>
                            </div>
                            <div className='frmgrp'>
                                <label htmlFor="cntst_start_dt" className="frmlbl form-label w-25">Contest Start Date</label>
                                <input type="date" className="frminp form-control form-control-lg w-50" name="cntst_start_dt" id="cntst_start_dt" onChange={hndlinp} />
                                <div className="frmvald"></div>
                            </div>
                            <div className='frmgrp'>
                                <label htmlFor="cntst_validity" className="frmlbl form-label w-25">Contest Validity (in Days)</label>
                                <input type="text" className="frminp form-control form-control-lg w-50" name="cntst_validity" id="cntst_validity" onChange={hndlinp} />
                                <div className="frmvald"></div>
                            </div>
                            <div className='frmgrp'>
                                <label htmlFor="added_by" className="frmlbl form-label w-25">Added By</label>
                                <select className='frmslct form-select form-select-lg w-50' name="added_by" id="added_by" onChange={hndlinp}>
                                    <option value="0">Set User</option>
                                    {
                                        usr&&usr.map((elm, i) => (
                                            <option value={elm._id} key={i}>{elm.usr_name}</option>
                                        ))
                                    }
                                </select>
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

export default Addcntst