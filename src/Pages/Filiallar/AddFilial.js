import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// Styles
import '../../Components/MuiModal.css'
import './Filial.css'
// Icons
import { AiOutlineRollback, AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
// Components
import { Input } from '@nextui-org/react';
// UseForm
import { useForm } from "react-hook-form";
// API
import https from '../../assets/https'
// Alert
import Swal from 'sweetalert2'

function AddFilial() {

    // UseForm
    const { register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();

    // Alert
    function Success(){
        Swal.fire({
            title: "Filial qoshildi",
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }
    function Warn(){
        Swal.fire({
            title: "Error",
            icon: "error",
            confirmButtonText: 'Ok'
        })
    }

    const onSubmit = (data) => {
        https
            .post('/branches', data)
            .then((res) => {
                if (res.request.status == 200) {
                    Success()
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <section className='filialform'>
                <div className='filialform_header'>
                    <Link to='/filials' className='clientform_back'>
                        <AiOutlineRollback />
                        Orqaga
                    </Link>
                </div>
                <form className='filialform_form' onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='filialform_title'>Shakllarni To'ldiring:</h1>
                    <Input
                        width='100%'
                        clearable
                        bordered
                        label="Nomi"
                        placeholder='"Renesans Mikrokredit Tashkiloti" MChJ Bosh ofisi qoshidagi Amaliyot boshqarmasi'
                        className='filial_input'
                        color="secondary"
                        {...register("name", { required: true })}
                    />
                    <Input
                        width='100%'
                        clearable
                        bordered
                        label="Qisqa nomi"
                        placeholder='Amaliyot Boshqarmasi'
                        className='filial_input'
                        color="secondary"
                        {...register("short_name", { required: true })}
                    />
                    <Input
                        width='100%'
                        clearable
                        bordered
                        label="Shartnama"
                        placeholder='Amaliyot Boshqarmasi Nizomiga kora Ishonchnoma'
                        className='filial_input'
                        color="secondary"
                        {...register("contract", { required: true })}
                    />
                    <Input
                        width='100%'
                        clearable
                        bordered
                        label="Qo'mita"
                        placeholder='Kredit Komisiyasi'
                        className='filial_input'
                        color="secondary"
                        {...register("committee", { required: true })}
                    />
                    <Input
                        width='100%'
                        clearable
                        bordered
                        label="Manzil"
                        placeholder='Toshkent viloyati,Orta Chirchiq Tumani'
                        className='filial_input'
                        color="secondary"
                        {...register("address", { required: true })}
                    />
                    <Input
                        width='100%'
                        clearable
                        bordered
                        label="Bank rekvizitlari"
                        placeholder='H/r 0232 2392 2932 3923 ATB Universal Bank Toshkent filiali'
                        className='filial_input'
                        color="secondary"
                        {...register("requisite", { required: true })}
                    />
                    <Input
                        width='100%'
                        clearable
                        bordered
                        label="ITN"
                        placeholder='STIR 300 515 648 OKED 64920'
                        className='filial_input'
                        color="secondary"
                        {...register("itn", { required: true })}
                    />
                    <Input
                        width='100%'
                        clearable
                        bordered
                        type='number'
                        labelLeft='+998'
                        label='Raqam'
                        placeholder='99 123 45 67'
                        className='filial_input'
                        color="secondary"
                        pattern="\d{8}"
                        title='8 raqamdan kob emas bolishi kerak!'
                        {...register("phone", {
                            required: true,
                        })}
                    />
                    <Input
                        width='100%'
                        clearable
                        bordered
                        // pattern='[A-Za-z]'
                        label="Shahar"
                        placeholder='Toshkent'
                        className='filial_input'
                        color="secondary"
                        {...register("city", { required: true })}
                    />
                    <Input
                        width='100%'
                        clearable
                        bordered
                        label="Sudi"
                        placeholder='Fuqarolik ishlari boyicha Mirobod tumanlararo Sudi'
                        className='filial_input'
                        color="secondary"
                        {...register("judge", { required: true })}
                    />
                    <Input
                        width='100%'
                        clearable
                        bordered
                        type='number'
                        label="Kredit limiti"
                        placeholder='123456'
                        className='filial_input'
                        color="secondary"
                        {...register("limit_credit", { required: true })}
                    />
                    <div className='filial_buttons'>
                        <button className='client_submit reset' type='reset'>
                            Formani tiklash
                            <AiOutlineClear/>
                        </button>
                        <button type='submit' className='client_submit submit' >
                            Filialni qo'shish
                            <AiOutlineUserAdd />
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default AddFilial