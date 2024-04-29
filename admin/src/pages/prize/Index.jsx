import { useState, useEffect } from 'react'
import '../../styles/Prize.css'
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
      const res = await axios.get(`${Server}/prize/view`)
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
      const res = await axios.delete(`${Server}/prize/remove`+id)
      const dta = await res.data
      // console.log(dta)
      if (dta) {
        window.alert(`Prize Successfully Removed.`)
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
            <div className='content' id='przsec'>
              <div className="hdng">Prize Details</div>
              <div className="dtlsec">
                <div className="inf"><span>Here all the Prize details are listed by folllowing table.</span></div>
                <div className="addsec"><span>To Add Prize click here : </span><NavLink to="/admin/prizes/add" className='navlnk'><button className='addbtn'><FaUserPlus/></button></NavLink></div>
                <div className="impsec"><span>For Bulk Prizes Upload : </span><NavLink to='/admin/prizes/upload' className='navlnk'><button className='upldbtn'><FaCloudUploadAlt/></button></NavLink></div>
              </div>
              <div className="lst">
                <span>Existing Prize lists</span>
                <div className="tbldta">
                  {
                    ((dtaDet === undefined)||(dtaDet === null)) ? (<div><span>500 ERROR :: Data couldn't be Fetched</span></div>) : (
                      <table className='tbl table table-striped table-hover'>
                        <thead>
                          <tr>
                            <th>Allocation Id</th>
                            <th>Contest</th>
                            <th>Rank</th>
                            <th>Prize</th>
                            <th>Quantity</th>
                            <th>Stock</th>
                            <th style={{backgroundColor:'darkslateblue',color:'lightgrey',borderColor:'gray'}}>Edit Data</th>
                            <th style={{backgroundColor:'darkslateblue',color:'lightgrey',borderColor:'gray'}}>Remove Data</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            dtaDet.map((dta, i) => (
                              <tr key={i}>
                              <td><NavLink to={`/admin/prizes/detail/${dta._id}`}>{dta._id}</NavLink></td>
                              <td>{dta.prz_cntst.cntst_name}</td>
                              <td>{dta.prz_rank.rnk_info}</td>
                              <td style={{textAlign:'center'}}>
                                <img src={`${Server}/${dta.prz_itm&&dta.prz_itm.gft_img}`} className='gftimg' alt='prize' />
                                <div style={{textAlign:'center'}}>{dta.prz_itm&&dta.prz_itm.gft_name}</div>
                              </td>
                              {/* <td>{dta.prz_itm.gft_name}</td> */}
                              <td>{dta.prz_qty}</td>
                              <td>{dta.prz_stck}</td>
                              <td style={{textAlign:'center'}}><NavLink to={`/admin/prizes/edit/${dta._id}`} className='navlnk'><button className='edtbtn'><FaUserEdit/></button></NavLink></td>
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