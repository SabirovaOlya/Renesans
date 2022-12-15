import React, { useState, useEffect } from 'react'
import { Input } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import Pagination from '../../Components/Pagination/Pagination'
// Styles
import './Section.css'
// UseForm
import { useForm } from "react-hook-form";
// API
import https from '../../assets/https'

// Alert
import Swal from 'sweetalert2'

function Section() {

    let role = JSON.parse(window.localStorage.getItem('role'))

    // Alert
    function Success() {
        Swal.fire({
            title: "Bo'lim qo'shildi",
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


    const [addFormSection, setAddFormSection] = useState('add_mahsulot_main close')
    const [sectionlar, setSectionlar] = useState([])

    // UseForm
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();

    // Post
    const onSubmit = (data) => {
        https
            .post('/sections', data)
            .then(res => {
                if (res.request.status === 200) {
                    setAddFormSection('add_mahsulot_main close')
                    Success()
                    // update
                    https
                        .get('/sections')
                        .then(res => {
                            setSectionlar(
                                res.data.data
                            )
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            })
            .catch(err => {
                Warn()
            })
    }
    const [paginations, setPaginations] = useState([])
    const [currentUrl, setCurrentUrl] = useState('sections')


    function getUrl(newUrl) {
        https
            .get(`/${newUrl}`)
            .then(res => {
                setPaginations(res.data.meta.links)
                setSectionlar(res.data.data)
                // setLoading(false)
            })
    }

    useEffect(() => {
        getUrl(currentUrl)
    }, []);

    // Arrow putting Function
    function arrowFunc(label) {
        if (label === 'Next &raquo;') {
            return '>'
        } else if (label === '&laquo; Previous') {
            return '<'
        } else {
            return label
        }
    }

    // Delete
    function Delete(id) {
        https
            .delete(`/sections/${id}`)
            .then(res => {
                setSectionlar(sectionlar.filter(item => item.id !== id))
            })
            .catch(err => {
                console.log(err);
            })
    }

    // Open and CLose Modal
    function openFormSection() {
        setAddFormSection('add_mahsulot_main open')
    }
    function closeFormSection() {
        setAddFormSection('add_mahsulot_main close')
    }

    return (
        <>
            <form className={addFormSection} onSubmit={handleSubmit(onSubmit)}>
                <p>Bo'lim qo'shish</p>
                <Input
                    rounded
                    bordered
                    placeholder="Nomi..."
                    color="secondary"
                    width='100%'
                    label="Bo'lim nomi"
                    className='margin_bottom'
                    {...register("name", { required: true })}
                />
                {/* <Input
                    rounded
                    bordered
                    placeholder="Paroli..."
                    color="secondary"
                    width='100%'
                    label="Bo'lim paroli"
                    // {...register("section_password", { required: true })}
                /> */}          
                <div className='add_mahsulot_buttons'>
                    <button onClick={closeFormSection} type='reset'>Orqaga</button>
                    <button type='submit'>Qoshish</button>
                </div>
            </form>

            <section className='section_main'>
                <h1 className='filial_title'>Bo'limlar</h1>
                <div className='filial_header'>
                    <a onClick={openFormSection}>
                        Bo'lim Qoshish
                        <i className='bx bx-plus-circle'></i>
                    </a>
                    <Input
                        rounded
                        bordered
                        placeholder="Bo'lim nomi..."
                        color="secondary"
                        width='300px'
                        className='filial_search'
                        label=' '
                        contentRight={
                            <i className='bx bx-search-alt-2'></i>
                        }
                    />
                </div>

                <div className='mahsulot_table'>
                    <div className='mahsulot_table_headers'>
                        <p>Bo'lim nomi</p>
                        <p>Bo'lim paroli</p>
                    </div>

                    <div className='mahsulot_table_products'>
                        {
                            sectionlar.map((item, index) => {
                                return (
                                    <div className='mahsulot_table_product client_row' key={item?.id}>
                                        <p>{item?.name}</p>
                                        <p>{5435239}</p>
                                        <div className='mahsulot_product_buttons'>
                                            { role.includes('admin') ? (
                                                <>
                                                    <button><Link to={`/section/editsection/${item?.id}`}><i className='bx bx-edit-alt white'></i></Link></button>
                                                    <button onClick={() => { Delete(item?.id) }}><i className='bx bx-trash'></i></button>
                                                </>
                                            ) : <></>}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='pagination_block_wrapper'>
                    <div className='pagination_block'>
                        {
                            paginations?.map((pagination, paginationId) => {
                                return (
                                    <button key={paginationId} className={pagination.active ? 'pagiantion_active' : ''} onClick={() => { getUrl(pagination?.url.split('/')[4]) }}>{arrowFunc(pagination.label)}</button>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Section