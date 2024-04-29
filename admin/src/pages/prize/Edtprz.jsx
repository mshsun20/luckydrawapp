import { useState, useEffect } from 'react'
import '../../styles/Prize.css'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import Server from '../../Server'
import Edtstck from './Edtstck'
import Trnsfrstck from './Trnsfrstck'

const Edtprz = () => {
    const {id} = useParams()
    const [vl, setVl] = useState({prz_cntst:'', prz_rank:'', prz_itm:''})
    const [cntst, setCntst] = useState()
    const [rnk, setRnk] = useState()
    // const [itmstck, setItmstck] = useState(0)
    let name, value
    const navig = useNavigate()

    const ftchPrz = async () => {
        try {
            const res = await axios.get(`${Server}/prize/view/`+id)
            const dta = await res.data
            // console.log(dta.data)
            if (dta.statuscode === 200) {
                setVl(dta.data)
            }
        } catch (error) {
            console.error(error)
        }
    }

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
    useEffect(() => {
        ftchPrz()
        fetchcntst()
        fetchrnk()
    }, [])

    const hndlinp = (e) => {
        name = e.target.name
        value = e.target.value
        setVl({...vl, [name]:value})
    }

    const hndlsub = async (e) => {
        e.preventDefault()
        const {prz_cntst, prz_rank} = vl

        try {
            if (prz_cntst&&prz_rank) {
                const res = await axios.put(`${Server}/prize/update/`+id, {prz_cntst:prz_cntst, prz_rank:prz_rank})
                const dta = await res.data
                // console.log(dta)

                if (dta.statuscode===220) {
                    window.alert(dta.success)
                    navig('/admin/prizes')
                }
                else {
                    window.alert(dta.error)
                }
                // const resg = await axios.get(`${Server}/gift/view/`+prz_itm._id)
                // const dtag = await resg.data.data
                // console.log(dtag.gft_stck)
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
                    <div className="hdr">Edit Prize Details</div>
                    <div className="frmsec">
                        <form className='frm'>
                            <div className='frmgrp'>
                                <label htmlFor="prz_cntst" className="frmlbl form-label w-25">Contest</label>
                                <select className='frmslct form-select form-select-lg w-50' name="prz_cntst" id="prz_cntst" value={vl&&vl.prz_cntst&&vl.prz_cntst._id} onChange={hndlinp} disabled>
                                    <option value="0">Choose Contest</option>
                                    {
                                        cntst&&cntst.map((elm, i) => (
                                            <option value={elm._id} key={i}>{elm.cntst_name}</option>
                                        ))
                                    }
                                </select>
                                <button className="btn btn-outline-info btn-sm" onClick={(e) => {
                                    e.preventDefault()
                                    document.querySelector('#prz_cntst').disabled=false
                                }}>Edit</button>
                                <button className="btn btn-outline-secondary btn-sm" onClick={(e) => {
                                    e.preventDefault()
                                    document.querySelector('#prz_cntst').disabled=true
                                }}>Restrict</button>
                                <div className="frmvald"></div>
                            </div>
                            <div className='frmgrp'>
                                <label htmlFor="prz_rank" className="frmlbl form-label w-25">Rank</label>
                                <select className='frmslct form-select form-select-lg w-50' name="prz_rank" id="prz_rank" value={vl&&vl.prz_rank&&vl.prz_rank._id} onChange={hndlinp} disabled>
                                    <option value="0">Choose Rank</option>
                                    {
                                        rnk&&rnk.map((elm, i) => (
                                            <option value={elm._id} key={i}>{elm.rnk_info}</option>
                                        ))
                                    }
                                </select>
                                <button className="btn btn-outline-info btn-sm" onClick={(e) => {
                                    e.preventDefault()
                                    document.querySelector('#prz_rank').disabled=false
                                }}>Edit</button>
                                <button className="btn btn-outline-secondary btn-sm" onClick={(e) => {
                                    e.preventDefault()
                                    document.querySelector('#prz_rank').disabled=true
                                }}>Restrict</button>
                                <div className="frmvald"></div>
                            </div>
                            <div className="frmbtngrp gap-5">
                                <input className='btn btn-outline-primary btn-lg' type="submit" value="Update" onClick={hndlsub} />
                                <input className='btn btn-outline-warning btn-lg' type="reset" value="Refresh" />
                                <button className='btn btn-outline-danger btn-lg' onClick={(e) => navig('/admin/prizes')}>Back</button>
                            </div>
                        </form>
                    </div>
                    <div className="frmsecext">
                        <form className='frm'>
                            <div className='frmgrp'>
                                <label htmlFor="currgftitm" className="frmlbl form-label w-25">Gift Item</label>
                                <input type="text" className='frminp form-control-lg w-100' style={{backgroundColor:'darkolivegreen',color:'lemonchiffon',fontWeight:'bold',textAlign:'center',border:'none',outline:'none'}} name="currgftitm" id="currgftitm" value={vl&&vl.prz_itm&&vl.prz_itm.gft_name} readOnly />
                                <div className="frmvald"></div>
                            </div>
                            {/* navig('/admin/prizes/stckedt') */}
                            <div className="frmbtngrp gap-5">
                                <button className="btn btn-outline-info btn-sm" onClick={(e) => {
                                    e.preventDefault()
                                    document.querySelector('#alloc').style.display='flex'
                                    document.querySelector('#stck').style.display='none'
                                }}>Edit Allocation</button>
                                <button className="btn btn-outline-info btn-sm" onClick={(e) => {
                                    e.preventDefault()
                                    document.querySelector('#alloc').style.display='none'
                                    document.querySelector('#stck').style.display='flex'
                                }}>Stock Transfer</button>
                                <button className="btn btn-outline-light btn-sm" onClick={(e) => {
                                    e.preventDefault()
                                    document.querySelector('#alloc').style.display='none'
                                    document.querySelector('#stck').style.display='none'
                                }}>Block</button>
                            </div>
                        </form>
                        <div className="extsec" id='alloc' style={{display:'none'}}><Edtstck props={vl} /></div>
                        <div className="extsec" id='stck' style={{display:'none'}}><Trnsfrstck props={vl} /></div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    </>
  )
}

export default Edtprz