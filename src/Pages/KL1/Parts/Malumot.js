import React, { useState, useContext,useEffect } from 'react'
import { Input } from '@nextui-org/react'
import { Context } from '../../../Context';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import https from '../../../assets/https';
// Components
import { List } from 'react-content-loader'
import { AiOutlineDoubleRight } from 'react-icons/ai'

function Shaxshiy() {

    let navigate = useNavigate()
    const [clientId, setClientId] = useState()
    
    function NextStep(){
        navigate('/kl1/addkl1/1_qism', { replace: true });
    }
    
    const {setActiveTab, infoClient, infoOrder, dataMalumot, setDataMalumot } = useContext(Context);

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
                    bordered
                    label='Hujjat tayyorlangan sana'
                    type='date'
                    color="secondary"
                    width='100%'
                    className='kl1_input'
                    value={dataMalumot?.doc_date}
                    {...register("doc_date", { required: true })}
                    onChange={(e)=>{
                        let newMalumot = {...dataMalumot}
                        newMalumot.doc_date = e.target.value
                        setDataMalumot(newMalumot)
                    }}
                />
                <Input
                    rounded
                    bordered
                    label='Mijoz tekshirilgan va organilgan sana'
                    type='date'
                    color="secondary"
                    width='100%'
                    className='kl1_input'
                    value={dataMalumot?.mark_date}
                    {...register("mark_date", { required: true })}
                    onChange={(e)=>{
                        let newMalumot = {...dataMalumot}
                        newMalumot.mark_date = e.target.value
                        setDataMalumot(newMalumot)
                    }}
                />
                <div className='single_buyurtma_info pdf_margin_top_5'>
                    <div className='single_buyurtma_inputs'>
                        <p>Buyurtmachining F.I.Sh:</p>
                        <p>{infoClient?.name}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Doimiy yashash manzili:</p>
                        <p>{infoClient?.address}</p>
                    </div>
                    {
                        infoClient?.temp_address ? 
                    <div className='single_buyurtma_inputs'>
                        <p>Vaqtinchalik yashash manzili:</p>
                        <p>{infoClient?.temp_address}</p>
                    </div> :
                    <></>
                    }
                    <div className='single_buyurtma_inputs'>
                        <p>JSh ShIR:</p>
                        <p>{infoClient?.pinfl}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Buyurtmachining telefon raqami:</p>
                        <p>{infoClient?.phone?.[0]}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Kredit maqsadi:</p>
                        <p>{infoOrder?.aim}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Soralayotgan kredit miqdori:</p>
                        <p>{infoOrder?.sum}</p>
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