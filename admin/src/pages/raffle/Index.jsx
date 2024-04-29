import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import '../../styles/Raffle.css'
import Topbar from '../../components/Topbar'
import smlogo from '../../images/lckydrwimg/NewLogo-01.png'
import selogo from '../../images/lckydrwimg/NewLogo-02.png'
import ldrwhdr from '../../images/lckydrwimg/SEL_tiger_light.mp4'
import Wnbg from '../../images/lckydrwimg/web-07.png'
import postrbg from '../../images/lckydrwimg/light.mp4'
import sdcnvs from '../../images/lckydrwimg/skside.mp4'
// import Cnfbg from '../../images/lckydrwimg/web-03.png'
import lght1 from '../../images/lckydrwimg/light2slow.mp4'
import lght2 from '../../images/lckydrwimg/light2fast.mp4'
import wnstbg from '../../images/lckydrwimg/winner_light.mp4'
import rnbtn from '../../images/lckydrwimg/Button01.png'
import exbtn from '../../images/lckydrwimg/Button02.png'
import przsd1 from '../../images/lckydrwimg/przside1.png'
import przsd2 from '../../images/lckydrwimg/przsidea2.png'
import przsd3 from '../../images/lckydrwimg/przside3.png'
import wlcmaud from '../../audios/Sounds/welcom.mp3'
import bgaud from '../../audios/Sounds/carnival_new.mp3'
import rflbg from '../../audios/Sounds/spin2.mp3'
import rflbg2 from '../../audios/Sounds/sample8.mp3'
import fwrkaud from '../../audios/Sounds/fireworks.mp3'
import axios from 'axios'
import Server from '../../Server'
import SlotCounter from 'react-slot-counter'
import Marquee from 'react-fast-marquee'
import { AiOutlineClose } from 'react-icons/ai'

