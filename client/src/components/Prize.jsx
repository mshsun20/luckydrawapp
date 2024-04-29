import React, { useState, useEffect } from 'react'
import '../styles/Prize.css'
import Header from './Header'
import Footer from './Footer'
import { NavLink } from 'react-router-dom'
import { FaUserPlus, FaUserEdit, FaUserMinus } from 'react-icons/fa'
import axios from 'axios'

const Prize = () => {
  const server = 'http://localhost:5000'
  const [dtaDet, setDtaDet] = useState([{}])
  const vwData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/viewprz', {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
      const data = await res.data
      // console.log(data)
      setDtaDet(data)
    } catch (error) {
      console.error(error.message)
    }
  }
  useEffect(() => {
    vwData()
  },[])

  const hndldlt = async (id) => {
    try {
      const res = await axios.delete('http://localhost:5000/delacc/'+id)
      const data = await res.data
      // console.log(data)
      if (data) {
        window.alert(`Prize Successfully Removed.`)
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
          <div className='prize'>
            <div className="prizhdng">Prize Details</div>
            <div className="prizdtl">
              <div className="prizinf"><span>Here all the prizes are listed by folllowing below.</span></div>
              <div className="prizadd"><span>Add New Ticket click here : </span><NavLink to="/addprz" className='navlnk'><button className='addbtn'><FaUserPlus/></button></NavLink></div>
            </div>
            <div className="prizlst">
              <table border='1' className='priztbl'>
                <thead>
                  <tr>
                    <th>Prize Name</th>
                    <th>Prize</th>
                    <th>Contest Name</th>
                    <th>Rank of Prize</th>
                    <th>Prize Stock</th>
                    <th>Prize Info</th>
                    <th>Edit Data</th>
                    <th>Remove Data</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    dtaDet.map((dta, i) => (
                      <tr key={i}>
                        <td>{dta.prize_name}</td>
                        <th><img src={`${server}/${dta.prize_link}`} className='prizimg' alt='prize' /></th>
                        <td>{dta.contest_name}</td>
                        <td>{dta.prize_rank}</td>
                        <td>{dta.stock}</td>
                        <td>{dta.prize_details}</td>
                        <td><NavLink to={`/editprz/${dta.prize_id}`} className='navlnk'><button className='edtbtn'><FaUserEdit/></button></NavLink></td>
                        <td><NavLink className='navlnk' onClick={ev => hndldlt(dta.prize_id)}><button className='dltbtn'><FaUserMinus/></button></NavLink></td>
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

export default Prize