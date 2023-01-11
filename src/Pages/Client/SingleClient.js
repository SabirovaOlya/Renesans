import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import https from '../../assets/https';
import { AiOutlineRollback } from 'react-icons/ai'
import './Client.css'
import { Button } from 'antd';



function SingleClient() {

    const [client, setClient] = useState({});
    let { id } = useParams()
    let navigate = useNavigate()

    useEffect(() => {
        https
            .get(`/clients/${id}`)
            .then(res => {
                setClient(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    function ToBuyurtma(){
        navigate("/buyurtma/form", {state:{id:id}})
        setTimeout(()=>{
            window.location.reload(false);
        },50)
    }
    function ToSingleBuyurtma(url){
        navigate(`${url}`, {replace:true})
        setTimeout(()=>{
            window.location.reload(false);
        },50)
    }

    return (
        <section>
            <div className='filialform_header'>
                <button onClick={() => navigate(-1)} className='clientform_back'>
                    <AiOutlineRollback />
                    Orqaga
                </button>
                <button className='pathButton' onClick={()=>{ToBuyurtma()}}>
                    Buyurtma
                </button>
            </div>
            <div className='single_buyurtma'>
                <h1 className='text_center filial_edit_text'>{client?.name}</h1>
                <div className='pdf_margin_top_15'>
                    <div className='single_buyurtma_info'>
                        <div className='single_buyurtma_inputs'>
                            <p>Klient kodi:</p>
                            <p>{client?.code}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Tog'ilgan sanasi:</p>
                            <p>{client?.birth_date}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Doimi manzil:</p>
                            <p>{client?.address}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Shahar:</p>
                            <p>{client?.city}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Tuman:</p>
                            <p>{client?.district}</p>
                        </div>
                        {
                            client?.temp_address ? 
                            <div className='single_buyurtma_inputs'>
                                <p>Vaqtinchalik yashash joyi:</p>
                                <p>{client?.temp_address}</p>
                            </div> : 
                            <></>
                        }
                        <div className='single_buyurtma_inputs'>
                            <p>Jinsi:</p>
                            <p>{client?.gender == "male" ? "Erkar" : (client?.gender == "female" ? "ayol" : "-")}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Fuqarolik:</p>
                            <p>{client?.citizenship}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Millat:</p>
                            <p>{client?.nationality}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>PINFL:</p>
                            <p>{client?.pinfl}</p>
                        </div>
                        {
                            client?.phone?.map((item,index) =>{
                                return(
                                    <div className='single_buyurtma_inputs' key={index}>
                                        <p>Telefon raqami {index + 1}:</p>
                                        <p>{item}</p>
                                    </div>
                                )
                            })
                        }
                        <div className='single_buyurtma_inputs'>
                            <p>Hujjat turi:</p>
                            <p>{client?.doc_type}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Hujjat seriya raqami:</p>
                            <p>{client?.serial_num}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Kim tomondan berildi:</p>
                            <p>{client?.issued_by}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Hujjat berilgan sana:</p>
                            <p>{client?.issued_date}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Hujjat tugash sana:</p>
                            <p>{client?.doc_end}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Ish lavozmi:</p>
                            <p>{client?.job}</p>
                        </div>
                        <div className='order_list'>
                            {client?.orders?.map((item,index)=>{
                                return(
                                    <button className='order_list_link' onClick={()=>{ToSingleBuyurtma(`/buyurtma/singleBuyurtma/${item}`)}} key={index}>Buyurtma {index + 1}</button>
                                )
                            })}
                        </div>
                        {/* <div className='single_group margin_top_30'>
                            <p className='text_single_group'>Guruh: <span className='first_elem'><Link to={`${client?.group?.id ? `/client/single_group/${client?.group?.id}` : `/client/singleClient/${id}`}`}>{client?.group?.name ? client?.group?.name : 'yoq' }</Link></span></p>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SingleClient