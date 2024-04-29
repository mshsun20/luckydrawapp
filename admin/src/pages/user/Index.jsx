import { useState, useEffect } from 'react'
import '../../styles/User.css'
import { NavLink } from 'react-router-dom'
import { FaUserPlus, FaCloudUploadAlt, FaUserEdit, FaUserMinus } from 'react-icons/fa'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import Server from '../../Server'

const Index = () => {
    const [currUsrdta, setCurrUsrdta] = useState()
    const [dtaDet, setDtaDet] = useState()

    const getCurrUsr = async () => {
        const token = localStorage.getItem('user')
    
        if (token) {
            const res = await axios.get(`${Server}/user/sess/`+token)
            const dta = await res.data
            // console.log(dta)
        
            if (dta.statuscode === 220) {
                // console.log(dta.success)
                setCurrUsrdta(dta.user)
            }
            else {
                console.warn(dta.error)
            }
        }
    }
    const vwData = async () => {
        try {
            const res = await axios.get(`${Server}/user/view`)
            const dta = await res.data
            // console.log(dta)
            setDtaDet(dta.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        vwData()
        getCurrUsr()
    }, [])

    const hndldlt = async (id) => {
        try {
            if (window.confirm(`Wants to Remove the User details ?`)) {
                const res = await axios.delete(`${Server}/user/remove/`+id)
                const dta = await res.data
                // console.log(data)
                if (dta.statuscode === 220) {
                    window.alert(`User Successfully Removed.`)
                    vwData()
                }
            }
            else {
                window.alert(`User Removal Cancelled.`)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

  return (
    <>
        <div className="wbpg">
            <Header/>

            <div className="main container">
                <div className='content' id='usrsec'>
                    <div className="hdng">All User Details</div>
                    <div className="dtlsec">
                        <div className="inf"><span>Here all the User details are listed by folllowing table.</span></div>
                        <div className="addsec"><span>To Add User click here : </span><NavLink to="/admin/users/add" className='navlnk'><button className='addbtn'><FaUserPlus/></button></NavLink></div>
                        <div className="impsec"><span>For Bulk Users Upload : </span><NavLink to='/admin/user/upload' className='navlnk'><button className='upldbtn'><FaCloudUploadAlt/></button></NavLink></div>
                    </div>
                    <div className="lst">
                        <span>Existing User lists</span>
                        <div className="tbldta">
                            {
                                ((dtaDet === undefined)||(dtaDet === null)) ? (<div><span>500 ERROR :: Data couldn't be Fetched</span></div>) : (
                                    <table className='tbl table table-striped table-hover'>
                                        <thead>
                                            <tr>
                                                <th>Username</th>
                                                <th>Name</th>
                                                <th>Phone Number</th>
                                                <th>Email Id</th>
                                                <th style={{backgroundColor:'slateblue'}}>User Type</th>
                                                <th>Company</th>
                                                <th>Employee Code</th>
                                                <th>Branch</th>
                                                <th>Organisation</th>
                                                <th>Division</th>
                                                <th>Department</th>
                                                <th>Designation</th>
                                                <th>User Status</th>
                                                <th style={{backgroundColor:'darkslateblue',color:'lightgrey',borderColor:'gray'}}>Edit Data</th>
                                                <th style={{backgroundColor:'darkslateblue',color:'lightgrey',borderColor:'gray'}}>Remove Data</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dtaDet.map((elm, i) => (
                                                    (currUsrdta)&&(elm._id !== currUsrdta._id)&&(
                                                        <tr key={i}>
                                                            <td style={{whiteSpace:'nowrap'}}><NavLink to='/admin/users/profile'>{elm.usr_unam}</NavLink></td>
                                                            <td style={{whiteSpace:'nowrap'}}><NavLink to='/admin/users/profile'>{elm.usr_name}</NavLink></td>
                                                            <td  style={{whiteSpace:'nowrap'}}>{elm.usr_phone}</td>
                                                            <td  style={{whiteSpace:'nowrap'}}>{elm.usr_email}</td>
                                                            <td  style={{backgroundColor:`${((elm.usr_type==='Developer')||(elm.usr_type==='Super Admin')) ? 'darkolivegreen' : ((elm.usr_type==='Administrator') ? 'darkmagenta' : 'darkslateblue')}`,whiteSpace:'nowrap'}}>{elm.usr_type}</td>
                                                            <td  style={{whiteSpace:'nowrap'}}>{elm.usr_cmpny}</td>
                                                            <td  style={{whiteSpace:'nowrap'}}>{elm.usr_emp_code}</td>
                                                            <td  style={{whiteSpace:'nowrap'}}>{elm.usr_brnch}</td>
                                                            <td  style={{whiteSpace:'nowrap'}}>{elm.usr_org}</td>
                                                            <td  style={{whiteSpace:'nowrap'}}>{elm.usr_div}</td>
                                                            <td  style={{whiteSpace:'nowrap'}}>{elm.usr_dept}</td>
                                                            <td  style={{whiteSpace:'nowrap'}}>{elm.usr_desig}</td>
                                                            <td  style={{whiteSpace:'nowrap'}}>{elm.usr_status}</td>
                                                            <td style={{textAlign:'center',whiteSpace:'nowrap'}}><NavLink to={`/editacc/${elm._id}`} className='navlnk'><button className='edtbtn'><FaUserEdit/></button></NavLink></td>
                                                            <td style={{textAlign:'center',whiteSpace:'nowrap'}}><NavLink className='navlnk' onClick={ev => hndldlt(elm._id)}><button className='dltbtn'><FaUserMinus/></button></NavLink></td>
                                                        </tr>
                                                    )
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    </>
  )
}

export default Index