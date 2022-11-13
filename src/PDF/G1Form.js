import React, {useState,useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineRollback, AiOutlinePrinter } from 'react-icons/ai'
import https from '../assets/https'

function G1Form() {

    const [products, setProducts] = useState([])

    const location = useLocation()
    const orderId = location?.state?.id

    const [ documentInfo, setDocumentInfo] = useState({})
    const [orderInfo, setOrderInfo] = useState({})

    useEffect(()=>{
        https
        .post(`/g1/${orderId}`, {})
        .then(res =>{
            setDocumentInfo(res?.data)
        })
        .catch(err =>{
            console.log(err)
        })

        https
        .get(`/orders/${orderId}`)
        .then(res =>{
            setOrderInfo(res?.data)
        })


        setProducts(
            [
                {
                    date:'26.04.2022', 
                    qoldi:20000000.00, 
                    miqdor:5000000.00, 
                    foiz:985205.42	
                },
                {
                    date:'26.05.2022', 
                    qoldi:15000000.00, 
                    miqdor:5000000.00, 
                    foiz:715068.60
	
                },
                {
                    date:'26.06.2022', 
                    qoldi:10000000.00, 
                    miqdor:5000000.00, 
                    foiz:492602.71	
                },
                {
                    date:'26.07.2022', 
                    qoldi:5000000.00, 
                    miqdor:5000000.00, 
                    foiz:238356.30	
                }
            ]
        )
    },[])

    function GetSummaText(arr, section){
        let array = []
        arr?.map((item, index) => {
            array.push(item[section])
        })
        let total = array.reduce((prev, current) => prev + current, 0)
        return total.toLocaleString()
    }

    function GetSumma(arr, section){
        let array = []
        arr?.map((item, index) => {
            array.push(item[section])
        })
        let total = array.reduce((prev, current) => prev + current, 0)
        return total
    }  

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
            <div className='endRow'>
                <p>Qarz shartnomasiga №_______________</p>
            </div>
            <div className='endRow pdf_margin_top_10'>
                <p>Ilova №1</p>
            </div>
            <p className='text_black_18 text_center pdf_margin_top_20'>
                Qarz to‘lovlarini qoplash
            </p>
            <p className='text_black_18 text_center'>
                JADVALI
            </p>
            <p className='text_black_18 text_center pdf_margin_top_10'>
                {documentInfo?.client?.name}
            </p>
            <div className='pdf_g1_table_first pdf_margin_top_20'>
                <div>
                    <p>Mikroqarzning umumiy miqdori</p>
                    <p>{documentInfo?.order?.sum?.toLocaleString()} so‘m</p>
                </div>
                <div>
                    <p>Mikroqarz berilgan sana</p>
                    <p>{documentInfo?.order?.order_date}</p>
                </div>
                <div>
                    <p>Mikroqarzni so‘ndirish sanasi</p>
                    <p>{documentInfo?.graph?.[documentInfo?.graph?.length - 1]?.date_of_payment}</p>
                </div>
            </div>
            <div className='pdf_g1_table_second pdf_margin_top_30'>
                <div className='g1_table2_header'>
                    <p>t/r</p>
                    <p>So‘ndirish sanasi</p>
                    <p>Asosiy qarz qoldig‘i</p>
                    <p>Asosiy qarz miqdori</p>
                    <p>Foiz miqdori</p>
                    <p>Jami</p>
                </div>
                {
                    documentInfo?.graph?.map((item,index)=>{
                        return(
                            <div className='g1_table2_header' key={item?.['#']}>
                                <p>{index +1}</p>
                                <p>{item?.date_of_payment}</p>
                                <p>{item?.principal_debt_left?.toLocaleString()} so'm</p>
                                <p>{item?.monthly_payment?.toLocaleString()} so'm</p>
                                <p>{item?.principal_debt?.toLocaleString()} so'm</p>
                                <p>{(item?.monthly_payment + item?.principal_debt)?.toLocaleString()} so'm</p>
                            </div>
                        )
                    })
                }
                <div className='g1_table2_header'>
                    <p></p>
                    <p className='black_text'>Jami:</p>
                    <p></p>
                    <p className='black_text'>{GetSummaText(documentInfo?.graph, 'monthly_payment')} so'm</p>
                    <p className='black_text'>{GetSummaText(documentInfo?.graph, 'principal_debt')} so'm</p>
                    <p className='black_text'>{(GetSumma(documentInfo?.graph, 'monthly_payment') + GetSumma(documentInfo?.graph, 'principal_debt'))?.toLocaleString()} so'm</p>
                </div>
            </div>
            <div className='text_degree'>
                <div className='pdf_end_2sections pdf_margin_top_40'>
                    <div className='pdf_end_2sections_section'>
                        <p className='black_text'>Qarz beruvchi:</p>
                        <div className='pdf_margin_top_20 section_space_pdf'>
                            <p className='black_text text_center'>{documentInfo?.branch?.name}</p>
                            <p className='pdf_margin_top_20'>{documentInfo?.branch?.address}</p>
                            <p>STIR:{documentInfo?.branch?.requisite}  OKED:{documentInfo?.branch?.int}</p>
                            <p>Tel:{documentInfo?.branch?.phone}</p>
                        </div>
                    </div>
                    <div className='pdf_end_2sections_section'>
                        <p className='black_text'>Qarz oluvchi:</p>
                        <div className='pdf_margin_top_20 section_space_pdf'>
                            <p className='black_text text_center'>{documentInfo?.client?.name}</p>
                            <p className='pdf_margin_top_20'>{documentInfo?.client?.serial_num} raqamli {documentInfo?.client?.doc_type} {documentInfo?.client?.issued_date} da {documentInfo?.client?.issued_by} tomonidan berilgan.</p>
                            <p>Yashash manzili: {documentInfo?.client?.address}</p>
                            <p>JSh ShIR: {documentInfo?.client?.pinfl}</p>
                            {/* <p>Telefon: {documentInfo?.client?.}</p> */}
                        </div>
                    </div>
                </div>
                <div className='pdf_end_2sections pdf_margin_top_40'>
                    <div className='pdf_end_2sections_section'>
                        <div className='between'>
                            <p>Boshqaruvchi</p>
                            <p>{documentInfo?.branch?.head_of_branch}</p>
                        </div>
                        <div className='between pdf_margin_top_20'>
                            <p>Bosh buxgalter</p>
                            <p>{documentInfo?.branch?.chief_accountant}</p>
                        </div>
                    </div>
                    <div className='pdf_end_2sections_section'>
                        <div className='between'>
                            <p>{documentInfo?.client?.name}</p>
                            <p></p>
                        </div>
                        <div className='between pdf_margin_top_20'>
                            <p> </p>
                            <p>_______________</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default G1Form