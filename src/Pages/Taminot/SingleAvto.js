import React,{useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import { AiOutlineRollback } from 'react-icons/ai'
import https from '../../assets/https';
import { List } from 'react-content-loader'
import './Taminot.css'

function SingleAvto() {

    const [loading, setLoading] = useState(true)
    const [avtoInfo, setAvtoInfo] = useState({})
    let { id } = useParams()

  useEffect(()=>{
    https
      .get(`/supply-info/${id}`)
      .then(res =>{
          setAvtoInfo(res?.data)
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

  function totalSum(){
    let sum =[]
    avtoInfo?.auto?.map(item =>{
        sum.push(item?.sum)
    })

    let total = sum.reduce((prev, current) => prev + current, 0)
    return total.toLocaleString()
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
                    <h1 className='text_center filial_edit_text'>{avtoInfo?.order?.client?.name}</h1>
                    <div className='pdf_margin_top_15'>
                    <div className='single_buyurtma_info'>
                        <div className='single_buyurtma_inputs'>
                            <p>Ta'minot turi:</p>
                            <p>Transport Vositasi Garovi</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Garov mulkining egasi</p>
                            <p>{
                                avtoInfo?.trust_owner ? 'Ishonchnoma asosida' : avtoInfo?.owner ? 'Uchinchi shaxs' : "Mijozning o'zi"
                            }</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p></p>
                            <p>{avtoInfo?.valued_by == 1 ? "O'zaro kelishuvga asosan" : "Mustaqil Baholash Asosida"}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Baholovchi hujjat sanasi</p>
                            <p>{avtoInfo?.date}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Qabul qilish qiymati, %da</p>
                            <p>{avtoInfo?.percent}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Qabul qilish qiymati, so'mda</p>
                            <p>{avtoInfo?.sum}</p>
                        </div>
                        {/* Buyurtma,client info */}
                        <div className='margin_top_30'>
                            <div className='single_buyurtma_inputs'>
                                <p>Buyurtma sanasi:</p>
                                <p>{avtoInfo?.order?.order_date}</p>
                            </div>
                            <div className='single_buyurtma_inputs'>
                                <p>Buyurtma kodi:</p>
                                <p>{avtoInfo?.order?.code}</p>
                            </div>
                            <div className='single_buyurtma_inputs'>
                                <p>Buyurtma statusi:</p>
                                <p>{Status(avtoInfo?.order?.status)}</p>
                            </div>
                        </div>
                        {/* Company */}
                        <div className={avtoInfo?.company ? 'margin_top_30' : 'close'}>
                            <div className='single_buyurtma_inputs'>
                                <p>Tilla buyumlarni baholovchi tashkilot:</p>
                                <p>{avtoInfo?.company?.name}</p>
                            </div>
                            <div className='single_buyurtma_inputs'>
                                <p>Litsenziya:</p>
                                <p>{avtoInfo?.company?.license}</p>
                            </div>
                            <div className='single_buyurtma_inputs'>
                                <p>Baholovchining ismi sharifi:</p>
                                <p>{avtoInfo?.company?.valuer_name}</p>
                            </div>
                            <div className='single_buyurtma_inputs'>
                                <p>Baholash hujjati raqami:</p>
                                <p>{avtoInfo?.company?.doc_code}</p>
                            </div>
                        </div>
                        {/* Owner */}
                        <div className={avtoInfo?.owner ? 'margin_top_30' : 'close'}>
                            <p className='kl1_jami text_center'>Garov mulki egasining ma'lumotlari</p>
                            <div className='single_buyurtma_inputs margin_top_10'>
                                <p>Garov mulki egasining F.I.Sh.:</p>
                                <p>{avtoInfo?.owner?.fio}</p>
                            </div>
                            <div className='single_buyurtma_inputs'>
                                <p>Shaxsini tasdiqlovchi xujjat turi:</p>
                                <p>{avtoInfo?.owner?.doc_type}</p>
                            </div>
                            <div className='single_buyurtma_inputs'>
                                <p>Seriyasi va raqami:</p>
                                <p>{avtoInfo?.owner?.serial_num}</p>
                            </div>
                            <div className='single_buyurtma_inputs'>
                                <p>Kim tomonidan berilgan:</p>
                                <p>{avtoInfo?.owner?.issued_by}</p>
                            </div>
                            <div className='single_buyurtma_inputs'>
                                <p>Berilgan sana:</p>
                                <p>{avtoInfo?.owner?.issue_date}</p>
                            </div>
                            <div className='single_buyurtma_inputs'>
                                <p>Ro'yxat bo'yicha yashash manzili:</p>
                                <p>{avtoInfo?.owner?.address}</p>
                            </div>
                            {/* <div className='single_buyurtma_inputs'>
                                <p>Telefon raqami:</p>
                                <p>{avtoInfo?.owner?.phone}</p>
                            </div> */}
                            <div className='single_buyurtma_inputs'>
                                <p>Identifikatsiya raqami (JShShIR) :</p>
                                <p>{avtoInfo?.owner?.pinfl}</p>
                            </div>
                        </div>
                        {/* Trust_Owner */}
                        <div className={avtoInfo?.trust_owner ? 'margin_top_30' : 'close'}>
                            <p className='kl1_jami text_center'>Ishonchnoma berilgan shaxs ma'lumotlari</p>
                            <div className='single_buyurtma_inputs margin_top_10'>
                                <p>F.I.Sh.:</p>
                                <p>{avtoInfo?.trust_owner?.fio}</p>
                            </div>
                            <div className='single_buyurtma_inputs'>
                                <p>Shaxsini tasdiqlovchi hujjat turi:</p>
                                <p>{avtoInfo?.trust_owner?.doc_type}</p>
                            </div>
                            <div className='single_buyurtma_inputs'>
                                <p>Seriyasi va raqami:</p>
                                <p>{avtoInfo?.trust_owner?.serial_num}</p>
                            </div>
                            <div className='single_buyurtma_inputs'>
                                <p>Kim tomonidan berilgan:</p>
                                <p>{avtoInfo?.trust_owner?.issued_by}</p>
                            </div>
                            <div className='single_buyurtma_inputs'>
                                <p>Berilgan sana:</p>
                                <p>{avtoInfo?.trust_owner?.issue_date}</p>
                            </div>
                            <div className='single_buyurtma_inputs'>
                                <p>Ro'yxat bo'yicha yashash manzili:</p>
                                <p>{avtoInfo?.trust_owner?.address}</p>
                            </div>
                            <div className='single_buyurtma_inputs'>
                                <p>Ishonchnoma raqami:</p>
                                <p>{avtoInfo?.trust_owner?.proxy_number}</p>
                            </div>
                            <div className='single_buyurtma_inputs'>
                                <p>Ishonchnoma berilgan sana:</p>
                                <p>{avtoInfo?.trust_owner?.date}</p>
                            </div>
                            <div className='single_buyurtma_inputs'>
                                <p>Identifikatsiya raqami (JShShIR):</p>
                                <p>{avtoInfo?.trust_owner?.pinfl}</p>
                            </div>
                        </div>
                        {/* Table */}

                        <div className='margin_top_30'>
                            <table className='single_table'>
                                <tbody>
                                    <tr>
                                        <td>№</td>
                                        <td>Nomi</td>
                                        <td>Ishlab chiqarilgan yil</td>
                                        <td>Davlat raqam belgisi</td>
                                        <td>Transport vositasi turi</td>
                                        <td>Qayd etish guvohnomasi</td>
                                        <td>Dvigatel raqami</td>
                                        <td>Kuzov raqami</td>
                                        <td>Shassi №</td>
                                        <td>Baholangan qiymati, so'm</td>
                                    </tr>
                                    {
                                        avtoInfo?.auto?.map((item,index)=>{
                                            return(
                                            <tr key={item?.id}>
                                                <td>{index + 1}</td>
                                                <td>{item?.name}</td>
                                                <td>{item?.year}</td>
                                                <td>{item?.number}</td>
                                                <td>{item?.type_of_auto}</td>
                                                <td>{item?.registration_cert}</td>
                                                <td>{item?.engine_number}</td>
                                                <td>{item?.body_code}</td>
                                                <td>{item?.chassis}</td>
                                                <td>{item?.sum}</td>
                                            </tr>
                                            )
                                        })
                                    }
                            
                                </tbody>
                            </table>
                            <div className='endRow margin_top_20'>
                                <p className='kl1_jami'>JAMI: {totalSum()} so`m</p>
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

export default SingleAvto