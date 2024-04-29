import { useState } from 'react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import axios from 'axios'
import Server from '../../../Server'

const Index = () => {
    const [vl, setVl] = useState()
    let name, value

    const hndlinp = (e) => {
        name = e.target.name
        value = e.target.value
        setVl({...vl, [name]:value})
    }

    const hndlsub = async (e) => {
        e.preventDefault()
        const {org_code, org_name} = vl

        try {
            const res = await axios.post(`${Server}/orgm/add`, {org_code, org_name})
            const dta = await res.data
            console.log(dta)
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <>
        <div className="wbpg">
            <Header/>

            <div className="main container py-5">
                <div className="content" id='orgmsec'>
                    <div className="hdr">Add Organisation</div>
                    <div className="frmsec">
                        <form className='frm'>
                            <div className="frmgrp">
                                <label htmlFor="org_code" className='form-label'>Id</label>
                                <input type="text" name="org_code" id="org_code" className='form-control w-50' onChange={hndlinp} />
                            </div>
                            <div className="frmgrp">
                                <label htmlFor="org_name" className='form-label'>Name</label>
                                <input type="text" name="org_name" id="org_name" className='form-control w-50' onChange={hndlinp} />
                            </div>
                            <div className="frmgrp">
                                <input type="submit" value="Add" className='btn btn-primary btn-lg' onClick={hndlsub} />
                                <input type="reset" value="Refresh" className='btn btn-secondary btn-lg' onClick={(e) => setVl(null)} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    </>
  )
}

export default Index