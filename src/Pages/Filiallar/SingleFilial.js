import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import https from '../../assets/https';
import { AiOutlineRollback } from 'react-icons/ai'



function SingleFilial() {

    const [filial, setFilial] = useState({});
    let { id } = useParams()

    useEffect(() => {
        https
            .get(`/branches/${id}`)
            .then(res => {
                setFilial(res.data.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <section>
            <div className='filialform_header'>
                <Link to='/filials' className='clientform_back'>
                    <AiOutlineRollback />
                    Orqaga
                </Link>
            </div>
            <div className=' single_buyurtma'>
                <h1 className='text_center filial_edit_text'>{filial?.name}</h1>
                <div className='pdf_margin_top_15'>
                    <div className='single_buyurtma_info'>
                        <div className='single_buyurtma_inputs'>
                            <p>Nomi:</p>
                            <p>{filial?.name}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Qisqa nomi:</p>
                            <p>{filial?.short_name}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Shartnama:</p>
                            <p>{filial?.contract}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Qo'mita:</p>
                            <p>{filial?.committee}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Manzil:</p>
                            <p>{filial?.address}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Bank rekvizitlari:</p>
                            <p>{filial?.requisite}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>ITN:</p>
                            <p>{filial?.itn}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Telefon raqam:</p>
                            <p>+998 {filial?.phone}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Shahar:</p>
                            <p>{filial?.city}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Sudi:</p>
                            <p>{filial?.judge}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Kredit limiti:</p>
                            <p>{filial?.limit_credit}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SingleFilial