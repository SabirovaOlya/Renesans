import React,{useState} from 'react'
import {Input} from '@nextui-org/react';
import { AiOutlineUserAdd,AiOutlineClear } from 'react-icons/ai';
import { useForm } from "react-hook-form";
import https from '../../assets/https';
import Swal from 'sweetalert2'; 

import './Sugurta.css'

function Sugurta({orderId}) {

  function Success() {
    Swal.fire({
        title: "Ta'minot qo'shildi",
        icon: 'success',
        confirmButtonText: 'Ok'
    })
  }

  const { register,
      handleSubmit,
      watch,
      formState: { errors, isValid }
  } = useForm();

    const onSubmit = (data) =>{
      let info = {
          order_id:orderId,
          type:'insurance',
          insurance:data,
          paths:[]
      }
      https
      .post('/supply-info', info)
      .then(res =>{
        if(res?.request?.status ===  201){
            Success()
        }
      })
      .catch(err =>{
        console.log(err);
      })
    }

  return (
    <>
      <section className='sugurta_section'>
        <form  onSubmit={handleSubmit(onSubmit)}>
          <div className='sugurta_main'>
            <Input 
                label="Sug'urta kompaniyasining nomi"
                placeholder='Vosiq Mirzo'
                width='100%'
                color="secondary"
                bordered 
                className='sugurta_input'
                clearable
                {...register("company_name", { required: true })}
            >  
            </Input>
            <Input 
                label='Sugurta polis raqami'
                placeholder='12345678'
                width='100%'
                color="secondary"
                bordered 
                className='sugurta_input'
                clearable
                {...register("policy", { required: true })}
            >
            </Input>
            <Input 
                label="Sug'urta summasi"
                placeholder='120 000 000'
                type='number'
                width='100%'
                color="secondary"
                bordered 
                className='sugurta_input'
                clearable
                {...register("sum", { required: true })}
            >
            </Input>
            <Input 
                label="Sug'urta sanasi"
                width='100%'
                color="secondary"
                bordered 
                className='sugurta_input'
                type='date'
                {...register("issue_date", { required: true })}
            >
            </Input>
          </div>
          <div className='submit-buttons'>
            <button className='client_submit reset' type='reset'>
              Formani tiklash
              <AiOutlineClear/>
            </button>
            <button type='submit' className='client_submit submit'>
              Ta'minotni qo'shish
              <AiOutlineUserAdd/>
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Sugurta