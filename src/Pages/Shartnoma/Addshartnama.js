import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineUserAdd, AiOutlineClear, AiOutlineRollback } from 'react-icons/ai'
import { useForm } from "react-hook-form";
import './Addshartnama.css'
import { Checkbox, Radio, Input } from "@nextui-org/react";
import Swal from 'sweetalert2';
import https from '../../assets/https';


function Addshartnama() {
    const [ newData, setNewData ] = useState({})
    const location = useLocation()
    const orderId = location?.state?.id

    // Alert
    function Success() {
        Swal.fire({
            title: "Shartnama qoshildi",
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }
    function Warn() {
        Swal.fire({
            title: "Error",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
    const [cash,setCash] = useState("card")
    const [type,setType] = useState(1)
    // UseForm
    const { register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();

    function checkingData(info){
        if(cash === "card"){
            return ({...info, ...newData, type_repayment: type, type_credit: cash, order_id: orderId})
        }else{
            return ({...info, type_repayment: type, type_credit: cash, order_id: orderId})
        }
    }
    const onSubmit = (data) => {
        https
        .post('/contracts', checkingData(data))
        .then(res => {
            Success()
            console.log(checkingData(data))
        })
        .catch(err =>{
            Warn()
            console.log(checkingData(data))
            console.log(err);
        })
    }
    function cashInputAppearence() {
        if (cash === "card") {
            return (
                <>
                    <Input
                        className='vall'
                        width='100%'
                        clearable
                        label="SSKS / Hisobraqam"
                        placeholder="8600 1223 3445 5667"
                        type='number'
                        bordered
                        color="secondary"
                        minLength={16}
                        onChange={(event)=> {
                            setNewData({...newData, ssks: event.target.value})
                        }}
                    />
                    <Input
                        className='vall'
                        width='100%'
                        clearable
                        label="Bank nomi"
                        placeholder="Univercial Bank Toshkent filiali"
                        bordered
                        color="secondary"
                        onChange={(event)=> {
                            setNewData({...newData, bank_name: event.target.value})
                        }}
                    />
                    <Input
                        className='vall'
                        width='100%'
                        clearable
                        label="Bank MFOsi"
                        placeholder="00996"
                        type='number'
                        bordered
                        color="secondary"
                        onChange={(event)=> {
                            setNewData({...newData, bank_code: event.target.value})
                        }}
                    />
                </>
            )
        } else {
            return (
                <></>
            )
        }
    }

    const [resetWarning, setResetWarning] = useState('warning_reset_main close')

    function openReset(e) {
        e.preventDefault()
        setResetWarning('warning_reset_main open')
    }
    function closeReset(e) {
        e.preventDefault()
        setResetWarning('warning_reset_main close')
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

            <Link to='/shartnama' className='clientform_back back-back'>
                <AiOutlineRollback />
                Orqaga
            </Link>
            <div className='client'>
                <form className='shart-main' onSubmit={handleSubmit(onSubmit)}>
                    <div className='shart-selector'>
                        <p>Kredit ajratish tartibi</p>
                        <div className='margin_top_10'>
                            <Radio.Group
                                orientation="horizontal"
                                size='sm'
                                defaultValue={"card"}
                                onChange={(event)=> setCash(event)}
                            >
                                <Radio orientation="horizontal" value={"card"}>Plastik karta / Hisobraqam</Radio>
                                <Radio orientation="horizontal" value={"cash"}>Naqd pul ko'rinishida</Radio>
                            </Radio.Group>
                        </div>
                    </div>
                    <Input
                        className='vall'
                        width='100%'
                        readOnly
                        value={orderId}
                        label="Buyurtma Code"
                        bordered
                        color="secondary"
                        {...register("order_id", { required: true })}
                    />
                    <Input
                        className='vall'
                        width='100%'
                        type='number'
                        clearable
                        label="Ustama foiz stavkasi, yillik"
                        placeholder="58,00%"
                        bordered
                        color="secondary"
                        {...register("percent_year", { required: true })}
                    />
                    <Input
                        className='vall'
                        width='100%'
                        clearable
                        label="Penya, kunlik"
                        type='number'
                        placeholder="0,40%"
                        bordered
                        color="secondary"
                        {...register("daily_fine", { required: true })}
                    />
                    <Input
                        className='vall'
                        width='100%'
                        clearable
                        type='number'
                        label="Oylik komission yig'im, %da"
                        placeholder="0,40%"
                        bordered
                        color="secondary"
                        {...register("monthly_commission", { required: true })}
                    />
                    <div className='shart-selector'>
                        <p>So'ndirish tartibi</p>
                        <div className='margin_top_10'>
                            <Radio.Group
                                size='sm'
                                defaultValue={1}
                                className='shart-selector-group'
                                onChange={(event)=> setType(event)}
                            >
                                <Radio value={1}>Bir qil miqdor(Annuitet)</Radio>
                                <Radio value={2}>Kamayib boruvshi(differensial)</Radio>
                            </Radio.Group>
                        </div>
                    </div>
                    <Input
                        className='vall'
                        width='100%'
                        label="Mikroqarz berish sanasi"
                        bordered
                        color="secondary"
                        type='date'
                        {...register("credit_issue_date", { required: true })}
                    />
                    <Input
                        className='vall'
                        width='100%'
                        label="Birinchi tolov sonasi"
                        bordered
                        color="secondary"
                        type='date'
                        {...register("first_repayment_date", { required: true })}
                    />
                    <Input
                        className='vall'
                        width='100%'
                        label="Shartnoma sanasi"
                        bordered
                        color="secondary"
                        type='date'
                        {...register("contract_issue_date", { required: true })}
                    />
                    <Input
                        className='vall'
                        width='100%'
                        clearable
                        type='text'
                        label="Shartnoma raqami"
                        placeholder="34"
                        bordered
                        color="secondary"
                        {...register("contract_num", { required: true })}
                    />
                    {
                        cashInputAppearence()
                    }
                    <div className='submit-buttons'>
                        <button className='client_submit reset' onClick={openReset}>
                            Formani tiklash
                            <AiOutlineClear />
                        </button>
                        <button type='submit' className='client_submit submit'>
                            Shartnomani qo'shish
                            <AiOutlineUserAdd />
                        </button>
                    </div>
                </form>
                {/* <button onClick={()=>window.print()}>Pdf</button> */}
            </div>
        </>
    )
}

export default Addshartnama