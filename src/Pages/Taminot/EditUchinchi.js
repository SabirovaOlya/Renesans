import React,{ useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Input } from '@nextui-org/react'
import { AiOutlineRollback, AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import https from '../../assets/https';
import { useForm } from "react-hook-form";
// Alert
import Swal from 'sweetalert2'
import Select from 'react-select';
import './Taminot.css'

function EditUchinchi() {
    const [uchinchiEdit, setUchinchiEdit] = useState({})
    const [uchinchiBack, setUchinchiBack] = useState({})
    const [name, setName] = useState('')
    const [orderId, setOrderId] = useState()

    let { id } = useParams()

    const { register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();

    // Alert
    function Success() {
        Swal.fire({
            title: "Ta'minot o'zgartirildi",
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
    function ProcentError() {
        Swal.fire({
            title: "Qabul qilish qiymati 100% dan ortiq",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }

     // Selector
     const options = [
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
    ];
    const colourStyles = {
        control: styles => ({ ...styles, backgroundColor: 'white'}),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          return {
            ...styles,
            backgroundColor: isSelected ? 'rgb(215,215,215)' : 'white',
            color:'black',
            margin: '0 5px',
            width: 'cal(100% - 10px)',
            fontWeight:500,
            borderRadius:'5px',
            border: isSelected ? '2px solid rgb(215,215,215)' : '2px solid white',
            cursor: isDisabled ? 'not-allowed' : 'default',
            "&:hover": {
                border:'2px solid rgb(215,215,215)'
                // color:'white'
            }
          };
        },
    };
  
    useEffect(()=>{
        https
        .get(`/supply-info/${id}`)
        .then(res =>{
            setUchinchiEdit(res?.data?.owner)
            setUchinchiBack(res?.data?.owner)
            setName(res?.data?.order?.client?.name)
            setOrderId(res?.data?.order?.id)
        })
        .catch(err =>{
            console.log(err)
        })
    },[])

    function BackFun(){
        setUchinchiEdit(uchinchiBack)
    }

    const onSubmit = (data) =>{
        let info = {
            order_id:orderId,
            type:'guarrantor',
            owner:{...data, id:uchinchiEdit?.id, doc_type: uchinchiEdit?.doc_type}
        }

        https
        .patch(`/supply-info/${id}`, info)
        .then(res =>{
            if(res.request.status === 200){
                Success()
            }
        })
        .catch(err =>{
            Warn()
            console.log(err);
        })
    }
  
    return (
      <section>
        <div className='filialform_header'>
          <Link to='/taminot' className='clientform_back'>
              <AiOutlineRollback />
              Orqaga
          </Link>
        </div>
        <div className='single_buyurtma'>
          <h1 className='text_center filial_edit_text'>{name}</h1>
          <div className='pdf_margin_top_15'>
            <form onSubmit={handleSubmit(onSubmit)} className='single_buyurtma_info'>
                <div className='single_buyurtma_inputs'>
                    <p>Ta'minot turi:</p>
                    <p>3 shaxs kafilligi</p>
                 </div>
                <Input 
                    label="Uchinchi mulki egasining F.I.Sh."
                    width='100%'
                    color="secondary"
                    bordered 
                    className='vall'
                    clearable
                    value={uchinchiEdit?.fio}
                    {...register("fio", { required: true })}
                    onChange={(e)=>{
                        let newArray = {...uchinchiEdit}
                        newArray.fio = e.target.value
                        setUchinchiEdit(newArray)
                    }}
                >  
                </Input>
                <div className='transport_garovPart_selectPart'>
                    <p>Shaxsini tasdiqlovchi xujjat</p>
                    <Select
                        defaultValue={options.find(x => x.label == uchinchiEdit?.doc_type)}
                        value={options.find(x => x.label == uchinchiEdit?.doc_type)}
                        options={options}
                        className='buyurtma_select_new'
                        styles={colourStyles}
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 12,
                            colors: {
                            ...theme.colors,
                            primary25: '#7828c8',
                            primary: '#7828c8',
                            },
                        })}
                        onChange={(e)=>{
                            let newArray = {...uchinchiEdit}
                            newArray.doc_type = e.label
                            setUchinchiEdit(newArray)
                        }}
                    />
                </div>
                <Input 
                    label="Seriyasi va raqami"
                    width='100%'
                    color="secondary"
                    bordered 
                    className='vall'
                    clearable
                    value={uchinchiEdit?.serial_num}
                    {...register("serial_num", { required: true })}
                    onChange={(e)=>{
                        let newArray = {...uchinchiEdit}
                        newArray.serial_num = e.target.value
                        setUchinchiEdit(newArray)
                    }}
                >  
                </Input>
                <Input 
                    label="Kim tomonidan berilgan"
                    width='100%'
                    color="secondary"
                    bordered 
                    className='vall'
                    clearable
                    value={uchinchiEdit?.issued_by}
                    {...register("issued_by", { required: true })}
                    onChange={(e)=>{
                        let newArray = {...uchinchiEdit}
                        newArray.issued_by = e.target.value
                        setUchinchiEdit(newArray)
                    }}
                >  
                </Input>
                <Input 
                    label="Berilgan sana"
                    width='100%'
                    color="secondary"
                    bordered 
                    className='vall'
                    type='date'
                    value={uchinchiEdit?.issue_date}
                    {...register("issue_date", { required: true })}
                    onChange={(e)=>{
                        let newArray = {...uchinchiEdit}
                        newArray.issue_date = e.target.value
                        setUchinchiEdit(newArray)
                    }}
                >  
                </Input>
                <Input 
                    label="Telefon Raqami"
                    width='100%'
                    color="secondary"
                    bordered 
                    className='vall'
                    clearable
                    value={uchinchiEdit?.phone}
                    {...register("phone", { required: true })}
                    onChange={(e)=>{
                        let newArray = {...uchinchiEdit}
                        newArray.phone = e.target.value
                        setUchinchiEdit(newArray)
                    }}
                >  
                </Input>
                <Input 
                    label="Ro'yxat bo'yicha yashash manzili"
                    width='100%'
                    color="secondary"
                    bordered 
                    className='vall'
                    clearable
                    value={uchinchiEdit?.address}
                    {...register("address", { required: true})}
                    onChange={(e)=>{
                        let newArray = {...uchinchiEdit}
                        newArray.address = e.target.value
                        setUchinchiEdit(newArray)
                    }}
                >  
                </Input>
                <Input 
                    label="Identifikatsiya raqami (JShShIR)"
                    width='100%'
                    color="secondary"
                    bordered 
                    className='vall'
                    value={uchinchiEdit?.pinfl}
                    {...register("pinfl", { required: true, minLength:14 })}
                    onChange={(e)=>{
                        let newArray = {...uchinchiEdit}
                        newArray.pinfl = e.target.value
                        setUchinchiEdit(newArray)
                    }}
                >  
                </Input>
                <div className='xodim_buttons'>
                    <button type='button' className='client_submit reset back_red' onClick={() => { BackFun() }}>
                        O'zgarishni bekor qilish
                        <AiOutlineClear />
                    </button>
                    <button type='submit' className='client_submit submit back_green'>
                        O'zgarishni kiritish
                        <AiOutlineUserAdd />
                    </button>
                </div>
            </form>
          </div>
        </div>
      </section>
    )
}

export default EditUchinchi