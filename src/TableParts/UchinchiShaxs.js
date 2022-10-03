import React,{useState} from 'react'
import { Input } from '@nextui-org/react';
import Select from 'react-select';
import { useForm } from "react-hook-form";
import https from '../assets/https';

// Icons
import { AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import Swal from 'sweetalert2';
// Styles
import './Transport/Transport.css';


function UchinchiShaxs({orderId}) {

    // const [resetWarning, setResetWarning] = useState('warning_reset_main close')

    // function openReset(e){
    //     e.preventDefault()
    //     setResetWarning('warning_reset_main open')
    // }
    // function closeReset(e){
    //     e.preventDefault()
    //     setResetWarning('warning_reset_main close')
    // }

    function Success() {
        Swal.fire({
            title: "Ta'minot qo'shildi",
            icon: 'success',
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
    const [optionSelected, setOptionSelected] = useState(options[0]) 
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

    // UseForm
    const { register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();

    const onSubmit = (data) =>{
        let newData ={...data, doc_type:optionSelected?.label}
        let info = {
            order_id:orderId,
            type:'guarrantor',
            owner:newData
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
        {/* Reset Warning
        <div className={resetWarning}>
            <p>Haqiqatan ham ma'lumontlarni qayta tiklamoqchimisiz?</p>
            <div >
            <button onClick={closeReset}>Ha</button>
            <button onClick={closeReset}>Yoq</button>
            </div>
        </div> */}

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='transport_garovPart'>
                {/* <p className='additionPart_title'>Uchinchi shaxs mulki egasining ma'lumotlari</p> */}
                <div>
                    <Input 
                        label='Uchinchi mulki egasining F.I.Sh.'
                        placeholder=' Muxammadshukurov Xusniddin Fatxulla o`g`li'
                        clearable
                        width='100%'
                        color="secondary"
                        bordered 
                        className='transport_garovPart_input'
                        {...register("fio", { required: true })} 
                    />
                    <div className='transport_garovPart_selectPart'>
                        <p>Shaxsini tasdiqlovchi xujjat</p>
                        <Select
                            defaultValue={optionSelected}
                            value={optionSelected}
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
                                setOptionSelected(e)
                            }}
                            // {...register("doc_type", { required: true })}
                        />
                    </div>
                    <Input 
                        label='Seriyasi va raqami'
                        placeholder='AA 87654321'
                        clearable
                        width='100%'
                        color="secondary"
                        bordered 
                        className='transport_garovPart_input' 
                        {...register("serial_num", { required: true })}
                    />
                    <Input 
                        label='Kim tomonidan berilgan'
                        clearable
                        placeholder='Toshkent viloyati Bo`ka tumani Mudofa '
                        width='100%'
                        color="secondary"
                        bordered 
                        className='transport_garovPart_input' 
                        {...register("issued_by", { required: true })}
                    />
                    <Input 
                        label='Berilgan sana'
                        type='date'
                        width='100%'
                        color="secondary"
                        bordered 
                        className='transport_garovPart_input' 
                        {...register("issue_date", { required: true })}
                    />
                    <Input 
                        label='Telefon Raqami'
                        type='number'
                        width='100%'
                        color="secondary"
                        bordered 
                        labelLeft='+998'
                        placeholder='991235678'
                        className='transport_garovPart_input' 
                        {...register("phone", { required: true })}
                    />
                    <Input 
                        label="Ro'yxat bo'yicha yashash manzili"
                        clearable
                        placeholder='Toshkent viloyati Bo`ka tumani Y.Xojimetov fu O`zbekiston ko`chasi 92 uy'
                        width='100%'
                        color="secondary"
                        bordered 
                        className='transport_garovPart_input'
                        {...register("address", { required: true })} 
                    />
                    <Input 
                        label='Identifikatsiya raqami (JShShIR)'
                        placeholder='123456789'
                        type='number'
                        clearable
                        width='100%'
                        color="secondary"
                        bordered 
                        className='transport_garovPart_input' 
                        {...register("pinfl", { required: true,  minLength: 14 })}
                    />  
                </div>
            </div>
            <div className='submit-buttons'>
                <button type='button' className='client_submit reset'>
                    Formani tiklash
                    <AiOutlineClear/>
                </button>
                <button type='submit' className='client_submit submit'>
                    Ta'minotni qo'shish
                    <AiOutlineUserAdd/>
                </button>
            </div>
        </form>
    </>
  )
}

export default UchinchiShaxs