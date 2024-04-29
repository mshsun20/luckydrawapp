import React, { useState, useEffect } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import server from '../../server'

const Addacc = () => {
    const navigate = useNavigate()
    const [cntst, setCntst] = useState([{}])
    const [acc, setAcc] = useState({acc_unique_code:'', acc_phone:'', acc_name:'', acc_email:'', acc_type:'', acc_cat:'', acc_subcat:'', acc_status:'', ticket_count:0, contest_id:''})
    let name, value

    const getCntst = async () => {
        const res = await axios.get('http://localhost:5000/viewcntst')
        const data = await res.data
        if (data.length!==0) {
            setCntst(data)
        }
    }
    useEffect(() => {
        getCntst()
    }, [])
    const handlChang = (e) => {
        name = e.target.name
        value = e.target.value
        setAcc({...acc, [name]:value})
    }
    const hndlSubmt = async (ev) => {
        ev.preventDefault()
        const {acc_unique_code, acc_phone, acc_name, acc_email, acc_type, acc_cat, acc_subcat, acc_status, ticket_count, contest_id} = acc

        try {
            const res = await axios.post(`${server}/account/add`, {acc_unique_code, acc_phone, acc_name, acc_email, acc_type, acc_cat, acc_subcat, acc_status, ticket_count})
            const dta = await res.data
            console.log(dta)
            if (dta.statuscode === 422) {
                window.alert(dta.message)
            }
            else if (dta.statuscode === 423) {
                window.alert(dta.message)
            }
            else {
                const account_id = dta.data._id
                console.log(account_id)
                // const rest = await axios.post('http://localhost:5000/booktckt', {acc_unique_code, acc_phone, contest_id, ticket_count})
                // const tdta = await rest.data
                // console.log(tdta)
                // window.alert(tdta.success)
                // navigate('/')
            }
        } catch (error) {
            console.error(error)
        }
        // const res = await fetch('http://localhost:5000/pushacc', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         acc_unique_code, acc_phone, acc_name, acc_email, acc_type, acc_status, ticket_count
        //     })
        // })

        // const data = await res.json()
        // if (data.statuscode === 422) {
        //     window.alert(dta.message)
        // }
        // else if (data.statuscode === 423) {
        //     window.alert(`No Ticket is Created.`)
        // }
        // else {
        //     const {account_id} = data[0]
        //     const rest = await axios.post('http://localhost:5000/booktckt', {acc_unique_code, acc_phone, contest_id, ticket_count})
        //     const tdta = await rest.data
        //     console.log(tdta)
        //     window.alert(tdta.success)
        //     navigate('/')
        // }
    }

  return (
    <>
        <Header/>
        <div className="container">
            <div className='accform'>
                <div className="hdr"></div>
                <div className="frm">
                    <form className='frmsec' noValidate>
                        <div className='frmgrp'>
                            <label htmlFor="acc_unique_code" className="frmlbl">Unique Code :</label>
                            <input type="text" name="acc_unique_code" id="acc_unique_code" className="frmfld" value={acc.acc_unique_code} onChange={handlChang} />
                            <div className="frmvald"></div>
                        </div>
                        <div className='frmgrp'>
                            <label htmlFor="acc_phone" className="frmlbl">Phone Number :</label>
                            <input type="text" name="acc_phone" id="acc_phone" className="frmfld" value={acc.acc_phone} onChange={handlChang} />
                            <div className="frmvald"></div>
                        </div>
                        <div className='frmgrp'>
                            <label htmlFor="acc_name" className="frmlbl">Account Name :</label>
                            <input type="text" name="acc_name" id="acc_name" className="frmfld" value={acc.acc_name} onChange={handlChang} />
                            <div className="frmvald"></div>
                        </div>
                        <div className='frmgrp'>
                            <label htmlFor="acc_email" className="frmlbl">Email Id :</label>
                            <input type="email" name="acc_email" id="acc_email" className="frmfld" value={acc.acc_email} onChange={handlChang} />
                            <div className="frmvald"></div>
                        </div>
                        <div className='frmgrp'>
                            <label htmlFor="acc_type" className="frmlbl">Type :</label>
                            <select name="acc_type" id="acc_type" className="frmfld" value={acc.acc_type} onChange={handlChang}>
                                <option value="0">-----Choose-----</option>
                                <option value="Customer">Customer</option>
                                <option value="Influencer">Influencer</option>
                            </select>
                            <div className="frmvald"></div>
                        </div>
                        <div className='frmgrp'>
                            <label htmlFor="acc_cat" className="frmlbl">Category :</label>
                            <select name="acc_cat" id="acc_cat" className="frmfld" value={acc.acc_cat} onChange={handlChang}>
                                <option value="0">-----Choose-----</option>
                                <option value="Channel Sales">Channel Sales</option>
                                <option value="Project Sales">Project Sales</option>
                                <option value="Internal Transfers">Internal Transfers</option>
                                <option value="Influencers">Influencers</option>
                            </select>
                            <div className="frmvald"></div>
                        </div>
                        <div className='frmgrp'>
                            <label htmlFor="acc_subcat" className="frmlbl">Sub Category :</label>
                            <select name="acc_subcat" id="acc_subcat" className="frmfld" value={acc.acc_subcat} onChange={handlChang}>
                                <option value="0">-----Choose-----</option>
                                <option value="Distributors">Distributors</option>
                                <option value="Dealers">Dealers</option>
                                <option value="Retail Projects">Retail Projects</option>
                                <option value="Traders">Traders</option>
                                <option value="Projects">Projects</option>
                                <option value="Company">Company</option>
                                <option value="Manufacturers">Manufacturers</option>
                                <option value="Godowns">Godowns</option>
                                <option value="Sub Dealers">Sub Dealers</option>
                                <option value="Retailers">Retailers</option>
                                <option value="End Consumers">End Consumers</option>
                                <option value="Contractors">Contractors</option>
                                <option value="Masons">Masons</option>
                                <option value="Engineers">Engineers</option>
                                <option value="Architects">Architects</option>
                            </select>
                            <div className="frmvald"></div>
                        </div>
                        <div className='frmgrp'>
                            <label htmlFor="acc_status" className="frmlbl">Status :</label>
                            <select name="acc_status" id="acc_status" className="frmfld" value={acc.acc_status} onChange={handlChang}>
                                <option value="0">-----Choose-----</option>
                                <option value="Open">Open</option>
                                <option value="Prospective">Prospective</option>
                                <option value="Verification Request">Verification Request</option>
                                <option value="Rejected">Rejected</option>
                                <option value="KYC Approved">KYC Approved</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Closed">Closed</option>
                            </select>
                            <div className="frmvald"></div>
                        </div>
                        <div className='frmgrp'>
                            <label htmlFor="contest_id" className="frmlbl">Choose Contest :</label>
                            <select name="contest_id" id="contest_id" className="frmfld" value={acc.contest_id} onChange={handlChang}>
                                <option value="0">----select contest----</option>
                                {
                                    cntst.length!==0 ? cntst.map((el, i) => (
                                        <option key={i} value={el.contest_id}>{el.contest_name}</option>
                                    )) : null
                                }
                            </select>
                            <div className="frmvald"></div>
                        </div>
                        <div className='frmgrp'>
                            <label htmlFor="ticket_count" className="frmlbl">Reserve No. of Tickets :</label>
                            <input type="text" name="ticket_count" id="ticket_count" className="frmfld" value={acc.ticket_count} onChange={handlChang} />
                            <div className="frmvald"></div>
                        </div>
                        <div className='frmgrp'>
                            <input type="submit" value="Add Account" className="frmfld" onClick={hndlSubmt} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Addacc