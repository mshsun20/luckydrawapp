import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/Account.css'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import Server from '../../Server'
import * as XLSX from 'xlsx'
import { AccFormat, AccTcktBookFormat } from '../../data/formats/Accf'

const Upldcntst = () => {
    const [usr, setUsr] = useState()
    const [frmtub, setFrmtub] = useState()

    const fetchUsr = async () => {
        try {
            const res = await axios.get(`${Server}/user/view`)
            const dta = await res.data
            // console.log(dta.data)
            setUsr(dta.data)
        } catch (error) {
            console.error(error)
        }
    }
    const fetchDta = async () => {
        const dataub = AccTcktBookFormat
        setFrmtub(dataub)
    }
    useEffect(() => {
        fetchUsr()
        fetchDta()
    }, [])

    const [exclFilub, setExclFilub] = useState(null)
    const [excErrub, setExcErrub] = useState(null)
    const [exclDataub, setExclDataub] = useState(null)
    const [exclMpub, setExclMpub] = useState(null)
    const [accdta, setAccdta] = useState()
    const [booktck, setBooktck] = useState()
    const [stts, setStts] = useState()
    const navig = useNavigate()


    // console.log(exclFil)
    let selectedfile
    const fileType = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']

    const hndlfileub = (e) => {
        selectedfile = e.target.files[0]
        if (selectedfile) {
            //  console.log(selectedfile.type)
             if (selectedfile&&fileType.includes(selectedfile.type)) {
                let reader = new FileReader()
                reader.readAsArrayBuffer(selectedfile)
                reader.onload = (e) => {
                    setExcErrub(null)
                    setExclFilub(e.target.result)
                }
             }
             else {
                setExcErrub(`Please Select Only Excel File Type: ".csv/.xls/.xlsx"`)
                setExclFilub(null)
             }
        }
        else {
            console.log(`Please Select an Excel File.`)
        }
    }
    const hndlsubub = async (e) => {
        e.preventDefault()
        if (exclFilub!==null) {
            const workbook = XLSX.read(exclFilub, {type: 'buffer'})
            const wsname = workbook.SheetNames[0]
            const ws = workbook.Sheets[wsname]
            const data = XLSX.utils.sheet_to_json(ws)
            // console.log(data)
            const dataa = XLSX.utils.sheet_to_json(ws, {header: 1})
            // console.log(dataa)
            if (window.confirm(`Show data Confirmation...?`)) {
                if (dataa.length > 0) {
                    if ((dataa[0][0] === 'acc_unique_code')
                    &&(dataa[0][1] === 'acc_name')
                    &&(dataa[0][2] === 'acc_phone')
                    &&(dataa[0][3] === 'acc_email')
                    &&(dataa[0][4] === 'acc_type')
                    &&(dataa[0][5] === 'acc_cat')
                    &&(dataa[0][6] === 'acc_subcat')
                    &&(dataa[0][7] === 'acc_status')
                    &&(dataa[0][8] === 'contest_id')
                    &&(dataa[0][9] === 'booked_tckt')) {
                        setAccdta(data.map((obj) => {
                            return {
                                acc_unique_code: obj.acc_unique_code,
                                acc_name: obj.acc_name,
                                acc_phone: obj.acc_phone,
                                acc_email: obj.acc_email,
                                acc_type: obj.acc_type,
                                acc_cat: obj.acc_cat,
                                acc_subcat: obj.acc_subcat,
                                acc_status: obj.acc_status,
                                added_by:usr&&usr[0]._id
                            }
                        }))
                        setBooktck(data.map((obj) => {
                            return {
                                booked_cntst: obj.contest_id,
                                booked_tckt: obj.booked_tckt
                            }
                        }))
                        setExclDataub(data)
                        setExclMpub(dataa)
                    }
                    else {
                        window.alert(`Data must be as per Format Sheet. Download the Format Template & Upload through that sheet ...!`)
                    }
                }
                else {
                    window.alert(`Blank Datasheet ...!!!`)
                }
            }
            else {
                window.alert(`You have cancelled to see data.`)
            }

            for (let i=1; i<dataa.length; i++) {
                if (dataa[i][1] === "") {
                    window.alert(`Country Name is Required.`)
                }
            }
        }
        else {
            setExclDataub(null)
        }
    }
    const hndlupldub = async (e) => {
        e.preventDefault()

        if (window.confirm(`Confirm data Bulk Import...?`)) {
            const res = await axios.post(`${Server}/accounts/upload/booktckt`, {accdta, booktck})
            const dta = await res.data
            // console.log(dta)
            setStts(dta)
            if (dta.statuscode === 220) {
                console.log(dta.message)
                window.alert(dta.message)
                navig('/admin/accounts')
            }
            else {
                console.error(dta.message)
                window.alert(dta.message)
            }
        }
        else {
            window.alert(`You have Cancelled Bulk data Import.`)
        }
    }

    const downsubub = async (e) => {
        e.preventDefault()

        const wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(frmtub)

        XLSX.utils.book_append_sheet(wb, ws, 'Acc Upld & Ticket Book Format')
        XLSX.writeFile(wb, 'Acc_Book_format.xlsx')
    }

  return (
    <>
        <div className="wbpg">
            <Header/>

            <div className="main container">
                <div className='content' id="accsec">
                    <div className="hdr">Upload Accounts data</div>
                    <div className="upldfrm">
                        <hr className="border border-danger border-3 opacity-75 w-100" />
                        <div className="frmnote alert alert-warning" style={{fontSize:'1.2rem',letterSpacing:'0.2rem'}}>
                            <hr className="border border-warning border-3 opacity-75 w-100" />
                            <span style={{fontSize:'1.4rem',fontWeight:'bold'}}>N.B.:-</span>&nbsp;&nbsp;
                            <span>DOWNLOAD FORMAT & UPLOAD DATA THROUGH THAT SHEET.</span>
                            <hr className="border border-warning border-3 opacity-75 w-100" />
                        </div>
                        <hr className="border border-danger border-3 opacity-75 w-100" />
                        {/* <form className='frm'>
                            <div className="frmgrp">
                                <label htmlFor="acc_unique_code" className='frmlbl form-label'>Import only Accounts data</label>
                                <input type="file" className='frminp form-control form-control-lg' name="acc_unique_code" id="acc_unique_code" onChange={hndlfilei} />
                            </div>
                            {excErri&&(<div className='frmerr'>{excErri}</div>)}
                            <div className="frmbtngrp gap-5">
                                <input className='btn btn-outline-primary btn-lg' type="submit" value="Show Data" onClick={hndlsubi} />
                                <button className='btn btn-outline-info btn-lg' onClick={downsubi}>Download Template</button>
                                {
                                    exclDatai!==null&&(<input className='btn btn-outline-primary btn-lg' type="submit" value="Import" onClick={hndlupldi} />)
                                }
                                <input className='btn btn-outline-secondary btn-lg' type="reset" value="Refresh" onClick={(e) => setExcErri(null)} />
                            </div>
                            <div className="viewsect">
                                {exclDatai===null&&<>Only File with Valid Data Format will be Accepted</>}
                                {exclDatai!==null&&(
                                    <>
                                        <table className='tbl table table-striped table-hover'>
                                            <thead>
                                                <tr>
                                                    {
                                                        exclMpi ? exclMpi[0].map((fld, i) => (
                                                            <th key={i}>{fld}</th>
                                                        )) : null
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    exclMpi ? exclMpi.map((elm, i) => (
                                                        (i>0) ? (
                                                            <tr key={i}>
                                                                {
                                                                    elm ? elm.map((vlu, j) => (
                                                                        <td key={j}>{vlu}</td>
                                                                    )) : (
                                                                        <td></td>
                                                                    )
                                                                }
                                                            </tr>
                                                        ) : null
                                                    )) : null
                                                }
                                            </tbody>
                                        </table>
                                    </>
                                )}
                            </div>
                            <hr className="border border-secondary border-3 opacity-75 w-100" />
                        </form> */}
                        <form className='frm'>
                            <div className="frmgrp">
                                <label htmlFor="acc_unique_code" className='frmlbl form-label'>Upload Accounts data and Book Tickets for Contest</label>
                                <input type="file" className='frminp form-control form-control-lg' name="acc_unique_code" id="acc_unique_code" onChange={hndlfileub} />
                            </div>
                            {excErrub&&(<div className='frmerr'>{excErrub}</div>)}
                            <div className="frmbtngrp gap-5">
                                <input className='btn btn-outline-primary btn-lg' type="submit" value="Show Data" onClick={hndlsubub} />
                                <button className='btn btn-outline-info btn-lg' onClick={downsubub}>Download Template</button>
                                {
                                    exclDataub!==null&&(<input className='btn btn-outline-primary btn-lg' type="submit" value="Upload and Book" onClick={hndlupldub} />)
                                }
                                <input className='btn btn-outline-secondary btn-lg' type="reset" value="Refresh" onClick={(e) => setExcErrub(null)} />
                            </div>
                            <div className="viewsect">
                                {exclDataub===null&&<>Only File with Valid Data Format will be Accepted</>}
                                {exclDataub!==null&&(
                                    <>
                                        {/* <div>Selected File is Valid</div> */}
                                        <table className='tbl table table-striped table-hover'>
                                            <thead>
                                                <tr>
                                                    {
                                                        exclMpub ? exclMpub[0].map((fld, i) => (
                                                            <th key={i}>{fld}</th>
                                                        )) : null
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    exclMpub ? exclMpub.map((elm, i) => (
                                                        (i>0) ? (
                                                            <tr key={i}>
                                                                {
                                                                    elm ? elm.map((vlu, j) => (
                                                                        <td key={j}>{vlu}</td>
                                                                    )) : (
                                                                        <td></td>
                                                                    )
                                                                }
                                                            </tr>
                                                        ) : null
                                                    )) : null
                                                }
                                            </tbody>
                                        </table>
                                        {
                                            // (stts.statuscode===201) ? <button onClick={tckGenrt}>Generate Tickets</button> : null
                                        }
                                    </>
                                )}
                            </div>
                            <hr className="border border-secondary border-3 opacity-75 w-100" />
                        </form>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    </>
  )
}

export default Upldcntst