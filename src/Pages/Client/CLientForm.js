import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
// Styles
import './Client.css'
import '../../assets/datepicker.css'
// Icons
import { AiOutlineClear, AiOutlineUserAdd, AiOutlineRollback } from 'react-icons/ai'
// Components
import Select from 'react-select';
import ReactDatePicker, { registerLocale } from "react-datepicker";
import uz from "date-fns/locale/uz";
import { Input, Radio } from '@nextui-org/react';
import Swal from 'sweetalert2';

import DatePicker from "react-multi-date-picker"
import https from '../../assets/https';


function CLientForm() {
  // UseForm
  const { register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm();

  const onSubmit = (data) => {
    https
    .post('/clients', data)
    .then(res => Success())
    .catch(err => Warn())
  }
  // Multi DatePicker Configure

  const data = ['06/22/2022', '06/23/2022', '06/24/2022', '06/25/2022']

  let newData = data.map((data) => new Date(data))
  const [values, setValues] = useState(newData)
  const [startDate, setStartDate] = useState();
  const [dateData, setDateData] = useState(newData)

  // DatePicker Configure
  registerLocale("uz", uz);


  const [resetWarning, setResetWarning] = useState('warning_reset_main close')

  function openReset(e) {
    e.preventDefault()
    setResetWarning('warning_reset_main open')
  }
  function closeReset(e) {
    e.preventDefault()
    setResetWarning('warning_reset_main close')
  }
  // Alerts
  function Success() {
    Swal.fire({
        title: "CLient qoshildi",
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


  // Selector
  const options = [
    { value: '1', label: 'variant 1' },
    { value: '2', label: 'variant 2' },
    { value: '3', label: 'variant 3' },
    { value: '4', label: 'variant 4' },
    { value: '5', label: 'variant 5' },
    { value: '6', label: 'variant 6' }
  ];
  const [variant, setVariant] = useState(options[0].label)
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      padding: 10,
      borderRadius: 5
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
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

      <Link to='/client' className='clientform_back'>
        <AiOutlineRollback />
        Orqaga
      </Link>
      <div className='client_form'>
        <div className='clientform_head'>
          <div className='clientform_title_container'>
            <div className='clientform_title'><p>Foydalanuvchi tafsilotlari</p></div>
          </div>
        </div>

        <form className='clientform_form margin_top_20' onSubmit={handleSubmit(onSubmit)} >
          <Input
            width='100%'
            clearable
            label="Parol"
            placeholder='1234'
            className='vall'
            bordered
            color="secondary"
            minLength={1}
            maxLength={10}
            {...register("code", { required: true })}
          />
          <Input
            width='100%'
            clearable
            label="Ism"
            placeholder='Jane'
            bordered
            className='vall'
            color="secondary"
            required
            {...register("name", { required: true })}
          />
          <Input
            width='100%'
            label="Tug'ilgan sana"
            bordered
            className='vall'
            type='date'
            color="secondary"
            required
            {...register("birth_date", { required: true })}
          />
          <Input
            width='100%'
            clearable
            label="Manzil"
            bordered
            className='vall'
            placeholder='2nd Boulevar'
            color="secondary"
            required
            {...register("address", { required: true })}
          />
          <Input
            width='100%'
            clearable
            label="Vaqtinchalik yashash joyi"
            bordered
            className='vall'
            placeholder='2nd Boulevar'
            color="secondary"
            required
            {...register("temp_address", { required: true })}
          />
          <Input
            width='100%'
            clearable
            label="Shahar"
            bordered
            className='vall'
            placeholder='Manhetton'
            color="secondary"
            required
            {...register("city", { required: true })}
          />
          <Input
            width='100%'
            clearable
            label="Fuqarolik"
            bordered
            className='vall'
            placeholder='Russian'
            color="secondary"
            required
            {...register("citizenship", { required: true })}
          />
          <Input
            width='100%'
            clearable
            label="Millat"
            bordered
            className='vall'
            placeholder='Uzbek'
            color="secondary"
            required
            {...register("nationality", { required: true })}
          />
          <Input
            width='100%'
            clearable
            label="PINFL"
            bordered
            className='vall'
            placeholder='12345678901234'
            color="secondary"
            required
            {...register("pinfl", { required: true })}
          />
          <Input
            width='100%'
            clearable
            label="Telefon raqami"
            bordered
            className='vall'
            pattern='[0-9]'
            labelLeft='+998'
            placeholder='991235678'
            type='number'
            color="secondary"
            required
            {...register("phone", { required: true })}
          />
          <div className='clientForm_selector'>
            <p>Sektor</p>
            <Select
              // value={selectedOption}
              defaultValue={options[0]}
              options={options}
              className='buyurtma_select_new'
              styles={customStyles}
              theme={(theme) => ({
                ...theme,
                borderRadius: 12,
                colors: {
                  ...theme.colors,
                  primary25: '#7828c8',
                  primary: '#7828c8',
                },
              })}
              onChange={(event) => setVariant(event.label)}
            />
            <input hidden value={variant} {...register("doc_type", { required: true })}/>
          </div>
          <Input
            width='100%'
            clearable
            label="Ishlab chiqarish raqami"
            bordered
            className='vall'
            placeholder='AD123456789'
            color="secondary"
            required
            {...register("serial_num", { required: true })}
          />
          <Input
            width='100%'
            clearable
            label="Kim bilan chiqarildi"
            bordered
            placeholder='Mamedov Kamal'
            className='vall'
            color="secondary"
            required
            {...register("issued_by", { required: true })}
          />
          <Input
            width='100%'
            label="Chiqarilgan sana"
            bordered
            className='vall'
            type='date'
            color="secondary"
            required
            {...register("issued_date", { required: true })}
          />
          <Input
            width='100%'
            label="Ish"
            placeholder='Web-Developer'
            bordered
            className='vall'
            color="secondary"
            required
            {...register("job", { required: true })}
          />
          <div className='submit-buttons'>
            <button className='client_submit reset' onClick={openReset}>
              Formani tiklash
              <AiOutlineClear />
            </button>
            <button type='submit' className='client_submit submit'>
              Clientni qo'shish
              <AiOutlineUserAdd />
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CLientForm