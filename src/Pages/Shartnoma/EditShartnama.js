import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineRollback, AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import { Input, Radio } from '@nextui-org/react'
import https from '../../assets/https'

// Alert
import Swal from 'sweetalert2'


function EditShartnama() {

    let { id } = useParams()
    const [shartnama, setShartnama] = useState({})
    const [backShartnama, setBackShartnama] = useState({})
    const [cash, setCash] = useState()
    const [type, setType] = useState()
    const [newData, setNewData] = useState({})
    const [loading, setLoading] = useState(true)


    // Alert
    function Success() {
        Swal.fire({
            title: "Shartnama o'zgartirildi",
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
    function checkingData(info) {
        if (cash === "card") {
            return ({ ...info, ...newData, type_repayment: type })
        } else {
            return ({ ...info, type_repayment: type })
        }
    }

    useEffect(() => {
        https
            .get(`/contracts/${id}`)
            .then(res => {
                const { client, order, ...newRes } = res.data.data
                setShartnama({ ...newRes, order_id: res.data.data.order.id })
                setBackShartnama({ ...newRes, order_id: res.data.data.order.id })
                // console.log(res.data.data.order.client.name)
                Success()
                setCash(res.data.type_credit)
                setType(res.data.type_repayment)
                setLoading(false)
            })
            .catch(err => {
                Warn()
            })
    }, []);

    // Edit
    function Edit() {
        console.log(shartnama)
        https
            .patch(`/contracts/${id}`, checkingData(shartnama))
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
        setShartnama(backShartnama)
    }

    function cashInputAppearence() {
        if (cash === "card") {
            return (
                <>
                    <Input
                        className='vall'
                        width='100%'
                        clearable
                        type='number'
                        label="SSKS / Hisobraqam"
                        value={shartnama?.ssks}
                        bordered
                        color="secondary"
                        onChange={(event) => {
                            setNewData({ ...newData, ssks: event.target.value })
                        }}
                    />
                    <Input
                        className='vall'
                        width='100%'
                        clearable
                        type='number'
                        label="Bank nomi"
                        value={shartnama?.bank_name}
                        bordered
                        color="secondary"
                        onChange={(event) => {
                            setNewData({ ...newData, bank_name: event.target.value })
                        }}
                    />
                    <Input
                        className='vall'
                        width='100%'
                        clearable
                        type='number'
                        label="Bank MFOsi"
                        value={shartnama?.bank_code}
                        bordered
                        color="secondary"
                        onChange={(event) => {
                            setNewData({ ...newData, bank_code: event.target.value })
                        }}
                    />
                </>
            )
        } else {
            return (
                <></>
            )
        }
    }

    function returnData () {
        if (!loading) {
            return (
                <section>
                    <div className='filialform_header'>
                        <Link to='/shartnama' className='clientform_back'>
                            <AiOutlineRollback />
                            Orqaga
                        </Link>
                    </div>
                    <div className='FilialEditTable single_buyurtma'>
                        <h1 className='text_center filial_edit_text'>{shartnama?.order?.client?.name}</h1>
                        <div className='shart-selector'>
                            <p>Kredit ajratish tartibi</p>
                            <div className='margin_top_10'>
                                <Radio.Group
                                    orientation="horizontal"
                                    size='sm'
                                    defaultValue={cash}
                                    onChange={(e) => {
                                        let newShartnama = { ...shartnama }
                                        newShartnama.type_credit = e
                                        setShartnama(newShartnama)
                                        setCash(e)
                                    }}
                                >
                                    <Radio orientation="horizontal" value={"card"}>Plastik karta / Hisobraqam</Radio>
                                    <Radio orientation="horizontal" value={"cash"}>Naqd pul ko'rinishida</Radio>
                                </Radio.Group>
                            </div>
                        </div>
                        <Input
                            className='vall'
                            width='100%'
                            clearable
                            type='number'
                            label="Buyurtma Code"
                            value={shartnama?.order_id}
                            bordered
                            color="secondary"
                            onChange={(e) => {
                                let newShartnama = { ...shartnama }
                                newShartnama.order_id = e.target.value
                                setShartnama(newShartnama)
                            }}
                        />
                        <Input
                            className='vall'
                            width='100%'
                            clearable
                            type='number'
                            label="Ustama foiz stavkasi, yillik"
                            value={shartnama?.percent_year}
                            bordered
                            color="secondary"
                            onChange={(e) => {
                                let newShartnama = { ...shartnama }
                                newShartnama.percent_year = e.target.value
                                setShartnama(newShartnama)
                            }}
                        />
                        <Input
                            className='vall'
                            width='100%'
                            clearable
                            type='number'
                            label="Penya, kunlik"
                            value={shartnama?.daily_fine}
                            bordered
                            color="secondary"
                            onChange={(e) => {
                                let newShartnama = { ...shartnama }
                                newShartnama.daily_fine = e.target.value
                                setShartnama(newShartnama)
                            }}
                        />
                        <Input
                            className='vall'
                            width='100%'
                            clearable
                            type='number'
                            label="Oylik komission yig'im, %da"
                            value={shartnama?.monthly_commission}
                            bordered
                            color="secondary"
                            onChange={(e) => {
                                let newShartnama = { ...shartnama }
                                newShartnama.monthly_commission = e.target.value
                                setShartnama(newShartnama)
                            }}
                        />
                        <div className='shart-selector'>
                            <p>So'ndirish tartibi</p>
                            <div className='margin_top_10'>
                                <Radio.Group
                                    size='sm'
                                    defaultValue={type}
                                    className='shart-selector-group'
                                    onChange={(event) => {
                                        let newShartnama = { ...shartnama }
                                        newShartnama.type_repayment = event
                                        setShartnama(newShartnama)
                                        setType(event)
                                    }}
                                >
                                    <Radio value={1}>Bir qil miqdor(Annuitet)</Radio>
                                    <Radio value={2}>Kamayib boruvshi(differensial)</Radio>
                                </Radio.Group>
                            </div>
                        </div>
                        <Input
                            className='vall'
                            width='100%'
                            clearable
                            type='date'
                            label="Mikroqarz berish sanasi"
                            value={shartnama?.credit_issue_date}
                            bordered
                            color="secondary"
                            onChange={(e) => {
                                let newShartnama = { ...shartnama }
                                newShartnama.credit_issue_date = e.target.value
                                setShartnama(newShartnama)
                            }}
                        />
                        <Input
                            className='vall'
                            width='100%'
                            clearable
                            type='date'
                            label="Birinchi tolov sonasi"
                            value={shartnama?.first_repayment_date}
                            bordered
                            color="secondary"
                            onChange={(e) => {
                                let newShartnama = { ...shartnama }
                                newShartnama.first_repayment_date = e.target.value
                                setShartnama(newShartnama)
                            }}
                        />
                        <Input
                            className='vall'
                            width='100%'
                            clearable
                            type='date'
                            label="Shartnoma sanasi"
                            value={shartnama?.contract_issue_date}
                            bordered
                            color="secondary"
                            onChange={(e) => {
                                let newShartnama = { ...shartnama }
                                newShartnama.contract_issue_date = e.target.value
                                setShartnama(newShartnama)
                            }}
                        />
                        <Input
                            className='vall'
                            width='100%'
                            clearable
                            type='number'
                            label="Shartnoma raqami"
                            value={shartnama?.contract_num}
                            bordered
                            color="secondary"
                            onChange={(e) => {
                                let newShartnama = { ...shartnama }
                                newShartnama.contract_num = e.target.value
                                setShartnama(newShartnama)
                            }}
                        />
                        {
                            cashInputAppearence()
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
        } else {
            return (<></>)
        }
    }
    return(<>{returnData()}</>)
}

export default EditShartnama