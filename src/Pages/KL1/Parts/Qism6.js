import React, { useState, useContext,useEffect } from 'react'
// Components
import { Input, Textarea } from '@nextui-org/react'
import { v4 as uuidv4 } from 'uuid'
import { Context } from '../../../Context';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';


function Oilaviy() {

    // Tab active
    const { activeTab, setActiveTab } = useContext(Context)
    const { mavsumiyWindow, setMavsumiyWindow } = useContext(Context)
    const { biznesWindow, setBiznesWindow } = useContext(Context)
    const { familyDaromad, setFamilyDaromad } = useContext(Context)
    const { familyXarajat, setFamilyXarajat } = useContext(Context)
    const { familyMalumot, setFamilyMalumot } = useContext(Context)

    useEffect(() => {
        setActiveTab(6)
    }, [])

    let navigate = useNavigate()

    function NextStep(){
        navigate('/kl1/addkl1/7_qism', { replace: true });
    }
    function BackStep(){
        if(biznesWindow === 'open'){
            navigate("/kl1/addkl1/biznes", { replace: true })
        }else if(mavsumiyWindow === 'open'){
            navigate("/kl1/addkl1/mavsumiy", { replace: true })
        }else{
            navigate("/kl1/addkl1/boshqa", { replace: true })
        }
    }

    // Family Daromads Adding and Deleting Functions
    function addfamDaromad () {
        let newfamilyDaromad = [{
            id:uuidv4(),
            name:'',
            type:'',
            address:'',
            profit:0,
            commit:''
        }]
        setFamilyDaromad(familyDaromad.concat(newfamilyDaromad))
    }
    function deletefamDaromad (id) {
        if(familyDaromad.length>1){
            let newfamilyDaromads = familyDaromad.filter((famDaromad,famDaromadId)=> famDaromadId !== (id))
            setFamilyDaromad(newfamilyDaromads)
        }
    }

    function GetSumDaromad(){
        let daromad = []
        familyDaromad.map(item =>{
            daromad.push(item.profit)
        })
        let totalDaromadSum = daromad.reduce((prev,current) => Number(prev) + Number(current), 0)
        return totalDaromadSum.toLocaleString()
    }


    // Family Xarajats Adding and Deleting Functions
    function addfamXarajat () {
        let newfamilyXarajat = [{
            id:uuidv4(),
            name:'',
            minus:0,
            commit:''
        }]
        setFamilyXarajat(familyXarajat.concat(newfamilyXarajat))
    }
    function deletefamXarajat (id) {
        if(familyXarajat.length>1){
            let newfamilyXarajats = familyXarajat.filter((famXarajat,famXarajatId)=> famXarajatId !== (id))
            setFamilyXarajat(newfamilyXarajats)
        }
    }

    function GetSumXarajat(){
        let xarajat = []
        familyXarajat.map(item =>{
            xarajat.push(item.minus)
        })
        let totalXarajatSum = xarajat.reduce((prev,current) => Number(prev) + Number(current), 0)
        return totalXarajatSum.toLocaleString()
    }


    // Family Malumots Adding and Deleting Functions
    function addfamMalumot () {
        let newfamilyMalumot = [{
            id:uuidv4(),
            name:'',
            rest:0,
            pay:0,
            commit:''
        }]
        setFamilyMalumot(familyMalumot.concat(newfamilyMalumot))
    }
    function deletefamMalumot (id) {
        if(familyMalumot.length>1){
            let newfamilyMalumots = familyMalumot.filter((famMalumot,famMalumotId)=> famMalumotId !== (id))
            setFamilyMalumot(newfamilyMalumots)
        }
    }

    function GetMalumotPay(){
        let malumotPay = []
        familyMalumot.map(item =>{
            malumotPay.push(item.pay)
        })
        let totalMalumotSumPay = malumotPay.reduce((prev,current) => Number(prev) + Number(current), 0)
        return totalMalumotSumPay.toLocaleString()
    }

    function GetMalumotRest(){
        let malumotRest = []
        familyMalumot.map(item =>{
            malumotRest.push(item.rest)
        })
        let totalMalumotSumRest = malumotRest.reduce((prev,current) => Number(prev) + Number(current), 0)
        return totalMalumotSumRest.toLocaleString()
    }

    function TotalMalumot(){
        let daromad = []
        familyDaromad.map(item =>{
            daromad.push(item.profit)
        })
        let totalDaromadSum = daromad.reduce((prev,current) => Number(prev) + Number(current), 0)

        let xarajat = []
        familyXarajat.map(item =>{
            xarajat.push(item.minus)
        })
        let totalXarajatSum = xarajat.reduce((prev,current) => Number(prev) + Number(current), 0)

        let malumotPay = []
        familyMalumot.map(item =>{
            malumotPay.push(item.pay)
        })
        let totalMalumotSumPay = malumotPay.reduce((prev,current) => Number(prev) + Number(current), 0)

        let total = totalDaromadSum - totalXarajatSum - totalMalumotSumPay
         
        return total.toLocaleString()
    }

    function Qism6Data(){
        let data ={
            family_daromads:familyDaromad,
            family_daromad_sum:GetSumDaromad(),
            family_xarajats:familyXarajat,
            family_xarajat_sum:GetSumXarajat(),
            info:familyMalumot,
            info_pay:GetMalumotPay(),
            info_rest:GetMalumotRest(),
            into_total:TotalMalumot()
        }
        console.log(data)

        setTimeout(()=>{
            NextStep()
        },500)
    }

    return (
        <section>
            <h2 className='kl1_subtitle'>Oilaviy daromadlar va xarajatlar (Uy xo'jaligining daromad va xarajatlari)</h2>
                    <p className='kl1_formtitle'>Oila azolarining daromadlar , shuningdek uy xojaligining boshqa daromadlari</p>
                    {
                        familyDaromad.map((item,index)=>(
                            <div className='kl1_products' key={item.id}>
                                <div className='kl1_product_title'>
                                    Odam {index + 1}
                                    <button
                                    className='kl1_delete_button'
                                    onClick={() => deletefamDaromad(index)}
                                    >
                                        <i className='bx bx-trash'></i>
                                    </button>
                                </div>
                                <div className='kl1_product'>
                                    <Input
                                        rounded
                                        bordered
                                        label='Daromad Egasi'
                                        placeholder="Otasi"
                                        color="secondary"
                                        width='47%'
                                        className='kl1_input'
                                        value={familyDaromad.find(x => x.id === item.id).name}
                                        onChange={(e)=>{
                                            let newFamilyDaromad = [...familyDaromad]
                                            newFamilyDaromad[index].name = e.target.value
                                            setFamilyDaromad(newFamilyDaromad)
                                        }}
                                    />
                                    <Input
                                        rounded
                                        bordered
                                        label='Faoliyat Turi'
                                        placeholder="Nafaqada"
                                        color="secondary"
                                        width='47%'
                                        className='kl1_input'
                                        value={familyDaromad.find(x => x.id === item.id).type}
                                        onChange={(e)=>{
                                            let newFamilyDaromad = [...familyDaromad]
                                            newFamilyDaromad[index].type = e.target.value
                                            setFamilyDaromad(newFamilyDaromad)
                                        }}
                                    />
                                    <Input
                                        rounded
                                        bordered
                                        label='Faoliyat Joyi'
                                        placeholder="Yuqorichirchiq tuman 54-maktab"
                                        color="secondary"
                                        width='47%'
                                        className='kl1_input'
                                        value={familyDaromad.find(x => x.id === item.id).address}
                                        onChange={(e)=>{
                                            let newFamilyDaromad = [...familyDaromad]
                                            newFamilyDaromad[index].address = e.target.value
                                            setFamilyDaromad(newFamilyDaromad)
                                        }}
                                    />
                                    <Input
                                        rounded
                                        bordered
                                        label='Bir oylik daromad'
                                        placeholder="1 000 000"
                                        color="secondary"
                                        width='47%'
                                        type='number'
                                        className='kl1_input'
                                        value={familyDaromad.find(x => x.id === item.id).profit}
                                        onChange={(e)=>{
                                            let newFamilyDaromad = [...familyDaromad]
                                            newFamilyDaromad[index].profit = e.target.value
                                            setFamilyDaromad(newFamilyDaromad)
                                        }}
                                    />
                                    <Textarea
                                        width='100%'
                                        bordered
                                        rounded
                                        color="secondary"
                                        className='kl1_input'
                                        label='Izoh'
                                        value={familyDaromad.find(x => x.id === item.id).commit}
                                        onChange={(e)=>{
                                            let newFamilyDaromad = [...familyDaromad]
                                            newFamilyDaromad[index].commit = e.target.value
                                            setFamilyDaromad(newFamilyDaromad)
                                        }}
                                    />
                                </div>
                            </div>
                        ))
                    }
                    <div className='kl1_product_footer'>
                        <button
                        className='kl1_add_button'
                        onClick={()=>{addfamDaromad()}}
                        >
                            Daromad qoshish
                        </button>
                        <p className='kl1_jami'>JAMI: {GetSumDaromad()} so`m</p>
                    </div>

                    <p className='kl1_formtitle'>Uy xojaligining xarajatlari</p>
                    {
                        familyXarajat.map((item,index)=>(
                            <div className='kl1_products' key={item.id}>
                                <div className='kl1_product_title'>
                                    Xarajat {index + 1}
                                    <button
                                    className='kl1_delete_button'
                                    onClick={() => deletefamXarajat(index)}
                                    >
                                        <i className='bx bx-trash'></i>
                                    </button>
                                </div>
                                <div className='kl1_product'>
                                    <Input
                                        rounded
                                        bordered
                                        label='Xarajat nomi'
                                        placeholder="Oziq-ovqat uchun"
                                        color="secondary"
                                        width='47%'
                                        className='kl1_input'
                                        value={familyXarajat.find(x => x.id === item.id).name}
                                        onChange={(e)=>{
                                            let newFamilyXarajat = [...familyXarajat]
                                            newFamilyXarajat[index].name = e.target.value
                                            setFamilyXarajat(newFamilyXarajat)
                                        }}
                                    />
                                    <Input
                                        rounded
                                        bordered
                                        label='Ortaja oylik xarajat'
                                        placeholder="1 500 000,00"
                                        color="secondary"
                                        width='47%'
                                        type='number'
                                        className='kl1_input'
                                        value={familyXarajat.find(x => x.id === item.id).minus}
                                        onChange={(e)=>{
                                            let newFamilyXarajat = [...familyXarajat]
                                            newFamilyXarajat[index].minus = e.target.value
                                            setFamilyXarajat(newFamilyXarajat)
                                        }}
                                    />
                                    <Textarea
                                        width='100%'
                                        bordered
                                        rounded
                                        color="secondary"
                                        className='kl1_input'
                                        label='Izoh'
                                        value={familyXarajat.find(x => x.id === item.id).commit}
                                        onChange={(e)=>{
                                            let newFamilyXarajat = [...familyXarajat]
                                            newFamilyXarajat[index].commit = e.target.value
                                            setFamilyXarajat(newFamilyXarajat)
                                        }}
                                    />
                                </div>
                            </div>
                        ))
                    }
                    <div className='kl1_product_footer'>
                        <button
                        className='kl1_add_button'
                        onClick={()=>{addfamXarajat()}}
                        >
                            Xarajat qoshish
                        </button>
                        <p className='kl1_jami'>JAMI: {GetSumXarajat()} so`m</p>
                    </div>

                    <p className='kl1_formtitle'>Uy xojaligi azolarining mavjud kredit va qarzdorliklari togrisidagi malumotlar</p>
                    {
                        familyMalumot.map((item,index)=>(
                            <div className='kl1_products' key={index}>
                                <div className='kl1_product_title'>
                                    Malumot {index + 1}
                                    <button
                                    className='kl1_delete_button'
                                    onClick={() => deletefamMalumot(index)}
                                    >
                                        <i className='bx bx-trash'></i>
                                    </button>
                                </div>
                                <div className='kl1_product'>
                                    <Input
                                        rounded
                                        bordered
                                        label='Malumot nomi'
                                        placeholder="Qishloq Qurilish bank"
                                        color="secondary"
                                        width='31%'
                                        className='kl1_input'
                                        value={familyMalumot.find(x => x.id === item.id).name}
                                        onChange={(e)=>{
                                            let newFamilyMalumott = [...familyMalumot]
                                            newFamilyMalumott[index].name = e.target.value
                                            setFamilyMalumot(newFamilyMalumott)
                                        }}
                                    />
                                    <Input
                                        rounded
                                        bordered
                                        label='Asosiy qarz qoldigi'
                                        placeholder="5 700 000,00"
                                        color="secondary"
                                        type='number'
                                        width='31%'
                                        className='kl1_input'
                                        value={familyMalumot.find(x => x.id === item.id).rest}
                                        onChange={(e)=>{
                                            let newFamilyMalumott = [...familyMalumot]
                                            newFamilyMalumott[index].rest = e.target.value
                                            setFamilyMalumot(newFamilyMalumott)
                                        }}
                                    />
                                    <Input
                                        rounded
                                        bordered
                                        label='Oylik tolov miqdori'
                                        placeholder="843 000,00"
                                        color="secondary"
                                        width='31%'
                                        type='number'
                                        className='kl1_input'
                                        value={familyMalumot.find(x => x.id === item.id).pay}
                                        onChange={(e)=>{
                                            let newFamilyMalumott = [...familyMalumot]
                                            newFamilyMalumott[index].pay = e.target.value
                                            setFamilyMalumot(newFamilyMalumott)
                                        }}
                                    />
                                    <Textarea
                                        width='100%'
                                        bordered
                                        rounded
                                        color="secondary"
                                        className='kl1_input'
                                        placeholder='Istemol krediti 23%dan'
                                        label='Izoh'
                                        value={familyMalumot.find(x => x.id === item.id).commit}
                                        onChange={(e)=>{
                                            let newFamilyMalumott = [...familyMalumot]
                                            newFamilyMalumott[index].commit = e.target.value
                                            setFamilyMalumot(newFamilyMalumott)
                                        }}
                                    />
                                </div>
                            </div>
                        ))
                    }
                
                    <div className='kl1_product_footer'>
                        <button
                        className='kl1_add_button'
                        onClick={()=>{addfamMalumot()}}
                        >
                            Malumot qoshish
                        </button>
                        <div className='flex_column'>
                            <p className='kl1_jami margin_bottom'>Jami asosiy qarz qoldigi: {GetMalumotRest()} so`m</p>
                            <p className='kl1_jami margin_bottom'>Jami oylik tolov miqdori: { GetMalumotPay()} so`m</p>
                        </div>
                    </div>
                    <p className={(TotalMalumot() > 0)? 'text_black_18 green_text' : 'text_black_18 red_text'}>Uy xojaligi byudjetining ortacha oylik ortiqcha mablagi yoki kamomadi miqdori: {TotalMalumot()} so`m</p>
                    
                    <div className='step_buttons double_button'>
                        <button type='reset' onClick={()=>{BackStep()}} className='previous_button'><AiOutlineDoubleLeft/><p>Oldingi</p></button>
                        <button type='submit' onClick={()=>{Qism6Data()}} className='step_next'><p>Keyingi</p> <AiOutlineDoubleRight/></button>
                    </div>
        </section>
    )
}

export default Oilaviy