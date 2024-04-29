import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/Raffle.css'
import smlogo from '../images/lckydrwimg/NewLogo-01.png'
import selogo from '../images/lckydrwimg/NewLogo-02.png'
import ldrwhdr from '../images/lckydrwimg/SEL_tiger_light.mp4'
import Wnbg from '../images/lckydrwimg/web-07.png'
import postrbg from '../images/lckydrwimg/light.mp4'
import sdcnvs from '../images/lckydrwimg/skside.mp4'
// import Cnfbg from '../images/lckydrwimg/web-03.png'
import lght1 from '../images/lckydrwimg/light2slow.mp4'
import lght2 from '../images/lckydrwimg/light2fast.mp4'
import wnstbg from '../images/lckydrwimg/winner_light.mp4'
import rnbtn from '../images/lckydrwimg/Button01.png'
import exbtn from '../images/lckydrwimg/Button02.png'
import przsd1 from '../images/lckydrwimg/przside1.png'
import przsd2 from '../images/lckydrwimg/przsidea2.png'
import przsd3 from '../images/lckydrwimg/przside3.png'
import wlcmaud from '../audios/Sounds/welcom.mp3'
import bgaud from '../audios/Sounds/carnival_new.mp3'
import rflbg from '../audios/Sounds/spin2.mp3'
import rflbg2 from '../audios/Sounds/sample8.mp3'
import fwrkaud from '../audios/Sounds/fireworks.mp3'
import axios from 'axios'
import SlotCounter from 'react-slot-counter'
import Marquee from 'react-fast-marquee'
import { AiOutlineClose } from 'react-icons/ai'


