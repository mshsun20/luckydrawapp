import { useState, useEffect } from 'react'
import '../../styles/Ticket.css'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import Server from '../../Server'
// import bookstat from '../../data/Bookstat'

const Addtckt = () => {
    const [vl, setVl] = useState()
    const [acc, setAcc] = useState()
    const [cntst, setCntst] = useState()
    let name, value, uarr =[]
    const navig = useNavigate()

    const fetchAccCntst = async () => {
        try {
            const res = await axios.get(`${Server}/account/view`)
            const res2 = await axios.get(`${Server}/contest/view`)
            const dta = await res.data
            const dta2 = await res2.data
            // console.log(dta)
            // console.log(dta2)
            setAcc(dta.data)
            setCntst(dta2.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchAccCntst()
    }, [])

    const hndlinp = (e) => {
        name = e.target.name
        value = e.target.value
        setVl({...vl, [name]:value})
    }

    const hndlsub = async (e) => {
        e.preventDefault()
        const {booked_acc, booked_cntst, no_of_tckt} = vl

        try {
            const res = await axios.post(`${Server}/ticket/add`, {booked_acc, booked_cntst, no_of_tckt, tckt_status:'Booked'})
            const dta = await res.data
            // console.log(dta.data)

            if (dta.statuscode === 220) {
                window.alert(dta.success)
                navig('/admin/tickets')
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
                                <label htmlFor="booked_acc" className="frmlbl form-label w-25">Account</label>
                                <select className='frmslct form-select form-select-lg w-50' name="booked_acc" id="booked_acc" onChange={hndlinp}>
                                    <option value="0">Select Account</option>
                                    {
                                        acc&&acc.map((elm, i) => (
                                            <option value={elm._id} key={i}>{elm.acc_name}</option>
                                        ))
                                    }
                                </select>
                                <div className="frmvald"></div>
                            </div>
                            <div className='frmgrp'>
                                <label htmlFor="booked_cntst" className="frmlbl form-label w-25">Contest</label>
                                <select className='frmslct form-select form-select-lg w-50' name="booked_cntst" id="booked_cntst" onChange={hndlinp}>
                                    <option value="0">Choose Contest</option>
                                    {
                                        cntst&&cntst.map((elm, i) => (
                                            <option value={elm._id} key={i}>{elm.cntst_name}</option>
                                        ))
                                    }
                                </select>
                                <div className="frmvald"></div>
                            </div>
                            <div className='frmgrp'>
                                <label htmlFor="no_of_tckt" className="frmlbl form-label w-25">No. of Tickets</label>
                                <input type="text" className="frminp form-control form-control-lg w-50" name="no_of_tckt" id="no_of_tckt" onChange={hndlinp} />
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

export default Addtckt