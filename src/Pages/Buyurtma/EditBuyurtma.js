import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineRollback, AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import { Input, Checkbox, Radio, Textarea } from '@nextui-org/react'
import https from '../../assets/https'
import Select from 'react-select';
// UseForm
import { useForm } from "react-hook-form";

// Alert
import Swal from 'sweetalert2'


function EditBuyurtma() {

    let { id } = useParams()
    const [order, setOrder] = useState({})
    const [backOrder, setBackOrder] = useState({})
    const [status, setStatus] = useState("")
    const [checked, setChecked] = useState(Boolean)
    const [client, setClient] = useState({})
    const [sectionOptions, setSectionOptions] = useState([])
    const [voiceCommit, setVoiceCommit] = useState('')
    const [have, setHave] = useState(true)
    let userName = window.localStorage.getItem('name')
    let role = JSON.parse(window.localStorage.getItem('role'))

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

    // Sending Data to API
    const { register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();

    // Alert
    function Success() {
        Swal.fire({
            title: "Buyurtma o'zgartirildi",
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
    function WarnCommit() {
        Swal.fire({
            title: "Izoh yozing",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }

    function dataSort(data) {
        if (data === "accepted") {
            return "tasdiqlangan"
        } else if (data === "denied") {
            return "rad etilgan"
        }else if(data === 'pending'){
            return "kutilmoqda"
        }else{
            return 'unknown'
        }
    }

    async function GetData(){
        await https
        .get(`/orders/${id}`)
        .then(res => {
            setOrder(res?.data)
            setClient(res?.data?.client)
            setBackOrder(res?.data)
            setStatus(res?.data?.status)
            setChecked(res?.data?.sign_committee)
        })
        .catch(err => {
            console.log(err);
        })
    }

    // Select Function
    async function fetchSection() {
        const ress = await https.get('/products')
        let selectSection = []
        ress?.data?.data?.map((item) => {
            selectSection.push(
                { value: item?.id, label: item?.name }
            )
        })
        setSectionOptions(selectSection)
    }

    useEffect(() => {
        fetchSection()
        GetData()
    }, [])

    function RadioButton() {
        if (status) {
            return (
                <Radio.Group
                    label=' '
                    defaultValue={status}
                    onChange={(e) => {
                        setStatus(e)
                    }
                    }
                    size='sm'
                    className='kl1_accepting_radio buyurtma_radio'
                >
                    <div className='kl1_accept'><Radio color='success' className='radio_end' value={'accepted'}>Tasdiqlash</Radio></div>
                    <div className='kl1_accept'><Radio color='error' className='radio_end' value={'denied'}>Rad etish</Radio></div>
                    {/* <div className='kl1_accept'><Radio color='warning' className='radio_end' value={'pending'}>Kutilmoqda</Radio></div> */}
                </Radio.Group>
            )
        } else {
            return (<></>)
        }
    }

    function CheckboxFun() {
        if (status) {
            return (
                <Checkbox
                    value="Kredit Qo'mitasi qorariga asosan"
                    size='sm'
                    defaultSelected={checked}
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newOrder = { ...order }
                        newOrder.sign_committee = e
                        setOrder(newOrder)
                        setChecked(e)
                    }}
                >
                    Kredit Qo'mitasi qorariga asosan
                </Checkbox>
            )
        }
    }

    // Back
    function BackFun() {
        setOrder(backOrder)
    }
    function putTextArea() {
        if (status === "denied") {
            return (
                <div className='buyurtma_textarea'>
                    <Textarea
                        width='100%'
                        bordered
                        rounded
                        defaultValue={''}
                        color="secondary"
                        className='kl1_input'
                        placeholder='Rad Etilgan Sabab'
                        value={(order?.reason)}
                        label='Sabab'
                        onChange={(e) => {
                            let newOrder = { ...order }
                            newOrder.reason = e.target.value
                            setOrder(newOrder)
                        }}
                    />
                </div>
            )
        }
    }

    // Opening Form
    const [addForm, setAddForm] = useState('add_mahsulot_main close')

    function openForm() {
        setAddForm('add_mahsulot_main open')
    }
    function closeForm() {
        setAddForm('add_mahsulot_main close')
    }

    const onSubmitVoice = (stat) =>{
        let info = {
            comment:voiceCommit, 
            order_id: order?.id, 
            is_accepted:stat
        } 
        if(info?.comment){
            https
            .post(`/order-results`, info)
            .then(res =>{
                console.log(info)
                closeForm()
                GetData()
            })
            .catch(err =>{
                console.log(err)
                console.log(info)
            })
        }else{
            return(WarnCommit())
        }
    }

    const onSubmit = (data) => {
        let info = {
            client_id: order?.client?.id,
            order_date: order?.order_date,
            sign_committee: order?.sign_committee,
            sum: order?.sum,
            time: order?.time,
            aim: order?.aim,
            salary: order?.salary,
            code: order?.code,
            product_id: order?.product?.id,
            status: order?.status,
            order_number: order?.order_number ? order?.order_number : null,
            protocol_number: order?.protocol_number ?  order?.protocol_number : null
        }
        if (order?.status == 'denied') {
            info = { ...info, reason: order?.reason }
        }
        https
            .put(`/orders/${id}`, info)
            .then(res => {
                Success()
                console.log(info);
            })
            .catch(err => {
                console.log(err);
                Warn()
                console.log(info);
            })
    }

    return (
        <>
            {/* Modal */}
            <div className={addForm}>
                <div className='endRow'>
                    <button onClick={()=>{closeForm()}} className='close_icon'><i className='bx bx-x'></i></button>
                </div>
                <p>Ovoz berish</p>
                <Textarea
                    rounded
                    bordered
                    placeholder="..."
                    color="secondary"
                    width='100%'
                    label="Izoh"
                    value={voiceCommit}
                    onChange={(e)=>{
                        setVoiceCommit(e.target.value)
                    }}
                />
                <div className='add_mahsulot_buttons'>
                    <button onClick={()=>{onSubmitVoice(false)}} type='button'>Rad etish</button>
                    <button onClick={()=>{onSubmitVoice(true)}} type='button'>Tasdiqlash</button>
                </div>
            </div>

            <section>
                <div className='filialform_header'>
                    <Link to='/buyurtma' className='clientform_back'>
                        <AiOutlineRollback />
                        Orqaga
                    </Link>
                </div>
                <form className='FilialEditTable single_buyurtma' onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='text_center filial_edit_text'>{client?.name}</h1>
                    <div className='shart-check margin_top_20'>
                        {
                            CheckboxFun()
                        }
                    </div>
                    <Input
                        width='100%'
                        bordered
                        label="Status"
                        readOnly
                        value={dataSort(order?.status)}
                        className='filial_input'
                        color="secondary"
                    />
                    <Input
                        width='100%'
                        bordered
                        label="Buyurtma kodi"
                        value={order?.code}
                        className='filial_input'
                        color="secondary"
                        onChange={(e) => {
                            let newOrder = { ...order }
                            newOrder.code = e.target.value
                            setOrder(newOrder)
                        }}
                    />
                    <Input
                        width='100%'
                        bordered
                        label="Buyurtma sanasi"
                        value={order?.order_date}
                        className='filial_input'
                        color="secondary"
                        onChange={(e) => {
                            let newOrder = { ...order }
                            newOrder.order_date = e.target.value
                            setOrder(newOrder)
                        }}
                    />
                    <Input
                        width='100%'
                        bordered
                        label="So'ralayotgan qarz miqdor"
                        value={order?.sum}
                        className='filial_input'
                        color="secondary"
                        onChange={(e) => {
                            let newOrder = { ...order }
                            newOrder.sum = e.target.value
                            setOrder(newOrder)
                        }}
                    />
                    <div className='shart-select'>
                        {
                            sectionOptions ?
                            <>
                                <p>Mahsulot</p>
                                <Select
                                    defaultValue={sectionOptions.find(x => x.value === order?.product?.id)}
                                    value={sectionOptions.find(x => x.value === order?.product?.id)}
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
                                    onChange={(e) => {
                                        let newOrder = { ...order }
                                        newOrder.product.id = e.value
                                        setOrder(newOrder)
                                    }}
                                />
                            </> : <></>
                        }
                    </div>
                    <Input
                        className='filial_input'
                        width='100%'
                        label="So'ralayotgan muddat (oy)"
                        value={order?.time}
                        bordered
                        color="secondary"
                        type='number'
                        onChange={(e) => {
                            let newOrder = { ...order }
                            newOrder.time = e.target.value
                            setOrder(newOrder)
                        }}
                    />
                    <Input
                        width='100%'
                        bordered
                        label="Maqsadi"
                        value={order?.aim}
                        className='filial_input'
                        color="secondary"
                        onChange={(e) => {
                            let newOrder = { ...order }
                            newOrder.aim = e.target.value
                            setOrder(newOrder)
                        }}
                    />
                    <Input
                        width='100%'
                        bordered
                        label="Oylik o'rtacha daromad"
                        value={order?.salary}

                        className='filial_input'
                        color="secondary"
                        onChange={(e) => {
                            let newOrder = { ...order }
                            newOrder.salary = e.target.value
                            setOrder(newOrder)
                        }}
                    />
                    <Input
                        width='100%'
                        bordered
                        label="Buyurtma raqami"
                        value={order?.order_number}
                        {...register("order_number", { required: false })}
                        className='filial_input'
                        color="secondary"
                        onChange={(e) => {
                            let newOrder = { ...order }
                            newOrder.order_number = e.target.value
                            setOrder(newOrder)
                        }}
                    />
                    <Input
                        width='100%'
                        bordered
                        label="Buyurtma protokol raqami"
                        className='filial_input'
                        value={order?.protocol_number}
                        color="secondary"
                        {...register("protocol_number", { required: false })}
                        onChange={(e) => {
                            let newOrder = { ...order }
                            newOrder.protocol_number = e.target.value
                            setOrder(newOrder)
                        }}
                    />
                    {
                        role?.includes('director') ? 
                        <>
                            {
                                order?.order_results?.map((item, index) =>{
                                    if(item?.name == userName){
                                        setHave(false)
                                    }
                                    return(
                                        <Input
                                            key={index}
                                            width='100%'
                                            bordered
                                            label={`${item?.user} ${item?.is_accepted == 1 ? 'tasdiqladi' : 'rad etdi'}, izoh:`}
                                            className='filial_input'
                                            value={item?.comment}
                                            color="secondary"
                                        />
                                    )
                                })
                            }
                            {
                                order?.order_results?.find(x => x.user === userName) ?
                                <></> :
                                <div className='endRow'>
                                    <button onClick={()=>{openForm()}} className='voice_button' type='button'>Ovoz berish</button>
                                </div>
                            }
                        </> : <></>
                    }
                    <div className='xodim_buttons'>
                        <button type='reset' className='client_submit reset back_red' onClick={() => { BackFun() }}>
                            O'zgarishni bekor qilish
                            <AiOutlineClear />
                        </button>
                        <button type='submit' className='client_submit submit back_green'>
                            O'zgarishni kiritish
                            <AiOutlineUserAdd />
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default EditBuyurtma