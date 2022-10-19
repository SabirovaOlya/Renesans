import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import https from '../../assets/https';
import { AiOutlineRollback } from 'react-icons/ai'
import { Textarea, Radio } from '@nextui-org/react'

import './KL1Form.css'


function SingleKL1() {

    let { id } = useParams()
    const [ mainInfo, setMainInfo ] = useState({})

    async function GetMainInfo(){
        await https
        .get(`/client-marks/${id}`)
        .then(res =>{
            console.log(res?.data)
            setMainInfo(res?.data)
        })
        .catch(err =>{
            console.log(err)
        })
    }

    useEffect(()=>{
        GetMainInfo()
    },[])



  return (
    <div>
        <Link to='/kl1' className='clientform_back back-back'>
            <AiOutlineRollback />
            Orqaga
        </Link>
        <section className='single_buyurtma'>
            {/* Malumot */}
            <h1 className='text_center filial_edit_text'>{mainInfo?.client?.name}</h1>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
                <p>Hujjat tayyorlangan sana:</p>
                <p>{mainInfo?.doc_date}</p>
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
                <p>Mijoz tekshirilgan va organilgan sana:</p>
                <p>{mainInfo?.mark_date}</p>
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
                <p>Buyurtmachining F.I.Sh:</p>
                <p>{mainInfo?.client?.name}</p>
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
                <p>Doimiy yashash manzili:</p>
                <p>{mainInfo?.client?.address}</p>
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
                <p>Vaqtinchalik yashash manzili:</p>
                <p>{mainInfo?.client?.temp_address}</p>
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
                <p>JSh ShIR:</p>
                <p>{mainInfo?.client?.pinfl}</p>
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
                <p>Buyurtmachining telefon raqami:</p>
                <p>{mainInfo?.client?.phone}</p>
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
                <p>Kredit maqsadi:</p>
                <p>{mainInfo?.order?.aim}</p>
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
                <p>Soralayotgan kredit miqdori:</p>
                <p>{mainInfo?.order?.sum}</p>
            </div>

            {/* ********Part 1********* */}
            <h2 className='kl1_subtitle margin_top_30'>Buyurtmachining oilaviy sharoitini organish natijalari</h2>
            <p className='kl1_formtitle text_center'>Birgalikda istiqomat qiluvchilar</p>
            <div className='list_sinlge_form'>
                <p>Istiqomat qiluvchi:</p>
                {/* {
                    mainInfo?.family?.map((item,index)=>{
                        return(
                            <p key={index}>{index + 1}. {item}</p>
                        )
                    })
                    // console.log(typeof mainInfo?.property)
                } */}
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
                <p>Oila azolari bilan suhbat davomida aniqlangan muhim malumotlar:</p>
                <p>{mainInfo?.conversation_result}</p>
            </div>
            <p className='kl1_formtitle text_center'>Buyurtmachining boshqa mulklari</p>
            <div className='list_sinlge_form'>
                <p>Mulk nomi:</p>
                {/* {
                    mainInfo?.property?.map((item,index)=>{
                        return(
                            <p>{index + 1}. {item}</p>
                        )
                    })
                } */}
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
                <p>Yashash sharoiti:</p>
                <p>{mainInfo?.living_condition}</p>
            </div>
            <h2 className='kl1_subtitle margin_top_30'>Buyurtmachining faoliyati va daromad  manbalarini organish natijalari</h2>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
                <p>Buyurtmachining faoliyat turi:</p>
                <p>{mainInfo?.activity?.type}</p>
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
                <p>Faoliyat manzili:</p>
                <p>{mainInfo?.activity?.address}</p>
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
                <p>Faoliyat joyi (shaxsiy / ijara / boshqa):</p>
                <p>{mainInfo?.activity?.owner}</p>
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
                <p>Ushbu sohada foliyat yuritish davomiyligi:</p>
                <p>{mainInfo?.activity?.duration}</p>
            </div>

            {/* ********___Boshqa___********* */}
            <h2 className='kl1_subtitle margin_top_30'>Buyurtmachining daromadlari</h2>
            <p className='kl1_formtitle text_center'>Boshqa daromad turlari shuningdek passiv daromadlar</p>
            <div className='single_boshqa_product'>
                <div className='kl1_product_title'>
                    <p>Daromad { 1}</p>
                </div>
                <div className='single_buyurtma_inputs pdf_margin_top_15'>
                    <p>Daromad nomi:</p>
                    <p>{`Name`}</p>
                </div>
                <div className='single_buyurtma_inputs pdf_margin_top_15'>
                    <p>Hajmi:</p>
                    <p>{`100`}</p>
                </div>
                <div className='single_buyurtma_inputs pdf_margin_top_15'>
                    <p>Birlik narxi:</p>
                    <p>{`250 000 so'm`}</p>
                </div>
                <div className='single_buyurtma_inputs pdf_margin_top_15'>
                    <p>Qiymati:</p>
                    <p>{`2 000 000`}</p>
                </div>
                <div className='single_buyurtma_inputs pdf_margin_top_15'>
                    <p>Oylik daromad:</p>
                    <p>{`25 000 000`}</p>
                </div>
                <div className='single_buyurtma_inputs pdf_margin_top_15'>
                    <p>Izoh:</p>
                    <p>{'Commit commit commit commit commit commitcommit commit commit commit commit commit commit commit commit commit commit commit'}</p>
                </div>
            </div>
            <div className='single_boshqa_product'>
                <div className='kl1_product_title'>
                    <p>Daromad { 2}</p>
                </div>
                <div className='single_buyurtma_inputs pdf_margin_top_15'>
                    <p>Daromad nomi:</p>
                    <p>{`Name`}</p>
                </div>
                <div className='single_buyurtma_inputs pdf_margin_top_15'>
                    <p>Hajmi:</p>
                    <p>{`100`}</p>
                </div>
                <div className='single_buyurtma_inputs pdf_margin_top_15'>
                    <p>Birlik narxi:</p>
                    <p>{`250 000 so'm`}</p>
                </div>
                <div className='single_buyurtma_inputs pdf_margin_top_15'>
                    <p>Qiymati:</p>
                    <p>{`2 000 000`}</p>
                </div>
                <div className='single_buyurtma_inputs pdf_margin_top_15'>
                    <p>Oylik daromad:</p>
                    <p>{`25 000 000`}</p>
                </div>
                <div className='single_buyurtma_inputs pdf_margin_top_15'>
                    <p>Izoh:</p>
                    <p>{'Commit commit commit commit commit commitcommit commit commit commit commit commit commit commit commit commit commit commit'}</p>
                </div>
            </div>
            <p className='kl1_jami margin_top_15'>Jami o'rtacha oylik daromadlari: {1000000} so`m</p>

            {/******___Mavsumiy___******/}
            <div>
                <p className='kl1_formtitle text_center'>Mavsumiy daromad turi, manbasi va faoliyat joyi</p>
                <div className='single_form_table_mavsumiy margin_top_15'>
                    <div className='form_mavsumiy_header'>
                        <p className='text_bold'>№</p>
                        <p className='text_bold'>Daromad nomi</p>
                        <p className='text_bold'>Yillik daromad hajmi</p>
                    </div>
                    <div className='form_mavsumiy_header'>
                        <p>1</p>
                        <p>Name</p>
                        <p>1 000 000 so'm</p>
                    </div>
                    <div className='form_mavsumiy_header'>
                        <p>2</p>
                        <p>Name</p>
                        <p>1 000 000 so'm</p>
                    </div>
                    <div className='form_mavsumiy_header'>
                        <p>3</p>
                        <p>Name</p>
                        <p>1 000 000 so'm</p>
                    </div>
                    <div className='form_mavsumiy_header'>
                        <p>4</p>
                        <p>Name</p>
                        <p>1 000 000 so'm</p>
                    </div>
                    <div className='form_mavsumiy_header'>
                        <p>5</p>
                        <p>Name</p>
                        <p>1 000 000 so'm</p>
                    </div>
                </div>
                <p className='kl1_jami margin_top_15'>Jami: {1000000} so'm</p>

                <p className='kl1_formtitle text_center'>Mavsumiy daromadlarning oylar bo'yicha taqsimlanishi</p>
            
                <div className='kl1_calendar_single'>
                    <div className='single_buyurtma_inputs'>
                        <p>Yanvar:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Fevral:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Mart:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Aprel:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>May:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Iyun:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Iyul:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Avgust:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Sentabr:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Oktabr:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Noyabr:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Dekabr:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                </div>
                <p className='kl1_jami margin_top_15'>Jami: {1000000} so'm</p>
                <p className='kl1_formtitle text_center'>Mavsumiy xarajatlar</p>
                <div className='single_form_table_mavsumiy margin_top_15'>
                    <div className='form_mavsumiy_header'>
                        <p className='text_bold'>№</p>
                        <p className='text_bold'>Xarajat nomi</p>
                        <p className='text_bold'>Yillik xarajat hajmi</p>
                    </div>
                    <div className='form_mavsumiy_header'>
                        <p>1</p>
                        <p>Name</p>
                        <p>1 000 000 so'm</p>
                    </div>
                    <div className='form_mavsumiy_header'>
                        <p>2</p>
                        <p>Name</p>
                        <p>1 000 000 so'm</p>
                    </div>
                    <div className='form_mavsumiy_header'>
                        <p>3</p>
                        <p>Name</p>
                        <p>1 000 000 so'm</p>
                    </div>
                    <div className='form_mavsumiy_header'>
                        <p>4</p>
                        <p>Name</p>
                        <p>1 000 000 so'm</p>
                    </div>
                    <div className='form_mavsumiy_header'>
                        <p>5</p>
                        <p>Name</p>
                        <p>1 000 000 so'm</p>
                    </div>
                </div>
                <p className='kl1_jami margin_top_15'>Jami: {1000000} so`m</p>
                <p className='kl1_formtitle text_center'>Mavsumiy xarajatlarning oylar bo'yicha taqsimlanishi</p>
                <div className='kl1_calendar_single'>
                    <div className='single_buyurtma_inputs'>
                        <p>Yanvar:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Fevral:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Mart:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Aprel:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>May:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Iyun:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Iyul:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Avgust:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Sentabr:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Oktabr:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Noyabr:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Dekabr:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                </div>
                <p className='kl1_jami margin_top_15'>Jami: {1000000} so'm</p>      
            </div>

            {/******___Biznes___******/}
            <div>
                <p className='kl1_formtitle text_center'>Biznes daromadlar turi</p>
                <div className='single_boshqa_product'>
                    <div className='kl1_product_title'>
                        <p>Biznes daromad {1}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Daromad nomi:</p>
                        <p>{`Name`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Oylik hajm:</p>
                        <p>{`100`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>1 birlikning o`rtacha sotish naxri:</p>
                        <p>{`250 000 so'm`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>O`rtacha ustamasi % da:</p>
                        <p>{`40%`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Bir oylik daromad:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Izoh:</p>
                        <p>{'Commit commit commit commit commit commitcommit commit commit commit commit commit commit commit commit commit commit commit'}</p>
                    </div>
                </div>
                <div className='single_boshqa_product'>
                    <div className='kl1_product_title'>
                        <p>Biznes daromad {2}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Daromad nomi:</p>
                        <p>{`Name`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Oylik hajm:</p>
                        <p>{`100`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>1 birlikning o`rtacha sotish naxri:</p>
                        <p>{`250 000 so'm`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>O`rtacha ustamasi % da:</p>
                        <p>{`25%`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Bir oylik daromad:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Izoh:</p>
                        <p>{'Commit commit commit commit commit commitcommit commit commit commit commit commit commit commit commit commit commit commit'}</p>
                    </div>
                </div>
                <div className='single_boshqa_product'>
                    <div className='kl1_product_title'>
                        <p>Biznes daromad {3}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Daromad nomi:</p>
                        <p>{`Name`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Oylik hajm:</p>
                        <p>{`100`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>1 birlikning o`rtacha sotish naxri:</p>
                        <p>{`250 000 so'm`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>O`rtacha ustamasi % da:</p>
                        <p>{`20%`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Bir oylik daromad:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Izoh:</p>
                        <p>{'Commit commit commit commit commit commitcommit commit commit commit commit commit commit commit commit commit commit commit'}</p>
                    </div>
                </div>
                <p className='kl1_jami margin_top_15'>Jami: {1000000} so'm</p> 
                <p className='kl1_formtitle text_center'>Biznes uchun xarajatlar</p>
                <div className='single_boshqa_product'>
                    <div className='kl1_product_title'>
                        <p>Biznes xarajat {1}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Xarajat nomi:</p>
                        <p>{`Name`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Oylik hajm:</p>
                        <p>{`100`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Naxri:</p>
                        <p>{`250 000 so'm`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Qiymati:</p>
                        <p>{`40%`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>O`rtacha oylik xarajat:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Izoh:</p>
                        <p>{'Commit commit commit commit commit commitcommit commit commit commit commit commit commit commit commit commit commit commit'}</p>
                    </div>
                </div>
                <div className='single_boshqa_product'>
                    <div className='kl1_product_title'>
                        <p>Biznes xarajat {2}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Xarajat nomi:</p>
                        <p>{`Name`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Oylik hajm:</p>
                        <p>{`100`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Naxri:</p>
                        <p>{`250 000 so'm`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Qiymati:</p>
                        <p>{`40%`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>O`rtacha oylik xarajat:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Izoh:</p>
                        <p>{'Commit commit commit commit commit commitcommit commit commit commit commit commit commit commit commit commit commit commit'}</p>
                    </div>
                </div>
                <div className='single_boshqa_product'>
                    <div className='kl1_product_title'>
                        <p>Biznes xarajat {3}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Xarajat nomi:</p>
                        <p>{`Name`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Oylik hajm:</p>
                        <p>{`100`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Naxri:</p>
                        <p>{`250 000 so'm`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Qiymati:</p>
                        <p>{`40%`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>O`rtacha oylik xarajat:</p>
                        <p>{`25 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs pdf_margin_top_15'>
                        <p>Izoh:</p>
                        <p>{'Commit commit commit commit commit commitcommit commit commit commit commit commit commit commit commit commit commit commit'}</p>
                    </div>
                </div>
                <p className='kl1_jami margin_top_15'>Jami: {1000000} so'm</p>
            </div>

            {/******___6-Qism___******/}
            <div>
                <h2 className='kl1_subtitle margin_top_30'>Oilaviy daromadlar va xarajatlar (Uy xo'jaligining daromad va xarajatlari)</h2>
                <p className='kl1_formtitle text_center'>Oila azolarining daromadlar , shuningdek uy xojaligining boshqa daromadlari</p>
                <div className='single_form_product_first'>
                    <div>
                        <p>Odam {1}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Daromad Egasi:</p>
                        <p>{`Otasi`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Faoliyat Turi:</p>
                        <p>{`Nafaqada`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Faoliyat Joyi:</p>
                        <p>{`Yuqorichirchiq tuman 54-maktab`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Bir oylik daromad:</p>
                        <p>{`2 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Izoh</p>
                        <p>{`Commit commit commit commit commit commit commit`}</p>
                    </div>
                </div>
                <div className='single_form_product_first'>
                    <div>
                        <p>Odam {2}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Daromad Egasi:</p>
                        <p>{`Otasi`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Faoliyat Turi:</p>
                        <p>{`Nafaqada`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Faoliyat Joyi:</p>
                        <p>{`Yuqorichirchiq tuman 54-maktab`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Bir oylik daromad:</p>
                        <p>{`2 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Izoh</p>
                        <p>{`Commit commit commit commit commit commit commit`}</p>
                    </div>
                </div>
                <p className='kl1_jami margin_top_15'>Jami: {1000000} so'm</p>
                <p className='kl1_formtitle text_center'>Uy xojaligining xarajatlari</p>
                <div className='single_form_product_first'>
                    <div>
                        <p>Xarajat {1}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Xarajat nomi:</p>
                        <p>{`sadik`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Ortaja oylik xarajat:</p>
                        <p>{`700 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Izoh</p>
                        <p>{`Commit commit commit commit commit commit commit`}</p>
                    </div>
                </div>
                <div className='single_form_product_first'>
                    <div>
                        <p>Xarajat {2}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Xarajat nomi:</p>
                        <p>{`sadik`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Ortaja oylik xarajat:</p>
                        <p>{`700 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Izoh</p>
                        <p>{`Commit commit commit commit commit commit commit`}</p>
                    </div>
                </div>
                <div className='single_form_product_first'>
                    <div>
                        <p>Xarajat {3}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Xarajat nomi:</p>
                        <p>{`sadik`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Ortaja oylik xarajat:</p>
                        <p>{`700 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Izoh</p>
                        <p>{`Commit commit commit commit commit commit commit`}</p>
                    </div>
                </div>
                <p className='kl1_jami margin_top_15'>Jami: {1000000} so'm</p>
                <p className='kl1_formtitle text_center'>Uy xojaligi azolarining mavjud kredit va qarzdorliklari togrisidagi malumotlar</p>
                <div className='single_form_product_second'>
                    <div>
                        <p>Malumot {1}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Malumot nomi:</p>
                        <p>{`Qishloq Qurilish bank`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Asosiy qarz qoldigi:</p>
                        <p>{`3 700 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Oylik tolov miqdori:</p>
                        <p>{`480 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Izoh</p>
                        <p>{`Istemol krediti 23%dan`}</p>
                    </div>
                </div>
                <div className='single_form_product_second'>
                    <div>
                        <p>Malumot {2}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Malumot nomi:</p>
                        <p>{`Qishloq Qurilish bank`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Asosiy qarz qoldigi:</p>
                        <p>{`3 700 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Oylik tolov miqdori:</p>
                        <p>{`480 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Izoh</p>
                        <p>{`Istemol krediti 23%dan`}</p>
                    </div>
                </div>
                <div className='single_form_product_second'>
                    <div>
                        <p>Malumot {3}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Malumot nomi:</p>
                        <p>{`Qishloq Qurilish bank`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Asosiy qarz qoldigi:</p>
                        <p>{`3 700 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Oylik tolov miqdori:</p>
                        <p>{`480 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Izoh</p>
                        <p>{`Istemol krediti 23%dan`}</p>
                    </div>
                </div>
                <div className='flex_column margin_top_10'>
                    <p className='kl1_jami margin_bottom'>Jami asosiy qarz qoldigi: {1000000} so`m</p>
                    <p className='kl1_jami margin_bottom'>Jami oylik tolov miqdori: {1000000} so`m</p>
                </div>
                <p className={(1)? 'text_black_18 green_text' : 'text_black_18 red_text'}>Uy xojaligi byudjetining ortacha oylik ortiqcha mablagi yoki kamomadi miqdori: 100 000 so`m</p>
            </div>

            {/******___7-Qism___******/}
            <div>
                <h2 className='kl1_subtitle margin_top_30'>Buyurtmachining mavjud kredit va qarz majburiyatlari</h2>
                <div className='single_form_product_second'>
                    <div>
                        <p>Mavjud malumot {1}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Mavjud kredit va qarzlar:</p>
                        <p>{`Qishloq Qurilish bank`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Asosiy qarz qoldigi:</p>
                        <p>{`3 700 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Oylik tolov miqdori:</p>
                        <p>{`480 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Izoh</p>
                        <p>{`Istemol krediti 23%dan`}</p>
                    </div>
                </div>
                <div className='single_form_product_second'>
                    <div>
                        <p>Mavjud malumot {2}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Mavjud kredit va qarzlar:</p>
                        <p>{`Qishloq Qurilish bank`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Asosiy qarz qoldigi:</p>
                        <p>{`3 700 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Oylik tolov miqdori:</p>
                        <p>{`480 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Izoh</p>
                        <p>{`Istemol krediti 23%dan`}</p>
                    </div>
                </div>
                <div className='flex_column margin_top_15'>
                    <p className='kl1_jami margin_bottom'>Jami asosiy qarz qoldigi: {10000000} so`m</p>
                    <p className='kl1_jami margin_bottom'>Jami oylik tolov miqdori: {1000000} so`m</p>
                    <p className='kl1_jami '>Joiriy kreditlar boyicha qarz yuki korsatkichi: {'22%'}</p>
                </div>
                <h2 className='kl1_subtitle margin_top_30'>Oylik kredit tolovi ( eng katta tolov miqdori )</h2>
                <div className='single_form_product_third'>
                    <div className='single_buyurtma_inputs'>
                        <p>Asosiy qarz:</p>
                        <p>{`5 000 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Foizlar:</p>
                        <p>{`900 500`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Jami oylik tolov:</p>
                        <p>{`3 480 000`}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Soralayotgan kredit hisobi qarzi yoki korsatkichi (${'< 50%'})</p>
                        <p>{`83,5%`}</p>
                    </div>
                </div>
                <div className='single_buyurtma_inputs margin_top_10'>
                    <p>Kredit tarixi</p>
                    <p>{`Jami 7 marotaba kredit olgan, shu jumladan, Renesansdan 2 marotaba. Muntazam o‘z vaqtida to‘lagan. 30 kungacha kechiktirishlar soni - 0, 30 kundan ortiq kechiktirishlar soni - 0`}</p>
                </div>
            </div>

            {/******___Table___******/}
            <div>
                <div className='kl1_table'>
                    <div className='kl1_table_dark-bg'>Hulq atvori</div>
                    <div className='kl1_table_dark-bg'>Shaxsiy sifatida baholanishi</div>
                    <div className='kl1_table_dark-bg'>Moliaviy malumotlar va savodxonlik</div>
                    <div className='kl1_table_double kl1_table_noPadding'>
                        <p>сухбат</p>
                        <p>ижобий</p>   
                    </div>
                    <div className='kl1_table_double kl1_table_noPadding'>
                        <p>учрашув</p>
                        <p>ижобий</p>
                    </div>
                    <div>ижобий</div>
                    <div className='kl1_table_double kl1_table_noPadding'>
                        <p>oylik tolov</p>
                        <p>OT/OD</p>
                    </div>
                    <div className='kl1_table_double kl1_table_dark-bg kl1_table_noPadding'>
                        <p>SD/OT</p>
                        <p>OHX</p>
                    </div>
                    <div className='kl1_table_dark-bg'>Natija</div>
                    <div className='kl1_table_double kl1_table_dark-bg kl1_table_noPadding'>
                        <p className='kl1_table_yellow-bg'>5 985 205,42</p>
                        <p className='kl1_table_red-bg'>62,04%</p>
                    </div>
                    <div className='kl1_table_double kl1_table_noPadding'>
                        <p className='kl1_table_yellow-bg'>161,18%</p>
                        <p className='kl1_table_yellow-bg'>7 153 000,00</p>
                    </div>
                    <div className='kl1_table_yellow-bg'> {`<= 50% и >= 120%`}</div>
                    <div className='kl1_table_dark-bg'>Shaxsiy kapital miqdori</div>
                    <div className='kl1_table_dark-bg'>Shaxsiy kapital/kreditlar</div>
                    <div className='kl1_table_dark-bg'>Natija</div>
                    <div>25 000 000,00</div>
                    <div className='kl1_table_yellow-bg'>125%</div>
                    <div className='kl1_table_yellow-bg'>50</div>
                    <div className='kl1_table_dark-bg'>Daromad manbai</div>
                    <div className='kl1_table_dark-bg'>Faoliyat barqarorligi</div>
                    <div className='kl1_table_dark-bg'>Kutilayotgan rivojlanish</div>
                    <div>баркарор</div>
                    <div>баркарор</div>
                    <div>ижобий</div>
                    <div className='kl1_table_dark-bg'>Taminot turi</div>
                    <div className='kl1_table_dark-bg'>Taminot qiymati</div>
                    <div className='kl1_table_dark-bg'>Kreditni qoplash koeffitsenti</div>
                    <div>tilla buyumlar garovi</div>
                    <div>20 000 000,00</div>
                    <div className='kl1_table_yellow-bg'>100%</div>
                </div>
                <div className='single_buyurtma_inputs'>
                    <p>Ajratilgan kreditning buyurtmachi uchun tasirini baholash:</p>
                    <p>{`Ajratiladigan kreditga mijoz qoshimcha 150 litr LukOil moylarini, shuningdek, moy alishtirish jarayonida zaruriy bolgan avto ehtiyot qismlar savdosini ham yolga qoymoqchi. Birlamchi hisob kitoblar buyurtmachi daromadi qoshimcha 1 500 000 somga oshishini korsatmoqda.`}</p>
                </div>
                <div className='single_buyurtma_inputs margin_top_20'>
                    <p>Monitoring boyicha masul xodimning yakuniy xulosasi:</p>
                    <p>{`дохода клиента достаточно для получения кредита`}</p>
                </div>
                <div className='kl1_accepting'>
                    <p>Taqdim etilgan va toplangan malumotlar hamda kredit byurosidan olingan kredit tarixiga asoslanib men tomonimdan otkazilgan organish va tahlillar asosida ushbu buyurtma boyicha quiydagi yakuniy xulosamni kredit komissiyasida korib chiqish uchun taqdim etaman</p>
                    <Radio.Group label=' ' value={true} size='sm' className='kl1_accepting_radio'>
                        <div className='kl1_accept margin_bottom'><Radio color='success' className='radio_end' value={true}>Kredit ajratish</Radio></div>
                        <div className='kl1_accept'><Radio color='error' className='radio_end' value={false}>Rad etish</Radio></div>
                    </Radio.Group>
                </div>
            </div>
            
        </section>
    </div>
  )
}

export default SingleKL1