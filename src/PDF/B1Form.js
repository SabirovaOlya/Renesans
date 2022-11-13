import React, {useState, useEffect} from 'react'
import { Link ,useLocation} from 'react-router-dom'
import https from '../assets/https'

import Logo from '../assets/images/Logo'
import { AiOutlineRollback, AiOutlinePrinter } from 'react-icons/ai'
import './pdf.css'

function B1Form() {

  const location = useLocation()
  const orderId = location?.state?.id

  const [documentInfo, setDocumentInfo] = useState({})
  const [supply, setSupply] = useState([])

  useEffect(()=>{
    https
    .post(`/b1/${orderId}`, {})
    .then(res =>{
      setDocumentInfo(res?.data)
      res?.data?.supply_types?.map(item =>{
        if(!supply.includes(item.type)){
          supply.push(item.type)
        }
      })
    })
    .catch(err =>{
      console.log(err)
    })
  },[])
 
  return (
    <>
      <div className='pdf_header'>
        <Link to={`/buyurtma/singleBuyurtma/${orderId}`} className='clientform_back'>
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
        <div className='b1_subtitle'>	
            <span>"Renesans Mikrokredit Tashkiloti" MChJ </span>
            <span>{documentInfo?.branch_name}</span>
            <span>{documentInfo?.head_of_branch} ga</span>
        </div>
        <h1 className='text_black_18 text_center pdf_margin_top_30'>BUYURTMA</h1>
        <div className='pdf_margin_top_30 text_degree'>
            <p>Men, {documentInfo?.client?.name} , Sizdan  {documentInfo?.order?.sum?.toLocaleString()} so‘m miqdorida {documentInfo?.product} shartlari asosida {documentInfo?.order?.aim} uchun {documentInfo?.order?.time} oy muddatga {documentInfo?.contract?.type_credit == 'card' ? 'plastik kartada' : 'narx pulda'} mikroqarz ajratishingizni so‘rayman. Faoliyat turim: {documentInfo?.client?.job}, O‘rtacha oylik daromadim {documentInfo?.order?.salary?.toLocaleString()} so‘mni tashkil etadi.</p>
            <p className='pdf_margin_top_20'>Yashash manzilim: {documentInfo?.client?.address}. Shaxsimni tasdiqlovchi hujjat ma'lumotlari: {documentInfo?.serial_num} raqamli {documentInfo?.client?.doc_type}  {documentInfo?.client?.issued_date} y. da {documentInfo?.client?.issued_by} tomonidan berilgan.</p>
            <p className='pdf_margin_top_20'>Mikroqarz qaytarilishini {supply.join(',')} garovi  bilan ta'minlayman.</p>
            <p className='pdf_margin_top_20'> "Renesans Mikrokredit tashkiloti" MChJ mening buyurtmamni o‘rganish jarayonida va/yoki buyurtma asosida menga mikroqarz ajratilsa, mikroqarz shartnomasi bo‘yicha barcha majburiyatlarim to‘liq so‘ndirilgunga qadar men haqimda mening daromadlarim, majburiyatlarim, mavjud kredit va qarzlarim, kredit tarixim va/yoki boshqa har qanday ma'lumotlarni kredit byurolaridan, bank-moliya institutlaridan, soliq va ichki ishlar organlaridan, maxalla fuqarolar yig‘inlaridan va/yoki har qanday boshqa manbalardan og‘zaki yoki yozma ravishda so‘rab olinishiga roziligimni bildiraman. 
            <p className='pdf_margin_top_5'>
              Shu bilan birga, menga ajratiladigan mikroqarzning asosiy qarzi yoki unga hisoblangan foizlarni, shuningdek, shartnoma shartlarining men tomonimdan bajarilmasligi yoki lozim darajada bajarilmasligi natijasida yuzaga kelishi mumkin bo‘lgan zararlar, hisoblanadigan penya va jarimalarni  mening nomimga ochilgan barcha bank plastik kartalari, omonat va boshqa hisobvaraqlarimdan so‘zsiz (aktseptsiz) tartibda to‘liq undirib olinishiga rozilik beraman.</p>
            </p>
            {
              supply.includes('auto') ? <>
                <p className='pdf_margin_top_20'> Shuningdek, buyurtma berilgan mikroqarzga garov ta'minoti sifatida taklif etilayotgan garov ob'ekti to‘g‘risidagi ma'lumotlarni O‘zbekiston Respublikasining ''Garov reestri to‘g‘risida'' gi  Qonuniga muvofiq men bilan garov shartnomasi tuzilgan vaqtdan e'tiboran garov reestridan ro‘yxatdan o‘tkazish va zaruriy xollarda garov ob'ekti bilan bog‘liq boshqa ma'lumotlar kiritilishiga avvaldan rozilik bildiraman. </p>
              </> : <></>
            }
            <div className='b1_endData pdf_margin_top_20'>
                <span>Shaxsiy identifikatsiya raqamim (JShShIR) : {documentInfo?.client?.pinfl}</span>
                {
                  documentInfo?.contract?.type_credit == 'card' ? <>
                    <span>SSKS : {documentInfo?.contract?.ssks}</span>
                    <span>Bank : {documentInfo?.contract?.bank_name}</span>
                    <span>MFO : {documentInfo?.contract?.bank_code}</span>
                  </> : <></>
                }
            </div>
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