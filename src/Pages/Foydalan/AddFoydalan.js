import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '@nextui-org/react'
import Select from 'react-select';
import { AiOutlineRollback, AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'

import './Foydalan.css'
// UseForm
import { useForm } from "react-hook-form";
// Alert
import Swal from 'sweetalert2'
import https from '../../assets/https';

function AddFoydalan() {
    // Alert
    function Warn() {
        Swal.fire({
            title: "Parollar mos kelmayapti",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
    function Success() {
        Swal.fire({
            title: "Foydalanuvchi qoshildi",
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }
    function AlredyTaken() {
        Swal.fire({
            title: "Bu email olingan",
            icon: 'warning',
            confirmButtonText: 'Ok'
        })
    }
    function Error() {
        Swal.fire({
            title: "Error",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
    // UseForm
    const { register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();

    // Filial Section
    const [workerOptions, setWorkerOptions] = useState({})
    const [worker, setWorker] = useState([])

    async function fetchWorkers() {
        const res = await https.get('/employees-all')
        let selectWorkers = []
        res?.data?.data?.map((item)=>{
            selectWorkers.push(
                { value: item?.id, label: item?.name }
            )
        })
        setWorkerOptions(selectWorkers)
        setWorker(selectWorkers[0])
    }

    useEffect(()=>{
        fetchWorkers()
    },[])

    // Selector
    const roles = [
        { value: '1', label: "user" },
        { value: '2', label: "admin" },
        { value: '3', label: "director" },
        { value: '4', label: "monitoring" }
    ];
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            padding: 5,
            borderRadius: 5
        }),
        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';
            return { ...provided, opacity, transition };
        }
    }
    const [role, setRole] = useState(roles[0].label)
    // WARNING MODALKA
    const [resetWarning, setResetWarning] = useState('warning_reset_main close')

    function openReset(e) {
        e.preventDefault()
        setResetWarning('warning_reset_main open')
    }
    function closeReset(e) {
        e.preventDefault()
        setResetWarning('warning_reset_main close')
    }

    const onSubmit = (data) => {
        if ({ ...data, role: role }.password !== { ...data, role: role }.password_confirmation) {
            Warn()
        } else {
            https
                .post('/register', { ...data, role: role, employee_id:worker?.value })
                .then(res => {
                    Success()
                    
                })
                .catch(err => {
                    // if(err.response.status === 422){
                    //     return(AlredyTaken())
                    // }
                    console.log({ ...data, role: role });
                    Error()
                })
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

            <section className='filialform'>
                <div className='filialform_header'>
                    <Link to='/foydalanuvchi' className='clientform_back'>
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
                        label="F.I.Sh"
                        placeholder='ismi...'
                        className='filial_input'
                        color="secondary"
                        {...register("name", { required: true })}
                    />
                    <Input
                        width='100%'
                        clearable
                        bordered
                        label="Email"
                        placeholder='email...'
                        className='filial_input'
                        color="secondary"
                        {...register("email", { required: true })}
                    />
                    <Input
                        width='100%'
                        clearable
                        bordered
                        label="Parol"
                        placeholder='parol...'
                        className='filial_input'
                        color="secondary"
                        {...register("password", { required: true })}
                    />
                    <Input
                        width='100%'
                        clearable
                        bordered
                        label="Parolni tasdiqlash"
                        placeholder='parol...'
                        className='filial_input'
                        color="secondary"
                        {...register("password_confirmation", { required: true })}
                    />
                    <div className='xodim_selectform'>
                        <p>Xodim</p>
                        <Select
                            width='10%'
                            defaultValue={worker}
                            value={worker}
                            options={workerOptions}
                            className='xodim_select basic-multi-select'
                            classNamePrefix="select"
                            styles={customStyles}
                            theme={(theme) => ({
                                ...theme,   
                                borderRadius: 12,
                                colors: {
                                    ...theme.colors,
                                    primary25: 'rgb(216,215,215)',
                                    primary: '#7828c8',
                                },
                            })}
                            onChange={(event) => { setWorker(event) }}
                        />
                    </div>
                    <div className='xodim_selectform'>
                        <p>Roli</p>
                        <Select
                            width='10%'
                            defaultValue={[roles[0]]}
                            // isMulti
                            options={roles}
                            className='xodim_select basic-multi-select'
                            classNamePrefix="select"
                            styles={customStyles}
                            theme={(theme) => ({
                                ...theme,   
                                borderRadius: 12,
                                colors: {
                                    ...theme.colors,
                                    primary25: 'rgb(216,215,215)',
                                    primary: '#7828c8',
                                },
                            })}
                            onChange={(event) => { setRole(event.label) }}
                        />
                    </div>
                    <div className='filial_buttons'>
                        <button type='button' className='client_submit reset' onClick={openReset}>
                            Formani tiklash
                            <AiOutlineClear />
                        </button>
                        <button type='submit' className='client_submit submit'>
                            Foydalanuvchini qo'shish
                            <AiOutlineUserAdd />
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default AddFoydalan