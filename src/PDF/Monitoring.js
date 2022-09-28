import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineRollback, AiOutlinePrinter } from 'react-icons/ai'

function Monitoring() {

    const [cars,setCars] = useState([])

    useEffect(()=>{
        setCars(
            [
                {
                    nomi:'DAEWOO NEXIA',
                    yili:'2009',
                    raqam:'10J212QA',
                    turi:'YENGIL SEDAN',
                    dvigatel:'4337471',
                    kuzov:'XWB3K32BD9A042312',
                    shassi:''
                }
            ]
        )
    })

    function getShassi(a){
        if(a){
            return a
        }else{
            return '-'
        }
    }

  return (
    <>
        <div className='pdf_header'>
            <Link to='/buyurtma/singleBuyurtma' className='clientform_back'>
            <AiOutlineRollback/>
                Back
            </Link>
            <button onClick={()=>window.print()}>
                Print
            <AiOutlinePrinter/>
            </button>
        </div>
        <div className='pdf_container'>
            <p className='text_black_18 text_center'>Transport vositasini ko‘zdan kechirish</p>
            <p className='text_black_18 text_center pdf_margin_top_5'>D A L O L A T N O M A S I</p>
            <div className='between align_center pdf_margin_top_20'>
                <p className='black_text'>Guliston sh.</p>
                <p className='black_text'>"____" ____________ 20____ y</p>
            </div>
            <div className='text_degree'>
                <p className='pdf_margin_top_40'>
                    Quyidagi Jadval №1 da keltirilgan Usmonova Muyassar Abduvaliyevna (shaxsini tasdiqlovchi hujjat ma'lumotlari: AB2300850 raqamli O‘zR Fuqarosining biometrik pasporti 17.12.2015 da Sirdaryo viloyati Guliston shahar IIB tomonidan berilgan. Yashash manzil: Sirdaryo viloyati Guliston shahri Begmatov ko‘chasi 46-uy 10-xonadon) hamda ''Renesans Mikrokredit Tashkiloti'' MChJ  o‘rtasida tuzilgan 26.03.2022 y. dagi 4-34/22-210 sonli Shartnomaga asosan ta'minot sifatida garov uchun taqdim etilgan hkhjkhjkhkljljl ga tegishli bo‘lgan transport vositasini ko‘zdan kechirish jarayonida garov mulki shikastlanmaganligi, u bilan bog‘liq yo‘l transport xodisalari bo‘lmaganligi, bugungi kunda but va yaxshi xolatda ekanligiga aniqlandi.
                </p>
            </div>
            <div className='pdf_margin_top_20'>
                <div className='endRow'>
                    <p>Jadval №1</p>
                </div>
                <div className='pdf_monitoring_table pdf_margin_top_5'>
                    <div className='monitoring_table_header'>
                        <p>№</p>
                        <p>Nomi</p>
                        <p>Ishlab chiqarilgan yili</p>
                        <p>Davlat raqam belgisi</p>
                        <p>Transport vositasi turi</p>
                        <p>Dvigatel raqami</p>
                        <p>Kuzov raqami</p>
                        <p>Shassi №</p>
                    </div>
                    {
                        cars?.map((item,index)=>{
                            return(
                                <div className='monitoring_table_header'>
                                    <p>{index +1}</p>
                                    <p>{item?.nomi}</p>
                                    <p>{item?.yili}</p>
                                    <p>{item?.raqam}</p>
                                    <p>{item?.turi}</p>
                                    <p>{item?.dvigatel}</p>
                                    <p>{item?.kuzov}</p>
                                    <p>{getShassi(item?.shassi)}</p>
                                </div>
                            )
                        })
                    }
                
                </div>
            </div>
            <p className='pdf_margin_top_40 black_text'>Yuqoridagi dalolatnomani tasdiqlaymiz:</p>
            <div className='between pdf_margin_top_20'>
                <p className='black_text'>Monitoring bo‘limi boshlig‘i:</p>
                <p>______________________________</p>
            </div>
            <div className='between pdf_margin_top_10'>
                <p className='black_text'>Monitoring bo‘limi mas'ul xodimi:</p>
                <p>______________________________</p>
            </div>
            <p className='pdf_margin_top_40 black_text'>Garovga qo‘yuvchi:</p>
            <div className='between pdf_margin_top_20'>
                <p className='black_text'>Usmonova Muyassar Abduvaliyevna _______________</p>
                <p></p>
            </div>
            <div className='between pdf_margin_top_10'>
                <p className='black_text'>tel:______________________________</p>
                <p></p>
            </div>
        </div>
    </>
  )
}

export default Monitoring