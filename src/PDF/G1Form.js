import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineRollback, AiOutlinePrinter } from 'react-icons/ai'

function G1Form() {

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
                Usmonova Muyassar Abduvaliyevna
            </p>
            <div className='pdf_g1_table_first pdf_margin_top_20'>
                <div>
                    <p>Mikroqarzning umumiy miqdori</p>
                    <p>20 000 000,00 so‘m</p>
                </div>
                <div>
                    <p>Mikroqarz berilgan sana</p>
                    <p>26.03.2022</p>
                </div>
                <div>
                    <p>Mikroqarzni so‘ndirish sanasi</p>
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
            <div className='text_degree'>
                <div className='pdf_end_2sections pdf_margin_top_40'>
                    <div className='pdf_end_2sections_section'>
                        <p className='black_text'>Qarz beruvchi:</p>
                        <div className='pdf_margin_top_20 section_space_pdf'>
                            <p className='black_text text_center'>"Renesans Mikrokredit Tashkiloti" MChJ Guliston filiali</p>
                            <p className='pdf_margin_top_20'>Sirdaryo viloyati, Guliston shahri, Samarqand ko‘chasi, Yangi bozor mavzesi, Xumo savdo majmuasi.</p>
                            <p>H/r 20 216 000 004 636 656 001 MFO 00996 ATB Universal Bank Toshkent filiali</p>
                            <p>STIR 300 515 648    OKED 64920</p>
                        </div>
                    </div>
                    <div className='pdf_end_2sections_section'>
                        <p className='black_text'>Qarz oluvchi:</p>
                        <div className='pdf_margin_top_20 section_space_pdf'>
                            <p className='black_text text_center'>Usmonova Muyassar Abduvaliyevna</p>
                            <p className='pdf_margin_top_20'>AB2300850 raqamli O‘zR Fuqarosining biometrik pasporti   17.12.2015 da Sirdaryo viloyati Guliston shahar IIB tomonidan berilgan.</p>
                            <p>Yashash manzili: Sirdaryo viloyati Guliston shahri Begmatov ko‘chasi 46-uy 10-xonadon</p>
                            <p>JSh ShIR: 41-3077-9287-0060</p>
                            <p>Telefon: 99/4703535"</p>
                        </div>
                    </div>
                </div>
                <div className='pdf_end_2sections pdf_margin_top_40'>
                    <div className='pdf_end_2sections_section'>
                        <div className='between'>
                            <p>Boshqaruvchi</p>
                            <p>Muxammadov B.M.</p>
                        </div>
                        <div className='between pdf_margin_top_20'>
                            <p>Bosh buxgalter</p>
                            <p>Sultonova G.M.</p>
                        </div>
                    </div>
                    <div className='pdf_end_2sections_section'>
                        <div className='between'>
                            <p>Usmonova Muyassar Abduvaliyevna</p>
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