import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineRollback, AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import { Input } from '@nextui-org/react'
import https from '../../assets/https'

// Alert
import Swal from 'sweetalert2'


function EditFilial() {

    let { id } = useParams()
    const [filial, setFilial] = useState({})
    const [backFilial, setBackFilial] = useState({})


    // Alert
    function Success() {
        Swal.fire({
            title: "Filial o'zgartirildi",
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
            .get(`/branches/${id}`)
            .then(res => {
                setFilial(res.data.data)
                setBackFilial(res.data.data)
                Success()
            })
            .catch(err => {
                Warn()
            })
    }, []);

    // Edit
    function Edit() {
        https
            .put(`/branches/${id}`, filial)
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
        setFilial(backFilial)
    }

    return (
        <section>
            <div className='filialform_header'>
                <Link to='/filials' className='clientform_back'>
                    <AiOutlineRollback />
                    Orqaga
                </Link>
            </div>
            <div className='FilialEditTable single_buyurtma'>
                <h1 className='text_center filial_edit_text'>{filial?.name}</h1>
                <Input
                    width='100%'
                    bordered
                    label="Nomi"
                    value={filial?.name}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newfilial = { ...filial }
                        newfilial.name = e.target.value
                        setFilial(newfilial)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Qisqa nomi"
                    value={filial?.short_name}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newfilial = { ...filial }
                        newfilial.short_name = e.target.value
                        setFilial(newfilial)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Shartnama"
                    value={filial?.contract}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newfilial = { ...filial }
                        newfilial.contract = e.target.value
                        setFilial(newfilial)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Qo'mita"
                    value={filial?.committee}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newfilial = { ...filial }
                        newfilial.committee = e.target.value
                        setFilial(newfilial)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Manzil"
                    value={filial?.address}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newfilial = { ...filial }
                        newfilial.address = e.target.value
                        setFilial(newfilial)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Bank rekvizitlari"
                    value={filial?.requisite}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newfilial = { ...filial }
                        newfilial.requisite = e.target.value
                        setFilial(newfilial)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="ITN"
                    value={filial?.itn}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newfilial = { ...filial }
                        newfilial.itn = e.target.value
                        setFilial(newfilial)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Telefon raqami"
                    labelLeft='+998'
                    value={filial?.phone}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newfilial = { ...filial }
                        newfilial.phone = e.target.value
                        setFilial(newfilial)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Shahar"
                    value={filial?.city}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newfilial = { ...filial }
                        newfilial.city = e.target.value
                        setFilial(newfilial)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Sudi"
                    value={filial?.judge}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newfilial = { ...filial }
                        newfilial.judge = e.target.value
                        setFilial(newfilial)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Kredit limiti"
                    value={filial?.limit_credit}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newfilial = { ...filial }
                        newfilial.limit_credit = e.target.value
                        setFilial(newfilial)
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

export default EditFilial