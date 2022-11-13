import React,{useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import { AiOutlineRollback } from 'react-icons/ai'
import https from '../../assets/https';
import { List } from 'react-content-loader'
import './Taminot.css'

function SingleSugurta() {

    const [loading, setLoading] = useState(true)
    const [sugurtaInfo, setSugurtaInfo] = useState({})
    let { id } = useParams()

  useEffect(()=>{
    https
      .get(`/supply-info/${id}`)
      .then(res =>{
          setSugurtaInfo(res?.data)
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
                <h1 className='text_center filial_edit_text'>{sugurtaInfo?.order?.client?.name}</h1>
                <div className='pdf_margin_top_15'>
                <div className='single_buyurtma_info'>
                    <div className='single_buyurtma_inputs'>
                        <p>Ta'minot turi:</p>
                        <p>Sugurta kompaniyasi sugurta polisi</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Sug'urta kompaniyasining nomi</p>
                        <p>{sugurtaInfo?.insurance?.company_name}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Sugurta polis raqami:</p>
                        <p>{sugurtaInfo?.insurance?.policy}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Sug'urta summasi</p>
                        <p>{sugurtaInfo?.insurance?.sum}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Sug'urta sanasi:</p>
                        <p>{sugurtaInfo?.insurance?.issue_date}</p>
                    </div>

                    <div className='margin_top_30'>
                        <div className='single_buyurtma_inputs'>
                            <p>Buyurtma sanasi:</p>
                            <p>{sugurtaInfo?.order?.order_date}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Buyurtma paroli:</p>
                            <p>{sugurtaInfo?.order?.code}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Buyurtma statusi:</p>
                            <p>{Status(sugurtaInfo?.order?.status)}</p>
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

export default SingleSugurta