import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FaUserPlus, FaCloudUploadAlt, FaUserEdit, FaUserMinus } from 'react-icons/fa'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import axios from 'axios'
import Server from '../../../Server'

const Index = () => {
    const [dtaDet, setDtaDet] = useState()

    const vwData = async () => {
        try {
            const res = await axios.get(`${Server}/statem/view`)
            const dta = await res.data
            // console.log(dta)
            setDtaDet(dta.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        vwData()
    }, [])

    const hndldlt = async (id) => {
        try {
            if (window.confirm(`Wants to Remove the State data ?`)) {
                const res = await axios.delete(`${Server}/statem/remove/`+id)
                const dta = await res.data
                // console.log(data)
                if (dta.statuscode === 220) {
                    window.alert(`State data Successfully Removed.`)
                    vwData()
                }
            }
            else {
                window.alert(`State Removal Cancelled.`)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

  return (
    <>
        <div className="wbpg">
            <Header/>

            <div className="main container">
                <div className='content' id='usrsec'>
                    <div className="hdng">All States Data</div>
                    <div className="dtlsec">
                        <div className="inf"><span>Here all the State details are listed by folllowing table.</span></div>
                        <div className="addsec"><span>To Add State click here : </span><NavLink to="/admin/master/state/add" className='navlnk'><button className='addbtn'><FaUserPlus/></button></NavLink></div>
                        <div className="impsec"><span>For Bulk States Upload : </span><NavLink to='/admin/master/state/upload' className='navlnk'><button className='upldbtn'><FaCloudUploadAlt/></button></NavLink></div>
                    </div>
                    <div className="lst">
                        <span>Existing States list</span>
                        <div className="tbldta">
                            {
                                ((dtaDet === undefined)||(dtaDet === null)) ? (<div><span>500 ERROR :: Data couldn't be Fetched</span></div>) : (
                                    <table className='tbl table table-striped table-hover'>
                                        <thead>
                                            <tr>
                                                <th>State Name</th>
                                                <th>State Code</th>
                                                <th>Abbreviation</th>
                                                <th style={{backgroundColor:'darkslateblue',color:'lightgrey',borderColor:'gray'}}>Edit Data</th>
                                                <th style={{backgroundColor:'darkslateblue',color:'lightgrey',borderColor:'gray'}}>Remove Data</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dtaDet.map((elm, i) => (
                                                    <tr key={i}>
                                                        <td style={{whiteSpace:'nowrap'}}><NavLink to='/admin/master/state/details'>{elm.state_name}</NavLink></td>
                                                        <td  style={{whiteSpace:'nowrap'}}>{elm.state_code}</td>
                                                        <td  style={{whiteSpace:'nowrap'}}>{elm.state_abbr}</td>
                                                        <td style={{textAlign:'center',whiteSpace:'nowrap'}}><NavLink to={`/editacc/${elm._id}`} className='navlnk'><button className='edtbtn'><FaUserEdit/></button></NavLink></td>
                                                        <td style={{textAlign:'center',whiteSpace:'nowrap'}}><NavLink className='navlnk' onClick={ev => hndldlt(elm._id)}><button className='dltbtn'><FaUserMinus/></button></NavLink></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    </>
  )
}

export default Index