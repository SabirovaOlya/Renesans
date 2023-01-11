import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// Components
import { Input } from '@nextui-org/react'
import { Tabs } from 'antd';
// Alert
import Swal from 'sweetalert2'
// Api
import https from '../../assets/https';
// Styles
import './Buyurtma.css'

function Buyurtma() {

    // Alert
    function Warn() {
        Swal.fire({
            title: "Kodni kiriting",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
    function Error404() {
        Swal.fire({
            title: "Bunday klient yo'q",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
    
    const onChange = (key) => {};
    const { TabPane } = Tabs;
    // Modalka
    const [modalka, setModalka] = useState('shartnoma_modal close');
    const [modalCode, setModalCode] = useState('');
    let navigate = useNavigate()
    let role = JSON.parse(window.localStorage.getItem('role'))

    // Buyurtma
    const [urls, setUrls] = useState([
        { title: "All", link: 'orders', id: 1 },
        { title: "New", link: 'orders/new', id: 2 },
        { title: "Accepted", link: 'orders/accepted', id: 3 },
        { title: "Denied", link: 'orders/denied', id: 4 },
    ])
    const [orders, setOrders] = useState([])

    // PAGINATION
    const [paginations, setPaginations] = useState([])

    function getUrl(newUrl) {
        https
            .get(`/${newUrl}`)
            .then(res => {
                    setOrders(res?.data?.data);
                    setPaginations(res?.data?.meta?.links);
                // setLoading(false) 
            })
    }
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

    // Navigation Function
    function navigateAdd(id) {
        if(!id){
            return Warn()
        }
        
        let dataId ={
          code: id
        }
        
        https
        .post('/check/client/code', dataId)
        .then(res =>{
            navigate("/buyurtma/form", {state:{id:res?.data?.data?.id}})
        })
        .catch(err =>{
            if(err?.request?.status === 404){
              console.log(err);
                return(
                    Error404()
                )
            }else{
                console.log(err);
            }
        })
    }

    useEffect(() => {
        getUrl('orders')
    }, []);

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
    function idSort(data) {
        if (data === "accepted") {
            return "green"
        } else if (data === "denied") {
            return "red"
        }else if (data === "pending") {
            return "yellow"
        }

    }
    // Delete Order Func
    function deleteOrder(index) {
        https
            .delete(`/orders/${index}`)
            .then(res => {
                setOrders(orders.filter((order, orderIndex) => order.id !== index))
            })
            .catch(err => console.log(err))
    }

    function TabTitle(text){
        if(text == 'All'){
            return 'Barcha'
        }else if(text == 'New'){
            return 'Yangi'
        }else if(text == 'Accepted'){
            return 'Tasdiqlangan'
        }else if(text == 'Denied'){
            return 'Rad etilgan'
        }
    }

    return (
        <div className='shart_nama'>

            {/* Modalka */}
            <div className={modalka}>
                <Input
                    rounded
                    bordered
                    width='300px'
                    color='secondary'
                    label='Klient kodi'
                    placeholder='12345'
                    clearable
                    onChange={(e) => setModalCode(e.target.value)}
                ></Input>
                <div>
                    <button
                        onClick={() =>{navigateAdd(modalCode)}}
                        className='shartnoma_modal_button'>Qo'shish</button>
                    <button onClick={() => setModalka('shartnoma_modal close')} className='shartnoma_modal_button'>Orqaga</button>
                </div>
            </div>
            <div className='shartnamaMain'>
                <div className='shartnamaHeader'>
                    <p className='shartnamaTitle'>Buyurtma</p>
                    <button onClick={() => setModalka('shartnoma_modal open')} className='shartnamaLink'>Buyurtma <i className='bx bx-plus-circle'></i></button>
                </div>
                <div className='shartnamaSearch'>
                    <div className='sort_main'>
                        <p>Tartiblash:</p>
                        <Tabs defaultActiveKey="1" onChange={onChange} className= "buyurtma_tabs">
                            {
                                urls.map(url => {
                                    return (
                                        <TabPane 
                                        tab= {<div onClick={() => getUrl(url.link)} key={url.id} className='sort_item'>{TabTitle(url.title)} </div>} 
                                        key={url.id}
                                        />
                                    )
                                })
                            }
                        </Tabs>
                        <div className='sort'>
                        </div>
                    </div>
                </div>
                <div className='shartnamaTablePart'>
                    <div className='shartTable'>
                        <div className='tableHeader'>
                            <p className='headerTable-title_buyurtma'>Raqam</p>
                            <p className='headerTable-title_buyurtma'>Kodi</p>
                            <p className='headerTable-title_buyurtma'>Mahsulot nomi</p>
                            <p className='headerTable-title_buyurtma'>Status</p>
                        </div>
                    </div>
                    <ul className='tableInfo'>
                        {
                            orders?.map((item, index) => {
                                return <li className='client_row' key={item?.id}>
                                    {/* <p className='liName li'><span>{index + 1 + (currentList-1)*10}.</span>{item.name}</p> */}
                                    <p className='li_buyurtma'>{index + 1}</p>
                                    <p className='li_buyurtma'>{item?.code}</p>
                                    <p className='li_buyurtma'>{item?.product ? item?.product?.name : 'Nothing'}</p>
                                    <p className='li_buyurtma' id={idSort(item?.status)}>{dataSort(item?.status)}</p>
                                    <div className='userButtons_buyurtma'>
                                        <button><Link to={`/buyurtma/singleBuyurtma/${item?.id}`}><i className='bx bx-user'></i></Link></button>
                                        { role?.includes('admin') || role.includes('director') ? (
                                            <>
                                                <button><Link to={`/buyurtma/editBuyurtma/${item?.id}`}><i className='bx bx-edit-alt'></i></Link></button>
                                            </>
                                        ) : <></>}
                                        { role?.includes('admin') ? (
                                        <button onClick={() => deleteOrder(item?.id)}><i className='bx bx-trash'></i></button>
                                        ) : <></>}
                                        </div>
                                </li>
                            })
                        }
                    </ul>
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
            </div>
        </div>
    )
}

export default Buyurtma