import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import axios from 'axios'

const Addprz = () => {
    const navigate = useNavigate()
    const [cnts, setCnts] = useState([])
    const [prznm, setPrznm] = useState({prize_name:'', contest_id:'', prize_rank:'', quantity:'', prize_details:''})
    const [przlnk, setPrzlnk] = useState('')
    let name, value

    const getCntst = async () => {
      const res = await axios.get('http://localhost:5000/viewcntst')
      const data = await res.data
      // console.log(data)
      setCnts(data)
    }
    useEffect(() => {
      getCntst()
    }, [])

    const setPrz = (e) => {
      name = e.target.name
      value = e.target.value
      setPrznm({...prznm, [name]:value})
    }
    const setImgFl = (e) => {
      setPrzlnk(e.target.files[0])
    }

    const hndlSubmt = async (e) => {
      e.preventDefault()
      var formDta = new FormData()

      if (prznm.prize_name.length===0 || prznm.contest_id.length===0 || prznm.prize_rank.length===0 || prznm.quantity.length===0) {
        window.alert(`You have to Fill Up All the Mandatory Field data.`)
      }
      else if (przlnk.length===0) {
        window.alert(`No Prize Photo is Given.`)
      }
      else {
        formDta.append('prize_name', prznm.prize_name)
        formDta.append('contest_id', prznm.contest_id)
        formDta.append('prize_rank', prznm.prize_rank)
        formDta.append('quantity', prznm.quantity)
        formDta.append('prize_details', prznm.prize_details)
        formDta.append('prize_link', przlnk)
        console.log(formDta)

        const confg = {
          headers: {
            'Content-Type':'multipart/form-data'
          }
        }
        const res = await axios.post('http://localhost:5000/addprz', formDta, confg)
        const data = await res.data
        // console.log(data)

        if (data.statuscode===200) {
          window.alert(`New Prize data Added Successfully.`)
          navigate('/prize')
        }
        else {
          window.alert(`Prize Data Submission Failed.`)
        }
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
                  <label htmlFor="prize_name" className="frmlbl">Prize Name :</label>
                  <input type="text" name="prize_name" id="prize_name" className="frmfld" onChange={setPrz} />
                  <div className="frmvald"></div>
                </div>
                <div className='frmgrp'>
                  <label htmlFor="contest_id" className="frmlbl">Contest Name :</label>
                  <select name="contest_id" id="contest_id" className="frmfld" onChange={setPrz}>
                    <option value="0">-----choose contest-----</option>
                    {
                      cnts.length>0 ? cnts.map((elm, i) => (
                        <option key={i} value={elm.contest_id}>{elm.contest_name}</option>
                      )) : null
                    }
                  </select>
                  <div className="frmvald"></div>
                </div>
                <div className='frmgrp'>
                  <label htmlFor="prize_rank" className="frmlbl">Rank of Prize :</label>
                  <select name="prize_rank" id="prize_rank" className="frmfld" onChange={setPrz}>
                    <option value="0">-----choose rank-----</option>
                    <option value="1">1st</option>
                    <option value="2">2nd</option>
                    <option value="3">3rd</option>
                  </select>
                  <div className="frmvald"></div>
                </div>
                <div className='frmgrp'>
                  <label htmlFor="quantity" className="frmlbl">Quantity :</label>
                  <input type="text" name="quantity" id="quantity" className="frmfld" onChange={setPrz} />
                  <div className="frmvald"></div>
                </div>
                <div className='frmgrp'>
                  <label htmlFor="prize_details" className="frmlbl">Prize Details :</label>
                  <input type="text" name="prize_details" id="prize_details" className="frmfld" onChange={setPrz} />
                  <div className="frmvald"></div>
                </div>
                <div className='frmgrp'>
                  <label htmlFor="prize_link" className="frmlbl">Prize Link :</label>
                  <input type="file" name="prize_link" id="prize_link" className="frmfld" onChange={setImgFl} />
                  <div className="frmvald"></div>
                </div>
                <div className='frmgrp'>
                    <input type="submit" value="Add Prize" id='przsub' className="frmfld" onClick={hndlSubmt} />
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer/>
    </>
  )
}

export default Addprz