import React,{useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import { AiOutlineRollback } from 'react-icons/ai'
import './Taminot.css'
import https from '../../assets/https';


function SingleGold() {

    const [goldInfo, setGoldInfo] = useState({})
    let { id } = useParams()

    useEffect(()=>{
        https
        .get(`/supply-info/${id}`)
        .then(res =>{
            setGoldInfo(res?.data)
        })
        .catch(err =>{
            console.log(err);
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
        goldInfo?.gold?.map(item =>{
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
      <div className=' single_buyurtma'>
        <h1 className='text_center filial_edit_text'>{goldInfo?.order?.client?.name}</h1>
        <div className='pdf_margin_top_15'>
            <div className='single_buyurtma_info'>
                <div className='single_buyurtma_inputs'>
                    <p>Ta'minot turi:</p>
                    <p>Tilla Buyumlar Kafilligi</p>
                </div>
                <div className='single_buyurtma_inputs'>
                    <p></p>
                    <p>{goldInfo?.valued_by == 1 ? "O'zaro kelishuvga asosan" : "Mustaqil Baholash Asosida"}</p>
                </div>
                <div className='single_buyurtma_inputs'>
                    <p>Baholash hujjati sanasi:</p>
                    <p>{goldInfo?.date}</p>
                </div>
                <div className='single_buyurtma_inputs'>
                    <p>Qabul qilish qiymati, %da:</p>
                    <p>{goldInfo?.percent}</p>
                </div>
                <div className='single_buyurtma_inputs'>
                    <p>Qabul qilish qiymati, somda:</p>
                    <p>{goldInfo?.sum}</p>
                </div>

                <div className='margin_top_30'>
                    <div className='single_buyurtma_inputs'>
                        <p>Buyurtma sanasi:</p>
                        <p>{goldInfo?.order?.order_date}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Buyurtma paroli:</p>
                        <p>{goldInfo?.order?.code}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Buyurtma statusi:</p>
                        <p>{Status(goldInfo?.order?.status)}</p>
                    </div>
                </div>

                <div className={goldInfo?.company ? 'margin_top_30' : 'margin_top_30 close'}>
                    <div className='single_buyurtma_inputs'>
                        <p>Tilla buyumlarni baholovchi tashkilot:</p>
                        <p>{goldInfo?.company?.name}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Litsenziya:</p>
                        <p>{goldInfo?.company?.license}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Baholovchining ismi sharifi:</p>
                        <p>{goldInfo?.company?.valuer_name}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Baholash hujjati raqami:</p>
                        <p>{goldInfo?.company?.doc_code}</p>
                    </div>
                </div>
                {/* Table */}
                <div className='margin_top_30'>
                    <table className='single_table'>
                        <tbody>
                            <tr>
                                <td>№</td>
                                <td>Nomi</td>
                                <td>Proba</td>
                                <td>Birlik</td>
                                <td>Soni</td>
                                <td>Umumiy og`irligi(gr)</td>
                                <td>Toshlari og`irligi(gr)</td>
                                <td>Sof og`irligi(gr)</td>
                                <td>Gramm uchun narx(so`m)</td>
                                <td>Baholangan qiymati(som)</td>
                            </tr>
                            {
                                goldInfo?.gold?.map((item,index)=>{
                                    return(
                                    <tr key={item?.id}>
                                        <td>{index + 1}</td>
                                        <td>{item?.name}</td>
                                        <td>{item?.gold_num}</td>
                                        <td>{item?.measure}</td>
                                        <td>{item?.quantity}</td>
                                        <td>{item?.weight}</td>
                                        <td>{item?.stone_weight}</td>
                                        <td>{item?.clean_weight}</td>
                                        <td>{item?.gold_num_sum}</td>
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
      </div>
    </section>
  )
}

export default SingleGold