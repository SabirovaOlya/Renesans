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

    useEffect(() => {
        https
            .get(`/orders/${id}`)
            .then(res => {
                const { client, product, ...newRes } = res.data
                setOrder({ ...newRes, client_id: res.data.client.id, product_id: res.data.product[0]?.id })
                setBackOrder({ ...newRes, client_id: res.data.client.id, product_id: res.data.product[0]?.id })
                setStatus(res.data.status)
                setChecked(res.data.sign_committee)
                Success()
            })
            .catch(err => {
                Warn()
            })
    }, []);

    console.log(status)

    // Edit
    function Edit() {
        https
            .put(`/orders/${id}`, order)
            .then(res => {
                if (res.request.status === 200) {
                    Success()
                };
            })
            .catch(err => {
                console.log(err);
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
                        label='Sabab'       
                        onChange={(e) => {
                            let newOrder = { ...order }
                            newOrder.reason = e.target.value.split(' ')
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
                <h1 className='text_center filial_edit_text'>{order?.client?.name}</h1>
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
                <div className='shart-check'>
                    <Checkbox
                        value="Kredit Qo'mitasi qorariga asosan"
                        size='sm'
                        checked={checked}
                        defaultChecked={checked}
                        defaultValue={checked}
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
                </div>
                <div className='shart-select'>
                    <p>Mahsulot</p>
                    <Select
                        // value={selectedOption}
                        defaultValue={options[order?.product_id]}
                        value={options[order?.product_id]}
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
                        onChange={(e) => {
                            let newOrder = { ...order }
                            newOrder.product_id = e.value
                            setOrder(newOrder)
                        }}
                    />
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
                <Radio.Group
                    label=' '
                    defaultValue={status}
                    value={status}
                    onChange={(e) => {
                        let newOrder = { ...order }
                        newOrder.status = e
                        setOrder(newOrder)
                        setStatus(e)
                    }}
                    size='sm'
                    className='kl1_accepting_radio buyurtma_radio'
                >
                    <div className='kl1_accept'><Radio color='success' className='radio_end' value={"accepted"}>Tasdiqlash</Radio></div>
                    <div className='kl1_accept'><Radio color='error' className='radio_end' value={"denied"}>Rad etish</Radio></div>
                </Radio.Group>
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