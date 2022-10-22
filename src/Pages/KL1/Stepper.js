import React, { useState,useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { Context } from '../../Context';
import https from '../../assets/https';

// Page Components
import Shaxshiy from './Parts/Malumot'
import Table from './Parts/Table'
import FirstKl1 from './Parts/Qism1'
import Boshqa from './Parts/Boshqa'
import Oilaviy from './Parts/Qism6'
import BuyurtmaOylik from './Parts/Qism7'
import Mavsumiy from './Parts/Mavsumiy'
import Biznes from './Parts/Biznes'

// Icons
import { AiOutlineRollback } from 'react-icons/ai'

// Styles
import './KL1.css'
import './KL1_tabs.css'
import './Stepper.css'


function StepperForm() {

    const location = useLocation()
    const orderId = location?.state?.id
    const [infoClient, setInfoClient] = useState({})
    const [infoOrder, setInfoOrder] = useState({})

    async function BuyurtmaInfo(){
        await https
        .get(`/orders/${orderId}`)
        .then(res =>{
            setInfoOrder(res?.data)

            https
            .get(`/clients/${res?.data?.client?.id}`)
            .then(res =>{
                setInfoClient(res?.data)
            })
            .catch(err =>{
                console.log(err)
            })
        })
        .catch(err =>{
            console.log(err)
        })
    }

    useEffect(()=>{
        BuyurtmaInfo()
    },[])

    // Active Tab
    const [activeTab, setActiveTab] = useState(1)

    // Mavsumiy Part
    const [mavsumiyWindow, setMavsumiyWindow] = useState('close')

    // Biznes Part
    const [biznesWindow, setBiznesWindow] = useState('close')

    //***** Information for all pages *****//
    // -------- Malumot
    const [ dataMalumot, setDataMalumot] = useState({
        doc_date:'',
        mark_date:''
    })
    // --------- 1 Qism -------- //
    // family
    const [ familyMem, setFamilyMem ] = useState([{
        id:1,
        name:''
    }])
    // mulk
    const [ mulkItem, setMulkItem ] = useState([{
        id:1,
        name:''
    }])
    // 1qism inputs
    const [dataFirstQism, setDataFirstQism] = useState({
        conversation_result:'',
        living_condition:'',
        type:'',
        address:'',
        owner:'',
        duration:''
    })
    // -------- Boshqa -------- //
    const [myDaromads, setMyDaromads] = useState(
    [
        {   
            id: 1,
            nomi:'',
            qiymati:'',
            birlikNarxi:0,
            hajmi:0,
            oylik:0,
            izoh:''
        }
    ])
    const [ checkMavsumiy, setCheckMavsumiy ] = useState(false)
    const [ checkBiznes, setCheckBiznes ] = useState(false)
    // -------- Mavsumiy -------- //
    // list of daromads
    const [mavsumiyDaromads, setMavsumiyDaromads] = useState([{
        id:1,
        name:'',
        value:0
    }])
    // monthly daromad
    const [monthDaromad,setMonthDaromad] = useState({
        january:0,
        february:0,
        march:0,
        april:0,
        may:0,
        june:0,
        july:0,
        august:0,
        september:0,
        october:0,
        november:0,
        december:0
    })
    // list of xarajat
    const [mavsumiyXarajats, setMavsumiyXarajats] = useState([{
        id:1,
        name:'',
        value:0
    }])
    // monthly xarajat
    const [monthXarajat,setMonthXarajat] = useState({
        january:0,
        february:0,
        march:0,
        april:0,
        may:0,
        june:0,
        july:0,
        august:0,
        september:0,
        october:0,
        november:0,
        december:0
    })
    // -------- Biznes -------- //
    // daromad    
    const [biznesDaromads, setBiznesDaromads] = useState([{
        id:1,
        name:'',
        volume:0,
        price:0,
        percent:0,
        plus:0,
        commit:''
    }])
    // xarajat
    const [biznesXarajats, setBiznesXarajats] = useState([{
        id:1,
        name:'',
        volume:0,
        price:0,
        cost:0,
        minus:0,
        commit:''
    }])
    // -------- 6 Qism -------- //
    // daromad
    const [ familyDaromad, setFamilyDaromad ] = useState([{
        id:1,
        name:'',
        type:'',
        address:'',
        profit:0,
        commit:''
    }])
    // xarajat
    const [ familyXarajat, setFamilyXarajat ] = useState([{
        id:1,
        name:'',
        minus:0,
        commit:''
    }])
    // malumot
    const [ familyMalumot, setFamilyMalumot ] = useState([{
        id:1,
        name:'',
        rest:0,
        pay:0,
        commit:''
    }])
    // -------- 7 Qism -------- //
    // datas
    const [ familyMavjud, setFamilyMavjud ] = useState([{
        id:1,
        name:'',
        rest:0,
        pay:0,
        commit:''
    }])
    // 5 input
    const [ dataSeventhQism, setDataSeventhQism ] = useState({
        main_debt:0,
        procent:0,
        month_pay:0,
        main_procent:0,
        credit_history:''
    })
    // commit
    const [historyKredit, setHistoryKredit] = useState('')
    // -------- Table -------- //
    const [ dataTable, setDataTable ] = useState({
        first_input:'',
        second_input:'',
        third_input:'',
        sum_input:0,
        fourth_input:'',
        fifth_input:'',
        sixth_input:'',
        credit_impact  :'',
        conclusion:'',
        status:true
    })



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
                activeTab, setActiveTab,
                mavsumiyWindow, setMavsumiyWindow,
                biznesWindow, setBiznesWindow,
                orderId,
                infoClient,
                infoOrder,
                // Malumot
                dataMalumot, setDataMalumot,
                // 1-Qism
                familyMem, setFamilyMem,
                mulkItem, setMulkItem,
                dataFirstQism, setDataFirstQism,
                // Boshqa
                myDaromads, setMyDaromads,
                checkMavsumiy, setCheckMavsumiy,
                checkBiznes,setCheckBiznes,
                // Mavsumiy
                mavsumiyDaromads, setMavsumiyDaromads,
                monthDaromad, setMonthDaromad,
                mavsumiyXarajats, setMavsumiyXarajats,
                monthXarajat,setMonthXarajat,
                // Biznes
                biznesDaromads, setBiznesDaromads,
                biznesXarajats, setBiznesXarajats,
                // 6-Qism
                familyDaromad, setFamilyDaromad,
                familyXarajat, setFamilyXarajat,
                familyMalumot, setFamilyMalumot,
                // 7-Qism
                familyMavjud, setFamilyMavjud,
                dataSeventhQism, setDataSeventhQism,
                historyKredit, setHistoryKredit,
                // Table
                dataTable, setDataTable
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