import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '@nextui-org/react'

import './Foydalan.css'
import https from '../../assets/https'

function Foydalan() {

    const [users, setUsers] = useState([])

    const [paginations, setPaginations] = useState([])
    const [currentUrl, setCurrentUrl] = useState('users')


    function getUrl(newUrl) {
        https
            .get(`/${newUrl}`)
            .then(res => {
                setPaginations(res?.data?.data?.meta?.link)
                setUsers(res?.data?.data)
                // setLoading(false)
            })
    }

    useEffect(() => {
        getUrl(currentUrl)
    }, [])

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
    // Delete User Func
    function deleteUser(index) {
        https
            .delete(`/delete/users/${index}`)
            .then(res => {
                setUsers(users.filter((item, itemIndex) => item.id !== index))
            })
            .catch(err => console.log(err))
    }

    return (
        <section className='foydalan_main'>
            <h1 className='filial_title'>Foydalanuvchilar</h1>
            <div className='filial_header'>
                <Link to='/foydalanuvchi/addfoydalanuvchi'>
                    Foydalanuvchi Qoshish
                    <i className='bx bx-plus-circle'></i>
                </Link>
                <Input
                    rounded
                    bordered
                    placeholder="Foydalanuvchi nomi..."
                    color="secondary"
                    width='300px'
                    className='filial_search'
                    label=' '
                    contentRight={
                        <i className='bx bx-search-alt-2'></i>
                    }
                />
            </div>

            <div className='foydalan_table'>
                <div className='foydalan_table_headers'>
                    <p>F.I.Sh</p>
                    <p>Foydalanuvchi email</p>
                    <p>Foydalanuvchi role</p>
                </div>

                <div className='foydalan_table_products'>
                    {
                        users?.map((item, index) => {
                            return (
                                <div key={index} className='foydalan_table_product client_row'>
                                    <p className='foydalan_table_product_title'>{item?.name}</p>
                                    <p className='foydalan_table_product_title'>{item?.email}</p>
                                    <p className='foydalan_table_product_title'>{item?.role?.name}</p>
                                    <p className='foydalan_table_product_title'>{item?.status}</p>
                                    <div className='foydalan_product_buttons'>
                                        <button><Link to={`/foydalanuvchi/singlefoydalanuvchi/${item.id}`}><i className='bx bx-user'></i></Link></button>
                                        <button><Link to={`/foydalanuvchi/editfoydalanuvchi/${item.id}`}><i className='bx bx-edit-alt'></i></Link></button>
                                        <button onClick={() => deleteUser(item.id)}><i className='bx bx-trash'></i></button>
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
    )
}

export default Foydalan