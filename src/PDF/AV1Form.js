import React, {useState, useEffect} from 'react'
import { Link,useLocation } from 'react-router-dom'
import { AiOutlineRollback, AiOutlinePrinter } from 'react-icons/ai'

// table_end_text
import './pdf.css'
import https from '../assets/https'

function AV1Form() {

    const location = useLocation()
    const orderId = location?.state?.id

    const [documentInfo, setDocumentInfo] = useState()

    useEffect(()=>{
        https
        .post(`/av1/${orderId}`, {})
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
            <AiOutlineRollback/>
            Back
            </Link>
            <button onClick={()=>window.print()}>
            Print
            <AiOutlinePrinter/>
            </button>
        </div>

        <div className='pdf_container'>
            <p className='text_black_18 text_center'>Kreditning asosiy shartlari to‘g‘risidagi axborot varaqasi</p>
            <div className='pdf_margin_top_20 text_degree'>
                <div className='grid margin '>
                    <p className='startRow'>Mikrokredit tashkilotining nomi</p>
                    <p className='endRow'>Renesans Mikrokredit Tashkiloti MChJ</p>
                </div>
                <div className='grid margin '>
                    <div className='column_div startColumn'>
                        <p>Mazkur varaqa kim tomondan to'ldirilgan</p>
                        <p>(F.I.O. va mikrokredit tashkiloti mutaxassisining lavozimi)</p>
                    </div>
                    <p className='endColumn'>{documentInfo?.employee_name}</p>
                </div>
                <div className='row_div between'>
                    <p>To‘ldirilgan sana</p> 
                    <p>{documentInfo?.order?.order_date}</p>
                </div>

                <div className='av1_form_part'>
                    <div className='row_div between margin '>
                        <p>1. Kreditning maqsadi (turi)</p>
                        <p>{documentInfo?.order?.aim}</p>
                    </div>
                    <div className='row_div between margin '>
                        <p>2. Ajratiladigan kreditning valyuta turi</p>
                        <p>so'm</p>
                    </div>
                    <div className='row_div between margin '>
                        <p>3. Kreditning miqdori</p>
                        <p>{documentInfo?.order?.sum?.toLocaleString()} so'm</p>
                    </div>
                    <div className='row_div between margin '>
                        <p>4. Kreditning muddati</p>
                        <p>{documentInfo?.order?.time}</p>
                    </div>
                    <div className='row_div between margin '>
                        <div className='column_div'>
                            <p>5. Kreditning foiz stavkasi </p>
                            <p>(nominal miqdorda)</p>
                        </div>
                        <div className='row_div'>
                            <div className='column_div center-column marginRight'>
                                <p>58%</p>
                                <p>(foiz ko‘rinishida)</p>
                            </div>
                            <div className='column_div center-column '>
                                <p>{documentInfo?.contract?.monthly_payment?.toLocaleString()}</p>
                                <p>(kreditning to‘liq muddatiga pul ko‘rinishida)</p>
                            </div>
                        </div>                   
                    </div>
                    <div className='grid between margin '>
                        <div className='column_div startColumn'>
                            <p>6. Kreditning to‘liq qiymati </p>
                            <p>(nominal foiz stavkasini va kreditga xizmat ko‘rsatish xarajatlarini o‘z ichiga oladi)</p>
                        </div>
                        <p className='endColumn'>{documentInfo?.contract?.total_interest?.toLocaleString()} soʻm</p>
                    </div>
                    <div className='row_div between margin '>
                        <div className='column_div'>
                            <p>7. To‘lovlarning davriyligi</p>
                            <p>(har oyda, har chorakda va boshqalar)</p>
                        </div>
                        <p>oyiga bir marta</p>
                    </div>
                    <div className='grid between margin '>
                        <div className='column_div startColumn'>
                            <p>8. Kreditni so‘ndirish usuli</p>
                            <p>{documentInfo?.contract?.type_repayment == '1' ? <p>(annuitet usulida (teng miqdorlarda)</p> : <p>differensial usulida(kamayib boruvchi)</p>},</p>
                            <p>kreditning qoldiq summasidan kamayib borish usulida va boshqalar)</p>     
                        </div>
                        <p className='endColumn'>Differentsial usulida (kamayib boruvchi)</p>
                    </div>
                    <div className='row_div between margin '>
                        <p>9. To‘lovlarning davrida bir martalik to‘lovning summasi</p>
                        <div className='column_div center-column'>
                            <p>5 985 205,42 soʻm</p>
                            <p>(differentsial usulida)</p>
                        </div>
                    </div>
                    <div className='row_div between margin '>
                        <p>10. Kredit bilan bog‘liq qo‘shimcha xarajatlar,jumladan:</p>
                        <div className='column_div center-column'>
                            <p>263 760 soʻm</p>
                            <p>(kreditning to‘liq muddatiga pul ko‘rinishida, jami)</p>
                        </div>
                    </div>    
                </div>

                <div className='av1_form_part'>
                    <div className='row_div between margin '>
                        <div className='column_div'>
                            <p>Turlari bo‘yicha mikrokredit tashkilotining komissiya va</p>
                            <p>yig‘imlari (alohida ko‘rsatilsin)</p>
                        </div>
                        <div className='column_div'>
                            <p>230,00 so'm</p>
                            <p>(kreditning to‘liq muddatiga pul ko‘rinishida)</p>
                        </div>
                    </div>
                    <div className='row-div between margin '>
                        <p>Uchinchi shaxslar xizmati (alohida ko‘rsatilsin)</p>
                        <p>263 760 soʻm	gacha</p>
                    </div>
                    <div className='row_div between margin '>
                        <div className='row_div'>
                            <p className='marginRight'>Kafillik</p>
                            <div className='column-div'>
                                <p>Sug‘urta</p>
                                <p>Otsenka</p>
                                <p>Notarius</p>
                            </div>
                        </div>
                        <div className='column_div'>
                            <p>100,00 so'm gacha</p>
                            <p>50,00 so'm gacha</p>
                            <p>80,00 so'm gacha</p>
                            <p>(kreditning to‘liq muddatiga pul ko‘rinishida)</p>
                        </div>
                    </div>
                </div>

                <div className='av1_form_part margin '>
                    <div className='row_div between'>
                        <div className='column_div'>
                            <p>1. Kreditning ta'minoti</p>
                            <p>(ta'minot predmetiga qo‘yiladigan minimal talablar, garovning minimal qiymati)</p>
                        </div>
                        <p>{documentInfo?.order?.sum?.toLocaleString()} so'm</p>
                    </div>
                </div>

                <div className='av1_form_part'>
                    <div className='column-div'>
                        <p className='marginBottom'>F.I.O.______________________________________________________________________________</p>
                        <p>Imzo__________________________</p>
                    </div>
                </div>               
            </div>
        </div>
    </>
  )
}

export default AV1Form