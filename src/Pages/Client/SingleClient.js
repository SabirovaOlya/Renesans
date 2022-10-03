import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import https from '../../assets/https';
import { AiOutlineRollback } from 'react-icons/ai'



function SingleClient() {

    const [client, setClient] = useState({});
    let { id } = useParams()

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

    return (
        <section>
            <div className='filialform_header'>
                <Link to='/client' className='clientform_back'>
                    <AiOutlineRollback />
                    Orqaga
                </Link>
            </div>
            <div className='single_buyurtma'>
                <h1 className='text_center filial_edit_text'>{client?.name}</h1>
                <div className='pdf_margin_top_15'>
                    <div className='single_buyurtma_info'>
                        <div className='single_buyurtma_inputs'>
                            <p>Parol:</p>
                            <p>{client?.code}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Tog'ilgan sanasi:</p>
                            <p>{client?.birth_date}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Manzil:</p>
                            <p>{client?.address}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Vaqtinchalik yashash joyi:</p>
                            <p>{client?.temp_address}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Shahar:</p>
                            <p>{client?.city}</p>
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
                        <div className='single_buyurtma_inputs'>
                            <p>Telefon Nomer:</p>
                            <p>+998 {client?.phone}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Hujjat turi:</p>
                            <p>{client?.doc_type}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Ishlab chiqarish raqami:</p>
                            <p>{client?.serial_num}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Kim bilan chiqarildi:</p>
                            <p>{client?.issued_by}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Chiqarilgan sana:</p>
                            <p>{client?.issued_date}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Ish:</p>
                            <p>{client?.job}</p>
                        </div>
                        <div className='single_group margin_top_30'>
                            <p className='text_single_group'>Guruh: <span className='first_elem'><Link to={`${client?.group?.id ? `/client/single_group/${client?.group?.id}` : `/client/singleClient/${id}`}`}>{client?.group?.name ? client?.group?.name : 'yoq' }</Link></span></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SingleClient