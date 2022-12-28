import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from "react-router-dom";
import https from '../../assets/https';
// Components
import { Input } from '@nextui-org/react'
import Swal from 'sweetalert2';
// Styles
import './Shartnama.css'
import '../../assets/pagination.css'

function Shartnama() {

    let role = JSON.parse(window.localStorage.getItem('role'))

    // Alerts
    function Warn() {
        Swal.fire({
            title: "Kodni kiriting",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
    function SuccessDelete() {
        Swal.fire({
            title: "Shartnoma o'chirildi",
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }
    function Error404() {
        Swal.fire({
            title: "Bunday buyurtma yo'q",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
    function BuyurtmaStatus() {
        Swal.fire({
            title: "Buyurtma tasdiqlanmagan",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
    // Modalka
    const [modalka, setModalka] = useState('shartnoma_modal close');
    const [modalCode, setModalCode] = useState('');
    let navigate = useNavigate();
    function navigateAdd(id) {
        if(!id){
            return Warn()
        }
        
        let dataId ={
            code: Number(id)
        }
        
        https
        .post('/check/order/code', dataId)
        .then(res =>{
            https
            .get(`/orders/${res?.data?.order_id}`)
            .then(responsive =>{
                if(responsive?.data?.status == 'accepted'){
                    navigate("/shartnama/addshartnama", {state:{id:res?.data?.order_id}})
                }else{
                    BuyurtmaStatus()
                }
            })
        })
        .catch(err =>{
            if(err?.request?.status === 404){
                return(
                    Error404()
                )
            }else{
                console.log(err);
            }
        })
    }

    const [shartnamalar, setShartnamalar] = useState([]);

    // PAGINATION
    const [paginations, setPaginations] = useState([])
    const [currentUrl, setCurrentUrl] = useState('contracts')


    function getUrl(newUrl) {
        https
            .get(`/${newUrl}`)
            .then(res => {
                setPaginations(res?.data?.meta?.links)
                setShartnamalar(res?.data?.data)
                // setLoading(false)
                // console.log(res?.data);
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

    useEffect(() => {
        getUrl(currentUrl)
    }, []);




    // Delete Shartnama
    function deleteShartnama(shartnamaIndex) {
        https
        .delete(`/contracts/${shartnamaIndex}`)
        .then(res => {
            setShartnamalar(shartnamalar.filter((contract, contractIndex) => contract.id !== shartnamaIndex))
            SuccessDelete()
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            {/* Modalka */}
            <div className={modalka}>
                <Input
                    rounded
                    bordered
                    width='300px'
                    color='secondary'
                    label='Buyurtma kodi'
                    placeholder='12345'
                    clearable
                    onChange={(e) => setModalCode(e.target.value)}
                ></Input>
                <div>
                    <button
                        onClick={()=>{navigateAdd(modalCode)}}
                        className='shartnoma_modal_button'>Qo'shish</button>
                    <button onClick={() => setModalka('shartnoma_modal close')} className='shartnoma_modal_button'>Orqaga</button>
                </div>
            </div>

            <div className='shart_nama'>
                <div className='shartnamaMain'>
                    <div className='shartnamaHeader'>
                        <p className='shartnamaTitle'>Shartnoma</p>
                    </div>
                    <div className='shartnamaSearch'>
                        <button onClick={() => setModalka('shartnoma_modal open')} className='shartnamaLink'>Shartnoma <i className='bx bx-plus-circle'></i></button>
                        <Input
                            rounded
                            bordered
                            placeholder="Shartnoma kodi..."
                            color="secondary"
                            width='300px'
                            className='search-input'
                            label=' '
                            contentRight={
                                <i className='bx bx-search-alt-2'></i>
                            }
                        />
                    </div>
                    <div className='shartnamaTablePart'>
                        <div className='shartTable'>
                            <div className='tableHeader'>
                                <p className='headerTable-title_shartnoma'>F.I.Sh</p>
                                <p className='headerTable-title_shartnoma'>Shartnoma kodi</p>
                                <p className='headerTable-title_shartnoma'>Tuzilgan sana</p>
                            </div>
                            <ul className='tableInfo'>
                                {
                                    shartnamalar?.map((item, index) => {
                                        return <li className='client_row' key={item?.id}>
                                            <p className='liName li_shartnoma'>{item?.order?.name}</p>
                                            <p className='li_shartnoma'>{item?.contract_num}</p>
                                            <p className='li_shartnoma'>{item?.contract_issue_date}</p>
                                            <div className='userButtons_shartnoma'>
                                                <button> <Link to={`/shartnama/singleshartnama/${item?.id}`}><i className='bx bx-user white'></i></Link></button>
                                                { role.includes('admin') ? (
                                                    <>
                                                        <button><Link to={`/shartnama/editshartnama/${item?.id}`}><i className='bx bx-edit-alt'></i></Link></button>
                                                        <button onClick={() => deleteShartnama(item?.id)}><i className='bx bx-trash'></i></button>
                                                    </>
                                                ) : <></>}
                                            </div>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className='pagination_block_wrapper'>
                        <div className='pagination_block'>
                            {
                                paginations?.map((pagination, paginationId) => {
                                    return (
                                        <button key={paginationId} className={pagination?.active ? 'pagiantion_active' : ''} onClick={() => { getUrl(pagination?.url?.split('/')[4]) }}>{arrowFunc(pagination?.label)}</button>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shartnama