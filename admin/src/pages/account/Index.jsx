import { useState, useEffect } from 'react'
import '../../styles/Account.css'
import { NavLink } from 'react-router-dom'
import { FaUserPlus, FaCloudUploadAlt, FaUserEdit, FaUserMinus } from 'react-icons/fa'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import Server from '../../Server'

const Index = () => {
  const [dtaDet, setDtaDet] = useState()
  const vwData = async () => {
    try {
      const res = await axios.get(`${Server}/account/view`)
      const dta = await res.data
      // console.log(dta)
      setDtaDet(dta.data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    vwData()
  },[])

  const hndldlt = async (id) => {
    try {
      const res = await axios.delete(`${Server}/account/delete`+id)
      const dta = await res.data
      // console.log(dta)
      if (dta) {
        window.alert(`Account Successfully Removed.`)
        vwData()
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
              <div className='content' id='accsec'>
                <div className="hdng">Account Details</div>
                <div className="dtlsec">
                  <div className="inf"><span>Here all the Account details are listed by folllowing table.</span></div>
                  <div className="addsec"><span>To Add Account click here : </span><NavLink to="/admin/accounts/add" className='navlnk'><button className='addbtn'><FaUserPlus/></button></NavLink></div>
                  <div className="impsec"><span>For Bulk Accounts Upload : </span><NavLink to='/admin/accounts/upload' className='navlnk'><button className='upldbtn'><FaCloudUploadAlt/></button></NavLink></div>
                </div>
                <div className="lst">
                  <span>Existing Account lists</span>
                  <div className="tbldta">
                    {
                      ((dtaDet === undefined)||(dtaDet === null)) ? (<div><span>500 ERROR :: Data couldn't be Fetched</span></div>) : (
                        <table className='tbl table table-striped table-hover'>
                          <thead>
                            <tr>
                              <th>Unique Code</th>
                              <th>Account Name</th>
                              <th>Phone Number</th>
                              <th>Email Id</th>
                              <th>Type</th>
                              <th>Sub Category</th>
                              <th>Status</th>
                              <th>Tickets Booked</th>
                              <th style={{backgroundColor:'darkslateblue',color:'lightgrey',borderColor:'gray'}}>Edit Data</th>
                              <th style={{backgroundColor:'darkslateblue',color:'lightgrey',borderColor:'gray'}}>Remove Data</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              dtaDet.map((elm, i) => (
                                <tr key={i}>
                                <td><NavLink to='/admin/users/profile'>{elm.acc_unique_code}</NavLink></td>
                                <td><NavLink to='/admin/users/profile'>{elm.acc_name}</NavLink></td>
                                <td>{elm.acc_phone}</td>
                                <td>{elm.acc_email}</td>
                                <td>{elm.acc_type}</td>
                                <td>{elm.acc_subcat}</td>
                                <td>{elm.acc_status}</td>
                                <td style={{textAlign:'center'}}>{elm.booked_tckt}</td>
                                <td style={{textAlign:'center'}}><NavLink to={`/editacc/${elm._id}`} className='navlnk'><button className='edtbtn'><FaUserEdit/></button></NavLink></td>
                                <td style={{textAlign:'center'}}><NavLink className='navlnk' onClick={ev => hndldlt(elm._id)}><button className='dltbtn'><FaUserMinus/></button></NavLink></td>
                              </tr>
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