import React, { useState } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

// Page Components
import Shaxshiy from './Parts/Malumot'
import Table from './Parts/Table'
import FirstKl1 from './Parts/Qism1'
import Boshqa from './Parts/Boshqa'
import Oilaviy from './Parts/Qism6'
import BuyurtmaOylik from './Parts/Qism7'
import Mavsumiy from './Parts/Mavsumiy'
import Biznes from './Parts/Biznes'

import { Context } from '../../Context';

// Icons
import { AiOutlineRollback } from 'react-icons/ai'

// Styles
import './KL1.css'
import './KL1_tabs.css'
import './Stepper.css'


function StepperForm() {

    // Active Tab
    const [activeTab, setActiveTab] = useState(1)

    // Mavsumiy Part
    const [mavsumiyWindow, setMavsumiyWindow] = useState('close')

    // Biznes Part
    const [biznesWindow, setBiznesWindow] = useState('close')

    function showMavsumiy(){
        if(mavsumiyWindow == 'open'){
            return(
                <p className={activeTab==4 ? 'stepper_tab active_tab' : 'stepper_tab'}>Mavsumiy</p>
            )
        }
    }
    function showBiznes(){
        if(biznesWindow == 'open'){
            return(
                <p className={activeTab==5 ? 'stepper_tab active_tab' : 'stepper_tab'}>Biznes</p>
            )
        }
    }

 return (
    <>
        <Link to='/kl1' className='clientform_back back-back'>
            <AiOutlineRollback />
            Orqaga
        </Link>

        <section className='kl1'>
            <div className='kl1_title'>
                <h1>Kreditga layoqatilikni baholash varaqasi </h1>
            </div>
            <div className='stepper_table'>
                <p className={activeTab==1 ? 'stepper_tab active_tab' : 'stepper_tab'}>Ma'lumot</p>
                <p className={activeTab==2 ? 'stepper_tab active_tab' : 'stepper_tab'}>1-qism</p>
                <p className={activeTab==3 ? 'stepper_tab active_tab' : 'stepper_tab'}>Boshqa</p>
                { showMavsumiy() }
                { showBiznes() }
                <p className={activeTab==6 ? 'stepper_tab active_tab' : 'stepper_tab'}>6-qism</p>
                <p className={activeTab==7 ? 'stepper_tab active_tab' : 'stepper_tab'}>7-qism</p>
                <p className={activeTab==8 ? 'stepper_tab active_tab' : 'stepper_tab'}>Jadvali</p>
            </div>
            <div className='kl1_tabs_main'>
            <Context.Provider value={{
                activeTab,
                setActiveTab,
                mavsumiyWindow,
                setMavsumiyWindow,
                biznesWindow,
                setBiznesWindow
            }}>
                <Routes>
                    <Route path='/' element={<Shaxshiy/>}/>
                    <Route path='/1_qism' element={<FirstKl1/>}/>
                    <Route path='/boshqa' element={<Boshqa/>}/>
                    <Route path='/mavsumiy' element={<Mavsumiy/>}/>
                    <Route path='/biznes' element={<Biznes/>}/>
                    <Route path='/6_qism' element={<Oilaviy/>}/>
                    <Route path='/7_qism' element={<BuyurtmaOylik/>}/>
                    <Route path='/table' element={<Table/>}/>
                </Routes>
            </Context.Provider>
            </div>
        </section>
    </>
)}

export default StepperForm