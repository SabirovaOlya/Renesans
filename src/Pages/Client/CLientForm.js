import React, { useState, useEffect,useRef } from 'react';
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

  const [document, setDocument] = useState('')
  const handleChange = event => {
    const result = event.target.value.toUpperCase();
    setDocument(result)
  };

  // UseForm
  const { register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm();

  // Section
  const [sectionOptions, setSectionOptions] = useState([
    { value: '1', label: "O'zR fuqarosining ID kartasi" },
    { value: '2', label: "O'zR Fuqarosining pasporti" },
    { value: '3', label: "Harbiy xizmatchi guvohnomasi" },
    { value: '4', label: "Xizmat guvohnomasi" },
    { value: '5', label: "Xorijiy fuqaro pasporti" },
    { value: '6', label: "Yashash guvohnomasi" },
    { value: '7', label: "O'zR Fuqarosining biometrik pasporti" },
    { value: '8', label: "Tug'ulganlik haqidagi guvohnoma" },
    { value: '9', label: "O'zR fuqarosining yangi namunadagi haydovchilik guvohnomasi" },
    { value: '10', label: "Boshqa" }
  ])
  const [section, setSection] = useState(sectionOptions[0])
  const [sectionRole, setSectionRole] = useState(sectionOptions[0].label)

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
        title: "Klient qoshildi",
        icon: 'success',
        confirmButtonText: 'Ok'
    })
  }
  function Warn() {
      Swal.fire({
          title: "Xato",
          icon: 'error',
          confirmButtonText: 'Ok'
      })
  }

  // Select Style
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

  const onSubmit = (data) => {
    let newData = JSON.parse(JSON.stringify(data))
    let info = {...newData, doc_type: sectionRole}
    info.code = `99${info?.code}`
    
    https
    .post('/clients', info)
    .then(res => {
      Success()
      console.log(info);
    })
    .catch(err => {
      console.log(err)
      console.log(info)
      Warn()
    })
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
            label="Klient kodi"
            placeholder='1234'
            labelLeft='99'
            className='vall'
            bordered
            color="secondary"
            type='number'
            {...register("code", { required: true, minLength:6, maxLength: 6})}
          />
          <Input
            width='100%'
            clearable
            label="F.I.SH."
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
            label="Doimi manzil"
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
            label="Shahar"
            bordered
            className='vall'
            placeholder='2nd Boulevar'
            color="secondary"
            required
            {...register("city", { required: true })}
          />
          {/* <Input
            width='100%'
            clearable
            label="Tuman"
            bordered
            className='vall'
            placeholder='2nd Boulevar'
            color="secondary"
            required
            // {...register("region", { required: false })}
          /> */}
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
            type='number'
            {...register("pinfl", { required: true,  minLength: 14, maxLength: 14 })}
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
            type="number"
            color="secondary"
            required
            {...register("phone", { required: true })}
          />
          <div className='clientForm_selector'>
            <p>Shaxsini tasdiqlovchi hujjat</p>
            <Select
              defaultValue={section}
              value={section}
              options={sectionOptions}
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
              onChange={(event) => {
                setSectionRole(event.label)
                setSection(event)
              }}
            />
          </div>
          <Input
            width='100%'
            clearable
            label="Hujjat seriya raqami"
            bordered
            value={document}
            className='vall bigLetter'
            placeholder='AD123456789'
            color="secondary"
            required
            {...register("serial_num", { required: true })}
            onChange={(e)=>{handleChange(e)}}
          />
          <Input
            width='100%'
            clearable
            label="Kim tomondan berildi"
            bordered
            placeholder='Mamedov Kamal'
            className='vall'
            color="secondary"
            required
            {...register("issued_by", { required: true })}
          />
          <Input
            width='100%'
            label="Hujjat berilgan sana"
            bordered
            className='vall'
            type='date'
            color="secondary"
            required
            {...register("issued_date", { required: true })}
          />
          <Input
            width='100%'
            label="Ish lavozmi"
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