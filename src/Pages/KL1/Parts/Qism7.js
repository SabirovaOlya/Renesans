import React, { useState, useContext,useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useForm } from "react-hook-form";
import { Context } from '../../../Context';
// Components
import { Input, Textarea } from '@nextui-org/react'
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import https from '../../../assets/https';


function BuyurtmaOylik() {

    // Tab active
    const { activeTab, setActiveTab } = useContext(Context)
    const { familyMavjud, setFamilyMavjud} = useContext(Context)
    const { dataSeventhQism, setDataSeventhQism } = useContext(Context)
    const { historyKredit, setHistoryKredit } = useContext(Context)
    const {orderData, setOrderData} = useState({})
    const {kreditData, setKreditData} = useState({})
    const orderIdGet = window.localStorage.getItem('order_id')


    // UseForm
    const { register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();


    useEffect(() => {
        let Data = new Date();
        let Year = Data.getFullYear();
        let Month = Data.getMonth();
        let Day = Data.getDate();
        let today = `${Year}-${Month}-${Day}`

        setActiveTab(7)

        console.log("effect")
        console.log(orderIdGet);
        https
        .get(`/orders/${orderIdGet}`)
        .then(res =>{
            let data ={
                type : 'annuitet',
                sum : res?.data?.sum,
                time : res?.data?.time,
                percent : 58,
                given_date : today,
                first_repayment_date : today
            }
            console.log(data,"data")
            https
            .get('/namuna', data)
            .then(responsive =>{
                setKreditData(responsive?.data?.[0])
                console.log(responsive?.data?.[0])
            })
            .catch(error =>{
                console.log(error)
                console.log(data);
            })
        })
    }, [])

    let navigate = useNavigate()

    function NextStep(){
        navigate('/kl1/addkl1/table', { replace: true });
    }
    function BackStep(){
        navigate("/kl1/addkl1/6_qism", { replace: true });
    }


    // Family Mavjuds Adding and Deleting Functions
    function addfamMavjud () {
        let newfamilyMavjud = [{
            id:uuidv4(),
            name:'',
            rest:0,
            pay:0,
            commit:''
        }]
        setFamilyMavjud(familyMavjud.concat(newfamilyMavjud))
    }
    function deletefamMavjud (id) {
        if(familyMavjud.length>1){
            let newfamilyMavjuds = familyMavjud.filter((famMavjud,famMavjudId)=> famMavjudId !== (id))
            setFamilyMavjud(newfamilyMavjuds)
        }
    }

    function MavjudRest(){
        let rest = []
        familyMavjud?.map(item =>{
            rest.push(item.rest)
        })
        let totalRest = rest.reduce((prev,current) => Number(prev) + Number(current), 0)
        return totalRest.toLocaleString()
    }
    function MavjudPay(){
        let pay = []
        familyMavjud?.map(item =>{
            pay.push(item.pay)
        })
        let totalPay = pay.reduce((prev,current) => Number(prev) + Number(current), 0)
        return totalPay.toLocaleString()
    }

    const onSubmit = (data) =>{
        setTimeout(()=>{
            NextStep()
        },500)   
    }

    
    return (
        <section>
            <h2 className='kl1_subtitle'>Buyurtmachining mavjud kredit va qarz majburiyatlari</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {
                    familyMavjud?.map((item,index)=>(
                        <div className='kl1_products' key={item.id}>
                            <div className='kl1_product_title'>
                                Mavjud malumot {index + 1}
                                <button
                                type='button'
                                className='kl1_delete_button'
                                onClick={() => deletefamMavjud(index)}
                                >
                                    <i className='bx bx-trash'></i>
                                </button>
                            </div>
                            <div className='kl1_product'>
                                <Input
                                    rounded
                                    bordered
                                    label='Mavjud kredit va qarzlar'
                                    placeholder="Qishloq Qurilish bank"
                                    color="secondary"
                                    width='31%'
                                    className='kl1_input'
                                    value={familyMavjud?.find(x => x.id === item.id).name}
                                    onChange={(e)=>{
                                        let newFamilyMavjud = [...familyMavjud]
                                        newFamilyMavjud[index].name = e.target.value
                                        setFamilyMavjud(newFamilyMavjud)
                                    }}
                                />
                                <Input
                                    rounded
                                    bordered
                                    label='Asosiy qarz qoldigi'
                                    placeholder="5 700 000,00"
                                    color="secondary"
                                    width='31%'
                                    type='number'
                                    className='kl1_input'
                                    value={familyMavjud?.find(x => x.id === item.id).rest}
                                    onChange={(e)=>{
                                        let newFamilyMavjud = [...familyMavjud]
                                        newFamilyMavjud[index].rest = e.target.value
                                        setFamilyMavjud(newFamilyMavjud)
                                    }}
                                />
                                <Input
                                    rounded
                                    bordered
                                    label='Oylik tolov miqdori'
                                    placeholder="843 000,00"
                                    color="secondary"
                                    type='number'
                                    width='31%'
                                    className='kl1_input'
                                    value={familyMavjud?.find(x => x.id === item.id).pay}
                                    onChange={(e)=>{
                                        let newFamilyMavjud = [...familyMavjud]
                                        newFamilyMavjud[index].pay = e.target.value
                                        setFamilyMavjud(newFamilyMavjud)
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
                                    value={familyMavjud?.find(x => x.id === item.id).commit}
                                    onChange={(e)=>{
                                        let newFamilyMavjud = [...familyMavjud]
                                        newFamilyMavjud[index].commit = e.target.value
                                        setFamilyMavjud(newFamilyMavjud)
                                    }}
                                />
                            </div>
                        </div>
                    ))
                }
                <div className='kl1_product_footer'>
                    <button
                    type='button'
                    className='kl1_add_button'
                    onClick={()=>{addfamMavjud()}}
                    >
                        Mavjud kredit va qarz qoshish
                    </button>
                    <div className='flex_column'>
                        <p className='kl1_jami margin_bottom'>Jami asosiy qarz qoldigi: {MavjudRest()} so`m</p>
                        <p className='kl1_jami margin_bottom'>Jami oylik tolov miqdori: {MavjudPay()} so`m</p>
                        <p className='kl1_jami '>Joiriy kreditlar boyicha qarz yuki korsatkichi: {'22%'}</p>
                    </div>
                </div>

                <h2 className='kl1_subtitle'>Oylik kredit tolovi ( eng katta tolov miqdori )</h2>
                <div className='flex-row'>
                    <Input
                        rounded
                        bordered
                        readOnly
                        label='Asosiy qarz'
                        initialValue='5 000 000'
                        color="secondary"
                        width='23%'
                        className='kl1_input'
                    />
                    <Input
                        rounded
                        bordered
                        readOnly
                        label='Foizlar'
                        initialValue='985 205'
                        color="secondary"
                        width='23%'
                        className='kl1_input'
                    />
                    <Input
                        rounded
                        bordered
                        readOnly
                        label='Jami oylik tolov'
                        initialValue='5 985 205'
                        color="secondary"
                        width='23%'
                        className='kl1_input'
                    />
                    <Input
                        rounded
                        bordered
                        readOnly
                        label='Soralayotgan kredit hisobi qarzi yoki korsatkichi (<50%)'
                        initialValue='83,5%'
                        status="error"
                        shadow={false}
                        width='23%'
                        className='kl1_input'
                    />
                </div>
                <Textarea
                    width='100%'
                    bordered
                    rounded
                    color="secondary"
                    className='kl1_input'
                    placeholder='Jami 7 marotaba kredit olgan, shu jumladan, Renesansdan 2 marotaba. Muntazam o‘z vaqtida to‘lagan. 30 kungacha kechiktirishlar soni - 0, 30 kundan ortiq kechiktirishlar soni - 0'
                    label='Kredit tarixi'
                    value={historyKredit}
                    {...register("credit_history", { required: true })}
                    onChange={(e)=>{
                        setHistoryKredit(e.target.value)
                    }}
                />
                <div className='step_buttons double_button'>
                    <button type='button' onClick={()=>{BackStep()}} className='previous_button'><AiOutlineDoubleLeft/><p>Oldingi</p></button>
                    <button type='submit' className='step_next'><p>Keyingi</p> <AiOutlineDoubleRight/></button>
                </div>
            </form>
        </section>
    )
}

export default BuyurtmaOylik