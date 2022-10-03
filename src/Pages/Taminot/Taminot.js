import React, { useState, useEffect } from 'react'
import { Input } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import Pagination from '../../Components/Pagination/Pagination'
import { useForm } from "react-hook-form";
// Styles
import './Taminot.css'
import '../../assets/pagination.css'
// API
import https from '../../assets/https'
import Swal from 'sweetalert2';


function Taminot() {

    function Warn() {
        Swal.fire({
            title: "Parolni kiriting",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
    function SuccessDelete() {
        Swal.fire({
            title: "Ta'minot o'chirildi",
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
    const [buyurtmaId, setBuyurtmaId] = useState(0)
    // Modalka
    const [modalka, setModalka] = useState('shartnoma_modal close');
    let navigate = useNavigate();
    
    function navigateAdd(id) {
        if(id !== 0){
            let dataId ={
                code: Number(id)
            }
            
            https
            .post('/check/order/code', dataId)
            .then(res =>{
                navigate("/taminot/form", {state:{id:res?.data?.order_id}})
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
        }else{
            Warn()
        }
    }

    const [taminotlar, setTaminotlar] = useState([]);

    // PAGINATION
    const [paginations, setPaginations] = useState([])
    const [currentUrl, setCurrentUrl] = useState('supply-info')

    // UseForm
    const { register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();

    function getUrl(newUrl) {
        https
            .get(`/${newUrl}`)
            .then(res => {
                setPaginations(res?.data?.meta?.links)
                setTaminotlar(res?.data?.data)
            })
    }

    // Arrow putting Function
    function arrowFunc(label) {
        if (label.split('')[0] === 'N') {
            return '>'
        } else if (label.split('')[0] === '&') {
            return '<'
        } else {
            return label
        }
    }

    // Delete item Function
    function DeleteProduct(id){
        https
        .delete(`/supply-info/${id}`)
        .then(res =>{
            setTaminotlar(taminotlar?.filter(x => x.id !== id))
            if(res.request.status === 200){
                SuccessDelete()
            }
        })
        .catch(err =>{
            console.log(err)
        })
    }

    function SinglePage(type, id){
        if(type == 'gold'){
            navigate(`/taminot/singlegold/${id}`, { replace: true })
        }else if(type == 'auto'){
            navigate(`/taminot/singleavto/${id}`, { replace: true })
        }else if(type == 'guarrantor'){
            navigate(`/taminot/singleuchinchi/${id}`, { replace: true })
        }else if(type == 'insurance'){
            navigate(`/taminot/singlesugurta/${id}`, { replace:true })
        }
    }

    function EditPage(type, id){
        if(type == 'gold'){
            navigate(`/taminot/editgold/${id}`, { replace: true })
        }else if(type == 'auto'){
            navigate(`/taminot/editavto/${id}`, { replace: true })
        }else if(type == 'guarrantor'){
            navigate(`/taminot/edituchinchi/${id}`, { replace: true })
        }else if(type == 'insurance'){
            navigate(`/taminot/editsugurta/${id}`, { replace:true })
        }
    }

    useEffect(() => {
        getUrl(currentUrl)
    }, []);

    return (
        <section className='taminot'>

            {/* Modalka */}
            <div className={modalka}>
                <Input
                    rounded
                    bordered
                    width='300px'
                    color='secondary'
                    label='Buyurtma paroli'
                    placeholder='12345'
                    type='number'
                    clearable
                    onChange={(e) => setBuyurtmaId(e.target.value)}
                ></Input>
                <div>
                    <button
                        type='submit'
                        onClick={()=>{navigateAdd(buyurtmaId)}}
                        className='shartnoma_modal_button'
                    >Qo'shish</button>
                    <button type='reset' onClick={() => setModalka('shartnoma_modal close')} className='shartnoma_modal_button'>Orqaga</button>
                </div>
            </div>

            <div className='taminot_header'>
                <div className='taminot_title'>Ta'minot</div>
                <div className='taminot_subheader'>
                    <button onClick={() => setModalka('shartnoma_modal open')} className='taminot_link'>Ta'minot <i className='bx bx-plus-circle'></i></button>
                    <Input
                        rounded
                        bordered
                        placeholder="Ta'minot raqami..."
                        color="secondary"
                        width='300px'
                        className='search-input'
                        label=' '
                        contentRight={
                            <i className='bx bx-search-alt-2'></i>
                        }
                    />
                </div>
            </div>

            <div className='shartnamaTablePart'>
                <div className='shartTable'>
                    <div className='tableHeader'>
                        <p className='headerTable-title_shartnoma'>Ism</p>
                        <p className='headerTable-title_shartnoma'>Ta'minot raqami</p>
                        <p className='headerTable-title_shartnoma'>Mahsulot nomi</p>
                    </div>
                    <ul className='tableInfo'>
                        {
                            taminotlar?.map((item, index) => {
                                return <li className='client_row' key={index}>
                                    <p className='liName li_shartnoma'>{item?.owner?.fio ? item?.owner?.fio : "Buyurtmachining o'zi" }</p>
                                    <p className='li_shartnoma'>{item?.id}</p>
                                    <p className='li_shartnoma'>{item?.type}</p>
                                    <div className='userButtons_shartnoma'>
                                        <button onClick={()=>{SinglePage(item?.type, item?.id)}}><i className='bx bx-user'></i></button>
                                        <button onClick={()=>{EditPage(item?.type, item?.id)}}><i className='bx bx-edit-alt'></i></button>
                                        <button onClick={()=>{DeleteProduct(item?.id)}}><i className='bx bx-trash'></i></button>
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
                                <button key={paginationId} className={pagination.active ? 'pagiantion_active' : ''} onClick={() => { getUrl(pagination?.url.split('/')[4]) }}>{arrowFunc(pagination.label)}</button>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default Taminot