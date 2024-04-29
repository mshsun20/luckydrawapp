import { useState, useEffect } from 'react'
import '../../styles/Contest.css'
import { NavLink } from 'react-router-dom'
import { FaUserPlus, FaCloudUploadAlt, FaUserEdit, FaUserMinus } from 'react-icons/fa'
import { MdCasino } from 'react-icons/md'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import Server from '../../Server'

const Index = () => {
  const [dtaDet, setDtaDet] = useState()

  // const fetchTckt = async () => {
  //   try {
  //     const res = await axios.get(`${Server}/ticket/view`)
  //     const dta = await res.data
  //     console.log(dta.data)
  //     setTckt(dta.data)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const vwgftAllocStat = async () => {
    try {
      const res = await axios.get(`${Server}/contest/edit/updateallocstatfroall`)
      const dta = await res.data
      // console.log(dta)
      // setDtaDet(dta)
    } catch (error) {
      console.error(error)
    }
  }
  const vwData = async () => {
    try {
      const res = await axios.get(`${Server}/contest/view`)
      const dta = await res.data.data
      // console.log(dta)
      setDtaDet(dta)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    vwgftAllocStat()
    vwData()
  }, [])

  const hndldlt = async (id) => {
    try {
      const res = await axios.delete(`${Server}/contest/delete`+id)
      const dta = await res.data
      // console.log(data)
      if (dta) {
        window.alert(`Contest Successfully Removed.`)
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
            <div className='content' id='cntstsec'>
              <div className="hdng">Contest Details</div>
              <div className="dtlsec">
                <div className="inf"><span>Here all the Contest details are listed by folllowing table.</span></div>
                <div className="addsec"><span>To Add Contest click here : </span><NavLink to="/admin/contests/add" className='navlnk'><button className='addbtn'><FaUserPlus/></button></NavLink></div>
                <div className="impsec"><span>For Bulk Contests Upload : </span><NavLink to='/admin/contests/upload' className='navlnk'><button className='upldbtn'><FaCloudUploadAlt/></button></NavLink></div>
              </div>
              <div className="lst">
                <span>Existing Contest lists</span>
                <div className="tbldta">
                  {
                    ((dtaDet === undefined)||(dtaDet === null)) ? (<div><span>500 ERROR :: Data couldn't be Fetched</span></div>) : (
                      <table className='tbl table table-striped table-hover'>
                        <thead>
                          <tr>
                            <th>Contest Name</th>
                            <th>Scheme Name</th>
                            <th>State</th>
                            <th>Start Date</th>
                            <th>Running Validity</th>
                            <th>Booked Tickets</th>
                            <th>Gift Allocation Status</th>
                            <th>Added By</th>
                            <th style={{backgroundColor:'teal',color:'lightgrey',borderColor:'gray'}}>Start Game</th>
                            <th style={{backgroundColor:'darkslateblue',color:'lightgrey',borderColor:'gray'}}>Edit Data</th>
                            <th style={{backgroundColor:'darkslateblue',color:'lightgrey',borderColor:'gray'}}>Remove Data</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            dtaDet.map((elm, i) => (
                              <tr key={i}>
                                <td style={{whiteSpace:'nowrap'}}><NavLink to={`/admin/testapi/${elm._id}`}>{elm.cntst_name}</NavLink></td>
                                <td>{elm.scheme_name}</td>
                                <td>{elm.state&&elm.state.state_name}</td>
                                <td>{new Date(elm.cntst_start_dt).toLocaleString()}</td>
                                <td>{elm.cntst_validity}</td>
                                <td>{elm.tckt_count}</td>
                                <td>{elm.gft_alloc_status}</td>
                                <td>{elm.added_by&&(elm.added_by.usr_name||elm.added_by.usr_unam)}</td>
                                <td style={{textAlign:'center',backgroundColor:'#2a3f07'}}>{(elm.tckt_count>0)&&(elm.gft_alloc_status==='Allocated')&&(<NavLink to={`/admin/raffle/${elm._id}`} className='navlnk'><button className='plybtn'><MdCasino/></button></NavLink>)}</td>
                                <td style={{textAlign:'center'}}><NavLink to={`/admin/testapi/${elm._id}`} className='navlnk'><button className='edtbtn'><FaUserEdit/></button></NavLink></td>
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