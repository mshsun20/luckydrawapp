import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Topper from './components/Topper'
import Account from './components/Account'
import Addacc from './components/accountparts/Addacc'
import Upldacc from './components/accountparts/Upldacc'
import Editacc from './components/accountparts/Editacc'
import Contest from './components/Contest'
import Addcntst from './components/contestparts/Addcntst'
import Editcntst from './components/contestparts/Editcntst'
import Raffle from './components/Raffle'
import Prize from './components/Prize'
import Addprz from './components/prizeparts/Addprz'
import Editprz from './components/prizeparts/Editprz'
import Ticket from './components/Ticket'
import Addtckt from './components/ticketparts/Addtckt'
import User from './components/User'
import Winner from './components/Winner'
import Errorpage from './components/Errorpage'

const App = () => {
  return (
    <>
        <div className="wrapper">
            <Topper/>
            <Routes>
                <Route path='/' element={<Account/>}></Route>
                <Route path='/addacc' element={<Addacc/>}></Route>
                <Route path='/upldacc' element={<Upldacc/>}></Route>
                <Route path='/editacc/:id' element={<Editacc/>}></Route>
                <Route path='/contest' element={<Contest/>}></Route>
                <Route path='/addcntst' element={<Addcntst/>}></Route>
                <Route path='/editcntst/:id' element={<Editcntst/>}></Route>
                <Route path='/raffle/:id' element={<Raffle/>}></Route>
                <Route path='/prize' element={<Prize/>}></Route>
                <Route path='/addprz' element={<Addprz/>}></Route>
                <Route path='/editprz/:id' element={<Editprz/>}></Route>
                <Route path='/ticket' element={<Ticket/>}></Route>
                <Route path='/addtckt' element={<Addtckt/>}></Route>
                <Route path='/user' element={<User/>}></Route>
                <Route path='/winner' element={<Winner/>}></Route>
                <Route path='*' element={<Errorpage/>}></Route>
            </Routes>
        </div>
    </>
  )
}

export default App