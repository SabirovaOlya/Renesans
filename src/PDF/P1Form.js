import React,{useState,useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineRollback, AiOutlinePrinter } from 'react-icons/ai'
import https from '../assets/https';

function P1Form() {

    const [products,setProducts] = useState([]);

    const [documentInfo, setDocumentInfo] = useState({})
    const [buyurtmaInfo, setBuyurtmaInfo] = useState({})
    const [supply, setSupply] = useState([])
    let autoSum = 0
    let goldSum = 0

    const location = useLocation()
    const orderId = location?.state?.id


    useEffect(()=>{
        https
        .post(`/p1/${orderId}`, {})
        .then(res =>{
            setDocumentInfo(res?.data)
            res?.data?.supply?.map(item =>{
                if(!supply.includes(item.type)){
                  supply.push(item.type)
                }
            })
        })
        .catch(err =>{
            console.log(err)
        })

        https
        .get(`/orders/${orderId}`)
        .then(res =>{
            setBuyurtmaInfo(res?.data)
        })
        .catch(err =>{
            console.log(err)
        })


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
        
        <div className='pdf_container text_degree'>
            <p className='text_black_18 text_center'>"Renesans Mikrokredit Tashkiloti" MChJ {documentInfo?.branch?.short_name} Kredit Komissiyasining</p>
            <p className='text_black_18 text_center'>{documentInfo?.order?.number} sonli Yig`ilish Bayonnomasi</p>
            <div className='between align_center pdf_margin_top_20'>
                <p className='black_text pdf_margin_top_5'>{documentInfo?.branch?.short_name.split(' ')[0]} sh.</p>
                <p className='black_text pdf_margin_top_5'>{buyurtmaInfo?.order_date}</p>
            </div>
            <div className='between align_center pdf_margin_top_10'>
                <p>Kredit Komissiyasi Raisi</p>
                <p>{documentInfo?.branch?.head_of_branch}</p>
            </div>
            <div className='between align_center pdf_margin_top_10'>
                <p>Kredit Komissiyasi a'zorali</p>
                <p>{documentInfo?.branch?.['chief_accountant,']}</p>
            </div>
            <div className='between align_center pdf_margin_top_10'>
                <p></p>
                <p>{documentInfo?.branch?.head_of_credit}</p>
            </div>
            <p className='pdf_margin_top_30'>
                Kun tartibi: Buyurtmachi {documentInfo?.client?.name} {documentInfo?.order?.product} shartlari asosida mikroqarz ajratish bo'yicha berilgan buyurtmalarini ko'rib chiqish
            </p>
            <p className='pdf_margin_top_20'>
                "Renesans Mikrokredit Tashkiloti" MChJ {documentInfo?.branch?.short_name}ga Buyurtmachilar quyidagi shartlarda mikroqarz so'rab murojaat etgan:
            </p>
            <div className='pdf_p1_table pdf_margin_top_5'>
                <div className='pdf_p1_table_headers' key={19}>
                    <p className='p1_headers_product'>№</p>
                    <p className='p1_headers_product'>F.I.O</p>
                    <p className='p1_headers_product'>Shaxsini tasdiqlovchi hujjat</p>
                    <p className='p1_headers_product'>Mikroqarz miqdori</p>
                    <p className='p1_headers_product'>Maqsadi</p>
                    <p className='p1_headers_product'>Muddat</p>
                </div>
                {/* {
                    users?.map((item,index)=>{
                        return( */}
                            <div className='pdf_p1_table_headers' key={18}>
                                <p className='p1_headers_product'>{1}</p>
                                <p className='p1_headers_product'>{documentInfo?.client?.name}</p>
                                <p className='p1_headers_product'>{documentInfo?.client?.serial_num} raqamli {documentInfo?.client?.doc_type} {documentInfo?.client?.issued_date} da {documentInfo?.client?.issued_by} tomonidan berilgan</p>
                                <p className='p1_headers_product'>{documentInfo?.order?.sum?.toLocaleString()} so'm</p>
                                <p className='p1_headers_product'>{documentInfo?.order?.aim}</p>
                                <p className='p1_headers_product'>{documentInfo?.order?.time} oy</p>
                            </div>
                        {/* )
                    })
                } */}
            </div>
            <p className='pdf_margin_top_20'>
                Buyurtmachilar mikroqarz qaytarilishini ta'minlash maqsadida o'zaro solidar javobgarlik to'g'risidagi Kafillik shartnomasini taqdim qilishlarini va garov shartnomasi asosida o'ziga tegishli bo'lgan {supply.join(',')} garovga qo'yishlarini ma'lum qilganlar
            </p>
            {
                documentInfo?.supply?.map((item,index)=>{
                    if(item?.type == 'auto'){
                        autoSum = GetSumma(item?.auto, 'sum')
                        return(
                            <div className='margin_top_30'>
                                <table className='single_table'>
                                    <tbody>
                                        <tr key={99}>
                                            <td>№</td>
                                            <td>Nomi</td>
                                            <td>Ishlab chiqarilgan yil</td>
                                            <td>Davlat raqam belgisi</td>
                                            <td>Transport vositasi turi</td>
                                            <td>Qayd etish guvohnomasi</td>
                                            <td>Dvigatel raqami</td>
                                            <td>Kuzov raqami</td>
                                            <td>Shassi №</td>
                                            <td>Baholangan qiymati, so'm</td>
                                        </tr>
                                        {
                                            item?.auto?.map((item,index)=>{
                                                return(
                                                <tr key={item?.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item?.name}</td>
                                                    <td>{item?.year}</td>
                                                    <td>{item?.number}</td>
                                                    <td>{item?.type_of_auto}</td>
                                                    <td>{item?.registration_cert}</td>
                                                    <td>{item?.engine_number}</td>
                                                    <td>{item?.body_code}</td>
                                                    <td>{item?.chassis}</td>
                                                    <td>{item?.sum}</td>
                                                </tr>
                                                )
                                            })
                                        }
                                
                                    </tbody>
                                </table>
                                <div className='endRow margin_top_20'>
                                    <p className='kl1_jami'>JAMI: {GetSummaText(item?.auto, 'sum')?.toLocaleString()} so`m</p>
                                </div>
                            </div>
                        )
                    }else if(item?.type == 'gold'){
                        goldSum = GetSumma(item.gold, 'sum')
                        return(
                            <div className='p1_second_table pdf_margin_top_20'>
                                <div className='p1_second_table_headers' key={15}>
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
                                    item?.gold?.map((item,index)=>{
                                        return(
                                            <div className='p1_second_table_headers' key={item?.id}>
                                                <p className='p1_second_headers_product'>{index +1}</p>
                                                <p className='p1_second_headers_product'>{item?.name}</p>
                                                <p className='p1_second_headers_product'>{item?.gold_num}</p>
                                                <p className='p1_second_headers_product'>{item?.measure}</p>
                                                <p className='p1_second_headers_product'>{item?.quantity}</p>
                                                <p className='p1_second_headers_product'>{item?.weight}</p>
                                                <p className='p1_second_headers_product'>{item?.stone_weight}</p>
                                                <p className='p1_second_headers_product'>{item?.clean_weight}</p>
                                                <p className='p1_second_headers_product'>{item?.sum}</p>
                                            </div>
                                        )
                                    })
                                }
                                <div className='p1_second_table_headers' key={13}>
                                    <p className='p1_second_headers_product'></p>
                                    <p className='p1_second_headers_product black_text'>Jami</p>
                                    <p className='p1_second_headers_product'></p>
                                    <p className='p1_second_headers_product'></p>
                                    <p className='p1_second_headers_product'></p>
                                    <p className='p1_second_headers_product black_text'>{GetSummaText(item?.gold, 'weight')}</p>
                                    <p className='p1_second_headers_product black_text'>{GetSummaText(item?.gold, 'stone_weight')}</p>
                                    <p className='p1_second_headers_product black_text'>{GetSummaText(item?.gold, 'clean_weight')}</p>
                                    <p className='p1_second_headers_product black_text'>{GetSummaText(item?.gold, 'sum')}</p>
                                </div>
                            </div>
                        )
                    }
                })
            }

            <p className='pdf_margin_top_20'>
                Buyurtmachilarning xarakteri, salohiyati, daromadi va daromad manbalari, kredit tarixi, ta'lovga qobiliyatliligi, buyurtmada ko'rsatilgan ma'lumotlar, boshqa bank-moliya muassasalari oldidagi mavjud qarzdorligi, ta'minot buyurtmada ko'rsatilgan maqsad va kredit mahsulotining muvofiqligi kredit byurosidan va MKTning boshqa o'z manbalaridan olingan axborotlar asosida o'rganildi va taxlil qilindi. Shu bilan birgalikda, monitoring bo'limi xodimining yakumiy xulosasi inobatga olindi.
            </p>
            <p className='pdf_margin_top_20'>
                Yuqoridagilardan kelib chiqqan holda "Renesans Mikrokredit Tashkiloti" MChJ {documentInfo?.branch?.short_name} Kredit Komissiyasi qaror qiladi:
            </p>
            <div className='startRow pdf_margin_top_10'>
                <p>1</p>
                <div className='p1_left_space'>
                    <p>
                        MKT kredit siyosatiga ko'ra o'rnatilgan tartibda mikroqarz shartnomasiga asosida Buyurtmachilarga quyidagicha mikroqarz ajratilsin:    
                    </p>       
                    <ul className='point_list'>
                        <li className='pdf_margin_top_5 point_list'>
                            {documentInfo?.client?.name}ga {documentInfo?.order?.sum?.toLocaleString()} so'm miqdorida yillik 58 foiz ustama tulash shart bilan {documentInfo?.order?.time} oylik muddatga shirinlik mahsulotlari savdosi uchun
                        </li>
                    </ul>
                </div>
            </div>
            <div className='startRow pdf_margin_top_20'>
                <p>2</p>
                <div className='p1_left_space'>
                    <p>
                        Berilayotgan mikroqarzga ta'minot sifatida o'zaro solidar javobgarlik to'g'risidagi Kafillik shartnomasi va garov shartnomasi asosida o'ziga tegishli bo'lgan Jadval № 1 da ko'rsatilgan tilla buyumlar o'z baholangan qiymatining {((documentInfo?.order?.sum / (autoSum + goldSum))*100).toFixed(2)}% i yoki {autoSum + goldSum} so'm deb garov uchun qabul qilinsin;    
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
                <p>{documentInfo?.branch?.head_of_branch}</p>
            </div>
            <div className='between align_center pdf_margin_top_10'>
                <p>Kredit Komissiyasi a'zorali</p>
                <p>{documentInfo?.branch?.['chief_accountant,']}</p>
            </div>
            <div className='between align_center pdf_margin_top_10'>
                <p></p>
                <p>{documentInfo?.branch?.head_of_credit}</p>
            </div>
        </div>
    </>
  )
}

export default P1Form