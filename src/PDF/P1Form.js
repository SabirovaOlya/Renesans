import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineRollback, AiOutlinePrinter } from 'react-icons/ai'

function P1Form() {

    const [users, setUsers]= useState([]);
    const [products,setProducts] = useState([]);

    useEffect(()=>{
        setUsers(
            [
                {
                    name:'Usmonova Muyassar Abduvaliyevna', 
                    hujjat:'AB2300850 raqamli O`zR Fuqarosining biometrik pasporti 17.12.2015 da Sirdaryo viloyati Guliston shahar IIB tomonidan berilgan',
                    miqdor:'20 000 000,00 сум',
                    maqsad:'Shirinlik mahsulotlari savdosi',
                    muddat:'4 oy'
                },
                {
                    name:'Aliyev Ali Aliyvich', 
                    hujjat:'AB3930475 raqamli Xizmat guvohnomasi 14.02.2015 da Toshkent viloyati Bo`ka tumani IIB tomonidan berilgan',
                    miqdor:'20 000 000,00 сум',
                    maqsad:'Damas avtomobilini sotib olib axoliga pullik avtomabil xizmat ko`rsatish',
                    muddat:'12 oy'
                }   
            ]
        )
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
        
        <div className='pdf_container text_degree'>
            <p className='text_black_18 text_center'>"Renesans Mikrokredit Tashkiloti" MChJ Guliston filiali Kredit Komissiyasining</p>
            <p className='text_black_18 text_center'>4-41/22 sonli Yig`ilish Bayonnomasi</p>
            <div className='between align_center pdf_margin_top_20'>
                <p className='black_text pdf_margin_top_5'>Guliston sh.</p>
                <p className='black_text pdf_margin_top_5'>11.02.22 yil</p>
            </div>
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
            <p className='pdf_margin_top_30'>
                Kun tartibi: Buyurtma chilar "Omad" qarzdorlar guruhi a'zolari Usmonova Muyassar Abduvaliyevna va Aliyev Ali Aliyvichning ReneTrade shartlari asosida mikroqarz ajratish bo'yicha berilgan buyurtmalarini ko'rib chiqish
            </p>
            <p className='pdf_margin_top_20'>
                "Renesans Mikrokredit Tashkiloti" MChJ Guliston filialiga Buyurtmachilar quyidagi shartlarda mikroqarz so'rab murojaat etgan:
            </p>
            <div className='pdf_p1_table pdf_margin_top_5'>
                <div className='pdf_p1_table_headers'>
                    <p className='p1_headers_product'>№</p>
                    <p className='p1_headers_product'>F.I.O</p>
                    <p className='p1_headers_product'>Shaxsini tasdiqlovchi hujjat</p>
                    <p className='p1_headers_product'>Mikroqarz miqdori</p>
                    <p className='p1_headers_product'>Maqsadi</p>
                    <p className='p1_headers_product'>Muddat</p>
                </div>
                {
                    users?.map((item,index)=>{
                        return(
                            <div className='pdf_p1_table_headers'>
                                <p className='p1_headers_product'>{index + 1}</p>
                                <p className='p1_headers_product'>{item?.name}</p>
                                <p className='p1_headers_product'>{item?.hujjat}</p>
                                <p className='p1_headers_product'>{item?.miqdor}</p>
                                <p className='p1_headers_product'>{item?.maqsad}</p>
                                <p className='p1_headers_product'>{item?.muddat}</p>
                            </div>
                        )
                    })
                }
            </div>
            <p className='pdf_margin_top_20'>
                Buyurtmachilar mikroqarz qaytarilishini ta'minlash maqsadida o'zaro solidar javobgarlik to'g'risidagi Kafillik shartnomasini taqdim qilishlarini va garov shartnomasi asosida o'ziga tegishli bo'lgan tilla buyumlarni garovga qo'yishlarini ma'lum qilganlar
            </p>
            <div className='p1_second_table pdf_margin_top_20'>
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
            <p className='pdf_margin_top_20'>
                Buyurtmachilarning xarakteri, salohiyati, daromadi va daromad manbalari, kredit tarixi, ta'lovga qobiliyatliligi, buyurtmada ko'rsatilgan ma'lumotlar, boshqa bank-moliya muassasalari oldidagi mavjud qarzdorligi, ta'minot buyurtmada ko'rsatilgan maqsad va kredit mahsulotining muvofiqligi kredit byurosidan va MKTning boshqa o'z manbalaridan olingan axborotlar asosida o'rganildi va taxlil qilindi. Shu bilan birgalikda, monitoring bo'limi xodimining yakumiy xulosasi inobatga olindi.
            </p>
            <p className='pdf_margin_top_20'>
                Yuqoridagilardan kelib chiqqan holda "Renesans Mikrokredit Tashkiloti" MChJ Guliston filiali Kredit Komissiyasi qaror qiladi:
            </p>
            <div className='startRow pdf_margin_top_10'>
                <p>1</p>
                <div className='p1_left_space'>
                    <p>
                        MKT kredit siyosatiga ko'ra o'rnatilgan tartibda mikroqarz shartnomasiga asosida Buyurtmachilarga quyidagicha mikroqarz ajratilsin:    
                    </p>       
                    <ul className='point_list'>
                        <li className='pdf_margin_top_5 point_list'>
                            Usmonova Muyassar Abduvaliyevnaga 20 000 000,00 (Yigirma million so'm 00 tiyin) so'm miqdorida yillik 58 foiz ustama tulash shart bilan 4 oylik muddatga shirinlik mahsulotlari savdosi uchun
                        </li>
                        <li className='pdf_margin_top_5 point_list'>
                            Aliyev Ali Aliyvichga 20 000 000,00 (Yigirma million so'm 00 tiyin) so'm miqdorida yillik 58 foiz ustama tulash shart bilan 12 oylik muddatga Damas avtomobilini sotib olib axoliga pullik avtomabil xizmat ko'rsatish uchun
                        </li>
                    </ul>
                </div>
            </div>
            <div className='startRow pdf_margin_top_20'>
                <p>2</p>
                <div className='p1_left_space'>
                    <p>
                        Berilayotgan mikroqarzga ta'minot sifatida o'zaro solidar javobgarlik to'g'risidagi Kafillik shartnomasi va garov shartnomasi asosida o'ziga tegishli bo'lgan Jadval № 1 da ko'rsatilgan tilla buyumlar o'z baholangan qiymatining 113,74% i yoki 20 000 000,00 (Yigirma million so'm 00 tiyin) so'm deb garov uchun qabul qilinsin;    
                    </p>       
                </div>
            </div>
            <div className='startRow pdf_margin_top_20'>
                <p>3</p>
                <div className='p1_left_space'>
                    <p>
                        Kredit bo'limi zaruriy hollarda MKT ichki auditorini ham jalb etgan holda MKT ichki qoidalarida o'rnatilgan tartibda berilgan mikroqarz ustidan doimiy nazorat/monitoring olib bolsin.   
                    </p>       
                </div>
            </div>

            <div className='between align_center pdf_margin_top_30'>
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
        </div>
    </>
  )
}

export default P1Form