import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineRollback, AiOutlinePrinter } from 'react-icons/ai'

function GS1Form() {

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
            <p className='text_black_18 text_center'>TILLA BUYUMLARNI GAROVGA QO‘YISH</p>
            <p className='text_black_18 text_center'>SHARTNOMASI № 4-34/22-210</p>
            <div className='between align_center pdf_margin_top_20'>
                <p className='black_text'>Guliston sh.</p>
                <p className='black_text'>11.02.22 yil</p>
            </div>
            <div className='text_degree'>
                <p className='pdf_margin_top_30'>
                    "Renesans Mikrokredit Tashkiloti" MChJ Guliston filiali nomidan Filial Nizomiga ko‘ra Ishonchnoma  asosida ish yurituvchi  Guliston filiali Boshqaruvchisi Muxammadov Bobirmirzo Mirzoxid o'g'li, bundan buyon «Garovga oluvchi» deb ataladi, bir tomondan, va Usmonova Muyassar Abduvaliyevna (shaxsini tasdiqlovchi hujjat ma'lumotlari: AB2300850 raqamli O‘zR Fuqarosining biometrik pasporti  17.12.2015 da Sirdaryo viloyati Guliston shahar IIB tomonidan berilgan.), bundan buyon «Garovga qo‘yuvchi» deb ataladi, ikkinchi tomondan, ushbu shartnomani quyidagilar to‘g‘risida tuzdilar:
                </p>
                <ul className='pdf_margin_top_30'>
                    <li className='startRow'>
                        <p> 1.</p>
                        <p className='p1_left_space'>
                            Garovga oluvchi 09.03.2022 yildagi 4-34/22-210- sonli  mikroqarz shartnomasiga asosan Garovga  qo‘yuvchiga  26.07.2022 yilgacha bo‘lgan muddatga 40 000 000,00 (Qirq million so‘m 00 tiyin) so‘m miqdorda mikroqarz beradi.
                        </p>
                    </li>
                    <li className='pdf_margin_top_10 startRow'>
                        <p>2.</p>
                        <p className='p1_left_space'>
                            Garovga  qo‘yuvchi, mikrokarz  shartnomasi bo‘yicha  olingan mikrokarzning o‘z  vaqtida  qaytarilishini ta'minlash  uchun  Garovga  oluvchiga  quyidagi tilla buyumlarni garovga qo‘yadi:
                        </p>
                    </li>
                    <div className='endRow pdf_margin_top_10'>
                        <p>Jadval №1</p>
                    </div>
                    <div className='p1_second_table'>
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
                    <li className='pdf_margin_top_10 startRow'>
                        <p>3.</p>
                        <p className='p1_left_space'>
                            Garovga qo‘yilgan mulk Renesans Mikrokredit Tashkilotida saqlanadi.
                        </p>
                    </li>
                    <li className='pdf_margin_top_10 startRow'>
                        <p>4.</p>
                        <p className='p1_left_space'>
                            Garovga  qo‘yilgan mulk Garovga qo‘yuvchining  shaxsiy mulki hisoblanib,  garov mulki tomonlarning o‘zaro kelishuviga muvofiq 17 584 000,00 (O‘n yetti million besh yuz sakson to‘rt ming so‘m 00 tiyin) so‘mga baholangan va 20 000 000,00 (Yigirma million so‘m 00 tiyin) so‘m deb garov uchun qabul qilindi.
                        </p>
                    </li>
                    <li className='pdf_margin_top_10 startRow'>
                        <p>5.</p>
                        <p className='p1_left_space'>
                            Garovga  qo‘yilgan tilla buyumlar taraflarning kelishuviga muvofiq to‘liq Garovga oluvchiga topshiriladi va  Garov mulkini topshirish - qabul kilish dalolatnomasi tuziladi.
                        </p>
                    </li>
                    <li className='pdf_margin_top_10 startRow'>
                        <p>6.</p>
                        <p className='p1_left_space'>
                            Garovga  qo‘yilgan tilla buyumlar mikroqarz shartnomasi bo‘yicha barcha majburiyatlar Garovga qo‘yuvchi tomonidan to‘liq  bajarilganidan so‘ng, Garovga qo‘yuvchiga qaytariladi va bu to‘g‘risida topshirish - qabul qilish dalolatnomasi tuziladi.
                        </p>
                    </li>
                    <li className='pdf_margin_top_10 startRow'>
                        <p>7.</p>
                        <p className='p1_left_space'>
                            Mikroqarz shartnomasi bo‘yicha olingan qarz belgilangan muddat ichida to‘lanmagan taqdirda, qarz summasi garovga qo‘yilgan mulkni sotishdan olingan mablag‘lar hisobidan qoplanadi.
                        </p>
                    </li>
                    <li className='pdf_margin_top_10 startRow'>
                        <p>8.</p>
                        <p className='p1_left_space'>
                            Mazkur shartnoma ikki nusxada tuzilgan bo‘lib, bir nusxasi Garovga oluvchida, ikkinchi nusxasi Garovga qo‘yuvchida saqlanadi.
                        </p>
                    </li>
                    <li className='pdf_margin_top_10 startRow'>
                        <p>9.</p>
                        <p className='p1_left_space'>
                            Shartnomaga o‘zgartirish va qo‘shimchalar kiritish yoki uni bekor qilish taraflarning kelishuviga muvofiq, vakolatli shaxslar tomonidan imzolangan va yozma ravishda qo‘shimcha bitim tuzilgan taqdirdagina amalga oshiriladi.
                        </p>
                    </li>
                    <li className='pdf_margin_top_10 startRow'>
                        <p>10.</p>
                        <p className='p1_left_space'>
                            Shartnomaning amal qilish muddati taraflar tomonidan imzolangan paytdan boshlanib, Garovga qo‘yuvchi tomonidan mikroqarz shartnomasi bo‘yicha barcha majburiyatlar to‘liq bajarilish muddatigacha  belgilanadi.
                        </p>
                    </li>
                    <li className='pdf_margin_top_20 startRow'>
                        <p>11.</p>
                        <p className='p1_left_space'>
                            Ushbu shartnomada nazarda tutilmagan boshqa holatlar O‘zbekiston Respublikasining Fuqarolik Kodeksi va «Garov to‘g‘risida»gi qonunlari bilan tartibga solinadi.
                        </p>
                    </li>
                </ul>
                <p className='pdf_margin_top_20 text_black_18 text_center text-norm'>
                    TARAFLARNING REKVIZITLARI VA IMZOLARI:
                </p>
                <div className='pdf_end_2sections pdf_margin_top_20'>
                    <div className='pdf_end_2sections_section'>
                        <p className='black_text text_center'>GAROVGA QO‘YUVCHI:</p>
                        <div className='pdf_margin_top_10 '>
                            <p className='black_text text_center'>Usmonova Muyassar Abduvaliyevna</p>
                            <p className='pdf_margin_top_20'>AB2300850 raqamli O‘zR Fuqarosining biometrik pasporti   17.12.2015 da Sirdaryo viloyati Guliston shahar IIB tomonidan berilgan.</p>
                            <p>Yashash manzili: Sirdaryo viloyati Guliston shahri Begmatov ko‘chasi 46-uy 10-xonadon</p>
                        </div>
                    </div>
                    <div className='pdf_end_2sections_section'>
                        <p className='black_text text_center'>GAROVGA OLUVCHI:</p>
                        <div className='pdf_margin_top_10 '>
                            <p className='black_text text_center'>"Renesans Mikrokredit Tashkiloti" MChJ Guliston filiali</p>
                            <p className='pdf_margin_top_20'>Sirdaryo viloyati, Guliston shahri, Samarqand ko‘chasi, Yangi bozor mavzesi, Xumo savdo majmuasi.</p>
                            <p>H/r 20 216 000 004 636 656 001 MFO 00996 ATB Universal Bank Toshkent filiali</p>
                            <p>STIR 300 515 648    OKED 64920</p>
                            <p>
                                Tel.:+998 67 236 55 77   +998 67 236 77 55 
                            </p>
                        </div>                    
                    </div>
                </div>
                <div className='pdf_end_2sections pdf_margin_top_40'>
                    <div className='pdf_end_2sections_section'>
                        <div className='between'>
                            <p>Usmonova Muyassar Abduvaliyevna</p>
                            <p></p>
                        </div>
                        <div className='between pdf_margin_top_20'>
                            <p>Imzo_______________</p>
                            <p> </p>
                        </div>
                    </div>
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
                </div>
            </div>
        </div>
    </>
  )
}

export default GS1Form