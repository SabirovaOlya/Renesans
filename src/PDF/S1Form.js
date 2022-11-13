import React, {useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineRollback, AiOutlinePrinter } from 'react-icons/ai'
import { WindowSharp } from '@mui/icons-material'

function S1Form() {

    const [ state, setState ] = useState(true)

    const location = useLocation()
    const orderId = location?.state?.id

    return (
        <>
            <div className='pdf_header'>
                <Link to={`/buyurtma/singleBuyurtma/${orderId}`} className='clientform_back'>
                <AiOutlineRollback/>
                Back
                </Link>
                <button onClick={()=> window.print()}>
                Print
                <AiOutlinePrinter/>
                </button>
            </div>
            <div className='pdf_container'>
                <p className='text_black_18 text_center'>Mikroqarz shartnomasi № 4-34/22-210</p>
                <div className='between align_center pdf_margin_top_20'>
                    <p className='black_text'>Guliston sh.</p>
                    <p className='black_text'>11.02.22 yil</p>
                </div>
                <div className='text_degree'>
                    <p className='pdf_margin_top_30'>
                    "Renesans Mikrokredit Tashkiloti" MChJ Guliston filiali nomidan Filial Nizomiga ko‘ra Ishonchnoma  asosida ish yurituvchi  Guliston filiali Boshqaruvchisi Muxammadov Bobirmirzo Mirzoxid o'g'li, bundan buyon «Qarz Beruvchi» deb ataladi, bir tomondan, va ''Omad'' Qarzdorlar guruhi a'zolari Usmonova Muyassar Abduvaliyevna (shaxsini tasdiqlovchi hujjat ma'lumotlari: AB2300850 raqamli O‘zR Fuqarosining biometrik pasporti   17.12.2015 da Sirdaryo viloyati Guliston shahar IIB tomonidan berilgan) va Aliyev Ali Aliyvich (shaxsini tasdiqlovchi hujjat ma'lumotlari: AB3930475 raqamli Xizmat guvohnomasi  14.02.2015 da Toshkent viloyati Bo`ka tumani IIB   tomonidan berilgan), bundan buyon ''Qarz oluvchilar'' deb ataladilar, ikkinchi tomondan, ushbu shartnomani quyidagilar to‘g‘risida tuzdilar:
                    </p>
                    <p className='black_text pdf_margin_top_30'>1. Shartnoma mavzusi</p>
                    <div className='sections_ul pdf_margin_top_5'>
                        <p>1.1</p>
                        <ul>
                            <li>"Renesans Mikrokredit Tashkiloti" MChJ Guliston filiali Kredit Komissiyasining «_____» ____________  20____  dagi № _____________ sonli Majlis Bayoni bilan berilgan vakolatlar asosida, Qarz Beruvchi Qarz oluvchilarga quyidagi  tartibda  va miqdorda mikroqarz beradi:</li>
                            <li className='point_list pdf_margin_top_5'>
                                Usmonova Muyassar Abduvaliyevnaga 20 000 000,00 (Yigirma million so‘m 00 tiyin) so‘m miqdorida 4 oylik muddatga shirinlik mahsulotlari savdosi uchun.
                            </li>
                        </ul>
                    </div>
                    <p className='black_text pdf_margin_top_10'>2. Qarz muddati va shartlari</p>
                    <div className='sections_ul pdf_margin_top_5'>
                        <p>2.1</p>
                        <ul>
                            <li>Qarz 26.03.2022 yildan 26.07.2022 yilgacha bo‘lgan muddatga beriladi.</li>
                        </ul>
                    </div>
                    <div className='sections_ul pdf_margin_top_10'>
                        <p>2.2</p>
                        <ul>
                            <li>Qarz oluvchilar olingan qarzni qaytarilishini ta'minlash maqsadida o‘zaro solidar javobgarlik to‘g‘risidagi «DD».MMMM. yildagi _________-sonli Kafillik shartnomasini taqdim qiladilar va tomonlar o‘rtasida 09.03.2022 yilda tuzilgan __________-sonli garov shartnomasi asosida o‘ziga tegishli bo‘lgan tilla buyumlarni garovga qo‘yadilar.</li>
                        </ul>
                    </div>
                    <div className='sections_ul pdf_margin_top_10'>
                        <p>2.3</p>
                        <ul>
                            <li>Foiz miqdori:</li>
                            <li className='point_list pdf_margin_top_5'>
                                Berilgan qarz qoldiq miqdori uchun Qarz oluvchilar yillik 58 foiz miqdoridan kelib chiqib ustama haq to‘laydi.
                            </li>
                        </ul>
                    </div>
                    <div className='sections_ul pdf_margin_top_10'>
                        <p>2.4</p>
                        <ul>
                            <li>Qarz oluvchilar, olgan qarz miqdorini shartnomaning ajralmas qismi hisoblangan 1- ilovadagi to‘lov jadvali asosida differentsial usulida to‘laydi.</li>
                            <li className='point_list pdf_margin_top_5'>
                                Kreditning to‘liq qiymati shartnoma tuzish paytidagi uning mutlaq qiymatini, ya'ni kredit yoki qarzning asosiy qarzi, unga hisoblanadigan foizlari, komission va boshqa to‘lovlarni, shu jumladan amaldagi tariflar bo‘yicha kredit rasmiylashtirish bilan bog‘liq uchinchi shaxslar foydasiga to‘lanadigan to‘lovlarni o‘z ichiga oladi.
                            </li>
                        </ul>
                    </div>
                    <p className='black_text pdf_margin_top_10'>3. Shartnomaning muddati</p>
                    <div className='sections_ul pdf_margin_top_5'>
                        <p>3.1</p>
                        <ul>
                            <li>Ushbu shartnoma ikki tomonlama imzolangandan so‘ng yuridik kuchga kiradi va shartnoma bo‘yicha tomonlarning majburiyatlar to‘liq bajarilgungacha o‘z kuchini saqlaydi.</li>
                        </ul>
                    </div>
                    <div className='sections_ul pdf_margin_top_10'>
                        <p>3.2</p>
                        <ul>
                            <li>Ushbu shartnomaning bekor qilinishi:</li>
                            <li className='point_list pdf_margin_top_5'>
                                Shartnoma majburiyatlari to‘liq bajarilganida;
                            </li>
                            <li className='point_list pdf_margin_top_5'>
                                Ikki tomonlama kelishuv asosida;
                            </li>
                            <li className='point_list pdf_margin_top_5'>
                                Qonunda nazarda tutilgan boshqa holatlarda bekor qilinadi.
                            </li>
                        </ul>
                    </div>
                    <p className='black_text pdf_margin_top_10'>4. Tomonlarning huquq va majburiyatlari</p>
                    <div className='sections_ul pdf_margin_top_5'>
                        <p>4.1</p>
                        <ul>
                            <li>Qarz beruvchining huquqlari:</li>
                            <li className='point_list pdf_margin_top_5'>
                                Mikromoliyaviy xizmat ko‘rsatish va shartnoma bo‘yicha majburiyatlarni bajarish uchun zarur bo‘lgan hujjatlarni buyurtma beruvchidan so‘rab olish;
                            </li>
                            <li className='point_list pdf_margin_top_5'>
                                To‘lov o‘z vaqtida amalga oshirilmaganda, qarz to‘lash tartibiga rioya qilmaslik xolati kelib chiqsa, so‘ralgan ma'lumotlar o‘z vaqtida taqdim qilinmasa, shuningdek noto‘g‘ri ma'umotlar taqdim qilinganligi yoki ularni qalbakilashtirilishi holatlari aniqlansa majburiyatlarning qarz oluvchi tomonidan muddatidan ilgari bajarilishini talab qilish;
                            </li>
                            <li className='point_list pdf_margin_top_5'>
                                Qarz oluvchilarga hisob va moliyaviy hujjatlarini yuritish buyicha konsultativ yordam ko‘rsatish;
                            </li>
                            <li className='point_list pdf_margin_top_5'>
                                Qarz oluvchi ko‘rsatilgan mikromoliyaviy xizmatdan shartnoma tuzilgan kundan e'tiboran bir oy ichida foydalanmagan taqdirda, shartnomani bekor qilish haqida qarz oluvchini yozma ravishda xabardor etish  orqali shartnomani bir tomonlama tartibda bekor qilish;
                            </li>
                            <li className='point_list pdf_margin_top_5'>
                                Qarz oluvchilarni lozim darajada tekshirish va lozim darajada tekshirish zaruriyati yuzaga kelganda qo‘shimcha ma'lumotlar yoki hujjatlar talab qilish, ulardan nusxa olish va (yoki) ma'lumotlarni boshqa usullarda qayta ishlash, saqlash.
                            </li>
                        </ul>
                    </div>
                    <div className='sections_ul pdf_margin_top_10'>
                        <p>4.2</p>
                        <ul>
                            <li>Qarz beruvchining  majburiyatlari:</li>
                            <li className='point_list pdf_margin_top_5'>
                                Buyurtma beruvchining huquq va majburiyatlari to‘g‘risida, shu jumladan, mikromoliyaviya xizmat  ko‘rsatish  bilan bog‘liq barcha xarajatlar haqida buyurtma beruvchiga ishonchli hamda to‘liq  axborotni ma'lum qilish;
                            </li>
                            <li className='point_list pdf_margin_top_5'>
                                Qarz oluvchining belgilangan qarz miqdorini berish;
                            </li>
                            <li className='point_list pdf_margin_top_5'>
                                Shartnoma bo‘yicha majburiyatlar bajarilmaganligi yoki lozim darajada bajarilmaganligi natijasida yetkazilgan zararlarning o‘rnini qarz oluvchiga qoplash;
                            </li>
                            <li className='point_list pdf_margin_top_5'>
                                Qarz berish shartlariga har qanday mumkin bo‘lgan o‘zgarishlar kiritiladigan bo‘lsa, Qarz oluvchiga 2  xafta  oldin xabar qilish;
                            </li>
                            <li className='point_list pdf_margin_top_5'>
                                Qarz oluvchining belgilangan qarz miqdorini shartnoma imzolangach, 30 kun ichida berish;
                            </li>
                        </ul>
                    </div>
                    <div className='sections_ul pdf_margin_top_10'>
                        <p>4.3</p>
                        <ul>
                            <li>Qarz oluvchilarning huquqlari:</li>
                            <li className='point_list pdf_margin_top_5'>
                                Olingan qarzni shartnomada belgilangan muddatdan oldin to‘lash;
                            </li>
                            <li className='point_list pdf_margin_top_5'>
                                Mikromoliyaviy xizmatlar ko‘rsatish qoidalari bilan tanishib chiqish;
                            </li>
                            <li className='point_list pdf_margin_top_5'>
                                O‘z huquq va majburiyatlari to‘g‘risida, shu jumladan mikromoliyaviy xizmat ko‘rsatish bilan bog‘liq barcha xarajatlar haqida ishonchli hamda to‘liq axborot olish;
                            </li>
                            <li className='point_list pdf_margin_top_5'>
                                Shartnoma shartlarini belgilangan tartibda va muddatlarda bajarilishini talab qilish;
                            </li>
                            <li className='point_list pdf_margin_top_5'>
                                Shartnoma bo‘yicha majburiyatlar bajarilmaganligi yoki lozim darajada bajarilmaganligi natijasida yetkazilgan zararlarning o‘rnini qoplashni talab qilish;
                            </li>
                            <li className='point_list pdf_margin_top_5'>
                                Shartnoma tuzilgandan keyin mijoz tomonidan pul mablag‘lari olingunga qadar bo‘lgan davrda kredit olishdan bepul asosda voz kechish;
                            </li>
                        </ul>
                    </div>
                    <div className='sections_ul pdf_margin_top_10'>
                        <p>4.4</p>
                        <ul>
                            <li>Qarz oluvchilarning majburiyatlari:</li>
                            <li className='point_list pdf_margin_top_5'>
                                Mikromoliyaviy xizmatdan foydalanish va shartnoma bo‘yicha majburiyatlarni bajarish uchun zarur bo‘lgan hujjatlarni taqdim etishi;
                            </li>
                            <li className='point_list pdf_margin_top_5'>
                                Qarz oluvchi olingan mikroqarzni belgilangan muddatda so‘ndirish;
                            </li>
                            <li className='point_list pdf_margin_top_5'>
                                Majburiyatlarni shartnomada belgilangan tartibda va muddatlarda bajarishi shart;
                            </li>
                            <li className='point_list pdf_margin_top_5'>
                                Mikroqarz shartnomasiga asosan asosiy qismi yoki unga hisoblangan foizlar, penya va jarimalarni muddatida to‘lanmagan taqdirda qarzdorlik bank plastik kartalari, omonat va boshqa hisobvaraqlaridan so‘zsiz (aktseptsiz) tartibda to‘liq undirib olinishiga rozilik berish;
                            </li>
                            <li className='point_list pdf_margin_top_5'>
                                Shartnoma shartlari bajarilmaganda "qarz beruvchi"ning talabiga asosan, mikroqarzning asosiy qarz qoldiq summasini, hisoblangan foizlari bilan birga muddatidan oldin qaytarish;
                            </li>
                            <li className='point_list pdf_margin_top_5'>
                                Istiqomat qiladigan joyi, familiyasi yoki ismi, faoliyat turi, faoliyat joyi, shaxsini tasdiqlovchi hujjat yoki ushbu shartnomani tuzish uchun asos bo‘lgan boshqa har qanday ma'lumotlar o‘zgargan holatda 5 kun ichida Qarz beruvchiga xabar qilish.
                            </li>
                        </ul>
                    </div>
                    <p className='black_text pdf_margin_top_10'>5. Tomonlarning mas'uliyatlari</p>
                    <div className='sections_ul pdf_margin_top_5'>
                        <p>5.1</p>
                        <ul>
                            <li>Qarz oluvchilar to‘lov jadvaliga asosan belgilangan qarz to‘lovini to‘lov kuni soat 16-00gacha to‘lashi shart. Agar, qarz to‘lovi yoki uning bir qismini to‘lash kechiksa, muddati o‘tkazib yuborilgan qarzdorlik yuzaga kelgan kundan boshlab qarz oluvchi qarz beruvchiga o‘tkazib yuborilgan muddatning har bir kuni uchun majburiyatning bajarilmagan qismidan 0,4%, ammo kechiktirilgan umumiy qarz miqdorining 50%idan oshmagan mikdorda penya to‘laydi. Bunda, qarz oluvchi tomonidan to‘langan barcha foizlar, penya va boshqa turdagi asosiy qarzni qaytarish bilan bog‘liq bo‘lmagan to‘lovlarning jami summasi shartnoma tuzilgan sanadan boshlab hisoblanadigan alohida olingan har bir kalendar yili uchun shartnoma bo‘yicha qarz miqdorining 50%idan oshmasligi lozim.</li>
                        </ul>
                    </div>
                    <div className='sections_ul pdf_margin_top_10'>
                        <p>5.2</p>
                        <ul>
                            <li>Qarz beruvchi o‘z majburiyatlarini shartnomada ko‘rsatilgan muddat ichida bajarmagan taqdirda qarz oluvchiga kechiktirilan har bir kuni uchun belgilangan qarz miqdorining 0,4%, ammo umumiy qarz miqdorining 50%dan oshmagan miqdorida jarima to‘laydi.</li>
                        </ul>
                    </div>
                    <div className='sections_ul pdf_margin_top_10'>
                        <p>5.3</p>
                        <ul>
                            <li>Garov shartnomasi va Kafillik shartnomasiga asoslanib, Qarz beruvchi Qarz oluvchilarning to‘lov kechiktirilgan asosiy qarz, uning foiz to‘lovlari va hisoblangan penya bo‘yicha majburiyatlarini hech qanday tortishuvlarsiz garov mulkidan  va/yoki kafillik beruvchidan undirishga haqlidir.</li>
                        </ul>
                    </div>
                    <p className='black_text pdf_margin_top_10'>6. Fors-major xolatlari</p>
                    <div className='sections_ul pdf_margin_top_5'>
                        <p>6.1</p>
                        <ul>
                            <li>Fors-major holatlari taraflardan biri boshqa tarafning oldida ushbu shartnoma bo‘yicha olgan majburiyatlarini taraflarning erki va istagidan tashqari paydo bo‘lgan va ularni oldindan ko‘ra bilishi yoki bartaraf etishi mumkin bo‘lmagan holatlar, ya'ni yer qimirlashi, suv toshqini, yong‘in va boshqa tabiiy ofatlar bilan bog‘liq holda bajarmaganlari uchun javobgar bo‘lmaydi.</li>
                        </ul>
                    </div>
                    <div className='sections_ul pdf_margin_top_10'>
                        <p>6.2</p>
                        <ul>
                            <li>O‘z majburiyatini bajarmagan taraf shartnoma bo‘yicha majburiyatni bajarishga ushbu holatlarning ta'sir ko‘rsatishi yoki mone'lik qilishi to‘g‘risida boshqa tarafga imkon qadar tezda xabar berishi lozim.</li>
                        </ul>
                    </div>
                    <p className='black_text pdf_margin_top_10'>7. Nizolarni xal kilish</p>
                    <div className='sections_ul pdf_margin_top_5'>
                        <p>7.1</p>
                        <ul>
                            <li>Agar, Ushbu shartnomada  tomonlar o‘rtasida kelib chiqqan nizo va ixtiloflar hal bo‘lmasa, bu nizo va ixtiloflar muzokaralar orqali hal qilinadi.</li>
                        </ul>
                    </div>
                    <div className='sections_ul pdf_margin_top_10'>
                        <p>7.2</p>
                        <ul>
                            <li>Agar, nizolarni muzokaralar orqali hal qilib bo‘lmasa, hal qilinmagan nizolarni tomonlar O‘zbekiston Respublikasining  qonunchiligiga asosan belgilangan tartibda Fuqarolik ishlari bo‘yicha Guliston tumanlararo sudida xal qiladi.</li>
                        </ul>
                    </div>
                    <p className='black_text pdf_margin_top_10'>8. Boshka shartlar</p>
                    <div className='sections_ul pdf_margin_top_5'>
                        <p>8.1</p>
                        <ul>
                            <li>Ushbu shartnomaga kiritiladigan har qanday o‘zgartirish va qo‘shimchalar yozma ravishda tomonlar o‘rtasida qo‘shimcha bitim tuzish orqali amalga oshiriladi va tuzilgan qo‘shimcha bitimlar Ushbu shartnomaning ajralmas qismi hisoblanadi.</li>
                        </ul>
                    </div>
                    <div className='sections_ul pdf_margin_top_10'>
                        <p>8.2</p>
                        <ul>
                            <li>Tomonlar o‘zlarining bir - birlari oldidagi majburiyatlarini bajargan holdagina, ushbu shartnoma to‘liq bajarilgan deb hisoblanadi.</li>
                        </ul>
                    </div>
                    <div className='sections_ul pdf_margin_top_10'>
                        <p>8.3</p>
                        <ul>
                            <li>Ushbu shartnoma uch nusxada, har bir tomon uchun bir nusxadan tuzilgan bo‘lib, bir xil yuridik kuchga ega va tomonlarda bittadan saqlanadi.</li>
                        </ul>
                    </div>
                    <p className='black_text pdf_margin_top_10'>9. Tomonlarning bank rekvizitlari  va yuridik manzillari</p>
                    <div className='sections_ul pdf_margin_top_5'>
                        <div className='pdf_end_2sections'>
                            <div className='pdf_end_2sections_section'>
                                <p>9.1. Qarz beruvchi:</p>
                                <div className='pdf_margin_top_20 section_space_pdf'>
                                    <p className='black_text text_center'>"Renesans Mikrokredit Tashkiloti" MChJ Guliston filiali</p>
                                    <p className='pdf_margin_top_20'>Sirdaryo viloyati, Guliston shahri, Samarqand ko‘chasi, Yangi bozor mavzesi, Xumo savdo majmuasi.</p>
                                    <p>H/r 20 216 000 004 636 656 001 MFO 00996 ATB Universal Bank Toshkent filiali</p>
                                    <p>STIR 300 515 648    OKED 64920</p>
                                    <p>Tel.:+998 67 236 55 77   +998 67 236 77 55</p>
                                </div>
                            </div>
                            <div className='pdf_end_2sections_section'>
                                <p>9.2. Qarz oluvchilar:</p>
                                <div className='pdf_margin_top_20 section_space_pdf'>
                                    <p className='black_text text_center'>Usmonova Muyassar Abduvaliyevna</p>
                                    <p className='pdf_margin_top_20'>AB2300850 raqamli O‘zR Fuqarosining biometrik pasporti   17.12.2015 da Sirdaryo viloyati Guliston shahar IIB tomonidan berilgan.</p>
                                    <p>Yashash manzili: Sirdaryo viloyati Guliston shahri Begmatov ko‘chasi 46-uy 10-xonadon</p>
                                    <p>JSh ShIR: 41-3077-9287-0060</p>
                                    <p>Telefon: 99/4703535"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='sections_ul pdf_margin_top_10'>
                        <div className='pdf_end_2sections'>
                            <div className='pdf_end_2sections_section'>
                                <div className='pdf_margin_top_20 section_space_pdf'>
                                    <div className='between  pdf_margin_top_20'>
                                        <p>Boshqaruvchi</p>
                                        <p>Muxammadov B.M.</p>
                                    </div>
                                    <div className='between pdf_margin_top_20'>
                                        <p>Bosh buxgalter</p>
                                        <p>Sultonova G.M.</p>
                                    </div>
                                </div>
                            </div>
                            <div className='pdf_end_2sections_section'>
                                <div className='pdf_margin_top_20 section_space_pdf'>
                                    <div className='between  pdf_margin_top_20'>
                                        <p>_______________</p>
                                        <p></p>
                                    </div>
                                    <div className='between pdf_margin_top_20'>
                                        <p>_______________</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default S1Form