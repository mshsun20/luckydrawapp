import { useState, useEffect } from 'react'
import '../../styles/Winner.css'
import { NavLink } from 'react-router-dom'
import { FaUserEdit, FaUserMinus } from 'react-icons/fa'
import { MdGroupRemove } from 'react-icons/md'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import Server from '../../Server'

const Index = () => {
  const [dtaDet, setDtaDet] = useState()
  const vwData = async () => {
    try {
      const res = await axios.get(`${Server}/winner/view`)
      const dta = await res.data
      // console.log(dta)
      setDtaDet(dta.data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => vwData,[])

  const hndldlt = async (id) => {
    try {
      const res = await axios.delete(`${Server}/winner/remove`+id)
      const dta = await res.data
      // console.log(dta)
      if (dta.statuscode === 220) {
        window.alert(`Ticket Successfully Removed.`)
        vwData()
      }
    } catch (error) {
      console.error(error)
    }
  }
  const hndldltall = async (e) => {
    e.preventDefault()

    try {
      if (window.confirm(`Want to Remove all Winner details ?`)) {
        const res = await axios.get(`${Server}/winner/remove/all`)
        const dta = await res.data
        // console.log(dta)
        if (dta.statuscode === 220) {
          window.alert(dta.success)
          vwData()
        }
        else {
          window.alert(dta.error)
        }
      }
      else {
        vwData()
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
            <div className='content' id='wnnrsec'>
              <div className="hdng">Winner Details</div>
              <div className="dtlsec">
                <div className="inf"><span>Here all the Winner details are listed by folllowing table.</span></div>
                <div className="btnsec">
                  <span>To Remove all Winners details click here : </span>
                  <NavLink className='navlnk'><button className='rmvbtn' onClick={hndldltall}><MdGroupRemove/></button></NavLink>
                </div>
              </div>
              <div className="lst">
                <span>Existing Winner lists</span>
                <div className="tbldta">
                  {
                    ((dtaDet === undefined)||(dtaDet === null)) ? (<div><span>500 ERROR :: Data couldn't be Fetched</span></div>) : (
                      <table className='tbl table table-striped table-hover'>
                        <thead>
                          <tr>
                            <th>Ticket No</th>
                            <th>Account Name</th>
                            <th>Contest</th>
                            <th>Rank</th>
                            <th>Prize</th>
                            <th style={{backgroundColor:'darkslateblue',color:'lightgrey',borderColor:'gray'}}>Remove Data</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            dtaDet.map((elm, i) => (
                              <tr key={i}>
                                <td><NavLink to='/admin/winners/detail'>{elm.wnnr_tckt}</NavLink></td>
                                <td>{elm.wnnr_acc&&elm.wnnr_acc.acc_name}</td>
                                <td>{elm.wn_cntst&&elm.wn_cntst.cntst_name}</td>
                                <td>{elm.wn_rank&&elm.wn_rank.rnk_info}</td>
                                <td style={{textAlign:'center'}}>
                                  <img src={`${Server}/${elm.assigned_gift&&elm.assigned_gift.prz_itm&&elm.assigned_gift.prz_itm.gft_img}`} className='gftimg' alt='prize' />
                                  <div style={{textAlign:'center'}}>{elm.assigned_gift&&elm.assigned_gift.prz_itm&&elm.assigned_gift.prz_itm.gft_name}</div>
                                </td>
                                <td style={{textAlign:'center'}}><NavLink className='navlnk' onClick={ev => hndldlt(elm._id)}><button className='dltbtn'><FaUserMinus/></button></NavLink></td>
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