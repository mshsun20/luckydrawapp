import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import Server from '../../Server'

const Addusr = () => {
    const [vl, setVl] = useState()
    let name, value, usrcmpny = 'Shyam Metalics'
    const navig = useNavigate()

    const hndlinp = (e) => {
        name = e.target.name
        value = e.target.value
        setVl({...vl, [name]:value})
    }
    const hndlsub = async (e) => {
        e.preventDefault()
        const {usr_unam, usr_pass, usr_name, usr_email, usr_phone, usr_type, usr_emp_code, usr_brnch, usr_org, usr_div, usr_dept, usr_desig, usr_status} = vl

        try {
            const res = await axios.post(`${Server}/user/add`, {usr_unam, usr_pass, usr_name, usr_email, usr_phone, usr_type, usr_cmpny:usrcmpny, usr_emp_code:parseInt(usr_emp_code), usr_brnch, usr_org, usr_div, usr_dept, usr_desig, usr_status})
            const dta = await res.data
            // console.log(dta.data)

            if (dta.statuscode === 220) {
                window.alert(dta.success)
                navig('/admin/users')
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
                                <label htmlFor="usr_unam" className='frmlbl form-label w-25'>Username</label>
                                <input type="text" className='frminp form-control form-control-lg w-50' name="usr_unam" id="usr_unam" onChange={hndlinp} />
                            </div>
                            <div className="frmgrp">
                                <label htmlFor="usr_pass" className='frmlbl form-label w-25'>Password</label>
                                <input type="password" className='frminp form-control form-control-lg w-50' name="usr_pass" id="usr_pass" onChange={hndlinp} />
                            </div>
                            <div className="frmgrp">
                                <label htmlFor="usr_name" className='frmlbl form-label w-25'>Full Name</label>
                                <input type="text" className='frminp form-control form-control-lg w-50' name="usr_name" id="usr_name" onChange={hndlinp} />
                            </div>
                            <div className="frmgrp">
                                <label htmlFor="usr_email" className='frmlbl form-label w-25'>Email Id</label>
                                <input type="text" className='frminp form-control form-control-lg w-50' name="usr_email" id="usr_email" onChange={hndlinp} />
                            </div>
                            <div className="frmgrp">
                                <label htmlFor="usr_phone" className='frmlbl form-label w-25'>Phone Number</label>
                                <input type="text" className='frminp form-control form-control-lg w-50' name="usr_phone" id="usr_phone" onChange={hndlinp} />
                            </div>
                            <div className="frmgrp">
                                <label htmlFor="usr_type" className='frmlbl form-label w-25'>User Type</label>
                                <select className='frmslct form-select form-select-lg w-50' name="usr_type" id="usr_type" onChange={hndlinp}>
                                    <option value="0">Set Type</option>
                                    <option value="Administrator">Administrator</option>
                                    <option value="SAP Approver">SAP Approver</option>
                                    <option value="L1 Approver">L1 Approver</option>
                                    <option value="Commercial User">Commercial User</option>
                                    <option value="Sales User">Sales User</option>
                                    <option value="CRM User">CRM User</option>
                                    <option value="General User">General User</option>
                                </select>
                            </div>
                            <div className="frmgrp">
                                <label htmlFor="usr_cmpny" className='frmlbl form-label w-25'>Company</label>
                                <input type="text" className='frminp form-control form-control-lg w-50' name="usr_cmpny" id="usr_cmpny" value={usrcmpny} readOnly disabled  onChange={hndlinp} />
                            </div>
                            <div className="frmgrp">
                                <label htmlFor="usr_emp_code" className='frmlbl form-label w-25'>Employee Code</label>
                                <input type="text" className='frminp form-control form-control-lg w-50' name="usr_emp_code" id="usr_emp_code" onChange={hndlinp} />
                            </div>
                            <div className="frmgrp">
                                <label htmlFor="usr_brnch" className='frmlbl form-label w-25'>Branch</label>
                                <select className='frmslct form-select form-select-lg w-50' name="usr_brnch" id="usr_brnch" onChange={hndlinp}>
                                    <option value="0">Choose Branch</option>
                                    <option value="Head Office">Head Office</option>
                                    <option value="Plant">Plant</option>
                                    <option value="Warehouse">Warehouse</option>
                                </select>
                            </div>
                            <div className="frmgrp">
                                <label htmlFor="usr_org" className='frmlbl form-label w-25'>Organisation</label>
                                <select className='frmslct form-select form-select-lg w-50' name="usr_org" id="usr_org" onChange={hndlinp}>
                                    <option value="0">Choose Organisation</option>
                                    <option value="SMEL">SMEL</option>
                                    <option value="SSPL">SSPL</option>
                                    <option value="Both">Both</option>
                                </select>
                            </div>
                            <div className="frmgrp">
                                <label htmlFor="usr_div" className='frmlbl form-label w-25'>Division</label>
                                <select className='frmslct form-select form-select-lg w-50' name="usr_div" id="usr_div" onChange={hndlinp}>
                                    <option value="0">Choose Division</option>
                                    <option value="Rolling Mill">Rolling Mill</option>
                                    <option value="Structural Mill">Structural Mill</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                            <div className="frmgrp">
                                <label htmlFor="usr_dept" className='frmlbl form-label w-25'>Department</label>
                                <select className='frmslct form-select form-select-lg w-50' name="usr_dept" id="usr_dept" onChange={hndlinp}>
                                    <option value="0">Choose Department</option>
                                    <option value="IT">IT</option>
                                    <option value="Branding">Branding</option>
                                    <option value="Commercial">Commercial</option>
                                    <option value="CRM">CRM</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Management">Management</option>
                                </select>
                            </div>
                            <div className="frmgrp">
                                <label htmlFor="usr_desig" className='frmlbl form-label w-25'>Designation</label>
                                <select className='frmslct form-select form-select-lg w-50' name="usr_desig" id="usr_desig" onChange={hndlinp}>
                                    <option value="0">Choose Designation</option>
                                    <option value="Chairman">Chairman</option>
                                    <option value="Vice Chairman">Vice Chairman</option>
                                    <option value="Mangaing Director">Mangaing Director</option>
                                    <option value="Country Head">Country Head</option>
                                    <option value="Zonal Head">Zonal Head</option>
                                    <option value="State Head">State Head</option>
                                    <option value="Regional Head">Regional Head</option>
                                    <option value="Branch Head">Branch Head</option>
                                    <option value="Department Head">Department Head</option>
                                    <option value="Technical Head">Technical Head</option>
                                    <option value="Senior General Manager">Senior General Manager</option>
                                    <option value="Assistant General Manager">Assistant General Manager</option>
                                    <option value="General Manager">General Manager</option>
                                    <option value="Senior Manager">Senior Manager</option>
                                    <option value="Assistant Manager">Assistant Manager</option>
                                    <option value="Deputy Manager">Deputy Manager</option>
                                    <option value="Sales Manager">Sales Manager</option>
                                    <option value="Assistant Sales Manager">Assistant Sales Manager</option>
                                    <option value="Senior Sales Officer">Senior Sales Officer</option>
                                    <option value="Sales Officer">Sales Officer</option>
                                    <option value="Senior Officer">Senior Officer</option>
                                    <option value="Officer">Officer</option>
                                    <option value="TSO">TSO</option>
                                    <option value="PSO">PSO</option>
                                    <option value="PSSO">PSSO</option>
                                </select>
                            </div>
                            <div className="frmgrp">
                                <label htmlFor="usr_status" className='frmlbl form-label w-25'>User Status</label>
                                <select className='frmslct form-select form-select-lg w-50' name="usr_status" id="usr_status" onChange={hndlinp}>
                                    <option value="0">Assign Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Closed">Closed</option>
                                </select>
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

export default Addusr