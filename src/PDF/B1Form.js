import React from 'react'
import './pdf.css'
import Logo from '../assets/images/Logo'
import { Link } from 'react-router-dom'
import { AiOutlineRollback, AiOutlinePrinter } from 'react-icons/ai'

function B1Form() {
  const buyurtmaData = {
    name: "Usmonova Muyassar Abduvalievna",
    qarz_miqdor: 20000000,
    qarz_miqdor_text: 'Yigirma million som 00 tiyin',
    buyurtma_date: '21/12/22',
    kredit_qomita_asosan: true,
    muddat_time: 4,
    sektor: 3,
    maqsadi: "shirinlik mahsulotlari savdosi",
    kredit_mahsulot_name: 'ReneTrade',
    oylik_daromad: 4800000,
    pass_id: 'AB2300850',
    ssks: `8600 4829 3851 1174`,
    bank: 'Universal Bank Toshkent filiali',
    pinfl: `41307792870060`,
    mfo: '00996'
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
        <div className='b1_img'>
            <Logo width={400}/>
        </div>
        <p className='b1_subtitle'>	
            <span>"Renesans Mikrokredit Tashkiloti" MChJ </span>
            <span>Guliston filiali Boshqaruvchisi</span>
            <span>Muxammadov B.M.ga</span>
        </p>
        <h1 className='text_black_18 text_center pdf_margin_top_30'>BUYURTMA</h1>
        <div className='pdf_margin_top_30 text_degree'>
            <p>Men, {buyurtmaData.name}, Sizdan  {buyurtmaData.qarz_miqdor} so‘m miqdorida {buyurtmaData.kredit_mahsulot_name} shartlari asosida shirinlik mahsulotlari savdosi uchun {buyurtmaData.muddat_time} oy muddatga   naqd pulda mikroqarz ajratishingizni so‘rayman. Faoliyat turim: {buyurtmaData.maqsadi}, O‘rtacha oylik daromadim {buyurtmaData.oylik_daromad} so‘mni tashkil etadi.</p>
            <p className='pdf_margin_top_20'>Yashash manzilim: Sirdaryo viloyati Guliston shahri Begmatov ko‘chasi 46-uy 10-xonadon. Shaxsimni tasdiqlovchi hujjat ma'lumotlari: {buyurtmaData.pass_id} raqamli O‘zR Fuqarosining biometrik pasporti  17.12.2015 y. da Sirdaryo viloyati Guliston shahar IIB tomonidan berilgan.</p>
            <p className='pdf_margin_top_20'>Mikroqarz qaytarilishini tilla buyumlar garovi  bilan ta'minlayman.</p>
            <p className='pdf_margin_top_20'> "Renesans Mikrokredit tashkiloti" MChJ mening buyurtmamni o‘rganish jarayonida va/yoki buyurtma asosida menga mikroqarz ajratilsa, mikroqarz shartnomasi bo‘yicha barcha majburiyatlarim to‘liq so‘ndirilgunga qadar men haqimda mening daromadlarim, majburiyatlarim, mavjud kredit va qarzlarim, kredit tarixim va/yoki boshqa har qanday ma'lumotlarni kredit byurolaridan, bank-moliya institutlaridan, soliq va ichki ishlar organlaridan, maxalla fuqarolar yig‘inlaridan va/yoki har qanday boshqa manbalardan og‘zaki yoki yozma ravishda so‘rab olinishiga roziligimni bildiraman. 
            <p className='pdf_margin_top_5'>
              Shu bilan birga, menga ajratiladigan mikroqarzning asosiy qarzi yoki unga hisoblangan foizlarni, shuningdek, shartnoma shartlarining men tomonimdan bajarilmasligi yoki lozim darajada bajarilmasligi natijasida yuzaga kelishi mumkin bo‘lgan zararlar, hisoblanadigan penya va jarimalarni  mening nomimga ochilgan barcha bank plastik kartalari, omonat va boshqa hisobvaraqlarimdan so‘zsiz (aktseptsiz) tartibda to‘liq undirib olinishiga rozilik beraman.</p>
            </p>
            <p className='pdf_margin_top_20'> Shuningdek, buyurtma berilgan mikroqarzga garov ta'minoti sifatida taklif etilayotgan garov ob'ekti to‘g‘risidagi ma'lumotlarni O‘zbekiston Respublikasining ''Garov reestri to‘g‘risida'' gi  Qonuniga muvofiq men bilan garov shartnomasi tuzilgan vaqtdan e'tiboran garov reestridan ro‘yxatdan o‘tkazish va zaruriy xollarda garov ob'ekti bilan bog‘liq boshqa ma'lumotlar kiritilishiga avvaldan rozilik bildiraman. </p>
            <p className='b1_endData pdf_margin_top_20'>
                <span>Shaxsiy identifikatsiya raqamim (JShShIR) : {buyurtmaData.pinfl}</span>
                <span>SSKS : {buyurtmaData.ssks}</span>
                <span>Bank : {buyurtmaData.bank}</span>
                <span>MFO : {buyurtmaData.mfo}</span>
            </p>
        </div>
        <p className='b1_lines'>
            <span></span>
            <span></span>
        </p>
        <div className='b1_end'>
          <p>
          "<u><pre>        </pre></u>"
            <u><pre>                       </pre></u>
            20
            <u><pre>       </pre></u>
            <pre> </pre>y.
          </p>
        </div>
      </div>
    </>
  )
}

export default B1Form