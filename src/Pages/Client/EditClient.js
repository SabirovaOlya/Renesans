import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineRollback, AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import { Input, Radio } from '@nextui-org/react'
import https from '../../assets/https'
import Select from 'react-select';

// Alert
import Swal from 'sweetalert2'

// Styles
import '../KL1/KL1.css'
import './Client.css'
import '../../assets/datepicker.css'


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
            title: "Xato",
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
    // Countries select
    const [countries, setCountries] = useState([])
    const GetCountries = async () => {
        await https
            .get('/countries')
            .then(res => {
                let array = []
                res?.data?.map(item => {
                    array.push({
                        value: item?.num_code,
                        label: item?.nationality
                    })
                })
                setCountries(array)
            })
    }
    // Shahar Select
    const [regions, setRegions] = useState([])
    const GetRegions = async () => {
        await https
            .get('/regions')
            .then(res => {
                let array = []
                res?.data?.map((item, index) => {
                    array.push({
                        value: index,
                        label: item?.name_uz
                    })
                })
                setRegions(array)
            })
    }
    // Tumon Select
    const [districts, setDistricts] = useState([])
    const GetDistracts = async () => {
        await https
            .get('/districts')
            .then(res => {
                let array = []
                res?.data?.map((item, index) => {
                    array.push({
                        value: index,
                        label: item?.name_uz
                    })
                })
                setDistricts(array)
            })
    }

    useEffect(() => {
        GetCountries()
        GetRegions()
        GetDistracts()
    }, [])

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
    }, [])

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
                <div className='clientForm_selector'>
                    <p>Shahar</p>
                    <Select
                        defaultValue={regions?.find(x => x.label == client?.city)}
                        value={regions?.find(x => x.label == client?.city)}
                        options={regions}
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
                            let newClient = { ...client }
                            newClient.city = event.label
                            setClient(newClient)
                        }}
                    />
                </div>
                <div className='clientForm_selector'>
                    <p>Tuman</p>
                    <Select
                        defaultValue={districts?.find(x => x.label == client?.district)}
                        value={districts?.find(x => x.label == client?.district)}
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
                            let newClient = { ...client }
                            newClient.district = event.label
                            setClient(newClient)
                        }}
                    />
                </div>
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
                {
                    client?.gender ? (
                        <Radio.Group orientation="horizontal" label="Jinsi:" defaultValue={client?.gender} className='radio_group'
                            onChange={(e) => {
                                let newClient = { ...client }
                                newClient.gender = e
                                setClient(newClient)
                            }}
                        >
                            <Radio value="male" color="secondary" size="sm">
                                Erkak
                            </Radio>
                            <Radio value="female" color="secondary" size="sm" className='radio_second'>
                                Ayol
                            </Radio>
                        </Radio.Group>
                    ) : <></>
                }
                <div className='clientForm_selector'>
                    <p>Fuqarolik</p>
                    <Select
                        defaultValue={countries?.find(x => x.label == client?.citizenship)}
                        value={countries?.find(x => x.label == client?.citizenship)}
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
                            let newClient = { ...client }
                            newClient.citizenship = event.label
                            setClient(newClient)
                        }}
                    />
                </div>
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
                        if (e.target.value.trim().length < 15) {
                            let newClient = { ...client }
                            newClient.pinfl = e.target.value
                            setClient(newClient)
                        }
                    }}
                />
                {
                    client?.phone?.map((item, index) => {
                        return (
                            <div className='kl1_product' key={index}>
                                <Input
                                    width='93%'
                                    clearable
                                    label={`Telefon raqami (${index + 1})`}
                                    bordered
                                    className='vall'
                                    color="secondary"
                                    required
                                    value={item}
                                    onChange={(e) => {
                                        let array = { ...client }
                                        array.phone[index] = e.target.value
                                        setClient(array)
                                    }}
                                />
                                <button
                                    className='kl1_delete_button'
                                    type='button'
                                    onClick={() => {
                                        let newInfo = { ...client }
                                        if (newInfo.phone.length > 1) {
                                            newInfo.phone = newInfo?.phone?.filter(x => x !== newInfo.phone[index])
                                        }
                                        setClient(newInfo)
                                    }}
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
                        onClick={() => {
                            let newNumber = ['']
                            let newInfo = { ...client }
                            newInfo.phone = newInfo.phone.concat(newNumber)
                            setClient(newInfo)
                        }}
                    >
                        Telefon raqam qo'shish
                    </button>
                </div>
                <div className='clientForm_selector'>
                    <p>Shaxsini tasdiqlovchi hujjat</p>
                    <Select
                        defaultValue={sectionOptions?.find(x => x.label == client?.doc_type)}
                        value={sectionOptions?.find(x => x.label == client?.doc_type)}
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
                            let newInfo = { ...client }
                            newInfo.doc_type = event.label
                            setClient(newInfo)
                        }}
                    />
                </div>
                <Input
                    width='100%'
                    bordered
                    label="Hujjat seriya raqami"
                    value={client?.serial_num}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newClient = { ...client }
                        newClient.serial_num = e.target.value.toUpperCase()
                        setClient(newClient)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Kim tomondan berildi"
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
                    label="Hujjat berilgan sana"
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
                    label="Hujjat tugash sana"
                    type='date'
                    value={client?.doc_end}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newClient = { ...client }
                        newClient.doc_end = e.target.value
                        setClient(newClient)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Ish lavozmi"
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