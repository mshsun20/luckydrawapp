import { useState, useEffect } from 'react'
import '../../styles/Ticket.css'
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
      const res = await axios.get(`${Server}/ticket/view`)
      const dta = await res.data
      // console.log(dta)
      setDtaDet(dta.data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => vwData,[])

  const hndldlt = async (id) => {
    try {
      const res = await axios.delete(`${Server}/ticket/remove`+id)
      const dta = await res.data
      // console.log(data)
      if (dta) {
        window.alert(`Ticket Successfully Removed.`)
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
            <div className='content' id='tcktsec'>
              <div className="hdng">Ticket Details</div>
              <div className="dtlsec">
                <div className="inf"><span>Here all the Ticket details are listed by folllowing table.</span></div>
                <div className="addsec"><span>To Add Ticket click here : </span><NavLink to="/admin/tickets/add" className='navlnk'><button className='addbtn'><FaUserPlus/></button></NavLink></div>
                <div className="impsec"><span>For Bulk Tickets Upload : </span><NavLink to='/admin/tickets/upload' className='navlnk'><button className='upldbtn'><FaCloudUploadAlt/></button></NavLink></div>
              </div>
              <div className="lst">
                <span>Existing Ticket lists</span>
                <div className="tbldta">
                  {
                    ((dtaDet === undefined)||(dtaDet === null)) ? (<div><span>500 ERROR :: Data couldn't be Fetched</span></div>) : (
                      <table className='tbl table table-striped table-hover'>
                        <thead>
                          <tr>
                            <th>Ticket No</th>
                            <th>Account Name</th>
                            <th>Contest Name</th>
                            <th>Ticket Status</th>
                            <th style={{backgroundColor:'darkslateblue',color:'lightgrey',borderColor:'gray'}}>Edit Data</th>
                            <th style={{backgroundColor:'darkslateblue',color:'lightgrey',borderColor:'gray'}}>Remove Data</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            dtaDet.map((elm, i) => (
                              <tr key={i}>
                                <td><NavLink to='/admin/tickets/detail'>{elm.tckt_no}</NavLink></td>
                                <td>{(elm.booked_acc)&&elm.booked_acc.acc_name}</td>
                                <td>{(elm.booked_cntst)&&elm.booked_cntst.cntst_name}</td>
                                <td>{elm.tckt_status}</td>
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