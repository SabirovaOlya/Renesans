import React, { useState } from 'react'
import { Input, Checkbox, Radio, Textarea } from '@nextui-org/react'
import { AiOutlineRollback } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { AiOutlineFileAdd, AiOutlineClear } from 'react-icons/ai';
import Select from 'react-select';
import Swal from 'sweetalert2';
// import { Select } from 'antd';

// import 'antd/dist/antd.css';
import https from '../../assets/https'
import './Buyurtma.css'
// const { Option } = Select;

// UseForm
import { useForm } from "react-hook-form";


function BuyurtmaForm() {
    // Permission State
    const [permission, setPermission] = useState(false)
    const [status, setStatus] = useState("accepted")
    const [reason, setReason] = useState([])
    // Sending Data to API
    const { register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();
    // Alerts
    function Success() {
        Swal.fire({
            title: "Buyurtma qoshildi",
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
    const onSubmit = (data) => {
        if (status === "accepted") {
            submitData({ ...data, product_id: variant, sign_committee: permission, status: status })
        } else {
            submitData({ ...data, product_id: variant, sign_committee: permission, status: status, reason: reason })
        }
        function submitData(newData){
            https
            .post('orders', newData)
            .then(res => Success())
            .catch(err => Warn())
        }
    }
    // const [ money, setMoney ] = useState(0);

    // Number Spacing
    // function NumberSpace(value){
    //     return value.toLocaleString()
    //     console.log(value)
    // }

    const [resetWarning, setResetWarning] = useState('warning_reset_main close')

    function openReset(e) {
        e.preventDefault()
        setResetWarning('warning_reset_main open')
    }
    function closeReset(e) {
        e.preventDefault()
        setResetWarning('warning_reset_main close')
    }

    // Selector
    const options = [
        { value: "1", label: 'variant 1' },
        { value: "2", label: 'variant 2' },
        { value: "3", label: 'variant 3' },
        { value: "4", label: 'variant 4' },
        { value: "5", label: 'variant 5' },
        { value: "6", label: 'variant 6' }
    ];
    const [variant, setVariant] = useState(options[0].value)
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

    const [salary, setSalary] = useState()

    function putTextArea() {
        if (status === "denied") {
            return (
                <div className='buyurtma_textarea'>
                    <Textarea
                        width='100%'
                        bordered
                        rounded
                        color="secondary"
                        className='kl1_input'
                        placeholder='Rad Etilgan Sabab'
                        label='Sabab'
                        onChange={(e) => setReason(e.target.value.split(' '))}
                    />
                </div>
            )
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

            <Link to='/buyurtma' className='clientform_back back-back'>
                <AiOutlineRollback />
                Orqaga
            </Link>
            <div className='shart_nama'>
                <form className='buyurtma_form_main' onSubmit={handleSubmit(onSubmit)}>
                    <p className='buyurtma_form_main_title'></p>
                    <div className='buyurtma_form_main_forma'>
                        <Input
                            className='buyurtma_form_inputs'
                            width='100%'
                            label="Client Nomer"
                            bordered
                            color="secondary"
                            type='number'
                            {...register("client_id", { required: true })}
                        />
                        <Input
                            className='buyurtma_form_inputs'
                            width='100%'
                            label="Code"
                            bordered
                            color="secondary"
                            type='number'
                            {...register("code", { required: true })}
                        />
                        <Input
                            className='buyurtma_form_inputs'
                            width='100%'
                            label="Buyurtma sanasi"
                            bordered
                            color="secondary"
                            type='date'
                            {...register("order_date", { required: true })}
                        />
                        <Input
                            className='buyurtma_form_inputs'
                            width='100%'
                            clearable
                            label="So'ralayotgan qarz miqdor"
                            placeholder="20 000 000 som"
                            type='number'
                            bordered
                            color="secondary"
                            {...register("sum", { required: true })}
                        // value={money}
                        // onInput={(event)=>setMoney(event.target.value.replace(/(?:(^\d{1,3})(?=(?:\d{3})*$)|(\d{3}))(?!$)/mg, '$1$2.'))}
                        />
                        {/* <Input
                        className='buyurtma_form_inputs'
                        width='100%'
                        clearable
                        label="Qarz miqdori, yozuvda"
                        placeholder="Yigirma million som 00 tiyin"
                        bordered
                        color="secondary"
                    /> */}
                        <div className='shart-check'>
                            <Checkbox
                                value="Kredit Qo'mitasi qorariga asosan"
                                size='sm'
                                color="secondary"
                                onChange={(event) => setPermission(event)}
                            >
                                Kredit Qo'mitasi qorariga asosan
                            </Checkbox>
                        </div>
                        <Input
                            className='buyurtma_form_inputs'
                            width='100%'
                            clearable
                            label="So'ralayotgan muddat"
                            placeholder="4 oy"
                            bordered
                            color="secondary"
                            {...register("time", { required: true })}
                        />
                        <div className='shart-select'>
                            <p>Mahsulot</p>
                            <Select
                                // value={selectedOption}
                                defaultValue={options[0]}
                                // styles={customStyles}
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
                                onChange={(event) => setVariant(event.value)}
                            />
                        </div>
                        <input hidden value={variant} {...register("variant", { required: true })} />
                        <Input
                            className='buyurtma_form_inputs'
                            width='100%'
                            clearable
                            label="Maqsadi"
                            placeholder="shirinlik mahsulotlari savdosi"
                            bordered
                            color="secondary"
                            {...register("aim", { required: true })}
                        />
                        <Input
                            className='buyurtma_form_inputs'
                            width='100%'
                            clearable
                            label="Oylik o'rtacha daromad"
                            placeholder="4 800 000 som"
                            type='number'
                            bordered
                            color="secondary"
                            {...register("salary", { required: true })}
                        />
                        <Radio.Group label=' ' defaultValue={"accepted"} onChange={(e) => setStatus(e)} size='sm' className='kl1_accepting_radio buyurtma_radio'>
                            <div className='kl1_accept'><Radio color='success' className='radio_end' value={"accepted"}>Tasdiqlash</Radio></div>
                            <div className='kl1_accept'><Radio color='error' className='radio_end' value={"denied"}>Rad etish</Radio></div>
                        </Radio.Group>
                        {
                            putTextArea()
                        }
                    </div>
                    <div className='submit-buttons'>
                        <button className='client_submit reset' onClick={openReset}>
                            Formani tiklash
                            <AiOutlineClear />
                        </button>
                        <button type='submit' className='client_submit submit'>
                            Buyurtmani qo'shish
                            <AiOutlineFileAdd />
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default BuyurtmaForm