const Index = () => {
    // let tm = new Date().toLocaleTimeString()
    let rndvl=0
    const {id} = useParams()
    // const [curtm, setCurtm] = useState()
    const [tckt, setTckt] = useState('00000000')
    const [przcntr, setPrzcntr] = useState()
    const [maxprz, setMaxprz] = useState()
    const [totlstckcntr, setTotlstckcntr] = useState()
    const [mintotlstck, setMintotlstck] = useState(0)
    // const [maxrnk, setMaxrnk] = useState()
    // const [counter, setCounter] = useState(1)
    const [curTckt, setCurTckt] = useState({})
    const [przDta, setPrzDta] = useState([{}])
    const [amt, setAmt] = useState([])
    const [wnrDta, setWnrDta] = useState()
    const [curwnrDta, setCurwnrDta] = useState()
    const [cntckDta, setCntckDta] = useState()
    const counterRef = useRef(null)

    // show contest info
    const getcntst = async () => {
        try {
            const res = await axios.get(`${Server}/ticket/view/chckcntst/`+id)
            const dta = await res.data.data
            // console.log(dta)
            if (dta.length!==0) {
                document.querySelector('.przdtl').style.display = 'flex'
                document.querySelector('#przvd').opacity = 0.75
            }
            else {
                document.querySelector('.przdtl').style.display = 'none'
                document.querySelector('#przvd').opacity = 0
                console.error(dta.error)
            }
        } catch (error) {
            document.querySelector('.przdtl').style.display = 'none'
            document.querySelector('#przvd').opacity = 0
            console.error(`No Ticket is Assigned with the Contest`)
        }
    }
    const ftchcntstSlctd = async () => {
        try {
            const res = await axios.get(`${Server}/contest/view/`+id)
            const dta = await res.data
            // console.log(dta.data)
            setCntckDta(dta.data)
        } catch (error) {
            console.error(error)
        }
    }
    const getPrize = async () => {
        try {
            const res = await axios.get(`${Server}/prize/view/chckcntst/`+id)
            const dta = await res.data.data
            console.log(dta)
            setPrzDta(dta.sort((a,b) => {
                if (a.prz_rank.rnk_val-b.prz_rank.rnk_val) {
                    return -1
                }
                else {
                    return 1
                }
            }))
            
            if (dta.length > 0) {
                setMaxprz(dta.length)
                const stck = dta.find((elm, i) => {
                    return elm.prz_stck!==0
                })
                const stckindx = dta.indexOf(stck)
                setPrzcntr(stckindx)
                if (stckindx >= 0) {
                    if (dta[stckindx].prz_stck>0) {
                        document.querySelector('#rnbtn').style.display = 'flex'
                    }
                    else {
                        setPrzcntr(przcntr+1)
                    }
                }
                else {
                    setPrzcntr(0)
                }
            }
            else {
                document.querySelector('#rnbtn').style.display = 'none'
            }
        } catch (error) {
            // console.log(`No Prize in Stock.`)
            console.error(error)
        }
    }
    const getAmt = async () => {
        try {
            const res = await axios.get(`${Server}/prize/view/stckcalc/`+id)
            const data = await res.data.data
            // console.log(data)
            setMintotlstck(0)
            if (data[0].totlStck > 0) {
                setTotlstckcntr(data[0].totlStck)
            }
            else {
                setTotlstckcntr(0)
                const res2 = await axios.put(`${Server}/contest/edit/gftstat/`+id)
                const dta = await res2.data
                // console.log(dta)
                if (dta.statuscode === 220) {
                    console.log(dta.success)
                }
                else {
                    console.error(dta.error)
                }
                document.querySelector('#rnbtn').style.display = 'none'
            }
            setAmt(data)
        } catch (error) {
            console.error(error)
        }
    }
    const getWinner = async () => {
        try {
            const res = await axios.get(`${Server}/winner/view/chckcntst/`+id)
            const data = await res.data
            // console.log(data.data)
            setWnrDta(data.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        ftchcntstSlctd()
        getcntst()
        getPrize()
        getAmt()
        getWinner()
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

    const showPopUp = () => {
        try {
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
        } catch (error) {
            console.error(error)
        }
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

    const wnDialg = (tno) => {
        getWnr(tno)
        document.querySelector('.wnstat').style.display = 'flex'
        document.body.style.overflowY = 'hidden'
    }

    const clsDialg = async () => {
        // console.log(wnrDta[0].account_name)
        getWinner()
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

        try {
            const tcktno = curTckt.tckt_no
            const res = await axios.delete(`${Server}/ticket/remove/selected/`+tcktno)
            const tckdta = await res.data
            // console.log(tckdta)
            setCntckDta(tckdta.data)
            if (tckdta.statuscode === 220) {
                console.log(tckdta.success)
                // window.alert(tckdta.success)
            }
            else {
                window.alert(tckdta.error)
            }
        } catch (error) {
            console.error(error)
        }
        setTckt('00000000')
        counterRef.current?.startAnimation({duration:0, dummyCharacterCount:0})
    }

    const getWnr = async (tcktno) => {
        try {
            const res = await axios.get(`${Server}/winner/view/chcktckt/`+tcktno)
            const data = await res.data
            // console.log(data.data)
            setCurwnrDta(data.data)
        } catch (error) {
            console.log(`No Winning Record Present.`)
        }
    }
    const przStckCalc = async () => {
        // console.log(przcntr)
        // console.log(maxprz)
        if (totlstckcntr > mintotlstck) {
            document.querySelector('#rnbtn').disabled = false
            if (przcntr < maxprz) {
                // console.log(przcntr)
                const przid = przDta[przcntr]._id
                let przstck = przDta[przcntr].prz_stck
                if (przstck>0) {
                    // console.log(przcntr)
                    setTotlstckcntr(totlstckcntr-1)
                    const resp = await axios.put(`${Server}/prize/update/stck/`+przid, {prz_stck:przstck-1})
                    const przdta = await resp.data
                    // console.log(przdta)
                    if (przdta.statuscode===220) {
                        getPrize()
                        getAmt()
                    }
                }
                else {
                    setPrzcntr(przcntr+1)
                }
            }
            else {
                setPrzcntr(0)
            }
        }
        else {
            document.querySelector('#rnbtn').disabled = true
            getAmt()
        }
    }

    const addWnr = async () => {
        // console.log(przcntr)
        // console.log(maxprz)
        // console.log(totlstckcntr)
        if (przcntr < maxprz) {
            przStckCalc()
            if (przDta[przcntr].prz_stck>0) {
                // console.log(rndvl)
                const res = await axios.post(`${Server}/winner/add`, {wnnr_tckt:rndvl.tckt_no, wnnr_acc:rndvl.booked_acc._id, wn_cntst:rndvl.booked_cntst._id, wn_rank:przDta[przcntr].prz_rank._id, assigned_gift:przDta[przcntr]._id})
                const wdta = await res.data
                // console.log(wdta.data)
                if (wdta.statuscode === 220) {
                    console.log(`New Winner Added Successfully.`)
                }
                else {
                    console.error(`Winner selection Failed...!`)
                }
            }
            else {
                setPrzcntr(przcntr+1)
                const res = await axios.post(`${Server}/winner/add`, {wnnr_tckt:rndvl.tckt_no, wnnr_acc:rndvl.booked_acc._id, wn_cntst:rndvl.booked_cntst._id, wn_rank:przDta[przcntr+1].prz_rank._id, assigned_gift:przDta[przcntr+1]._id})
                const wdta = await res.data
                // console.log(wdta.data)
                if (wdta.statuscode === 220) {
                    console.log(`New Winner Added Successfully.`)
                }
                else {
                    console.error(`Winner selection Failed...!`)
                }
            }
        }
        else {
            setPrzcntr(0)
        }
    }

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
        }, 10000)
        const res = await axios.get(`${Server}/ticket/view/chckcntst/`+id)
        const data = await res.data.data
        // console.log(data)
        
        if (data.length!==0) {
            rndvl = data[Math.floor(Math.random()*(data.length))]
            // console.log(rndvl)
            setCurTckt(rndvl)
            addWnr()
            setTckt(String(rndvl.tckt_no))
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
                wnDialg(rndvl.tckt_no)
            }, 8000)
        }
        else {
            console.error(`Ticket does not Exist.`)
            window.alert(`Ticket does not Exist.`)
        }
    }
    
    const chngCnts = () => {
        window.location.assign('/admin/contests')
    }

  return (
    <>
        <div className="wbpg">
            <Topbar />

            <div className="rflmain">
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
                            (!curwnrDta) ? <span></span> : (
                                <div>
                                    <div className='wntck'>{curwnrDta.wnnr_tckt}</div>
                                    <div className="wnnm">
                                        <span>{curwnrDta.wnnr_acc.acc_name}</span>
                                    </div>
                                    {
                                        (curwnrDta.assigned_gift)&&(curwnrDta.assigned_gift.prz_itm)&&(<div className="wnrprz"><img src={`${Server}/${curwnrDta.assigned_gift.prz_itm.gft_img}`} alt="" /></div>)
                                    }
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
                        {przcntr+1}
                        <div className="hdng">
                            <div className="glwbg">
                                <video src={ldrwhdr} autoPlay loop muted></video>
                            </div>
                            {/* <div className="glwcnt">
                                <div className="cntst">
                                    {cntckDta&&(cntckDta.length>0) ? cntckDta.cntst_name : null}
                                </div>
                                <div className="timrpart">
                                    <div className="timr">
                                        <span>{curtm}</span>
                                    </div>
                                </div>
                            </div> */}
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
                                        (elm.prz_stck>0)&&<span className='pzitm' key={i}>&nbsp;{elm.prz_itm&&elm.prz_itm.gft_name}&nbsp;</span>
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
                                    {
                                        (cntckDta)&&((cntckDta.tckt_count>0))&&(
                                            <div className="sltrun">
                                                <button id='rnbtn' onClick={showPopUp}><img src={rnbtn} alt="" /></button>
                                            </div>
                                        )
                                    }
                                </div>
                                </div>
                                <div className="wnrtckr">
                                <Marquee className='wnrtck' pauseOnHover={true} pauseOnClick={true} direction={'right'}>
                                    {
                                        wnrDta&&(wnrDta.length>0) ? wnrDta.map((el, i) => (
                                            <div className="wnrlst" key={i}>
                                                <span>&nbsp;</span>
                                                <div className="wnrnm">{el.wnnr_acc&&el.wnnr_acc.acc_name}</div>
                                                <div className="wndtl">
                                                    <div className="wnpos">{el.wn_rank&&el.wn_rank.rnk_info}</div>
                                                    <div className="wnprz">{el.assigned_gift&&el.assigned_gift.prz_itm.gft_name}</div>
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
                                    <div className="ttlamt">{(amt[0])&&(amt[0].totlStck>0) ? amt[0].totlStck : '0'}</div>
                                </div>
                                
                                <div className="curprz">
                                    <img src={przsd2} alt="" />
                                    <div className="curcntnt">
                                        {
                                            (totlstckcntr>0) ?(przcntr < maxprz)&&przDta&&przDta.slice(przcntr).map((elm, i) => (
                                                <span key={i}>
                                                {
                                                    (elm.prz_stck>0) ? (
                                                        <span className='curcrd'>
                                                            <div className="przimg"><img src={`${Server}/${(elm.prz_itm)&&elm.prz_itm.gft_img}`} alt="Prize" /></div>
                                                            <div className='przdta'>
                                                                <div className='prznm'>{(elm.prz_itm)&&elm.prz_itm.gft_name}</div>
                                                                <div className="przblnc">Balance</div>
                                                            </div>
                                                            <div className='przstc'>
                                                                <div className="stcamt">{elm.prz_stck}</div>
                                                            </div>
                                                        </span>
                                                    ) : null
                                                }
                                                </span>
                                            )) : (
                                                <div style={{position:'absolute', top:'30%', left:'50%', transform:'translate(-50%,-30%)', display:'flex', justifyContent:'center', alignItems:'center', color:'#f90909', fontSize:'2.2rem', fontWeight:'500', textAlign:'center', zIndex:3}}>
                                                    Total Prize Stock is Empty
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="nxtprz">
                                    <img src={przsd3} alt="" />
                                    <div className="nxtcntnt">
                                        {
                                            (totlstckcntr>0) ? ((przcntr+1 < maxprz) ? (
                                                przDta&&(przDta[przcntr+1].prz_stck>0) ? (
                                                    <span className='nxtcrd'>
                                                        <div className="nxtmn">
                                                            <div className="nxtnm">{(przDta[przcntr+1].prz_itm)&&przDta[przcntr+1].prz_itm.gft_name}</div>
                                                            <div className="nxtstc">{przDta[przcntr+1].prz_stck}</div>
                                                        </div>
                                                        <div className="nxtimg">
                                                            <img src={`${Server}/${(przDta[przcntr+1].prz_itm)&&przDta[przcntr+1].prz_itm.gft_img}`} alt="Prize" />
                                                        </div>
                                                    </span>
                                                ) : null
                                            ) : (
                                                    <div style={{position:'absolute', top:'40%', left:'30%', transform:'translate(-25%,-40%)', display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#070017', padding:'1.5rem', color:'#ff7300', fontSize:'1.5rem', fontWeight:'500', textAlign:'center', borderRadius:'50%', zIndex:3}}>
                                                        No Upcoming Prize Availavle
                                                    </div>
                                            )) : (
                                                <div style={{position:'absolute', top:'40%', left:'50%', transform:'translate(-50%,-40%)', display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#85ff0b', padding:'1rem', color:'#f90909', fontSize:'1.6rem', fontWeight:'bold', textAlign:'center', borderRadius:'50%', zIndex:3}}>
                                                    Empty Stock
                                                </div>
                                            )
                                        }
                                        {
                                            // (totlstckcntr>0) ? ((przcntr+1 < maxprz-1) ? przDta&&przDta.slice(przcntr).map((elm, i) => (
                                            //     <span key={i}>
                                            //     {
                                            //         (elm.prz_stck>0) ? (
                                            //             <span className='nxtcrd'>
                                            //                 <div className="nxtmn">
                                            //                     <div className="nxtnm">{(elm.prz_itm)&&elm.prz_itm.gft_name}</div>
                                            //                     <div className="nxtstc">{elm.prz_stck}</div>
                                            //                 </div>
                                            //                 <div className="nxtimg">
                                            //                     <img src={`${Server}/${(elm.prz_itm)&&elm.prz_itm.gft_img}`} alt="Prize" />
                                            //                 </div>
                                            //             </span>
                                            //         ) : null
                                            //     }
                                            //     </span>
                                            // )) : (
                                            //         <div style={{position:'absolute', top:'40%', left:'30%', transform:'translate(-25%,-40%)', display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#070017', padding:'1.5rem', color:'#ff7300', fontSize:'1.5rem', fontWeight:'500', textAlign:'center', borderRadius:'50%', zIndex:3}}>
                                            //             No Upcoming Prize Availavle
                                            //         </div>
                                            //     )) : (
                                            //     <div style={{position:'absolute', top:'40%', left:'50%', transform:'translate(-50%,-40%)', display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#85ff0b', padding:'1rem', color:'#f90909', fontSize:'1.6rem', fontWeight:'bold', textAlign:'center', borderRadius:'50%', zIndex:3}}>
                                            //         Empty Stock
                                            //     </div>
                                            // )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Footer/> */}
        </div>
    </>
  )
}

export default Index