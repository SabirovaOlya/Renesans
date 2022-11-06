import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineRollback, AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import { Input, Checkbox, Radio, Textarea } from '@nextui-org/react'
import https from '../../assets/https'
import Select from 'react-select';

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
            title: "Error",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }

    // Select Function
    async function fetchSection() {
        const ress = await https.get('/products')
        let selectSection = []
        ress?.data?.data?.map((item)=>{
            selectSection.push(
                { value: item?.id, label: item?.name }
            )
        })
        setSectionOptions(selectSection)
    }

    useEffect(() => {
        fetchSection()
    }, [])
    

    useEffect(() => {
        https
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
    }, []);

    function RadioButton(){
        if(status){
            return(
                <Radio.Group
                    label=' '
                    defaultValue={status == 'pending' ? true : false}
                    onChange={(e) => {
                        if(e){
                            let newOrder = {...order}
                            newOrder.status = 'pending'
                            setOrder(newOrder)
                            setStatus('pending')
                        }else{
                            let newOrder = {...order}
                            newOrder.status = 'denied'
                            setOrder(newOrder)
                            setStatus('denied')
                        }
                    }}
                    size='sm'
                    className='kl1_accepting_radio buyurtma_radio'
                >
                    <div className='kl1_accept'><Radio color='success' className='radio_end' value={true}>Tasdiqlash</Radio></div>
                    <div className='kl1_accept'><Radio color='error' className='radio_end' value={false}>Rad etish</Radio></div>
                </Radio.Group>
            )
        }else{
            return(<></>)
        }
    }

    function CheckboxFun(){
        if(status){
            return(
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

    function SelectElement(){
        if(sectionOptions){
            return(
                <>
                    <p>Mahsulot</p>
                    <Select
                        defaultValue={sectionOptions.find(x => x.value == order?.product?.id)}
                        value={sectionOptions.find(x => x.value == order?.product?.id)}
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
                </>
            )
        }
    }

    // Edit
    function Edit() {
        let data = {
            client_id : order?.client?.id,
            order_date : order?.order_date,
            sign_committee : order?.sign_committee,
            sum : order?.sum,
            time : order?.time,
            aim : order?.aim,
            salary : order?.salary,
            code : order?.code,
            product_id : order?.product?.id,
            status : order?.status,
            order_number:order?.order_number,
            protocol_number:order?.protocol_number
        }
        if(order.status == 'denied'){
            data = {...data, reason: order?.reason}
        }
        https
            .put(`/orders/${id}`, data)
            .then(res => {
                if (res.request.status === 200) {
                    Success()
                };
            })
            .catch(err => {
                console.log(err);
                Warn()
            })
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

    return (
        <section>
            <div className='filialform_header'>
                <Link to='/buyurtma' className='clientform_back'>
                    <AiOutlineRollback />
                    Orqaga
                </Link>
            </div>
            <div className='FilialEditTable single_buyurtma'>
                <h1 className='text_center filial_edit_text'>{client?.name}</h1>
                <div className='shart-check margin_top_20'>
                    {
                        CheckboxFun()
                    }
                </div>
                <Input
                    width='100%'
                    bordered
                    label="Buyurtma Code"
                    value={order?.code}
                    placeholder='filial'
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
                    placeholder='filial'
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
                    placeholder='filial'
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
                        SelectElement()
                    }
                </div>
                <Input
                    width='100%'
                    bordered
                    label="Maqsadi"
                    value={order?.aim}
                    placeholder='filial'
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
                    placeholder='filial'
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
                    color="secondary"
                    onChange={(e) => {
                        let newOrder = { ...order }
                        newOrder.protocol_number = e.target.value
                        setOrder(newOrder)
                    }}
                />
                {
                    RadioButton()
                }
                {
                    putTextArea()
                }
                <div className='xodim_buttons'>
                    <button type='reset' className='client_submit reset back_red' onClick={() => { BackFun() }}>
                        O'zgarishni bekor qilish
                        <AiOutlineClear />
                    </button>
                    <button type='submit' className='client_submit submit back_green' onClick={() => { Edit() }}>
                        O'zgarishni kiritish
                        <AiOutlineUserAdd />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default EditBuyurtma