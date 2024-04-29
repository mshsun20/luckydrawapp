import React from 'react'
import '../styles/Main.css'
import { Routes, Route } from 'react-router-dom'
import Autohome from '../pages/Autohome'
import Home from '../pages'
import Login from '../pages/Login'
import Forgetpass from '../pages/user/Forgetpass'
import Cnfrmcode from '../pages/user/Cnfrmcode'
import Resetpass from '../pages/user/Resetpass'
import User from '../pages/user/Index'
import Addusr from '../pages/user/Addusr'
import Usrprfl from '../pages/user/Usrprfl'
import Account from '../pages/account/Index'
import Addacc from '../pages/account/Addacc'
import Upldacc from '../pages/account/Upldacc'
import Contest from '../pages/contest/Index'
import Addcntst from '../pages/contest/Addcntst'
import Gift from '../pages/gift/Index'
import Addgft from '../pages/gift/Addgft'
import Prize from '../pages/prize/Index'
import Addprz from '../pages/prize/Addprz'
import Edtprz from '../pages/prize/Edtprz'
import Edtstck from '../pages/prize/Edtstck'
import Raffle from '../pages/raffle/Index'
import Ticket from '../pages/ticket/Index'
import Addtckt from '../pages/ticket/Addtckt'
import Rank from '../pages/rank/Index'
import Addrnk from '../pages/rank/Addrnk'
import Winner from '../pages/winner/Index'
import Testapi from '../pages/raffle/Testapi'

import Orgmaster from '../pages/MASTERS/org_master/Index'
import Locmaster from '../pages/MASTERS/loc_master/Index'
import Addstate from '../pages/MASTERS/loc_master/Addstate'

const Router = () => {
  return (
    <>
        <div data-bs-theme="dark">
            <Routes>
                <Route path='/' element={<Autohome/>} />
                <Route path='/admin' element={<Autohome/>} />
                <Route path='/admin/home' element={<Home/>} />
                <Route path='/admin/login' element={<Login/>} />
                <Route path='/admin/forget' element={<Forgetpass/>} />
                <Route path='/admin/cnfcode/:id' element={<Cnfrmcode/>} />
                <Route path='/admin/resetpass/:id' element={<Resetpass/>} />
                <Route path='/admin/users' element={<User/>} />
                <Route path='/admin/users/add' element={<Addusr/>} />
                <Route path='/admin/user/me/:id' element={<Usrprfl/>} />
                <Route path='/admin/accounts' element={<Account/>} />
                <Route path='/admin/accounts/add' element={<Addacc/>} />
                <Route path='/admin/accounts/upload' element={<Upldacc/>} />
                <Route path='/admin/contests' element={<Contest/>} />
                <Route path='/admin/contests/add' element={<Addcntst/>} />
                <Route path='/admin/gifts' element={<Gift/>} />
                <Route path='/admin/gifts/add' element={<Addgft/>} />
                <Route path='/admin/prizes' element={<Prize/>} />
                <Route path='/admin/prizes/add' element={<Addprz/>} />
                <Route path='/admin/prizes/edit/:id' element={<Edtprz/>} />
                <Route path='/admin/prizes/stckedt' element={<Edtstck/>} />
                <Route path='/admin/raffle/:id' element={<Raffle/>} />
                <Route path='/admin/tickets' element={<Ticket/>} />
                <Route path='/admin/tickets/add' element={<Addtckt/>} />
                <Route path='/admin/ranks' element={<Rank/>} />
                <Route path='/admin/ranks/add' element={<Addrnk/>} />
                <Route path='/admin/winners' element={<Winner/>} />
                <Route path='/admin/testapi' element={<Testapi/>} />

                <Route path='/admin/master/org' element={<Orgmaster/>} />
                <Route path='/admin/master/loc' element={<Locmaster/>} />
                <Route path='/admin/master/state/add' element={<Addstate/>} />
            </Routes>
        </div>
    </>
  )
}

export default Router