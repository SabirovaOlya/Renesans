import React, { useState } from 'react'
import { Input } from '@nextui-org/react';
import { useForm } from "react-hook-form";
// Imgs
import LoginBack from '../../assets/images/LoginBack'
import Logo from '../../assets/images/Logo'
// Styles
import './Login.css'
// API
import https from '../../assets/https';
// Pages
import Main from '../Main/Main';
// Components
import Swal from 'sweetalert2';

function Login() {

    const [token, setToken] = useState(window.localStorage.getItem('token'))

    const { register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();

    // Alerts
    function Success() {
        Swal.fire({
            title: "Kirish muvaffaqiyatli",
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }
    function Warn() {
        Swal.fire({
            title: "Noto'g'ri parol yoki email",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }

    async function onSubmit(data) {
        await https
            .get('/sanctum/csrf-cookie')
            .then(res=> {
                https
                    .post('/login', data)
                    .then(res => {
                        let roles = []
                        res?.data?.user?.role?.map(item =>{
                            roles.push(item?.name)
                        })
                        window.localStorage.setItem('token', res?.data?.token)
                        window.localStorage.setItem('name', res?.data?.user?.name)
                        window.localStorage.setItem('photo', res?.data?.user?.employee?.photo)
                        window.localStorage.setItem('role', JSON.stringify(roles))
                        window.localStorage.setItem('user_id', res?.data?.user?.id)
                        window.localStorage.setItem('branch_id', res?.data?.user?.branch?.id)
                        window.localStorage.setItem('branch_limit', res?.data?.user?.branch?.limit_credit)
                        setToken(res.data.token)
                        Success()

                        // Update
                        window.location.reload(false);
                    })
                    .catch(err => {
                        if (err.response.status == 401){
                            Warn()
                        }
                        console.log(err);
                    })
            })
            .catch(err => (console.log(err)))
    }

    if (!token) {
        return (
            <section className='login'>
                <div className='login-main'>
                    <Logo width={300} />
                    <LoginBack />
                </div>
                <div className='login-secondary'>
                    <div className='login-secondary_wrapper'>
                        <h1>Renesansga xush kelibsiz!👋</h1>
                        <span>Iltimos, hisobingizga kiring va ishlashni boshlashingiz mumkun. Hayrli kun!</span>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <Input
                                width='90%'
                                clearable
                                label="E-mail"
                                placeholder='admin@mail.com'
                                bordered
                                className='login_vall vall'
                                color="secondary"
                                required
                                type="email"
                                {...register("email", { required: true })}
                            />
                            <Input.Password
                                label="Password"
                                bordered
                                className='login_vall vall'
                                width='90%'
                                color="secondary"
                                {...register("password", { required: true })}
                            />
                            <button type='submit' className='login_submit' >Submit</button>
                        </form>
                    </div>
                </div>
            </section>
        )
    }else{
        return (
            <Main />
        )
    }
}

export default Login