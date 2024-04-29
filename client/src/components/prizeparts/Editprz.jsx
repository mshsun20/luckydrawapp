import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import axios from 'axios'

const Editprz = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const server = 'http://localhost:5000'
  const [cnts, setCnts] = useState([])
  // const [przdta, setPrzdta] = useState({})
  const [przdta, setPrzdta] = useState({prize_name:'', contest_id:'', prize_rank:'', stock:'', prize_details:''})
  const [przlnk, setPrzlnk] = useState('')
  let name, value
  
  const getPrz = async () => {
    const res = await axios.get('http://localhost:5000/getprz/'+id)
    const data = await res.data[0]
    // console.log(data)
    setPrzdta(data)
  }
  const getCntst = async () => {
    const res = await axios.get('http://localhost:5000/viewcntst')
    const data = await res.data
    // console.log(data)
    setCnts(data)
  }
  useEffect(() => {
    getPrz()
    getCntst()
  }, [])
  const setPrz = (e) => {
    name = e.target.name
    value = e.target.value
    setPrzdta({...przdta, [name]:[value]})
  }
  const setImgFl = (e) => {
    console.log(e.target.files[0])
    if (!e.target.files[0]) {
      console.log(`No Image File Selected.`)
    }
    else {
      setPrzlnk(e.target.files[0])
    }
  }
  const hndlSubmt = async (e) => {
    e.preventDefault()
    const {prize_name, contest_id, prize_rank, stock, prize_details} = przdta
    const confg = {
      headers: {
        'Content-Type':'multipart/form-data'
      }
    }

    if (przlnk.length===0) {
      const res = await axios.put('http://localhost:5000/updtprzsimpl/'+id, {prize_name, contest_id, prize_rank, stock, prize_details})
      const data = await res.data
      // console.log(data)
      if (data.statuscode===200) {
        window.alert(`Only Existing Prize data Updated Successfully.`)
        navigate('/prize')
      }
      else {
        window.alert(`Prize Data Could not be Changed.`)
      }
    }
    else {
      const res = await axios.put('http://localhost:5000/updtprz/'+id, {prize_name, contest_id, prize_rank, stock, prize_details, prize_link:przlnk}, confg)
      const data = await res.data
      // console.log(data)
      if (data.statuscode===200) {
        window.alert(`Existing Prize data and Image Updated Successfully.`)
        navigate('/prize')
      }
      else {
        window.alert(`Prize Data Could not be Changed.`)
      }
    }
  }

  return (
    <>
        <Header/>
        <div className='container'>
          <div className="frm">
            <form className='frmsec' noValidate>
              <div className='frmgrp'>
                <label htmlFor="prize_name" className="frmlbl">Prize Name :</label>
                <input type="text" name="prize_name" id="prize_name" className="frmfld" value={przdta.prize_name} onChange={setPrz} />
                <div className="frmvald"></div>
              </div>
              <div className='frmgrp'>
                <label htmlFor="contest_id" className="frmlbl">Contest Name :</label>
                <select name="contest_id" id="contest_id" className="frmfld" value={przdta.contest_id} onChange={setPrz}>
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
                <select name="prize_rank" id="prize_rank" className="frmfld" value={przdta.prize_rank} onChange={setPrz}>
                  <option value="0">-----choose rank-----</option>
                  <option value="1">1st</option>
                  <option value="2">2nd</option>
                  <option value="3">3rd</option>
                </select>
                <div className="frmvald"></div>
              </div>
              <div className='frmgrp'>
                <label htmlFor="stock" className="frmlbl">Stock :</label>
                <input type="text" name="stock" id="stock" className="frmfld" value={przdta.stock} onChange={setPrz} />
                <div className="frmvald"></div>
              </div>
              <div className='frmgrp'>
                <label htmlFor="prize_details" className="frmlbl">Prize Details :</label>
                <input type="text" name="prize_details" id="prize_details" className="frmfld" value={przdta.prize_details} onChange={setPrz} />
                <div className="frmvald"></div>
              </div>
              <div className='frmgrp'>
                <label htmlFor="prize_link" className="frmlbl">Prize Link :</label>
                <input type="file" name="prize_link" id="prize_link" className="frmfld" onChange={setImgFl} />
                <div className='phtoframe'>
                  {
                    (przlnk) ? <img src={URL.createObjectURL(przlnk)} alt="" /> : <img src={`${server}/${przdta.prize_link}`} alt="" />
                  }
                  {/* <img src={`${server}/${przdta.prize_link}`} alt="" /> */}
                </div>
                <div className="frmvald"></div>
              </div>
              <div className='frmgrp'>
                  <input type="submit" value="Update Prize" className="frmfld" onClick={hndlSubmt} />
              </div>
            </form>
          </div>
        </div>
        <Footer/>
    </>
  )
}

export default Editprz