const Raffle = () => {
  const navig = useNavigate()
  // let tm = new Date().toLocaleTimeString()
  let rndvl=0
  const {id} = useParams()
  // const [cntckDta, setCntckDta] = useState([{}])
  // const [curtm, setCurtm] = useState(tm)
  const [tckt, setTckt] = useState('00000000')
  const [maxrnk, setMaxrnk] = useState()
  const [counter, setCounter] = useState(1)
  const [curTckt, setCurTckt] = useState({})
  const [przDta, setPrzDta] = useState([{}])
  const [amt, setAmt] = useState([])
  const [wnrDta, setWnrDta] = useState([{}])
  const counterRef = useRef(null)

  // show contest info
  const getcntst = async () => {
    try {
      const res = await axios.get('http://localhost:5000/viewtckt/'+id)
      const data = await res.data
      // console.log(data)
      if (data.length!==0) {
        // setCntckDta(data)
        document.querySelector('.przdtl').style.display = 'flex'
        document.querySelector('#przvd').opacity = 0.75
      }
    } catch (error) {
      document.querySelector('.przdtl').style.display = 'none'
      document.querySelector('#przvd').opacity = 0
      console.error(`No Ticket is Assigned with the Contest`)
    }
  }
  const getPrize = async () => {
    try {
      const res = await axios.get('http://localhost:5000/viewprz/'+id)
      const data = await res.data
      const dta = data.filter((elm) => elm.stock>0)
      // console.log(dta)
      setPrzDta(dta)
      let loopexit = 0
      if (dta.length!==0) {
        setMaxrnk(dta.length+1)
        for (let i = 0; ((i < dta.length)&&(loopexit===0)); i++) {
          // console.log(dta[i].stock)
          // console.log(dta[i].prize_rank)
          if (parseInt(dta[i].stock)>0) {
            document.querySelector('#rnbtn').style.display = 'flex'
            loopexit = 1
            // console.log(dta[i].prize_rank)
            setCounter(parseInt(dta[i].prize_rank))
          }
          else {
            document.querySelector('#rnbtn').style.display = 'none'
            loopexit = 0
          }
        }
        // setPrzDta(dta)
      }
      else {
        document.querySelector('#rnbtn').style.display = 'none'
      }
    } catch (error) {
      console.log(`No Prize in Stock.`)
    }
  }
  const getAmt = async () => {
    const res = await axios.get('http://localhost:5000/vwprz/'+id)
    const data = await res.data[0]
    // console.log(data.stc_totl)
    setAmt(data)
  }
  const getWinner = async () => {
    const res = await axios.get('http://localhost:5000/viewwnr/'+id)
    const data = await res.data
    // console.log(data)
    // console.log(typeof(data.length));
    setWnrDta(data)
  }
  useEffect(() => {
    getcntst()
    getPrize()
    getAmt()
    getWinner()
    // setTimeout(()=> {}, 5000)
    setTimeout(() => {
      if (document.querySelector('#wlcmbg')) {
        document.querySelector('#wlcmbg').autoplay = false
        document.querySelector('#wlcmbg').load()
      }
      if (document.querySelector('#audbg')) {
        document.querySelector('#audbg').autoplay = true
        document.querySelector('#audbg').load()
      }
    }, 4250)
  }, [])

  // setTimeout(() => {
  //   document.querySelector('#wlcmbg').autoplay = false
  //   document.querySelector('#wlcmbg').load()
  //   document.querySelector('#audbg').autoplay = true
  //   document.querySelector('#audbg').load()
  // }, 4150)
  // dynamic clock
  // const gettime = () => {
  //   tm = new Date().toLocaleTimeString()
  //   setCurtm(tm)
  // }
  // setInterval(() => {
  //   gettime()
  // }, 1000)

  const showPopUp = () => {
    document.querySelector('.cnfrm').style.display = 'flex'
    document.body.style.overflowY = 'hidden'
    document.querySelector('.coat').style.zIndex = 5
    document.querySelector('.coat').style.opacity = 0.5
    document.querySelector('.fwbg').style.filter = 'blur(2rem)'
    document.querySelector('.headr').style.filter = 'blur(2rem)'
    document.querySelector('.rcontainer').style.filter = 'blur(2rem)'
    document.querySelector('#rnbtn').disabled = true
    document.querySelector('#rnbtn').style.cursor = 'not-allowed'
    document.querySelector('#chngbtn').disabled = true
    document.querySelector('#chngbtn').style.cursor = 'not-allowed'
  }
  const closePopUp = () => {
    document.querySelector('.cnfrm').style.display = 'none'
    document.body.style.overflowY = 'auto'
    document.querySelector('.coat').style.zIndex = 0
    document.querySelector('.coat').style.opacity = 0
    document.querySelector('.fwbg').style.filter = 'blur(0rem)'
    document.querySelector('.headr').style.filter = 'blur(0rem)'
    document.querySelector('.rcontainer').style.filter = 'blur(0rem)'
    document.querySelector('#rnbtn').disabled = false
    document.querySelector('#rnbtn').style.cursor = 'pointer'
    document.querySelector('#chngbtn').disabled = false
    document.querySelector('#chngbtn').style.cursor = 'pointer'
  }

  const wnDialg = () => {
    getWnr()
    document.querySelector('.wnstat').style.display = 'flex'
    document.body.style.overflowY = 'hidden'
  }
  const clsDialg = async () => {
    // console.log(wnrDta[0].account_name)
    document.querySelector('.wnstat').style.display = 'none'
    document.body.style.overflowY = 'auto'
    document.querySelector('#rnbtn').disabled = false
    document.querySelector('#rnbtn').style.cursor = 'pointer'
    document.querySelector('#chngbtn').disabled = false
    document.querySelector('#chngbtn').style.cursor = 'pointer'
    document.querySelector('.coat').style.opacity = 1
    if (document.querySelector('#fwrkad')) {
      document.querySelector('#fwrkad').autoplay = false
      document.querySelector('#fwrkad').load()
    }
    if (document.querySelector('#audbg')) {
      document.querySelector('#audbg').autoplay = true
      document.querySelector('#audbg').load()
    }
    
    const {account_id, contest_id} = curTckt
    const restck = await axios.get('http://localhost:5000/viewtckt')
    const tckdta = await restck.data
    // console.log(tckdta[0])
    tckdta.forEach(async (elm) => {
      if ((elm.account_id===account_id)&&(elm.contest_id===contest_id)) {
        const tck_no = elm.ticket_no
        // console.log(tck_no)
        // const res = await axios.delete('http://localhost:5000/deltckt/'+tck_no)
        // const data = await res.data
        // console.log(data)
      }
    })
    setTckt('00000000')
    counterRef.current?.startAnimation({duration:0, dummyCharacterCount:0})
    // if (counter===(parseInt(maxrnk))) {
    //   window.location.assign('/contest')
    // }
  }
  const getWnr = async () => {
    try {
      const res = await axios.get('http://localhost:5000/viewwnr/'+id)
      const data = await res.data
      // console.log(data)
      setWnrDta(data)
    } catch (error) {
      console.log(`No Winning Record Present.`)
    }
  }
  const przStckCalc = async () => {
    // console.log(counter)
    przDta.forEach(async (elm) => {
      const przrnk = parseInt(elm.prize_rank)
      const przid = elm.prize_id
      let przstck = parseInt(elm.stock)
      // console.log(przstck)
      if (przrnk===counter) {
        // console.log(przstck)
        if (przstck>0) {
          przstck-=1
          const resp = await axios.put('http://localhost:5000/edtprz/'+przid, { stock:przstck })
          const przdta = await resp.data
          // console.log(przdta)
          if (przdta.statuscode===200) {
            setTimeout(() => {
              getPrize()
              getAmt()
            }, 8000)
          }
        }
        else {
          setCounter(counter+1)
        }
      }
      else {
        setCounter(przrnk)
      }
    })
  }
  const addWnr = async () => {
    // console.log(counter)
    // console.log(maxrnk)
    if (counter!==maxrnk) {
      przStckCalc()
      przDta.forEach(async (elm) => {
        const przrank = parseInt(elm.prize_rank)
        if (elm.stock>0) {
          if (przrank===counter) {
            const {account_id, contest_id} = rndvl
            const res = await axios.post('http://localhost:5000/pushwnr', { account_id, contest_id, prize_id:elm.prize_id, rank:przrank })
            const wdta = await res.data
            // console.log(wdta)
            if (wdta) {
              console.log(`New Winner Added Successfully.`)
            }
            else {
              console.error(`Error:: Failed to select an Winner.`)
            }
          }
        }
      })
    }
    else {
      setCounter(1)
    }
  }

  // random ticket selection
  const randselct = async () => {
    document.querySelector('.sslw').style.opacity = 0
    document.querySelector('.sfst').style.opacity = 1
    document.querySelector('.cnfrm').style.display = 'none'
    document.querySelector('.coat').style.zIndex = 0
    document.querySelector('.coat').style.opacity = 0
    document.querySelector('.fwbg').style.filter = 'blur(0rem)'
    document.querySelector('.headr').style.filter = 'blur(0rem)'
    document.querySelector('.rcontainer').style.filter = 'blur(0rem)'
    document.body.style.overflowY = 'auto'
    setTimeout(() => {
      document.querySelector('#rnbtn').disabled = false
      document.querySelector('#rnbtn').style.cursor = 'pointer'
      document.querySelector('#chngbtn').disabled = false
      document.querySelector('#chngbtn').style.cursor = 'pointer'
    }, 5000)
    const res = await axios.get('http://localhost:5000/viewtckt/'+id)
    const data = await res.data
    if (data.length!==0) {
      rndvl = data[Math.floor(Math.random()*(data.length))]
      const {account_id, contest_id} = rndvl
      setCurTckt({...curTckt, account_id, contest_id})
      addWnr()
      setTckt(String(rndvl.ticket_no))
      counterRef.current?.startAnimation({duration:5, dummyCharacterCount:50})
      document.querySelector('#audbg').autoplay = false
      document.querySelector('#audbg').load()
      document.querySelector('#rflaud').autoplay = true
      document.querySelector('#rflaud').load()
      
      setTimeout(() => {
        document.querySelector('.sslw').style.opacity = 1
        document.querySelector('.sfst').style.opacity = 0
        document.querySelector('.coat').style.opacity = 0.6
        document.querySelector('#rnbtn').disabled = true
        document.querySelector('#rnbtn').style.cursor = 'not-allowed'
        document.querySelector('#chngbtn').disabled = true
        document.querySelector('#chngbtn').style.cursor = 'not-allowed'
        if (document.querySelector('#rflaud')) {
          document.querySelector('#rflaud').autoplay = false
          document.querySelector('#rflaud').load()
        }
        if (document.querySelector('#rflendaud')) {
          document.querySelector('#rflendaud').autoplay = true
          document.querySelector('#rflendaud').load()
        }
      }, 5000)
      setTimeout(() => {
        if (document.querySelector('#rflendaud')) {
          document.querySelector('#rflendaud').autoplay = false
          document.querySelector('#rflendaud').load()
        }
        if (document.querySelector('#fwrkad')) {
          document.querySelector('#fwrkad').autoplay = true
          document.querySelector('#fwrkad').load()
        }
        wnDialg()
      }, 8000)
    }
    else {
      console.error(`Ticket does not Exist.`)
      window.alert(`Ticket does not Exist.`)
    }
  }

  const chngCnts = async () => {
    navig('/contest')
  }

  
  return (
    <>
        <div className='rwrap'>
          <div className="audfls">
            <audio src={wlcmaud} id='wlcmbg' autoPlay={true} loop controls={false}></audio>
            <audio src={bgaud} id='audbg' autoPlay={false} loop controls={false}></audio>
            <audio src={rflbg} id='rflaud' autoPlay={false} loop controls={false}></audio>
            <audio src={rflbg2} id='rflendaud' autoPlay={false} loop controls={false}></audio>
            <audio src={fwrkaud} id='fwrkad' autoPlay={false} loop controls={false}></audio>
          </div>

          <div className="fwbg">
            <img src={Wnbg} alt="" id='fimg' />
          </div>

          <div className="coat"></div>

          <div className="cnfrm">
            <div className="cnfbg">
              {/* <img src={Cnfbg} alt="" id='cnfimg' /> */}
            </div>
            <div className="cnfmn">
              <div className="hdr"></div>
              <div className="cntnt">Contest Start Confirmation</div>
              <div className="btngrp">
                <button onClick={randselct} className='cnfbtn'>Yes</button>
                <button onClick={closePopUp} className='cnclbtn'>No</button>
              </div>
            </div>
          </div>

          <div className="wnstat">
            <div className='wnrbg'>
              <video src={wnstbg} autoPlay loop muted></video>
            </div>
            {
              (!wnrDta.at(0)) ? <span></span> : (
                <div>
                  <div className='wntck'>{tckt}</div>
                  <div className="wnnm">
                    <span>{wnrDta.at(0).account_name}</span>
                    {/* <span>Prize : {wnrDta.at(0).prize_name}</span> */}
                  </div>
                  <div className="wnrprz"><img src={`http://localhost:5000/${wnrDta.at(0).prize_link}`} alt="" /></div>
                </div>
              )
            }
            <div className="wnbtngrp">
              <button onClick={clsDialg} id='wncls'><AiOutlineClose/></button>
            </div>
          </div>

          <div className="headr">
            <div className="smlgo">
              <img src={smlogo} alt="SM Logo" />
            </div>
            <div className="hdng">
              <div className="glwbg">
                <video src={ldrwhdr} autoPlay loop muted></video>
              </div>
              <div className="glwcnt">
                <div className="cntst">
                  {/* {cntckDta.length>0 ? cntckDta[0].contest_name : null} */}
                </div>
                <div className="timrpart">
                  <div className="timr">
                    {/* <span>{curtm}</span> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="selgo">
              <img src={selogo} alt="SEL Logo" />
            </div>
          </div>

          <div className="rcontainer">
            <div className="sidecanvas">
              <div className="pwrp">
                <video src={postrbg} id='pvd' autoPlay loop muted></video>
              </div>
              <div className="posters">
                <div className="poster">
                  <video src={sdcnvs} id='pstrvd' autoPlay loop muted></video>
                </div>
              </div>
            </div>
            <div className="maindv">
              <div className="ticker">
                <Marquee className='tckr' pauseOnHover={true} pauseOnClick={true} direction={'left'}>
                  <span style={{backgroundImage:'radial-gradient(#991f00 50%, #1a0500 100%)', padding:'0.8rem 1rem', margin:'0 1rem', color:'#ff3819', fontSize:'3rem', borderRadius:'2rem', overflow:'hidden'}}>:: Prizes ::</span>
                  {
                    przDta.length>0 ? przDta.map((elm, i) => (
                      <span className='pzitm' key={i}>&nbsp;{elm.prize_name}&nbsp;</span>
                    )) : ''
                  }
                </Marquee>
              </div>
              <div className="game">
                <div className='slt'>
                  <div className="slot">
                    <div className="sslw">
                      <video src={lght1} id='slwvd' autoPlay loop muted></video>
                    </div>
                    <div className="sfst">
                      <video src={lght2} id='fstvd' autoPlay loop muted></video>
                    </div>
                    <div className="slotm">
                      <SlotCounter value={tckt} containerClassName="slot-counter" charClassName="sltch" separatorClassName="sep" animateUnchanged direction="top-down" autoAnimationStart={false} ref={counterRef} />
                    </div>
                    <div className="sltrun">
                      <button id='rnbtn' onClick={showPopUp}><img src={rnbtn} alt="" /></button>
                    </div>
                  </div>
                </div>
                <div className="wnrtckr">
                  <Marquee className='wnrtck' pauseOnHover={true} pauseOnClick={true} direction={'right'}>
                    {
                      wnrDta.length>0 ? wnrDta.map((el, i) => (
                        <div className="wnrlst" key={i}>
                          <span>&nbsp;</span>
                          <div className="wnrnm">{el.account_name}</div>
                          <div className="wndtl">
                            <div className="wnpos">{el.winning_position}</div>
                            <div className="wnprz">{el.prize_name}</div>
                          </div>
                          <span>&nbsp;</span>
                        </div>
                      )) : <span style={{color:'#ff471a', fontSize:'2.5rem', fontWeight:'bold', textShadow:'0.1rem 0.1rem 0.5rem #ff471a'}}>|&nbsp;&nbsp;&nbsp;&nbsp;STAY TUNED FOR THE FIRST RAFFLE&nbsp;&nbsp;&nbsp;&nbsp;|</span>
                    } 
                  </Marquee>
                </div>
                <div className="trigger">
                  <button id='chngbtn' onClick={chngCnts}><img src={exbtn} alt="" /></button>
                </div>
              </div>
            </div>
            <div className="przdtl">
              <video src={postrbg} id='przvd' autoPlay loop muted></video>
              
              <div className='przcntanr'>
                <div className="totlprz">
                  <img src={przsd1} alt="" />
                  <div className="ttlamt">{(amt.qty_totl>0) ? amt.qty_totl : '0'}</div>
                </div>
                
                <div className="curprz">
                  <img src={przsd2} alt="" />
                  <div className="curcntnt">
                    {
                      (amt.stc_totl>0) ? ((przDta.length>0) ? przDta.map((el, i) => (
                        <div className='curcrd' key={i}>
                          <div className="przimg"><img src={`http://localhost:5000/${el.prize_link}`} alt="Prize" /></div>
                          <div className='przdta'>
                            <div className='prznm'>{el.prize_name}</div>
                            <div className="przblnc">Balance</div>
                          </div>
                          <div className='przstc'>
                            <div className="stcamt">{el.stock}</div>
                          </div>
                        </div>
                      )) : <span>
                      No Prize Data Available
                    </span>) : <div style={{position:'absolute', top:'30%', left:'50%', transform:'translate(-50%,-30%)', display:'flex', justifyContent:'center', alignItems:'center', color:'#f90909', fontSize:'2.2rem', fontWeight:'500', textAlign:'center', zIndex:3}}>
                      All Prize Stock is Empty
                    </div>
                    }
                  </div>
                </div>
                <div className="nxtprz">
                  <img src={przsd3} alt="" />
                  <div className="nxtcntnt">
                    {
                      (amt.stc_totl>0) ? ((przDta.length>0) ? przDta.map((elm, j) => (
                        (((amt.stc_totl-parseInt(elm.stock))>0) ? ((przDta.at(j+1)) ?
                        <div className="nxtcnt" key={j+1}>
                          <div className="nxtmn">
                            <div className="nxtnm">{przDta.at(j+1).prize_name}</div>
                            <div className="nxtstc">{przDta.at(j+1).stock}</div>
                          </div>
                          <div className="nxtimg">
                            <img src={`http://localhost:5000/${przDta.at(j+1).prize_link}`} alt="Prize" />
                          </div>
                        </div> : null) : <span style={{position:'absolute', top:'40%', left:'30%', transform:'translate(-25%,-40%)', display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#070017', padding:'1.5rem', color:'#ff7300', fontSize:'1.5rem', fontWeight:'500', textAlign:'center', borderRadius:'50%', zIndex:3}}>
                        No Upcoming Prize Availavle
                      </span>)
                      )) : null) : <div style={{position:'absolute', top:'40%', left:'50%', transform:'translate(-50%,-40%)', display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#85ff0b', padding:'1rem', color:'#f90909', fontSize:'1.6rem', fontWeight:'bold', textAlign:'center', borderRadius:'50%', zIndex:3}}>
                      Empty Stock
                    </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Raffle