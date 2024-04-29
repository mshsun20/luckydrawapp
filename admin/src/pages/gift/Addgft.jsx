import { useState } from 'react'
import '../../styles/Gift.css'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import Server from '../../Server'

const Addgft = () => {
    const [gftnm, setGftnm] = useState()
    const [gftImg, setGftImg] = useState()
    let name, value
    const navig = useNavigate()

    const hndlinp = (e) => {
        name = e.target.name
        value = e.target.value
        setGftnm({...gftnm, [name]:value})
    }
    const setImgFl = (e) => {
        // console.log(e.target.files[0])
        setGftImg(e.target.files[0])
    }

    const hndlsub = async (e) => {
        e.preventDefault()
        // var formDta = new FormData()

        try {
            if (gftnm.gft_name.length===0 || gftnm.gft_qty.length===0) {
                window.alert(`You have to Fill Up All the Mandatory Field data.`)
            }
            else if (gftImg.length===0) {
                window.alert(`Gift Item Photo is Mandatory.`)
            }
            else {
                // console.log(gftnm)
                // console.log(gftImg)
                // formDta.append('gft_name', gftnm.gft_name)
                // formDta.append('gft_dtl', gftnm.gft_dtl)
                // formDta.append('gft_qty', gftnm.gft_qty)
                // formDta.append('gft_img', gftImg)
                // console.log(formDta)
                const confg = {
                    headers: {
                        'Content-Type':'multipart/form-data'
                    }
                }
    
                const res = await axios.post(`${Server}/gift/add`, {gft_name:gftnm.gft_name, gft_dtl:gftnm.gft_dtl, gft_qty:gftnm.gft_qty, gft_img:gftImg}, confg)
                const dta = await res.data
                // console.log(dta)
    
                if (dta.statuscode===220) {
                    window.alert(dta.success)
                    navig('/admin/gifts')
                }
                else {
                    window.alert(dta.error)
                }
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
                    <div className="hdr">Add Gift Item</div>
                    <div className="frmsec">
                        <form className='frm'>
                            <div className='frmgrp'>
                                <label htmlFor="gft_name" className="frmlbl form-label w-25">Item Name</label>
                                <input type="text" className="frminp form-control form-control-lg w-50" name="gft_name" id="gft_name" onChange={hndlinp} />
                                <div className="frmvald"></div>
                            </div>
                            <div className='frmgrp'>
                                <label htmlFor="gft_dtl" className="frmlbl form-label w-25">Gift Details</label>
                                <input type="text" className="frminp form-control form-control-lg w-50" name="gft_dtl" id="gft_dtl" onChange={hndlinp} />
                                <div className="frmvald"></div>
                            </div>
                            <div className='frmgrp'>
                                <label htmlFor="gft_qty" className="frmlbl form-label w-25">Quantity</label>
                                <input type="text" className="frminp form-control form-control-lg w-50" name="gft_qty" id="gft_qty" onChange={hndlinp} />
                                <div className="frmvald"></div>
                            </div>
                            <div className='frmgrp'>
                                <label htmlFor="gft_img" className="frmlbl form-label w-25">Gift Image</label>
                                <input type="file" className="frmfil form-control form-control-lg w-50" name="gft_img" id="gft_img" onChange={setImgFl} />
                                <div className="frmvald"></div>
                            </div>
                            <div className="frmbtngrp gap-5">
                                <input className='btn btn-outline-primary btn-lg mbtn' type="submit" value="Add" onClick={hndlsub} />
                                <input className='btn btn-outline-secondary btn-lg mbtn' type="reset" value="Refresh" />
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

export default Addgft