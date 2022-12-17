import React,{useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import { AiOutlineRollback } from 'react-icons/ai'
import https from '../../assets/https';
import { List } from 'react-content-loader'
import './Taminot.css'

function SingleUchinchi() {

    const [loading, setLoading] = useState(true)    
    const [thirdTaminot, setThirdTaminot] = useState({})
    let { id } = useParams()

  useEffect(()=>{
    https
      .get(`/supply-info/${id}`)
      .then(res =>{
          setThirdTaminot(res?.data)
          setTimeout(()=>{
            setLoading(false)
          },300)
      })
      .catch(err =>{
          console.log(err)
      })
  },[])


  function Status(text){
    if(text == 'pending'){
        return "kutish jarayonida"
    }else if(text == 'accepted'){
        return "tasdiqlandi"
    }else if(text == 'denied'){
        return "rad etildi"
    }
  }

  return (
    <section>
      <div className='filialform_header'>
        <Link to='/taminot' className='clientform_back'>
            <AiOutlineRollback />
            Orqaga
        </Link>
      </div>
      <div className='single_buyurtma'>
        {
            loading ? (
                <div className='margin_top_30'>
                    <List/>
                </div>
            ) : (
            <>
                <h1 className='text_center filial_edit_text'>{thirdTaminot?.order?.client?.name}</h1>
                <div className='pdf_margin_top_15'>
                <div className='single_buyurtma_info'>
                    <div className='single_buyurtma_inputs'>
                        <p>Ta'minot turi:</p>
                        <p>3 shaxs kafilligi</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Uchinchi mulki egasining F.I.Sh.</p>
                        <p>{thirdTaminot?.owner?.fio}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Shaxsini tasdiqlovchi xujjat:</p>
                        <p>{thirdTaminot?.owner?.doc_type}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Seriyasi va raqami</p>
                        <p>{thirdTaminot?.owner?.serial_num}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Kim tomonidan berilgan:</p>
                        <p>{thirdTaminot?.owner?.issued_by}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Berilgan sana</p>
                        <p>{thirdTaminot?.owner?.issue_date}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Telefon Raqami:</p>
                        <p>{thirdTaminot?.owner?.phone}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Ro'yxat bo'yicha yashash manzili</p>
                        <p>{thirdTaminot?.owner?.address}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Identifikatsiya raqami (JShShIR):</p>
                        <p>{thirdTaminot?.owner?.pinfl}</p>
                    </div>

                    <div className='margin_top_30'>
                        <div className='single_buyurtma_inputs'>
                            <p>Buyurtma sanasi:</p>
                            <p>{thirdTaminot?.order?.order_date}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Buyurtma kodi:</p>
                            <p>{thirdTaminot?.order?.code}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Buyurtma statusi:</p>
                            <p>{Status(thirdTaminot?.order?.status)}</p>
                        </div>
                    </div>
                </div>
                </div>
            </>
            )
        }
      </div>
    </section>
  )
}

export default SingleUchinchi