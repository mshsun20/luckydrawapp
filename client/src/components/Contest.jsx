import React, { useState, useEffect } from 'react'
import '../styles/Contest.css'
import Header from './Header'
import Footer from './Footer'
import { NavLink } from 'react-router-dom'
import { FaUserPlus, FaUserEdit, FaUserMinus } from 'react-icons/fa'
import axios from 'axios'

const Contest = () => {
  const [cntdata, setCntdata] = useState([{}])
  const [cntcount, setCntcount] = useState([{}])
  const vwData = async () => {
    const res = await axios.get('http://localhost:5000/viewcntsttck')
    const dataa = await res.data[0]
    const datab = await res.data[1]
    // console.log(datab)
    setCntdata(dataa)
    setCntcount(datab)
  }
  // const getAll = () => {
  //   dtaDet.length>0 ? dtaDet.forEach((el, i) => (
  //     console.log(el)
  //   )) : null
  // }
  useEffect(() => {
    vwData()
  },[])

  const hndldlt = async (id) => {
    try {
      const res = await axios.delete('http://localhost:5000/delcntst/'+id)
      const data = await res.data
      // console.log(data)
      if(data) {
        window.alert(`Contest Successfully Removed.`)
        window.location.reload()
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
        <Header/>
        <div className="container">
          <div className='contest'>
            <div className="cntsthdng">Contests Details</div>
            <div className="cntstdtl">
              <div className="cntstinf"><span>Here all the Contests details are listed by folllowing table.</span></div>
              <div className="cntstadd"><span>Add a New Contest click here : </span><NavLink to="/addcntst" className='navlnk'><button className='addbtn'><FaUserPlus/></button></NavLink></div>
              {/* <div className="cntstimp"><span>Bulk Contests Upload : </span><NavLink to='/upldacc' className='navlnk'><button className='upldbtn'><FaCloudUploadAlt/></button></NavLink></div> */}
            </div>
            <div className="cntstlst">
              <span>All Active Contests lists</span>
              <div className="cnttbls">
                <table className='cntsttbl'>
                  <thead>
                    <tr>
                      <th>Contest Id</th>
                      <th>Contest Name</th>
                      <th>State</th>
                      <th>Contest Date</th>
                      <th>Edit Data</th>
                      <th>Remove Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cntdata.map((elm, i) => (
                        <tr key={i}>
                          <td>{elm.contest_id}</td>
                          <td><NavLink to={`/raffle/${elm.contest_id}`} className='navlnk'>{elm.contest_name}</NavLink></td>
                          <td>{elm.contest_state}</td>
                          <td>{elm.contest_date}</td>
                          <td><NavLink to={`/editcntst/${elm.account_id}`} className='navlnk'><button className='edtbtn'><FaUserEdit/></button></NavLink></td>
                          <td><NavLink className='navlnk' onClick={ev => hndldlt(elm.account_id)}><button className='dltbtn'><FaUserMinus/></button></NavLink></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
                <table className='cntsttbl'>
                  <thead>
                    <tr>
                      <th>Contest Id</th>
                      <th>No of Assigned Tickets</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cntcount.map((elm, i) => (
                        <tr key={i}>
                          <td>{elm.contest_id}</td>
                          <td>{elm.count_cntst}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
    </>
  )
}

export default Contest