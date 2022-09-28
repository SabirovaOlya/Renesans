import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineRollback, AiOutlinePrinter } from 'react-icons/ai'

function AvtoForm() {

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
            <div className='endRow'>
                <p>Қарз шартномасига №_________</p>
            </div>
            <div className='endRow pdf_margin_top_10'>
                <p>Илова №1</p>
            </div>
            <p className='text_black_18 text_center pdf_margin_top_20'>
                Карз туловларини коплаш
            </p>
            <p className='text_black_18 text_center'>
                ЖАДВАЛИ
            </p>
            <div className='pdf_g1_table_first pdf_margin_top_30'>
                <div>
                    <p>Микроқарзнинг умумий миқдори</p>
                    <p>20 000 000,00 сўм</p>
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
            <div className='pdf_g1_table_second pdf_margin_top_40'>
                <div className='g1_table2_header'>
                    <p>т/р</p>
                    <p>Сўндириш санаси</p>
                    <p>Асосий қарз қолдиғи</p>
                    <p>Асосий қарз миқдори</p>
                    <p>Фоиз миқдори</p>
                    <p>Жами</p>
                </div>
                {
                    products?.map((item,index)=>{
                        return(
                            <div className='g1_table2_header'>
                                <p>{item?(index +1):0}</p>
                                <p>{item?.date}</p>
                                <p>{NumberSpace(item?.qoldi)} сўм</p>
                                <p>{NumberSpace(item?.miqdor)} сўм</p>
                                <p>{NumberSpace(item?.foiz)} сўм</p>
                                <p>{NumberSpace(item?(item.miqdor+ item.foiz):0)} сўм</p>
                            </div>
                        )
                    })
                }
                <div className='g1_table2_header'>
                    <p></p>
                    <p className='black_text'>Жами:</p>
                    <p></p>
                    <p className='black_text'>{getMiqdor()} сўм</p>
                    <p className='black_text'>{getFoiz()} сўм</p>
                    <p className='black_text'>{getJami()} сўм</p>
                </div>
            </div>
            <p className='text_black_18 pdf_margin_top_30 text_center'>Тақдим қилинадиган хужжатлар:</p>
            <div className='pdf_avto_table  pdf_margin_top_10'>
                <div className='avto_table_header'>
                    <p>Паспорт нусхаси</p>
                    <p>Эр-хотин паспорти</p>
                    <p>Никоҳни қайд гувоҳномаси</p>
                </div>
                <div className='avto_table_header'>
                    <p>Нотариал идорага тақдим қилинадиган хужжатлар</p>
                    <p>Транспорт воситасини қайт этиш гувохномаси</p>
                    <p>Даромади тўғрисида маълумотнома (агар иш жойига эга булса)</p>
                </div>
            </div>    
        </div> 
    </>
  )
}

export default AvtoForm