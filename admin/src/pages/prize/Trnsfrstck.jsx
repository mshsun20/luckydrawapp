import { useState, useEffect } from 'react'
import '../../styles/Prize.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Server from '../../Server'

const Trnsfrstck = () => {
    const {id} = useParams()
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
    useEffect(() => {
        // console.log(id)
        ftchPrz()
    }, [])

    const addstck = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.put(`${Server}/prize/update/addtrnsfr/`+id, {prz_stck:inp})
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
    const rmvstck = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.put(`${Server}/prize/update/rmvtrnsfr/`+id, {prz_stck:inp})
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
        <div className='frmext' id='stcktrnsfrsec'>
            <div className="exthdr">Transfer Prize Stock</div>
            <div className="frmsec">
                <form className='frm'>
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
                        <button className="btn btn-outline-success btn-sm" id='btn-add' style={{display:'none',padding:'0.2rem 1rem',fontSize:'1.5rem',fontWeight:'bold'}} onClick={addstck}>+</button>
                        <button className="btn btn-outline-danger btn-sm" id='btn-subst' style={{display:'none',padding:'0.2rem 1rem',fontSize:'1.5rem',fontWeight:'bold'}} onClick={rmvstck}>-</button>
                        <div className="frmvald"></div>
                    </div>
                    <div className="frmbtngrp gap-5">
                        <button className="btn btn-outline-info" onClick={(e) => {
                            e.preventDefault()
                            document.querySelector('#stcktrnsfrsec #stckinp').disabled=false
                            document.querySelector('#stcktrnsfrsec #btn-add').style.display='block'
                            document.querySelector('#stcktrnsfrsec #btn-subst').style.display='block'
                        }}>Enter</button>
                        <button className='btn btn-outline-warning' onClick={(e) => {
                            e.preventDefault()
                            setInp(0)
                        }}>Refresh</button>
                        <button className="btn btn-outline-secondary" onClick={(e) => {
                            e.preventDefault()
                            document.querySelector('#stcktrnsfrsec #stckinp').disabled=true
                            document.querySelector('#stcktrnsfrsec #btn-add').style.display='none'
                            document.querySelector('#stcktrnsfrsec #btn-subst').style.display='none'
                        }}>Restrict</button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default Trnsfrstck