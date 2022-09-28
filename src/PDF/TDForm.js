import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineRollback, AiOutlinePrinter } from 'react-icons/ai'

function TDForm() {

    const [products,setProducts] = useState([]);

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
            <p className='text_black_18 text_center'>
                Tilla buyumlarni topshirish-qabul qilish
            </p>
            <p className='text_black_18 text_center'>
                D A L O L A T N O M A S I
            </p>
            <div className='between align_center pdf_margin_top_20'>
                <p className='black_text'>Guliston sh.</p>
                <p className='black_text'>"____" ___________ 20____ y</p>
            </div>
            <p className='pdf_margin_top_30 text_degree'>
                "Renesans Mikrokredit Tashkiloti" MChJ Guliston filiali va Usmonova Muyassar Abduvaliyevna (shaxsini tasdiqlovchi hujjat ma'lumotlari: AB2300850 raqamli O‘zR Fuqarosining biometrik pasporti  17.12.2015da Sirdaryo viloyati Guliston shahar IIB tomonidan berilgan.. Yashash manzili: Sirdaryo viloyati Guliston shahri Begmatov ko‘chasi 46-uy 10-xonadon) o‘rtasidagi 09.03.2022 yil da imzolangan tilla buyumlarni topshirish - qabul qilish dalolatnomasiga asosan garov ta'minoti sifatida qabul qilingan tilla buyumlar Usmonova Muyassar Abduvaliyevnaga ''Renesans Mikrokredit Tashkiloti'' MChJdan garov ta'minoti sifatida quyidagi ro‘yxat bo‘yicha qaytarilmoqda (Jadval №1):
            </p>
            <div className='endRow pdf_margin_top_20'>
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
            <p className='pdf_margin_top_20 text_degree'>
                09.03.2022 yil da imzolangan tilla buyumlarni  garovga qabul qilish uchun kelishuv dalolatnomasiga asosan 20 000 000,00 (Yigirma million so‘m 00 tiyin) so‘mga baholangan yuqorida ko‘rsatilgan tilla buyumlar Usmonova Muyassar Abduvaliyevnaga ''Renesans Mikrokredit Tashkiloti'' MChJ oldidagi Garov shartnomasi va Mikroqarz shartnomasi bo‘yicha o‘z majburiyatlarini to‘liq bajarganligi sababli qaytarilmoqda.
            </p>
            <p className='pdf_margin_top_20 text_degree'>
                Usmonova Muyassar Abduvaliyevna yuqoridagi Jadval №1 dagi tilla buyumlarni ro‘yxat bo‘yicha qabul qilib olishidan avval ularning butligi, garovda saqlash jarayonida shikast yetkazilmaganligi va garov muddati davrida topshirilgan vaqtdagi asl holatida saqlanganligini ko‘zdan kechirib, tekshirib oldi hamda ''Renesans Mikrokredit Tashkiloti'' MChJga garov mulkining holati bo‘yicha hech qanday e'tirozlari mavjud emas.
            </p>
            <div className='text_degree'>
                <p className='pdf_margin_top_30'>
                        Ushbu dalolatnomani tasdiqlaymiz:
                    </p>
                    <p className='pdf_margin_top_10'>
                        Boshqaruvchi:
                    </p>
                    <p>
                        Muxammadov B.M._______________
                    </p>
                    <p className='pdf_margin_top_10'>
                        Bosh buxgalter:
                    </p>
                    <p>
                        Sultonova G.M.______________
                    </p>
                <div className='pdf_end_2sections pdf_margin_top_30'>
                    <div className='pdf_end_2sections_section'>
                        <p className='black_text'>Topshirdi (qaytardi):</p>
                        <p className='pdf_margin_top_20'>G‘aznachi:</p>
                        <p>Maxkamova M.D.______________</p>
                    </div>
                    <div className='pdf_end_2sections_section'>
                        <p className='black_text'>Qabul qildi:</p>
                        <p className='pdf_margin_top_20'>Usmonova Muyassar Abduvaliyevna___________________</p>  
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default TDForm