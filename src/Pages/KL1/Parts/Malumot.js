import React, { useState, useContext,useEffect } from 'react'
import { Input } from '@nextui-org/react'
import { Context } from '../../../Context';
// UseForm
import { useForm } from "react-hook-form";

import { AiOutlineDoubleRight } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

function Shaxshiy() {

    let navigate = useNavigate()

    function NextStep(){
        navigate('/kl1/addkl1/1_qism', { replace: true });
    }

    const { activeTab, setActiveTab } = useContext(Context);

    const [malumotArray, setMalumotArray] = useState({
        data_first:'0000-00-00',
        data_second:'0000-00-00',
        dateMake:'',
        dateGet:'',
        name:'Usmonova Muyassar Abduvalievna',
        address:'Sirdariyo viloyati Guliston shahri Begmatov jochasi 46-uy 10-xonadon',
        timeAddress:'Royihatga olingan manzili boyicha istiqomat qiladi',
        shir:'41-3077-9287-0060',
        number:'90 995 59 90',
        goal:"Aylanma mablag'larini to'ldirish -Moy almashtirish va moylash materiallari, filtr sotib olish",
        price:((2000000).toLocaleString())
    })

    // Tab active
    useEffect(() => {
        setActiveTab(1)
    }, [])

    // UseForm
    const { register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();

    const onSubmit = (data) =>{
        console.log(data)
        setTimeout(()=>{
            NextStep()
        },500)   
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    rounded
                    // value={malumotArray?.data_first}
                    bordered
                    label='Hujjat tayyorlangan sana'
                    type='date'
                    color="secondary"
                    width='100%'
                    className='kl1_input'
                    onChange={(e)=>{
                        let newMalumot = {...malumotArray}
                        newMalumot.data_first = e.target.value
                        console.log(e.target.value);
                        setMalumotArray(newMalumot)
                    }}
                    {...register("data_1", { required: true })}
                />
                <Input
                    rounded
                    bordered
                    label='Mijoz tekshirilgan va organilgan sana'
                    type='date'
                    color="secondary"
                    width='100%'
                    className='kl1_input'
                    {...register("data_2", { required: true })}
                />
                <div className='single_buyurtma_info pdf_margin_top_5'>
                    <div className='single_buyurtma_inputs'>
                        <p>Buyurtmachining F.I.Sh:</p>
                        <p>{malumotArray.name}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Doimiy yashash manzili:</p>
                        <p>{malumotArray.address}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Vaqtinchalik yashash manzili:</p>
                        <p>{malumotArray.timeAddress}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>JSh ShIR:</p>
                        <p>{'41-3077-9287-0060'}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Buyurtmachining telefon raqami:</p>
                        <p>{`+998 ${malumotArray.number}`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Kredit maqsadi:</p>
                        <p>{malumotArray.goal}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Soralayotgan kredit miqdori:</p>
                        <p>{`${malumotArray.price} so'm`}</p>
                    </div>
                </div>
                <div className='step_buttons single_button'>
                    <button type='submit' className='step_next'><p>Keyingi</p><AiOutlineDoubleRight/></button>
                </div>
            </form>
        </>
    )
}

export default Shaxshiy