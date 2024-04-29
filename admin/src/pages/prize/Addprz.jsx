import { useState, useEffect } from 'react'
import '../../styles/Prize.css'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import Server from '../../Server'

const Addprz = () => {
    const [vl, setVl] = useState({prz_cntst:'0', prz_rank:'0', prz_itm:'0', prz_qty:0})
    const [cntst, setCntst] = useState()
    const [rnk, setRnk] = useState()
    const [gft, setGft] = useState()
    let name, value
    const navig = useNavigate()

    const fetchcntst = async () => {
        try {
            const res = await axios.get(`${Server}/contest/view`)
            const dta = await res.data
            // console.log(dta.data)
            setCntst(dta.data)
        } catch (error) {
            console.error(error)
        }
    }
    const fetchrnk = async () => {
        try {
            const res = await axios.get(`${Server}/rank/view`)
            const dta = await res.data
            // console.log(dta.data)
            setRnk(dta.data)
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
        fetchcntst()
        fetchrnk()
        fetchgft()
    }, [])

    const hndlinp = (e) => {
        name = e.target.name
        value = e.target.value
        setVl({...vl, [name]:value})
    }

    const hndlsub = async (e) => {
        e.preventDefault()
        const {prz_cntst, prz_rank, prz_itm, prz_qty} = vl
        // console.log((prz_cntst.length>1)&&(prz_rank.length>1)&&(prz_itm.length>1))

        try {
            if ((prz_cntst.length>1)&&(prz_rank.length>1)&&(prz_itm.length>1)) {
                const resg = await axios.get(`${Server}/gift/view/`+prz_itm)
                const dtag = await resg.data.data
                // console.log(dtag.gft_stck)

                if (prz_qty > dtag.gft_stck) {
                    window.alert(`Prize Qty should be less or same of Gift Item Stock Amt: ${dtag.gft_stck}`)
                }
                else {
                    const res = await axios.post(`${Server}/prize/add`, {prz_cntst, prz_rank, prz_itm, prz_qty})
                    const dta = await res.data
                    // console.log(dta)

                    if (dta.statuscode===220) {
                        window.alert(dta.success)
                        navig('/admin/prizes')
                    }
                    else {
                        window.alert(dta.error)
                    }
                }
            }
            else {
                window.alert(`Contest, Rank and Gift Item are Mandatory...!`)
            }
        } catch (error) {
            console.error(error)
        }
    }
    
  return (
    <>
        <div className="wbpg">
            <Header/>

            <div className="main container">
                <div className='content' id='przsec'>
                    <div className="hdr">Add Prize</div>
                    <div className="frmsec">
                        <form className='frm'>
                            <div className='frmgrp'>
                                <label htmlFor="prz_cntst" className="frmlbl form-label w-25">Contest</label>
                                <select className='frmslct form-select form-select-lg w-50' name="prz_cntst" id="prz_cntst" onChange={hndlinp}>
                                    <option value="0">Choose Contest</option>
                                    {
                                        cntst&&cntst.map((elm, i) => (
                                            <option value={elm._id} key={i}>{elm.cntst_name}</option>
                                        ))
                                    }
                                </select>
                                <div className="frmvald"></div>
                            </div>
                            <div className='frmgrp'>
                                <label htmlFor="prz_rank" className="frmlbl form-label w-25">Rank</label>
                                <select className='frmslct form-select form-select-lg w-50' name="prz_rank" id="prz_rank" onChange={hndlinp}>
                                    <option value="0">Choose Rank</option>
                                    {
                                        rnk&&rnk.map((elm, i) => (
                                            <option value={elm._id} key={i}>{elm.rnk_info}</option>
                                        ))
                                    }
                                </select>
                                <div className="frmvald"></div>
                            </div>
                            <div className='frmgrp'>
                                <label htmlFor="prz_itm" className="frmlbl form-label w-25">Gift Item</label>
                                <select className='frmslct form-select form-select-lg w-50' name="prz_itm" id="prz_itm" onChange={hndlinp}>
                                    <option value="0">Choose Gift</option>
                                    {
                                        gft&&gft.map((elm, i) => (
                                            (elm.gft_stck>0) ? <option value={elm._id} key={i}>{elm.gft_name}</option> : null
                                        ))
                                    }
                                </select>
                                <div className="frmvald"></div>
                            </div>
                            <div className='frmgrp'>
                                <label htmlFor="prz_qty" className="frmlbl form-label w-25">Quantity</label>
                                <input type="text" className="frminp form-control form-control-lg w-50" name="prz_qty" id="prz_qty" onChange={hndlinp} />
                                <div className="frmvald"></div>
                            </div>
                            <div className="frmbtngrp gap-5">
                                <input className='btn btn-outline-primary btn-lg' type="submit" value="Add" onClick={hndlsub} />
                                <input className='btn btn-outline-secondary btn-lg' type="reset" value="Refresh" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    </>
  )
}

export default Addprz