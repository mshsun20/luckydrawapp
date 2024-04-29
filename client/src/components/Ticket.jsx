import React, { useState, useEffect } from 'react'
import '../styles/Ticket.css'
import Header from './Header'
import Footer from './Footer'
import { NavLink } from 'react-router-dom'
import { FaUserPlus, FaUserEdit, FaUserMinus } from 'react-icons/fa'
import axios from 'axios'

const Ticket = () => {
  const [dtaDet, setDtaDet] = useState([{}])
  const vwData = async () => {
    const res = await fetch('http://localhost:5000/viewtckt', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data = await res.json()
    // console.log(data)
    setDtaDet(data)
  }
  useEffect(() => {
    vwData()
  },[])

  const hndldlt = async (id) => {
    try {
      const res = await axios.delete('http://localhost:5000/deltckt/'+id)
      const data = await res.data
      // console.log(data)
      if (data) {
        window.alert(`Ticket Successfully Removed.`)
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
          <div className='ticket'>
            <div className="tckthdng">Tickets Details</div>
            <div className="tcktdtl">
              <div className="tcktinf"><span>Here all the tickets details are listed by folllowing below.</span></div>
              <div className="tcktadd"><span>Add New Ticket click here : </span><NavLink to="/addtckt" className='navlnk'><button className='addbtn'><FaUserPlus/></button></NavLink></div>
            </div>
            <div className="tcktlst">
              <table border='1' className='tckttbl'>
                <thead>
                  <tr>
                    <th>Ticket Number</th>
                    <th>Account Name</th>
                    <th>Contest Name</th>
                    <th>Edit Data</th>
                    <th>Remove Data</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    dtaDet.map((dta, i) => (
                      <tr key={i}>
                      <td>{dta.ticket_no}</td>
                      <td>{dta.account_name}</td>
                      <td>{dta.contest_name}</td>
                      <td><NavLink to={`/edittckt/${dta.ticket_no}`} className='navlnk'><button className='edtbtn'><FaUserEdit/></button></NavLink></td>
                      <td><NavLink className='navlnk' onClick={ev => hndldlt(dta.ticket_no)}><button className='dltbtn'><FaUserMinus/></button></NavLink></td>
                    </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer/>
    </>
  )
}

export default Ticket