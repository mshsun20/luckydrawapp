import React, { useState, useEffect } from 'react'
import '../styles/Winner.css'
import Header from './Header'
import Footer from './Footer'

const Winner = () => {
  const [dtaDet, setDtaDet] = useState([{}])
  const vwData = async () => {
    const res = await fetch('http://localhost:5000/viewwnr', {
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

  return (
    <>
        <Header/>
        <div className="container">
          <div className='winner'>
            <div className="heading">Account Details</div>
            <div className="info"><span>Here all the account details are listed by folllowing below.</span></div>
            <div className="list">
              <table border='1'>
                <thead>
                  <tr>
                    <th>Winner Name</th>
                    <th>Contest Name</th>
                    <th>Prize Details</th>
                    <th>Winning Position</th>
                    <th>Edit Data</th>
                    <th>Remove Data</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    dtaDet.map((dta, i) => (
                      <tr key={i}>
                      <td>{dta.account_name}</td>
                      <td>{dta.contest_name}</td>
                      <td>{dta.prize_name}</td>
                      <td>{dta.winning_position}</td>
                      <td><button className='opbtn'>_</button></td>
                      <td><button className='opbtn'>x</button></td>
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

export default Winner