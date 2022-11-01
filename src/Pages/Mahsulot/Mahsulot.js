import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
// Components
import { Input } from '@nextui-org/react'
import Pagination from '../../Components/Pagination/Pagination'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
// Styles
import './Mahsulot.css'
// UseForm
import { useForm } from "react-hook-form";
import https from '../../assets/https';
// Alert
import Swal from 'sweetalert2'

function Mahsulot() {
    // Warning Modal
    // const [open, setOpen] = useState(false);




    // Alert
    function Success() {
        Swal.fire({
            title: "Mahsulot qoshildi",
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
    function Remove() {
        Swal.fire({
            title: "Mahsulot o'chirildi",
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }

    useEffect(() => {
        https
            .get('/products')
            .then(res => { setMahsulotlar(res.data.data) })
            .catch(err => console.log(err))
    }, []);

    // UseForm
    const { register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();

    const onSubmit = (data) => {
        https
            .post('/products', data)
            .then((res) => {
                if (res.request.status == 200) {
                    setAddForm('add_mahsulot_main close')
                    Success()
                }
            })
            .catch((err) => Warn())
    }

    function Delete(index) {
        https
            .delete(`/products/${index}`)
            .then(res => {
                if (res.request.status === 200) {
                    Remove()
                    setMahsulotlar(mahsulotlar.filter(item => item.id !== index))
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    // Opening Form
    const [addForm, setAddForm] = useState('add_mahsulot_main close')

    function openForm() {
        setAddForm('add_mahsulot_main open')
    }
    function closeForm() {
        setAddForm('add_mahsulot_main close')
    }


    const [mahsulotlar, setMahsulotlar] = useState([])

    const [paginations, setPaginations] = useState([])
    const [currentUrl, setCurrentUrl] = useState('products')


    function getUrl(newUrl) {
        https
            .get(`/${newUrl}`)
            .then(res => {
                setPaginations(res.data.meta.links)
                setMahsulotlar(res.data.data)
                // setLoading(false)
            })
    }

    useEffect(() => {
        getUrl(currentUrl)
    }, []);

    // Arrow putting Function
    function arrowFunc(label) {
        if (label === 'pagination.next') {
            return '>'
        } else if (label === 'pagination.previous') {
            return '<'
        } else {
            return label
        }
    }

    return (
        <>
            <form className={addForm} onSubmit={handleSubmit(onSubmit)}>
                <p>Mahsulot qo'shish</p>
                <Input
                    rounded
                    bordered
                    placeholder="Nomi..."
                    color="secondary"
                    width='100%'
                    label="Mahsulot nomi"
                    className='margin_bottom'
                    {...register("name", { required: true })}
                />
                <Input
                    rounded
                    bordered
                    placeholder="Paroli..."
                    color="secondary"
                    width='100%'
                    label="Mahsulot paroli"
                    {...register("code", { required: true })}
                />
                <div className='add_mahsulot_buttons'>
                    <button onClick={closeForm}>Orqaga</button>
                    <button type='submit'>Qoshish</button>
                </div>
            </form>

            <section className='mahsulot_section'>
                <h1 className='filial_title'>Mahsulotlar</h1>
                <div className='filial_header'>
                    <a onClick={openForm}>
                        Mahsulot Qoshish
                        <i className='bx bx-plus-circle'></i>
                    </a>
                    <Input
                        rounded
                        bordered
                        placeholder="Mahsulot nomi..."
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
                        <p>Mahsulot nomi</p>
                        <p>Mahsulot paroli</p>
                    </div>

                    <div className='mahsulot_table_products'>
                        {
                            mahsulotlar.map((item, index) => {
                                return (
                                    <div className='mahsulot_table_product client_row' key={index}>
                                        <p>{item.name}</p>
                                        <p>{item.code}</p>
                                        <div className='mahsulot_product_buttons'>
                                            <button onClick={() => { Delete(item?.id) }}><i className='bx bx-trash'></i></button>
                                            <button><Link to={`/mahsulot/editmahsulot/${item?.id}`}><i className='bx bx-edit-alt white'></i></Link></button>
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

export default Mahsulot