import React, { useState, useEffect,useRef } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
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
import { v4 as uuidv4 } from 'uuid';

// Styles
import '../KL1/KL1.css'
import './Client.css'
import '../../assets/datepicker.css'


function CLientForm() {

  // Document
  const [document, setDocument] = useState('')
  const handleChange = event => {
    const result = event.target.value.toUpperCase();
    setDocument(result)
  };
  // Gender
  const [gender, setGender] = useState('erkak')
  // Phone number array
  const [phoneArray, setPhoneArray] = useState([
    {
      id:1,
      phone:"",
    }
  ])
  function AddPhoneNumber(){
    let newNumber = [{
      id:uuidv4(),
      phone:""
    }]
    setPhoneArray(phoneArray.concat(newNumber))
  }
  function DeletePhoneNumber(id){
    if(phoneArray.length > 1){
      let sortedArray = phoneArray.filter(item => item?.id !== id)
      setPhoneArray(sortedArray)
    }
  }


  // UseForm
  const { register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm();

  // Fosuc Selectors
  
  const regionSelector = useRef()
  const [classFocusRegion, setClassFocusRegion] = useState(false)

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
  // Countries select
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState({})
  const GetCountries = async() =>{
    await https
    .get('/countries')
    .then(res =>{
      let array =[]
      res?.data?.map( item =>{
        array.push({
          value:item?.num_code,
          label:item?.nationality
        })
      })
      setCountries(array)
      setSelectedCountry(array[238])
    })
  }
  // Shahar Select
  const [ regions, setRegions] = useState([])
  const [ selectedRegion, setSelectedRegion] = useState({})
  const GetRegions = async() =>{
    await https
    .get('/regions')
    .then(res =>{
      let array  = []
      res?.data?.map((item,index) =>{
        array.push({
          value:index,
          label:item?.name_uz
        })
      })
      setRegions(array)
      setSelectedRegion(array[0])
    })
  }
  // Tumon Select
  const [ districts, setDistricts] = useState([])
  const [ selectedDistrict, setSelectedDistrict] = useState({})
  const GetDistracts = async() =>{
    await https
    .get('/districts')
    .then(res =>{
      let array  = []
      res?.data?.map((item,index) =>{
        array.push({
          value:index,
          label:item?.name_uz
        })
      })
      setDistricts(array)
      setSelectedDistrict(array[0])
    })
  }

  useEffect(()=>{
    GetCountries()
    GetRegions()
    GetDistracts()
  },[])

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
  function BirthdayError() {
    Swal.fire({
        title: "Tug'ilgan sana noto'g'ri",
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  function DocumentError() {
    Swal.fire({
        title: "Hujjat muddati tugagan",
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }

  // Select Style
  const customStyles = {
    // menuPortal: base => ({ ...base, zIndex: 100 }),
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
    var now = new Date()
    if(new Date(data.birth_date) > new Date(now.getFullYear(), now.getMonth(), now.getDate())){
      return BirthdayError()
    }
    if(new Date(data.doc_end) < new Date(now.getFullYear(), now.getMonth(), now.getDate())){
      return DocumentError()
    }

    let newData = JSON.parse(JSON.stringify(data))
    let numberArray = []
    phoneArray.map(item =>{
      numberArray.push(item?.phone)
    })
    let info = {...newData, doc_type: sectionRole, 
      city:selectedRegion.label, 
      district: selectedDistrict.label, 
      citizenship:selectedCountry.label,
      phone:numberArray, 
      gender:gender
    }
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
          <div className='clientForm_selector'>
            <p>Shahar</p>
            <Select
              defaultValue={selectedRegion}
              value={selectedRegion}
              options={regions}
              ref={regionSelector}
              className={"buyurtma_select_new region_select"}
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
                setSelectedRegion(event)
              }}
            />
          </div>
          <div className='clientForm_selector'>
            <p>Tumon</p>
            <Select
              defaultValue={selectedDistrict}
              value={selectedDistrict}
              options={districts}
              className='buyurtma_select_new ditrict_select'
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
                setSelectedDistrict(event)
              }}
            />
          </div>
          <Input
            width='100%'
            clearable
            label="Vaqtinchalik yashash joyi"
            bordered
            className='vall'
            placeholder='2nd Boulevar'
            color="secondary"
            required
            {...register("temp_address", { required: false })}
          />
          <Radio.Group orientation="horizontal" label="Jinsi:" defaultValue="erkak" className='radio_group' 
           onChange={(e)=>{
            setGender(e)
           }}
          >
            <Radio value="erkak" color="secondary" size="sm">
              Erkak
            </Radio>
            <Radio value="ayol" color="secondary" size="sm" className='radio_second'>
              Ayol
            </Radio>
          </Radio.Group>
          <div className='clientForm_selector'>
            <p>Fuqarolik</p>
            <Select
              defaultValue={selectedCountry}
              value={selectedCountry}
              options={countries}
              className='buyurtma_select_new country_select'
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
                setSelectedCountry(event)
              }}
            />
          </div>
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
          {
            phoneArray?.map((item, index)=>{
              return(
                <div className='kl1_product' key={item?.id}>
                  <Input
                    width='93%'
                    clearable
                    label={`Telefon raqami (${index + 1})`}
                    bordered
                    className='vall'
                    pattern='[0-9]'
                    labelLeft='+998'
                    placeholder='991235678'
                    type="number"
                    color="secondary"
                    required
                    value={phoneArray?.find(x => x.id == item?.id).phone}
                    onChange={(e)=>{
                      let array = [...phoneArray]
                      array[index].phone = e.target.value
                      setPhoneArray(array)
                    }}
                  />
                  <button
                      className='kl1_delete_button'
                      type='button'
                      onClick={() => DeletePhoneNumber(item?.id)}
                  >
                      <i className='bx bx-trash'></i>
                  </button>
                </div>
              )
            })
          }
          <div className='margin_bottom20'>
            <button
                className='kl1_add_button'
                type='button'
                onClick={()=>{AddPhoneNumber()}}
            >
                Telefon raqam qo'shish
            </button>
          </div>
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
            label="Hujjat tugash sana"
            bordered
            className='vall'
            type='date'
            color="secondary"
            required
            {...register("doc_end", { required: true })}
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