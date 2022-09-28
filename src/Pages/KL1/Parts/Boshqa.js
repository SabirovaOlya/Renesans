import React, { useState, useContext,useEffect } from 'react'
// Components
import { Input, Textarea,Checkbox } from '@nextui-org/react'
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../../../Context';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
// Alert
import Swal from 'sweetalert2'


function Boshqa() {

    // Tab active
    const { activeTab, setActiveTab } = useContext(Context)
    const { mavsumiyWindow, setMavsumiyWindow } = useContext(Context)
    const { biznesWindow, setBiznesWindow } = useContext(Context)

    function Warn() {
        Swal.fire({
            title: "Ma'lumotlar to'liq emas",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
    
    useEffect(() => {
        setActiveTab(3)
    }, [])
    
    let navigate = useNavigate()

    function NextStep(){
        if(mavsumiyWindow == 'open'){
            navigate('/kl1/addkl1/mavsumiy', { replace: true });
        }else if(biznesWindow == 'open'){
            navigate('/kl1/addkl1/biznes', { replace: true });
        }else{
            navigate('/kl1/addkl1/6_qism', { replace: true });
        }
    }
    function BackStep(){
        navigate("/kl1/addkl1/1_qism", { replace: true });
    }

    // Jami boshqa DAROMADlar
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

    // My Daromads adding and deleting funtions
    function addMyDaromad(){
        let newMyDaromad = [{
            id: uuidv4(),
            nomi:'',
            qiymati:'',
            birlikNarxi:0,
            hajmi:0,
            oylik:0,
            izoh:''
        }]
        setMyDaromads(myDaromads.concat(newMyDaromad))
    }
    function deleteMyDaromad(id){
        if(myDaromads.length > 1){
            let newMyDaromads = myDaromads.filter((item,index)=>item.id !== id)
            setMyDaromads(newMyDaromads)
        }
    }
    // get total price of Daromad
    const getTotalSum = () => {
        const newSumArray = []
        myDaromads.map((item, index) => {
            newSumArray.push(item.oylik)
        })
        let totalPrices = newSumArray.reduce((prev, current) => prev + current, 0)
        return totalPrices.toLocaleString()
    }


    function Empty(a){
        if(a){
            return a
        }else{
            return 0
        }
    }

    function NumberSpace(a){
        return a.toLocaleString()
    }

    function onPutDate(){
        if(getTotalSum() === '0'){
            Warn()
        }else{
            let data = {
                daramads:myDaromads,
                daramads_sum:getTotalSum()
            }
            setTimeout(()=>{
                NextStep()
            },500)
        }
    }


    return (
        <>
        <h2 className='kl1_subtitle'>Buyurtmachining daromadlari</h2>
        <div className='kl1_radio'>
            <Checkbox size='sm' color='secondary' defaultValue={biznesWindow=='close' ? false : true} 
                onChange={(e)=>{
                    if(e){
                        setBiznesWindow('open')
                    }else{
                        setBiznesWindow('close')
                    }
                }}
            >Biznes daromadlar</Checkbox>
            <Checkbox size='sm' className='kl1_radio_checkbox' color='secondary' defaultValue={mavsumiyWindow==='open' ? true : false} 
                onChange={(e)=>{
                    if(e){
                        setMavsumiyWindow('open')
                    }else{
                        setMavsumiyWindow('close')
                    }
                }}
            >Mavsumiy daromadlar</Checkbox>
            <Checkbox size='sm' className='kl1_radio_checkbox' color='secondary' defaultSelected={true}>Boshqa daromadlar</Checkbox>
        </div>

        <p className='kl1_formtitle'>Boshqa daromad turlari shuningdek passiv daromadlar</p>
        {
            myDaromads?.map((item,index)=>{
                return(
                    <div className='kl1_products' key={item.id}>
                        <div className='kl1_product_title'>
                            Daromad {index + 1}
                            <button className='kl1_delete_button' onClick={()=>{deleteMyDaromad(item.id)}}><i className='bx bx-trash'></i></button>
                        </div>
                        <div className='kl1_product'>
                            <Input
                                rounded
                                bordered
                                label='Daromad nomi'
                                color="secondary"
                                width='100%'
                                className='kl1_input'
                                value={myDaromads.find(x => x.id === item.id).nomi}
                                onChange={(e)=>{
                                    const newBoshqaDaromads = [...myDaromads]
                                    newBoshqaDaromads[index].nomi = e.target.value
                                    setMyDaromads(newBoshqaDaromads)
                                }}
                            /> 
                            <Input
                                rounded
                                bordered
                                label='Hajmi'
                                color="secondary"
                                type='number'
                                width='47%'
                                className='kl1_input'
                                value={myDaromads.find(x => x.id === item.id).hajmi}
                                onChange={(e)=>{
                                    const newBoshqaDaromads = [...myDaromads]
                                    newBoshqaDaromads[index].oylik = (e.target.value)*(Empty(newBoshqaDaromads[index].birlikNarxi))
                                    newBoshqaDaromads[index].hajmi = e.target.value
                                    setMyDaromads(newBoshqaDaromads)
                                }}
                            />
                            <Input
                                rounded
                                bordered
                                label='Birlik narxi'
                                type='number'
                                color="secondary"
                                width='47%'
                                className='kl1_input'
                                value={myDaromads.find(x => x.id === item.id).birlikNarxi}
                                onChange={(e)=>{
                                    const newBoshqaDaromads = [...myDaromads]
                                    newBoshqaDaromads[index].birlikNarxi = e.target.value
                                    newBoshqaDaromads[index].oylik = (e.target.value)*(Empty(newBoshqaDaromads[index].hajmi))
                                    setMyDaromads(newBoshqaDaromads)
                                }}
                            />
                            <Input
                                rounded
                                bordered
                                label='Qiymati'
                                color="secondary"
                                width='47%'
                                type='number'
                                className='kl1_input'
                                value={myDaromads.find(x => x.id === item.id).qiymati}
                                onChange={(e)=>{
                                    const newBoshqaDaromads = [...myDaromads]
                                    newBoshqaDaromads[index].qiymati = e.target.value
                                    setMyDaromads(newBoshqaDaromads)
                                }}
                            />
                            <Input
                                rounded
                                bordered
                                label='Oylik daromad'
                                color="secondary"
                                width='47%'
                                type='number'
                                readOnly
                                className='kl1_input'
                                value={Empty((myDaromads[index].birlikNarxi)*(myDaromads[index].hajmi))}
                                onChange={(e)=>{
                                    const newBoshqaDaromads = [...myDaromads]
                                    newBoshqaDaromads[index].oylik = e.target.value
                                    setMyDaromads(newBoshqaDaromads)
                                }}
                            />
                            <Textarea
                                width='100%'
                                bordered
                                rounded
                                color="secondary"
                                className='kl1_input'
                                label='Izoh'
                                value={myDaromads.find(x => x.id === item.id).izoh}
                                onChange={(e)=>{
                                    const newBoshqaDaromads = [...myDaromads]
                                    newBoshqaDaromads[index].izoh = e.target.value
                                    setMyDaromads(newBoshqaDaromads)
                                }}
                            />
                        </div>
                    </div>
                )
            })
        }
        <div className='kl1_product_footer'>
            <button className='kl1_add_button' onClick={()=>{addMyDaromad()}}>
                Daromad qoshish
            </button>
            <p className='kl1_jami'>JAMI: {getTotalSum()} so`m</p>
        </div>
             <p className='kl1_jami_main'>Jami o`rtacha oylik daromadlari: {getTotalSum()} so`m</p>

            <div className='step_buttons double_button'>
                <button type='reset' onClick={()=>{BackStep()}} className='previous_button'><AiOutlineDoubleLeft/><p>Oldingi</p></button>
                <button type='submit' onClick={()=>{onPutDate()}} className='step_next'><p>Keyingi</p> <AiOutlineDoubleRight/></button>
            </div>
    </>
  )
}

export default Boshqa