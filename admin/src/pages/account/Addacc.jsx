import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import Server from '../../Server'
import accgrp from '../../data/Accgrpm'

const Addacc = () => {
    const [vl, setVl] = useState()
    const [usr, setUsr] = useState()
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
    useEffect(() => fetchUsr, [])

    const hndlinp = (e) => {
        name = e.target.name
        value = e.target.value
        setVl({...vl, [name]:value})
    }
    const hndlsub = async (e) => {
        e.preventDefault()
        const {acc_unique_code, acc_name, acc_phone, acc_email, acc_type, acc_cat, acc_subcat, acc_status, added_by, booked_tckt} = vl
        let bookedtckt = parseInt(booked_tckt)

        try {
            if (!bookedtckt) {
                bookedtckt = 0
            }
            const res = await axios.post(`${Server}/account/add`, {acc_unique_code, acc_name, acc_phone, acc_email, acc_type, acc_cat, acc_subcat, acc_status, added_by, booked_tckt:bookedtckt})
            const dta = await res.data
            // console.log(dta.data)

            if (dta.statuscode === 220) {
                window.alert(dta.success)
                navig('/admin/accounts')
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
                <div className='content' id="accsec">
                    <div className="hdr">Add Account</div>
                    <div className="frmsec">
                        <form className='frm'>
                            <div className="frmgrp">
                                <label htmlFor="acc_unique_code" className='frmlbl form-label w-25'>Unique Code</label>
                                <input type="text" className='frminp form-control form-control-lg w-50' name="acc_unique_code" id="acc_unique_code" onChange={hndlinp} />
                            </div>
                            <div className="frmgrp">
                                <label htmlFor="acc_name" className='frmlbl form-label w-25'>Name</label>
                                <input type="text" className='frminp form-control form-control-lg w-50' name="acc_name" id="acc_name" onChange={hndlinp} />
                            </div>
                            <div className="frmgrp">
                                <label htmlFor="acc_phone" className='frmlbl form-label w-25'>Phone Number</label>
                                <input type="text" className='frminp form-control form-control-lg w-50' name="acc_phone" id="acc_phone" onChange={hndlinp} />
                            </div>
                            <div className="frmgrp">
                                <label htmlFor="acc_email" className='frmlbl form-label w-25'>Email Id</label>
                                <input type="text" className='frminp form-control form-control-lg w-50' name="acc_email" id="acc_email" onChange={hndlinp} />
                            </div>
                            <div className="frmgrp">
                                <label htmlFor="acc_type" className='frmlbl form-label w-25'>Type</label>
                                <select className='frmslct form-select form-select-lg w-50' name="acc_type" id="acc_type" onChange={hndlinp}>
                                    <option value="0">Choose Type</option>
                                    {
                                        accgrp&&accgrp.map((elm, i) => (
                                            <option value={elm.value} key={i}>{elm.value}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="frmgrp">
                                <label htmlFor="acc_cat" className='frmlbl form-label w-25'>Category</label>
                                <select className='frmslct form-select form-select-lg w-50' name="acc_cat" id="acc_cat" onChange={hndlinp}>
                                    <option value="0">Choose Category</option>
                                    {
                                        accgrp&&vl&&accgrp.map((elmi, i) => (
                                            (elmi.value===vl.acc_type)&&elmi.childnode.map((elmj, j) => (
                                                <option value={elmj.value} key={j}>{elmj.value}</option>
                                            ))
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="frmgrp">
                                <label htmlFor="acc_subcat" className='frmlbl form-label w-25'>Sub Category</label>
                                <select className='frmslct form-select form-select-lg w-50' name="acc_subcat" id="acc_subcat" onChange={hndlinp}>
                                    <option value="0">Choose Sub Category</option>
                                    {
                                        accgrp&&vl&&accgrp.map((elmi, i) => (
                                            (elmi.value===vl.acc_type)&&elmi.childnode.map((elmj, j) => (
                                                (elmj.value===vl.acc_cat)&&elmj.childnode.map((elmk, k) => (
                                                    <option value={elmk.value} key={k}>{elmk.value}</option>
                                                ))
                                            ))
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="frmgrp">
                                <label htmlFor="acc_status" className='frmlbl form-label w-25'>Account Status</label>
                                <select className='frmslct form-select form-select-lg w-50' name="acc_status" id="acc_status" onChange={hndlinp}>
                                    <option value="0">Assign Status</option>
                                    <option value="Verification Request">Verification Request</option>
                                    <option value="KYC Approved">KYC Approved</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </div>
                            <div className="frmgrp">
                                <label htmlFor="added_by" className='frmlbl form-label w-25'>Added By</label>
                                <select className='frmslct form-select form-select-lg w-50' name="added_by" id="added_by" onChange={hndlinp}>
                                    <option value="0">Select User</option>
                                    {
                                        usr&&usr.map((elm, i) => (
                                            <option value={elm._id} key={i}>{elm.usr_name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="frmgrp" hidden>
                                <label htmlFor="booked_tckt" className='frmlbl form-label w-25'>No. of Tickets</label>
                                <input type="text" className='frminp form-control form-control-lg w-50' name="booked_tckt" id="booked_tckt" value={0} onChange={hndlinp} />
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

export default Addacc