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
            .then(response => {
                https
                    .post('/login', data)
                    .then(res => {
                        Success()
                        window.localStorage.setItem('token', res.data.token)
                        setToken(res.data.token)
                    })
                    .catch(err => {
                        if (err.response.status == 401){
                            Warn()
                        }
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
                        <h1>Welcome to Renesans!👋</h1>
                        <span>Please sign-in to your account and start the adventure</span>
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