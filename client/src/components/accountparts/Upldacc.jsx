import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import * as XLSX from 'xlsx'
import axios from 'axios'

const Upldacc = () => {
    // const navg = useNavigate()
    const [exclFil, setExclFil] = useState(null)
    const [excErr, setExcErr] = useState(null)
    const [exclData, setExclData] = useState(null)
    const [exclMp, setExclMp] = useState(null)
    const [indx, setIndx] = useState([])
    const [stts, setStts] = useState({})
    const [accphn, setAccphn] = useState([])
    const [cntsti, setCntsti] = useState([])
    const [tckcnt, setTckcnt] = useState([])
    // const [flag, setFlag] = useState(0)
    let acc_n=[], cntst_i=[], tck_c=[], value
    // let flg

    // console.log(exclFil)
    let selectedfile
    const fileType = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
    const hndlfile = (e) => {
        selectedfile = e.target.files[0]
        if (selectedfile) {
            //  console.log(selectedfile.type)
             if (selectedfile&&fileType.includes(selectedfile.type)) {
                let reader = new FileReader()
                reader.readAsArrayBuffer(selectedfile)
                reader.onload = (e) => {
                    setExcErr(null)
                    setExclFil(e.target.result)
                }
             }
             else {
                setExcErr(`Please Select Only Excel File Type: ".xlsx"`)
                setExclFil(null)
             }
        }
        else {
            console.log(`Please Select an Excel File.`)
        }
    }
    const hndlsub = async (e) => {
        e.preventDefault()
        if (exclFil!==null) {
            const workbook = XLSX.read(exclFil, {type: 'buffer'})
            const wsname = workbook.SheetNames[0]
            const ws = workbook.Sheets[wsname]
            const data = XLSX.utils.sheet_to_json(ws)
            setExclData(data)
            const dataa = XLSX.utils.sheet_to_json(ws, {header: 1})
            console.log(dataa)
            setExclMp(dataa[0])
            // console.log(dataa[0].indexOf('account_name')!==-1)
            for (let i=1; i<dataa.length; i++) {
                if (dataa[0].indexOf('account_phone')!==-1) {
                    acc_n.push(dataa[i][dataa[0].indexOf('account_phone')])
                }
                else {
                    window.alert(`Account Phone Number is Required.`)
                }
                // acc_n.push(dataa[i][0])
                if (dataa[0].indexOf('contest_id')!==-1) {
                    cntst_i.push(dataa[i][dataa[0].indexOf('contest_id')])
                }
                else {
                    window.alert(`Contest Id Required.`)
                }
                // cntst_i.push(dataa[i][3])
                if (dataa[0].indexOf('ticket_count')!==-1) {
                    tck_c.push(dataa[i][dataa[0].indexOf('ticket_count')])
                }
                // tck_c.push(dataa[i][4])
            }
            setAccphn(acc_n)
            setCntsti(cntst_i)
            setTckcnt(tck_c)
            // console.log(acc_n)
            // console.log(cntst_i)
            // console.log(tck_c)
        }
        else {
            setExclData(null)
        }
    }
    const hndlMap = (e) => {
        // name = e.target.name
        value = e.target.value
        // setIndx(...indx, value)
    }
    const hndlupld = async () => {
        const res = await axios.post('http://localhost:5000/pushaccbulk', {
            Body: exclData
        })
        const stat = await res.data
        // console.log(stat)
        setStts(stat)
        if (stat.statuscode === 422) {
            window.alert(stat.error)
        }
        else {
            window.alert(`Account Created Successfully.`)
        }
    }
    const tckGenrt = () => {
        // console.log(accphn.length)
        if (accphn.length>0) {
            // let flg = 0, flag = 0
            accphn.forEach(async (elm, i) => {
                const res = await axios.get('http://localhost:5000/viewacc/'+elm)
                const data = await res.data[0]
                // console.log(data.account_id)
                if (tckcnt[i]>0) {
                    // flag = 1
                    // setFlag(1)
                    // console.log(flg)
                    // console.log(tckcnt[i])
                    for (let j=0; j<tckcnt[i]; j++) {
                        const rest = await axios.post('http://localhost:5000/booktcktbulk', {account_id:data.account_id, contest_id:cntsti[i]})
                        const tdta = await rest.data
                        // console.log(tdta)
                        if (!tdta) {
                            // flg = 1
                            console.log(`Error in Tickets Generation.`)
                        }
                        else {
                            // flg = 0
                            console.log(`Tickets Generated Successfully.`);
                            window.location.assign('/ticket')
                        }
                    }
                }
                else {
                    // flag = 0
                    console.error(`No. of Tickets Not Declared for '${data.account_name}'`)
                }
            })
            // console.log(flg)
            // if (flag===1) {
            //     if (flg===1) {
            //         window.alert(`Error in Tickets Generation.`)
            //     }
            //     else {
            //         window.alert(`Tickets Generated Successfully for All Accounts.`)
            //         navg('/ticket')
            //     }
            // }
            // else {
            //     window.alert(`Tickets Generation are still Pending for All Accounts.`)
            // }

        }
        else {
            window.alert(`No Data Available in Uploaded Datasheet.`)
        }
    }

  return (
    <>
        <Header/>
        <div className="container">
            <div className='impacc'>
                <div className="upldsect">
                    <form className='frm' onSubmit={hndlsub}>
                        <div className="frmgrp">
                            <label htmlFor="accimp">Upload File</label>
                            <input type="file" name="accimp" id="accimp" onChange={hndlfile} />
                            {excErr&&<div className='text-danger' style={{marginTop:5+'px'}}>{excErr}</div>}
                        </div>
                        <div className="frmgrp">
                            <input type="submit" value="Show Data" />
                        </div>
                    </form>
                </div>
                {/* <div className="mapsect">
                    <form className='mpfrm'>
                        <div className="frmgrp">
                            <label htmlFor="accphn">Phone Number</label>
                            <select name="accphn" id="accphn" onChange={hndlMap}>
                                <option value={-1}>--Map Column--</option>
                                {
                                    (exclMp) ? exclMp.map((el, i) => (
                                        <option key={i} value={i}>{el}</option>
                                    )) : ''
                                }
                            </select>                            
                        </div>
                        <div className="frmgrp">
                            <label htmlFor="accnm">Account Name</label>
                            <select name="accnm" id="accnm" onChange={hndlMap}>
                                <option value={-1}>--Map Column--</option>
                                {
                                    (exclMp) ? exclMp.map((el, i) => (
                                        <option key={i} value={i}>{el}</option>
                                    )) : ''
                                }
                            </select>                            
                        </div>
                        <div className="frmgrp">
                            <label htmlFor="acceml">Email Id</label>
                            <select name="acceml" id="acceml" onChange={hndlMap}>
                                <option value={-1}>--Map Column--</option>
                                {
                                    (exclMp) ? exclMp.map((el, i) => (
                                        <option key={i} value={i}>{el}</option>
                                    )) : ''
                                }
                            </select>                            
                        </div>
                        <div className="frmgrp">
                            <label htmlFor="cntsid">Contest</label>
                            <select name="cntsid" id="cntsid" onChange={hndlMap}>
                                <option value={-1}>--Map Column--</option>
                                {
                                    (exclMp) ? exclMp.map((el, i) => (
                                        <option key={i} value={i}>{el}</option>
                                    )) : ''
                                }
                            </select>                            
                        </div>
                        <div className="frmgrp">
                            <label htmlFor="tckc">No. of Tickets</label>
                            <select name="tckc" id="tckc" onChange={hndlMap}>
                                <option value={-1}>--Map Column--</option>
                                {
                                    (exclMp) ? exclMp.map((el, i) => (
                                        <option key={i} value={i}>{el}</option>
                                    )) : ''
                                }
                            </select>                            
                        </div>
                        <div className="frmgrp">
                            <input type="submit" value="Map" />
                        </div>
                    </form>
                    Indices are: <div>{(indx) ? indx.map((el, i) => <span key={i}>{el}</span>) : ''}</div>
                </div> */}
                <div className="viewsect">
                    {exclData===null&&<>No File Selected</>}
                    {exclData!==null&&(
                        <>
                            <table border='1'>
                                <thead>
                                    <tr>
                                        <th>Phone Number</th>
                                        <th>Account Name</th>
                                        <th>Email Id</th>
                                        <th>Ticket Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        exclData.map((elm, i) => (
                                            <tr key={i}>
                                                <td>{elm.account_phone}</td>
                                                <td>{elm.account_name}</td>
                                                <td>{elm.account_email}</td>
                                                <td>{elm.ticket_count}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <button onClick={hndlupld}>Upload</button>
                            {
                                (stts.statuscode===201) ? <button onClick={tckGenrt}>Generate Tickets</button> : null
                            }
                        </>
                    )}
                </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Upldacc