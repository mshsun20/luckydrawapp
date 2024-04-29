import { useState, useEffect } from 'react'
import '../../styles/Gift.css'
import { NavLink } from 'react-router-dom'
import { FaUserPlus, FaCloudUploadAlt, FaUserEdit, FaUserMinus } from 'react-icons/fa'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import Server from '../../Server'

const Index = () => {
    const [dtaDet, setDtaDet] = useState()
    const vwData = async () => {
        try {
            const res = await axios.get(`${Server}/gift/view`, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
            const dta = await res.data
            // console.log(dta)
            setDtaDet(dta.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        vwData()
    },[])

    const hndldlt = async (id) => {
        try {
            const res = await axios.delete(`${Server}/gift/remove`+id)
            const dta = await res.data
            // console.log(dta)
            if (dta) {
                window.alert(`Gift Item Successfully Removed.`)
                vwData()
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
                <div className='content' id='gftsec'>
                <div className="hdng">Gift Item Details</div>
                <div className="dtlsec">
                    <div className="inf"><span>Here all the Gift Item details are listed by folllowing table.</span></div>
                    <div className="addsec"><span>To Add Gift Item click here : </span><NavLink to="/admin/gifts/add" className='navlnk'><button className='addbtn'><FaUserPlus/></button></NavLink></div>
                    <div className="impsec"><span>For Bulk Gift Items Upload : </span><NavLink to='/admin/gifts/upload' className='navlnk'><button className='upldbtn'><FaCloudUploadAlt/></button></NavLink></div>
                </div>
                <div className="lst">
                    <span>Existing Gift Item lists</span>
                    <div className="tbldta">
                    {
                        ((dtaDet === undefined)||(dtaDet === null)) ? (<div><span>500 ERROR :: Data couldn't be Fetched</span></div>) : (
                        <table className='tbl table table-striped table-hover'>
                            <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Item Details</th>
                                <th>Quantity</th>
                                <th>Stock</th>
                                <th>Item Image</th>
                                <th style={{backgroundColor:'darkslateblue',color:'lightgrey',borderColor:'gray'}}>Edit Data</th>
                                <th style={{backgroundColor:'darkslateblue',color:'lightgrey',borderColor:'gray'}}>Remove Data</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                dtaDet.map((dta, i) => (
                                <tr key={i}>
                                <td><NavLink to='/admin/gifts/detail'>{dta.gft_name}</NavLink></td>
                                <td>{dta.gft_dtl}</td>
                                <td>{dta.gft_qty}</td>
                                <td>{dta.gft_stck}</td>
                                <td style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'0.5rem'}}><img src={`${Server}/${dta.gft_img}`} className='gftimg' alt='prize' /></td>
                                <td style={{textAlign:'center'}}><NavLink to={`/editacc/${dta._id}`} className='navlnk'><button className='edtbtn'><FaUserEdit/></button></NavLink></td>
                                <td style={{textAlign:'center'}}><NavLink className='navlnk' onClick={ev => hndldlt(dta._id)}><button className='dltbtn'><FaUserMinus/></button></NavLink></td>
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