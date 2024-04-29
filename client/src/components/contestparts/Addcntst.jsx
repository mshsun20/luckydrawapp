import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import axios from 'axios'

const Addcntst = () => {
  const navig = useNavigate()
  const [usrdta, setUsrdta] = useState([])
  const [cdta, setCdta] = useState({contest_name:'', createdby_id:'', contest_state:''})
  let name, value, tim=new Date().toLocaleString()

  const getUsr = async () => {
    const res = await axios.get('http://localhost:5000/viewusr')
    const data = await res.data.data
    // console.log(data)
    setUsrdta(data)
  }
  useEffect(() => {
    getUsr()
  }, [])

  const chnghndl = (e) => {
    name = e.target.name
    value = e.target.value
    setCdta({...cdta, [name]:value})
  }

  const hndlSubmt = async (ev) => {
    ev.preventDefault()
    const {contest_name, createdby_id, contest_state} = cdta
    const res = await axios.post('http://localhost:5000/pushcntst', { contest_name, createdby_id, contest_state, contest_date:tim })
    const data = await res.data
    // console.log(data)
    if (data) {
      window.alert(`Contest: '${contest_name}' Created Successfully.`)
      navig('/contest')
    }
  }

  return (
    <>
        <Header/>
        <div className='container'>
          <div className='cntstform'>
            <div className="hdr"></div>
            <div className="frm">
              <form className='frmsec' noValidate>
                <div className='frmgrp'>
                  <label htmlFor="contest_name" className="frmlbl">Contest Name :</label>
                  <input type="text" name="contest_name" id="contest_name" className="frmfld" value={cdta.contest_name} onChange={chnghndl} />
                  <div className="frmvald"></div>
                </div>
                <div className='frmgrp'>
                  <label htmlFor="createdby_id" className="frmlbl">Contest Created By :</label>
                  <select name="createdby_id" id="createdby_id" className="frmfld" value={cdta.createdby_id} onChange={chnghndl}>
                    <option value="0">-----Select User-----</option>
                    {
                      usrdta.length>0 ? usrdta.map((elm) => (
                        <option key={elm.user_id} value={elm.user_id}>{elm.user_name}</option>
                      )) : ""
                    }
                  </select>
                  <div className="frmvald"></div>
                </div>
                <div className='frmgrp'>
                  <label htmlFor="contest_state" className="frmlbl">Contest Location(state) :</label>
                  <input type="text" name="contest_state" id="contest_state" className="frmfld" value={cdta.contest_state} onChange={chnghndl} />
                  <div className="frmvald"></div>
                </div>
                <div className='frmgrp'>
                    <input type="submit" value="Add Contest" className="frmfld" onClick={hndlSubmt} />
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer/>
    </>
  )
}

export default Addcntst