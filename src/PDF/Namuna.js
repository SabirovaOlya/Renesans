import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineRollback, AiOutlinePrinter } from 'react-icons/ai'

function Namuna() {

    const [products, setProducts] = useState([])

    useEffect(()=>{
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
                },
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
                },
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
    })

    function NumberSpace(a){
        return (a).toLocaleString()
    }

    const getMiqdor = () => {
        const newMiqdor = []
        products.map((item, index) => {
            newMiqdor.push(item.miqdor)
        })
        let totalMiqdor = newMiqdor.reduce((prev, current) => prev + current, 0)
        return totalMiqdor.toLocaleString()
    }

    const getFoiz = () => {
        const newFoiz = []
        products.map((item, index) => {
            newFoiz.push(item.foiz)
        })
        let totalFoiz = newFoiz.reduce((prev, current) => prev + current, 0)
        return totalFoiz.toLocaleString()
    }

    const getJami = () => {
        const newJami = []
        products.map((item, index) => {
            newJami.push(item.foiz +item.miqdor)
        })
        let totalJami = newJami.reduce((prev, current) => prev + current, 0)
        return totalJami.toLocaleString()
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
            <p className='text_black_18 text_center'>Карз туловларини коплаш</p>
            <p className='text_black_18 text_center pdf_margin_top_5'>ЖАДВАЛИ</p>
            <div className='pdf_g1_table_first pdf_margin_top_30'>
                <div>
                    <p>Микроқарзнинг умумий миқдори</p>
                    <p>20 000 000,00 so‘m</p>
                </div>
                <div>
                    <p>Микроқарз берилган сана</p>
                    <p>26.03.2022</p>
                </div>
                <div>
                    <p>Микроқарзни сўндириш санаси</p>
                    <p>26.07.2022</p>
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
                    products?.map((item,index)=>{
                        return(
                            <div className='g1_table2_header'>
                                <p>{item?(index +1):0}</p>
                                <p>{item?.date}</p>
                                <p>{NumberSpace(item?.qoldi)} so'm</p>
                                <p>{NumberSpace(item?.miqdor)} so'm</p>
                                <p>{NumberSpace(item?.foiz)} so'm</p>
                                <p>{NumberSpace(item?(item.miqdor+ item.foiz):0)} so'm</p>
                            </div>
                        )
                    })
                }
                <div className='g1_table2_header'>
                    <p></p>
                    <p className='black_text'>Jami:</p>
                    <p></p>
                    <p className='black_text'>{getMiqdor()} so'm</p>
                    <p className='black_text'>{getFoiz()} so'm</p>
                    <p className='black_text'>{getJami()} so'm</p>
                </div>
            </div>
            <div className='pdf_namuna_end_table pdf_margin_top_30'>
                <div className='namuna_table_section'>
                    <p className='black_text'>Қарз олувчи:</p>
                    <p>Паспорт (оригинал)</p>
                    <p>Сўнгги 12 ой учун иш жойидан даромади тўғрисида маълумотнома</p>
                    <p>СТИР (ИНН) нусхаси</p>
                </div>
                <div className='namuna_table_section'>
                    <p className='black_text'>Кафиллик берувчи:</p>
                    <p>Паспорт (оригинал)</p>
                    <p>Сўнгги 12 ой учун иш жойидан даромади тўғрисида маълумотнома</p>
                    <p>СТИР (ИНН) нусхаси</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Namuna