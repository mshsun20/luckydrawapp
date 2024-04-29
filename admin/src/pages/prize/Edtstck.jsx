import { useState, useEffect } from 'react'
import '../../styles/Prize.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Server from '../../Server'

const Edtstck = (vl) => {
    const {id} = useParams()
    const [gft, setGft] = useState()
    const [itm, setItm] = useState()
    const [inp, setInp] = useState(0)

    const ftchPrz = async () => {
        try {
            const res = await axios.get(`${Server}/prize/view/`+id)
            const dta = await res.data
            // console.log(dta.data)
            if (dta.statuscode === 200) {
                setItm(dta.data)
            }
        } catch (error) {
            console.error(error)
        }
    }
    const fetchgft = async () => {
        try {
            const res = await axios.get(`${Server}/gift/view`)
            const dta = await res.data
            // console.log(dta.data)
            setGft(dta.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        // console.log(id)
        ftchPrz()
        fetchgft()
    }, [])

    const addqty = async (e) => {
        e.preventDefault()
        document.querySelector('#prz_stck').disabled=false

        try {
            const res = await axios.put(`${Server}/prize/update/addstck/`+id, {prz_stck:inp, prz_itm:itm.prz_itm._id})
            const dta = await res.data
            // console.log(dta)
            
            if (dta.statuscode === 220) {
                window.alert(dta.success)
                ftchPrz()
                setInp(0)
            }
            else {
                window.alert(dta.error)
                setInp(0)
            }
        } catch (error) {
            console.error(error)
        }
    }
    const rmvqty = async (e) => {
        e.preventDefault()
        document.querySelector('#prz_stck').disabled=false

        try {
            const res = await axios.put(`${Server}/prize/update/rmvstck/`+id, {prz_stck:inp, prz_itm:itm.prz_itm._id})
            const dta = await res.data
            // console.log(dta)

            if (dta.statuscode === 220) {
                window.alert(dta.success)
                ftchPrz()
                setInp(0)
            }
            else {
                window.alert(dta.error)
                setInp(0)
            }
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <>
        <div className='frmext' id='przstcksec'>
            <div className="exthdr">Edit Prize Allocation</div>
            <div className="frmsec">
                <form className='frm'>
                    <div className='frmgrp'>
                        <label htmlFor="prz_itm" className="frmlbl form-label w-25">Gift Item</label>
                        <select className='frmslct form-select form-select-lg w-50' name="prz_itm" id="prz_itm" value={itm&&itm.prz_itm&&itm.prz_itm._id} onChange={(e) => setItm(e.target.value)} disabled>
                            <option value="0">Choose Gift</option>
                            {
                                gft&&gft.map((elm, i) => (
                                    <option value={elm._id} key={i}>{elm.gft_name}</option>
                                ))
                            }
                        </select>
                        <button className="btn btn-outline-info btn-sm" onClick={(e) => {
                            e.preventDefault()
                            document.querySelector('#prz_itm').disabled=false
                        }}>Edit</button>
                        <button className="btn btn-outline-secondary btn-sm" onClick={(e) => {
                            e.preventDefault()
                            document.querySelector('#prz_itm').disabled=true
                        }}>Restrict</button>
                        <div className="frmvald"></div>
                    </div>
                    <div className="frmgrp">
                        <label htmlFor="gft_stck" className="frmlbl form-label w-25">Gift Item Stock</label>
                        <input type="text" className="frminp form-control-lg" style={{backgroundColor:'darkslateblue',color:'cornflowerblue',fontWeight:'bold',textAlign:'center',border:'none',outline:'none'}} name="" id="" value={itm&&itm.prz_itm&&itm.prz_itm.gft_stck} readOnly />
                    </div>
                    <div className="frmgrp">
                        <label htmlFor="prz_qty" className="frmlbl form-label w-25">Prize Qty</label>
                        <input type="text" className="frminp form-control-lg" style={{backgroundColor:'darkmagenta',color:'coral',fontWeight:'bold',textAlign:'center',border:'none',outline:'none'}} name="" id="" value={itm&&itm.prz_qty} readOnly />
                    </div>
                    <div className="frmgrp">
                        <label htmlFor="prz_stck" className="frmlbl form-label w-25">Current Stock</label>
                        <input type="text" className="frminp form-control-lg" style={{backgroundColor:'coral',color:'darkmagenta',fontWeight:'bold',textAlign:'center',border:'none',outline:'none'}} name="" id="" value={itm&&itm.prz_stck} readOnly />
                    </div>
                    <div className='frmgrp'>
                        <label htmlFor="stckinp" className="frmlbl form-label w-25">Amount</label>
                        <input type="text" className="frminp form-control form-control-lg" style={{width:'35%',padding:'0 1rem'}} name="stckinp" id="stckinp" value={inp&&inp} onChange={(e) => setInp(e.target.value)} disabled />
                        <button className="btn btn-outline-success btn-sm" id='btn-add' style={{display:'none',padding:'0.2rem 1rem',fontSize:'1.5rem',fontWeight:'bold'}} onClick={addqty}>+</button>
                        <button className="btn btn-outline-danger btn-sm" id='btn-subst' style={{display:'none',padding:'0.2rem 1rem',fontSize:'1.5rem',fontWeight:'bold'}} onClick={rmvqty}>-</button>
                        <div className="frmvald"></div>
                    </div>
                    <div className="frmbtngrp gap-5">
                        <button className="btn btn-outline-info" onClick={(e) => {
                            e.preventDefault()
                            document.querySelector('#przstcksec #stckinp').disabled=false
                            document.querySelector('#przstcksec #btn-add').style.display='block'
                            document.querySelector('#przstcksec #btn-subst').style.display='block'
                        }}>Enter</button>
                        <button className='btn btn-outline-warning' onClick={(e) => {
                            e.preventDefault()
                            setInp(0)
                        }}>Refresh</button>
                        <button className="btn btn-outline-secondary" onClick={(e) => {
                            e.preventDefault()
                            document.querySelector('#przstcksec #stckinp').disabled=true
                            document.querySelector('#przstcksec #btn-add').style.display='none'
                            document.querySelector('#przstcksec #btn-subst').style.display='none'
                        }}>Restrict</button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default Edtstck