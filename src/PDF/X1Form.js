import React from 'react'
import './pdf.css'
import Logo from '../assets/images/Logo'
import { Link } from 'react-router-dom'
import { AiOutlineRollback, AiOutlinePrinter } from 'react-icons/ai'

function X1Form() {
    return (
        <>
            <div className='pdf_header'>
                <Link to='/buyurtma/singleBuyurtma' className='clientform_back'>
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
                        <p className='text_black_18'>Usmonova Muyassar Abduvaliyevnaga</p>
                        <p className="pdf_margin_top_10">Sirdaryo viloyati Guliston shahri Begmatov ko`chasi 46-uy 10-xonadon</p>
                    </div>
                    <div className='x1_preview_div pdf_margin_top_30'>
                        <p className='text_black_18'>Aliyev Ali Aliyvichga</p>
                        <p className="pdf_margin_top_10">Toshkent viloyati Bo`ka tumani X.Olimjon ko`chasi 4 uy</p>
                    </div>
                </div>
                <div className='text_degree pdf_margin_top_30'>
                    <p>
                        Sizning 11.02.2022 yildagi 4-41/22-sonli kredit olish uchun bergan buyurtmangiz Renesans Mikrokredit Tashkiloti tomonidan ko'rib chiqildi va "Renesans Mikrokredit Tashkiloti" MChJ Guliston filiali Kredit Komissiyasining 11.02.2022 yildagi 4-41/22-sonli yig'ilish qaroriga ko'ra quyidagi sabablarga asoslangan holda rad etildi:
                    </p>
                    <ul className='pdf_margin_top_20'>
                        <li className='point_list'>
                            Buyurtmachining daromadlari qarz to'lovlarini qoplashga yetarli emas;
                        </li>
                        <li className='pdf_margin_top_10 point_list'>
                            Buyurtmachining boshqa bank va (yoki) kredit tashkilotlari oldidagi qarzlari bo'yicha to'lovlar uning doimiy tusdagi daromadlarining 50%idan oshiq;
                        </li>
                        <li className='pdf_margin_top_10 point_list'>
                            Buyurtmachining boshqa bank va (yoki) kredit tashkilotlari oldidagi buyurtma sanasiga to'lov muddati o'tkazib yuborilgan, so'ndirilmagan qarzdorligi mavjud;
                        </li>
                        <li className='pdf_margin_top_10 point_list'>
                            Buyurtmachi tomonidan buyurtmani ko'rib chiqish uchun zarur bo'lgan hujjatlar to'plami to'liq taqdim etilmagan;
                        </li>
                    </ul>
                    <p className='pdf_margin_top_30'>
                        Yuqoridagi sabablar bartaraf etilganidan so'ng Renesans Mikrokredit Tashkilotiga qaytadan kredit uchun buyurtma berishingiz mumkin.
                    </p>
                    <p className='pdf_margin_top_20'>
                        Shuningdek, ushbu qarordan horozi bo'lsangiz "Renesans Mikrokredit Tashkiloti" MChJ filialining yuqori boshqaruv organlariga yoki O'zbekiston Respublikasining tegishli sudlariga murojaat etishingiz mumkinligini ma'lum qilamiz.
                    </p>
                    <p className='pdf_margin_top_40'>Hurmat bilan,</p>
                    <div className='pdf_margin_top_15 between align_center'>
                        <p className='x1_end_width400'>"Renesans Mikrokredit Tashkiloti" MChJ Guliston filiali Boshqaruvchisi</p>
                        <p>Muxammadov B.M.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default X1Form