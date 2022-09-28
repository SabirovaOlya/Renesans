import React, { useState } from 'react'
import { Input } from '@nextui-org/react'
// UseForm
import { useForm } from "react-hook-form";

function EditMalumot() {

    const [malumotArray, setMalumotArray] = useState({
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

    // UseForm
    const { register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();

    const onSubmit = (data) =>{
        console.log(data)
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
                <div className='single_buyurtma_info'>
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
                <button type='submit'>Date</button>
            </form>
        </>
    )
}

export default EditMalumot