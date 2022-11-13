import React,{useState,useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineRollback, AiOutlinePrinter } from 'react-icons/ai'

function KD1Form() {

    const [products,setProducts] = useState([])

    const location = useLocation()
    const orderId = location?.state?.id

    useEffect(()=>{
        setProducts(
            [
                {
                    nomi:'Sepochka',
                    proba:583,
                    birlik:'dona',
                    soni:1,
                    umumiy:16.20,
                    toshlar:0.00,
                    sof:16.20,
                    baho:5670000.00
                },
                {
                    nomi:'Kalit',
                    proba:583,
                    birlik:'dona',
                    soni:1,
                    umumiy:6.14,
                    toshlar:0.00,
                    sof:6.14,
                    baho:2149000.00
                },
                {
                    nomi:'Uzuk',
                    proba:583,
                    birlik:'dona',
                    soni:4,
                    umumiy:21.90,
                    toshlar:3.20,
                    sof:18.70,
                    baho:6545000.00
                },
                {
                    nomi:'Sirg`a',
                    proba:583,
                    birlik:'juft',
                    soni:1,
                    umumiy:13.20,
                    toshlar:4,
                    sof:9.20,
                    baho:3220000.00
                }
            ]
        )
    },[])

    const getUmumiy = () => {
        const newUmumiy = []
        products.map((item, index) => {
            newUmumiy.push(item.umumiy)
        })
        let totalUmumiy = newUmumiy.reduce((prev, current) => prev + current, 0)
        return totalUmumiy.toLocaleString()
    }

    const getToshlar = () => {
        const newToshlar = []
        products.map((item, index) => {
            newToshlar.push(item.toshlar)
        })
        let totalToshlar = newToshlar.reduce((prev, current) => prev + current, 0)
        return totalToshlar.toLocaleString()
    }

    const getSof = () => {
        const newSof = []
        products.map((item, index) => {
            newSof.push(item.sof)
        })
        let totalSof = newSof.reduce((prev, current) => prev + current, 0)
        return totalSof.toLocaleString()
    }

    const getBaho = () => {
        const newBaho = []
        products.map((item, index) => {
            newBaho.push(item.baho)
        })
        let totalBaho = newBaho.reduce((prev, current) => prev + current, 0)
        return totalBaho.toLocaleString()
    }

    function NumberSpace(a){
        return a.toLocaleString()
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
            <p className='text_black_18 text_center'>
                Tilla buyumlarni garovga qabul qilish uchun kelishuv
            </p>
            <p className='text_black_18 text_center pdf_margin_top_5'>
                D A L O L A T N O M A S I
            </p>
            <div className='between align_center pdf_margin_top_20'>
                <p className='black_text'>Guliston sh.</p>
                <p className='black_text'>11.02.22 yil</p>
            </div>
            <div className='text_degree pdf_margin_top_20'>
                <p>Biz, quyida imzo chekuvchilar, "Renesans Mikrokredit Tashkiloti" MChJ Guliston filiali Kredit Komissiyasi raisi Muxammadov B.M.,Kredit Komissiyasining a'zolari Sultonova G.M.,Maxkamova M.D. va 09.03.2022 yil dagi 4-34/22-210-sonli mikroqarz shartnomasiga ta'minot sifatida taklif etilayotgan mol-mulkni garovga qo‘yuvchi Usmonova Muyassar Abduvaliyevna (shaxsini tasdiqlovchi hujjat ma'lumotlari: AB2300850 raqamli O‘zR Fuqarosining biometrik pasporti  17.12.2015da Sirdaryo viloyati Guliston shahar IIB tomonidan berilgan.. Yashash manzili: Sirdaryo viloyati Guliston shahri Begmatov ko‘chasi 46-uy 10-xonadon), ushbu dalolatnomani quyidagilar to‘g‘risida tuzdik:</p>
                <p className='pdf_margin_top_20'>
                    Quyidagi Jadval №1 da keltirilgan Usmonova Muyassar Abduvaliyevna taqdim etgan tilla buyumlar tomonlarning o‘zaro kelishuviga asosan ushbu bahoga kelishildi:
                </p>
            </div>
            <div className='endRow pdf_margin_top_10'>
                <p>Jadval №1</p>
            </div>
            <div className='p1_second_table pdf_margin_top_5'>
                <div className='p1_second_table_headers'>
                    <p className='p1_second_headers_product'>№</p>
                    <p className='p1_second_headers_product'>Nomi</p>
                    <p className='p1_second_headers_product'>Proba</p>
                    <p className='p1_second_headers_product'>O'lchov birligi</p>
                    <p className='p1_second_headers_product'>Soni</p>
                    <p className='p1_second_headers_product'>Umumiy og'irligi (gr)</p>
                    <p className='p1_second_headers_product'>Toshlari og'irligi (gr)</p>
                    <p className='p1_second_headers_product'>Sof og'irligi (gr)</p>
                    <p className='p1_second_headers_product'>Baholangan qiymati, so`m</p>
                </div>
                {
                    products?.map((item,index)=>{
                        return(
                            <div className='p1_second_table_headers'>
                                <p className='p1_second_headers_product'>{index +1}</p>
                                <p className='p1_second_headers_product'>{item?.nomi}</p>
                                <p className='p1_second_headers_product'>{item?.proba}</p>
                                <p className='p1_second_headers_product'>{item?.birlik}</p>
                                <p className='p1_second_headers_product'>{item?.soni}</p>
                                <p className='p1_second_headers_product'>{NumberSpace(item?.umumiy)}</p>
                                <p className='p1_second_headers_product'>{NumberSpace(item?.toshlar)}</p>
                                <p className='p1_second_headers_product'>{NumberSpace(item?.sof)}</p>
                                <p className='p1_second_headers_product'>{NumberSpace(item?.baho)}</p>
                            </div>
                        )
                    })
                }
                <div className='p1_second_table_headers'>
                    <p className='p1_second_headers_product'></p>
                    <p className='p1_second_headers_product black_text'>Jami</p>
                    <p className='p1_second_headers_product'></p>
                    <p className='p1_second_headers_product'></p>
                    <p className='p1_second_headers_product'></p>
                    <p className='p1_second_headers_product black_text'>{getUmumiy()}</p>
                    <p className='p1_second_headers_product black_text'>{getToshlar()}</p>
                    <p className='p1_second_headers_product black_text'>{getSof()}</p>
                    <p className='p1_second_headers_product black_text'>{getBaho()}</p>
                </div>
            </div>
            <div className='text_degree'>
                <p className='pdf_margin_top_30'>
                    Baholovchi tomonidan 17 584 000,00 (O‘n yetti million besh yuz sakson to‘rt ming so‘m 00 tiyin) so‘mga baholangan tilla buyumlar ''Renesans Mikrokredit Tashkiloti'' MChJ tomonidan tomonlarning kelishuviga binoan o‘z baholangan qiymatining 113,74%, ya'ni 20 000 000,00 (Yigirma million so‘m 00 tiyin) so‘m miqdorida garov sifatida qabul qilinadi.
                </p>
                <p className='pdf_margin_top_20'>
                    Yuqorida keltirilganlarga asosan (Jadval №1), "Renesans Mikrokredit Tashkiloti" MChJ Guliston filiali tomonidan qabul qilinayotgan garov qiymati tomonlarning kelishuviga binoan 20 000 000,00 (Yigirma million so‘m 00 tiyin) so‘m deb hisoblaniladi.
                </p>
                <p className='pdf_margin_top_30'>
                    Yuqoridagi dalolatnomani tasdiqlaymiz:
                </p>
                <div className='between align_center pdf_margin_top_10'>
                    <p>Kredit Komissiyasi Raisi</p>
                    <p>Muxammadov B.M.</p>
                </div>
                <div className='between align_center pdf_margin_top_10'>
                    <p>Kredit Komissiyasi a'zorali</p>
                    <p>Sultonova G.M.</p>
                </div>
                <div className='between align_center pdf_margin_top_10'>
                    <p></p>
                    <p>Maxkamova M.D.</p>
                </div>
                <p className='pdf_margin_top_20'>
                    Kelishildi va tanishtirildi:
                </p>
                <p className='pdf_margin_top_10'>
                    Usmonova Muyassar Abduvaliyevna
                </p>
                <p className='pdf_margin_top_10'>
                    ____________________________
                </p>
            </div>
        </div>
    </>
  )
}

export default KD1Form