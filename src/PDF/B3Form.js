import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineRollback, AiOutlinePrinter } from 'react-icons/ai'
import Logo from '../assets/images/Logo'

import './pdf.css'

function B3Form() {
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
            <div>
                <div className='b1_img'>
                    <Logo width={400}/>
                </div>
                <p className='b1_subtitle'>	
                    <span>"Renesans Mikrokredit Tashkiloti" MChJ </span>
                    <span>Guliston filiali Boshqaruvchisi</span>
                    <span>Muxammadov B.M.ga</span>
                </p>
            </div>
            <h1 className='text_black_18 text_center pdf_margin_top_30'>Rozilik xati</h1>
            <div className='pdf_margin_top_30 text_degree'>
                <p>
                    Men, Usmonova Muyassar Abduvaliyevna, Omad qarzdorlar guruhi a'zolari Usmonova Muyassar Abduvaliyevna va Aliyev Ali Aliyvich  tomonidan buyurtma berilgan mikroqarzga garov ta'minoti sifatida taklif etilayotgan o‘zimga tegishli bo‘lgan tilla buyumlarni  ta'minot sifatida garovga qo‘yishga rozilik beraman.
                </p>
                <p className='pdf_margin_top_30'>
                    Shuningdek, buyurtma berilgan mikroqarzga garov ta'minoti sifatida taklif etilayotgan garov ob'ekti to‘g‘risidagi ma'lumotlarni O‘zbekiston Respublikasining ''Garov reestri to‘g‘risida'' gi  Qonuniga muvofiq men bilan garov shartnomasi tuzilgan vaqtdan e'tiboran garov reestridan ro‘yxatdan o‘tkazish va zaruriy xollarda garov ob'ekti bilan bog‘liq boshqa ma'lumotlar kiritilishiga avvaldan rozilik berishimni ma‘lum qilaman.
                </p>
                <p className='pdf_margin_top_30 pdf_margin_bottom_50'>
                    Ushbu rozilik xatiga shaxsimni tasdiqlovchi hujjatim va transport vositasini qayd etish quvohnomasining  nusxalarini ilova tarzida taqdim qilaman
                </p>
            </div>
            <p className='b1_lines'>
                <p>___________________________________________________________<pre>    </pre></p>
                <p className='section_space_pdf'>__________________</p>
            </p>
            <div className='b1_end'>
            <p>
            "<u><pre>        </pre></u>"
                <u><pre>                           </pre></u>
                20
                <u><pre>      </pre></u>
                <pre> </pre>y.
            </p>
            </div>
        </div>
    </>
  )
}

export default B3Form