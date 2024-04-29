import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

const Addtckt = () => {
  const navigate = useNavigate()
    const [acc, setAcc] = useState({account_phone:'', account_name:'', account_email:''})
    let name, value
    const handlChang = (e) => {
        name = e.target.name
        value = e.target.value
        setAcc({...acc, [name]:[value]})
    }
    const hndlSubmt = async (ev) => {
        ev.preventDefault()
        const {account_phone, account_name, account_email} = acc
        const res = await fetch('http://localhost:5000/pushacc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                account_phone, account_name, account_email
            })
        })
        const data = await res.json()
        console.log(data);
        if (data.statuscode === 422) {
            window.alert('Phone Number Already Exists.')
        }
        else {
            window.alert('Account Added Successfully')
            navigate('/account')
        }
    }

  return (
    <>
        <Header/>
        <div className="container">
          <div className='tcktform'>
            <div className="hdr"></div>
            <div className="frm">
              <form method='POST' className='frmsec' noValidate>
                <div className='frmgrp'>
                  <label htmlFor="ticket_no" className="frmlbl">Ticket Number :</label>
                  <input type="text" name="ticket_no" id="ticket_no" className="frmfld" value={acc.ticket_no} onChange={handlChang} />
                  <div className="frmvald"></div>
                </div>
                <div className='frmgrp'>
                  <label htmlFor="account_id" className="frmlbl">Account Name :</label>
                  <input type="text" name="account_id" id="account_id" className="frmfld" value={acc.account_id} onChange={handlChang} />
                  <div className="frmvald"></div>
                </div>
                <div className='frmgrp'>
                  <label htmlFor="contest_id" className="frmlbl">Contest Name :</label>
                  <input type="email" name="contest_id" id="contest_id" className="frmfld" value={acc.contest_id} onChange={handlChang} />
                  <div className="frmvald"></div>
                </div>
                <div className='frmgrp'>
                    <input type="submit" value="Add ticket" className="frmfld" onClick={hndlSubmt} />
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer/>
    </>
  )
}

export default Addtckt