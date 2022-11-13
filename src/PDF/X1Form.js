import React, {useState, useEffect} from 'react'
import './pdf.css'
import Logo from '../assets/images/Logo'
import { Link,useLocation } from 'react-router-dom'
import { AiOutlineRollback, AiOutlinePrinter } from 'react-icons/ai'
import https from '../assets/https'

function X1Form() {

    const location = useLocation()
    const orderId = location?.state?.id

    const [documentInfo, setDocumentInfo] = useState({})

    useEffect(()=>{
        https
        .post(`/x1/${orderId}`, {})
        .then(res =>{
            setDocumentInfo(res?.data)
        })
        .catch(err =>{
            console.log(err)
        })
    },[])

    return (
        <>
            <div className='pdf_header'>
                <Link to={`/buyurtma/singleBuyurtma/${orderId}`} className='clientform_back'>
                    <AiOutlineRollback />
                    Back
                </Link>
                <button onClick={() => window.print()}>
                    Print
                    <AiOutlinePrinter />
                </button>
            </div>
            <div className='pdf_container'>
                <div className='b1_img_start margin_top_minus'>
                    <Logo width={300} />
                </div>
                <div className='x1_preview_part pdf_margin_top_10'>
                    <div className='x1_preview_div'>
                        <p className='text_black_18'>{documentInfo?.client?.name}ga</p>
                        <p className="pdf_margin_top_10">{documentInfo?.client?.address}</p>
                    </div>
                </div>
                <div className='text_degree pdf_margin_top_30'>
                    <p>
                        Sizning {documentInfo?.order?.order_date} yildagi {documentInfo?.order?.number}-sonli kredit olish uchun bergan buyurtmangiz Renesans Mikrokredit Tashkiloti tomonidan ko'rib chiqildi va "Renesans Mikrokredit Tashkiloti" MChJ Guliston filiali Kredit Komissiyasining {documentInfo?.order?.order_date} yildagi {documentInfo?.order?.number}-sonli yig'ilish qaroriga ko'ra quyidagi sabablarga asoslangan holda rad etildi:
                    </p>
                    <ul className='pdf_margin_top_20'>
                        <li className='point_list'>
                            {documentInfo?.order?.reason ? documentInfo?.order?.reason : 'sabab yok'}
                        </li>
                    </ul>
                    <p className='pdf_margin_top_30'>
                        Yuqoridagi sabablar bartaraf etilganidan so'ng Renesans Mikrokredit Tashkilotiga qaytadan kredit uchun buyurtma berishingiz mumkin.
                    </p>
                    <p className='pdf_margin_top_20'>
                        Shuningdek, ushbu qarordan horozi bo'lsangiz {documentInfo?.branch_name}ning yuqori boshqaruv organlariga yoki O'zbekiston Respublikasining tegishli sudlariga murojaat etishingiz mumkinligini ma'lum qilamiz.
                    </p>
                    <p className='pdf_margin_top_40'>Hurmat bilan,</p>
                    <div className='pdf_margin_top_15 between align_center'>
                        <p className='x1_end_width400'>{documentInfo?.branch_name} Boshqaruvchisi</p>
                        <p>{documentInfo?.head_of_branch}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default X1Form