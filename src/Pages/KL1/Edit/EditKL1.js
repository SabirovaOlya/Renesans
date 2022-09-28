import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// Page Components
import EditMalumot from './EditPartsKL1/EditMalumot'
import EditTable from './EditPartsKL1/EditTable'
import EditPart1 from './EditPartsKL1/EditPart1'
import EditBoshqa from './EditPartsKL1/EditBoshqa'
import EditPart6 from './EditPartsKL1/EditPart6'
import EditPart7 from './EditPartsKL1/EditPart7'
import EditMavsumiy from './EditPartsKL1/EditMavsumiy'
import EditBiznes from './EditPartsKL1/EditBiznes'

// Components
import { Tabs } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars-2';

// Icons
import { AiOutlineUserAdd,AiOutlineClear,AiOutlineRollback } from 'react-icons/ai'

// Styles
import '../KL1.css'
import '../KL1_tabs.css'


function EditKL1() {
    
    // Tabs
    const { TabPane } = Tabs;

    const onChangeTabs = (key) => {
    };

    // WARNING MODALKA
    const [resetWarning, setResetWarning] = useState('warning_reset_main close')

    function openReset(e){
        e.preventDefault()
        setResetWarning('warning_reset_main open')
    }
    function closeReset(e){
        e.preventDefault()
        setResetWarning('warning_reset_main close')
    }

    // Mavsumiy Part
    const [mavsumiyWindow, setMavsumiyWindow] = useState('close')

    function MavsumiyPage(){
        if(mavsumiyWindow == 'open'){
            return(
                <TabPane tab="Mavsumiy" key="4">
                    <EditMavsumiy/>
                </TabPane>
            )
        }else{
            <></>
        }
    }

    // Biznes Part
    const [biznesWindow, setBiznesWindow] = useState('close')

    function BiznesPage(){
        if(biznesWindow == 'open'){
            return(
                <TabPane tab="Biznes" key="5">
                    <EditBiznes/>
                </TabPane>
            )
        }else{
            <></>
        }
    }

 return (
    <>
        {/* Reset Warning */}
        <div className={resetWarning}>
            <p>Haqiqatan ham ma'lumontlarni qayta tiklamoqchimisiz?</p>
            <div >
            <button onClick={closeReset}>Ha</button>
            <button onClick={closeReset}>Yoq</button>
            </div>
        </div>
        <Link to='/kl1' className='clientform_back back-back'>
            <AiOutlineRollback />
            Orqaga
        </Link>

        <section className='kl1'>
            <div className='kl1_title'>
                <h1>Kreditga layoqatilikni baholash varaqasi </h1>
            </div>
            <div className='kl1_tabs_main'>
                        <div className='kl1_content'>
                            <Tabs defaultActiveKey="1" onChange={onChangeTabs}>
                                <TabPane tab="Ma'lumot" key="1">
                                    <EditMalumot/>
                                </TabPane>
                                <TabPane tab="1 qism" key="2">
                                    <EditPart1/>
                                </TabPane>
                                <TabPane tab="Boshqa" key="3">
                                    <EditBoshqa
                                        mavsumiyWindow={mavsumiyWindow}
                                        setMavsumiyWindow={setMavsumiyWindow}
                                        biznesWindow={biznesWindow}
                                        setBiznesWindow={setBiznesWindow}
                                    />
                                </TabPane>
                                {
                                    MavsumiyPage()
                                }
                                {
                                    BiznesPage()
                                }
                                <TabPane tab="6 qism" key="6">
                                    <EditPart6/>
                                </TabPane>
                                <TabPane tab="7 qism" key="7">
                                    <EditPart7/>
                                </TabPane>
                                <TabPane tab="Jadvali" key="8">
                                    <EditTable/>
                                </TabPane>
                            </Tabs>
                        </div>
                <div className='submit-buttons'>
                    <button className='client_submit reset' onClick={openReset}>
                        Formani tiklash
                        <AiOutlineClear/>
                    </button>
                    <button type='submit' className='client_submit submit'>
                        Formani qo'shish
                        <AiOutlineUserAdd/>
                    </button>
                </div>
            </div>
        </section>
    </>
)}

export default EditKL1