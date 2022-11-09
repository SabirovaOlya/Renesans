import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineRollback, AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import { Input } from '@nextui-org/react'
import https from '../../assets/https'

// Alert
import Swal from 'sweetalert2'


function EditClient() {

    let { id } = useParams()
    const [client, setClient] = useState({})
    const [backClient, setBackClient] = useState({})

    // Alert
    function Success() {
        Swal.fire({
            title: "Klient o'zgartirildi",
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
            .get(`/clients/${id}`)
            .then(res => {
                setClient(res.data)
                setBackClient(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    // Edit
    function Edit() {
        https
            .put(`/clients/${id}`, client)
            .then(res => {
                if (res.request.status === 200) {
                    Success()
                };
                console.log(client);
            })
            .catch(err => {
                    Warn()
                    console.log(client);
            })
    }

    // Back
    function BackFun() {
        setClient(backClient)
    }

    return (
        <section>
            <div className='filialform_header'>
                <Link to='/client' className='clientform_back'>
                    <AiOutlineRollback />
                    Orqaga
                </Link>
            </div>
            <div className='FilialEditTable single_buyurtma'>
                <h1 className='text_center filial_edit_text'>{client?.name}</h1>
                <Input
                    width='100%'
                    bordered
                    label="F.I.SH."
                    value={client?.name}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newClient = { ...client }
                        newClient.name = e.target.value
                        setClient(newClient)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Klient kodi"
                    type='number'
                    value={client?.code}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newClient = { ...client }
                        newClient.code = e.target.value
                        setClient(newClient)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Tug'ilgan sana"
                    value={client?.birth_date}
                    type="date"
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newClient = { ...client }
                        newClient.birth_date = e.target.value
                        setClient(newClient)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Doimi manzil"
                    value={client?.address}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newClient = { ...client }
                        newClient.address = e.target.value
                        setClient(newClient)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Shahar"
                    value={client?.city}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newClient = { ...client }
                        newClient.city = e.target.value
                        setClient(newClient)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Vaqtinchalik yashash joyi"
                    value={client?.temp_address}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newClient = { ...client }
                        newClient.temp_address = e.target.value
                        setClient(newClient)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Fuqarolik"
                    value={client?.citizenship}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newClient = { ...client }
                        newClient.citizenship = e.target.value
                        setClient(newClient)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Millat"
                    value={client?.nationality}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newClient = { ...client }
                        newClient.nationality = e.target.value
                        setClient(newClient)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="PINFL"
                    value={client?.pinfl}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newClient = { ...client }
                        newClient.pinfl = e.target.value
                        setClient(newClient)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Telefon raqami"
                    value={client?.phone}
                    placeholder='filial'
                    pattern='[0-9]'
                    labelLeft='+998'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newClient = { ...client }
                        newClient.phone = e.target.value
                        setClient(newClient)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Hujjat turi"
                    value={client?.doc_type}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newClient = { ...client }
                        newClient.doc_type = e.target.value
                        setClient(newClient)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Ishlab chiqarish raqami"
                    value={client?.serial_num}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newClient = { ...client }
                        newClient.serial_num = e.target.value
                        setClient(newClient)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Kim bilan chiqarildi"
                    value={client?.issued_by}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newClient = { ...client }
                        newClient.issued_by = e.target.value
                        setClient(newClient)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Chiqarilgan sana"
                    type='date'
                    value={client?.issued_date}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newClient = { ...client }
                        newClient.issued_date = e.target.value
                        setClient(newClient)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Ish"
                    value={client?.job}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newClient = { ...client }
                        newClient.job = e.target.value
                        setClient(newClient)
                    }}
                />
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

export default EditClient