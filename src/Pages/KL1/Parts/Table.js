import React, { useState, useContext,useEffect } from 'react'
// Components
import { Textarea, Radio, Input } from '@nextui-org/react'
import { useForm } from "react-hook-form";
import { Context } from '../../../Context';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import https from '../../../assets/https';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

import '../KL1.css'

function Table() {

    const [errorStatus, setErrorStatus] = useState(false)
    const [show, setShow] = useState(false)

    const [ orderInfo, setOrderInfo ] = useState({})

    
    // Alerts
    function Success() {
        Swal.fire({
            title: "KL1 shakl qo'shildi",
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }
    function Error() {
        Swal.fire({
            title: "Error",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }

    // Tab active
    const { activeTab, setActiveTab } = useContext(Context)
    const { dataTable, setDataTable } = useContext(Context)
    useEffect(() => {
        setActiveTab(8)
    }, [])
    // Components
    const { 
        infoClient, infoOrder,
        // malumot
        dataMalumot,
        // 1 Qism
        familyMem, mulkItem, dataFirstQism, path,
        // Boshqa
        myDaromads, checkMavsumiy, checkBiznes,
        // Mavsumiy
        monthDaromad,
        monthXarajat,
        mavsumiyDaromads, mavsumiyXarajats, 
        // Biznes
        biznesDaromads, biznesXarajats,
        // 6 Qism
        familyDaromad, familyXarajat, familyMalumot,
        // 7 Qism
        familyMavjud, dataSeventhQism, historyKredit,
        // Table
        geoLocation, setGeoLocation
    } = useContext(Context)

    const [sof, setSof] = useState(1)
    const [kreditData, setKreditData] = useState({})
    const orderIdGet = window.localStorage.getItem('order_id')
    // Summ 
    function GetSumDaromadBiznes(){
        let newBiznesDaromad = []
        biznesDaromads.map((item,index)=>{
            newBiznesDaromad.push(item.plus)
        })
        let totalDaromad = newBiznesDaromad.reduce((prev,current)=> Number(prev) + Number(current), 0)
        return totalDaromad
    }

    function GetSumXarajatBiznes(){
        let newBiznesXarajat = []
        biznesXarajats.map((item,index)=>{
            newBiznesXarajat.push(item.minus)
        })
        let totalXarajat = newBiznesXarajat.reduce((prev,current)=> Number(prev) + Number(current), 0)
        return totalXarajat
    }

    // get total price of Daromad
    const getTotalSumBoshqa = () => {
        const newSumArray = []
        myDaromads.map((item, index) => {
            newSumArray.push(item.oylik)
        })
        let totalPrices = newSumArray.reduce((prev, current) => prev + current, 0)
        return totalPrices
    }

    const GetDaromadSumMavsumiy = () =>{
        const SumArr1 = []
        mavsumiyDaromads?.map((item,index)=>{
            SumArr1.push(Number(item.value))
        })
        let totalSum1 = SumArr1.reduce((prev, current)=> prev + current, 0)
        return totalSum1
    }

    const GetXarajatSumMavsumiy = () =>{
        const SumArr2 = []
        mavsumiyXarajats?.map((item,index)=>{
            SumArr2.push(Number(item.value))
        })
        let totalSum2 = SumArr2.reduce((prev, current)=> prev + current, 0)
        return totalSum2
    }

    function GetSumXarajatQism6(){
        let xarajat = []
        familyXarajat?.map(item =>{
            xarajat.push(item.minus)
        })
        let totalXarajatSum = xarajat.reduce((prev,current) => Number(prev) + Number(current), 0)
        return totalXarajatSum
    }
    function GetMalumotPayQism6(){
        let malumotPay = []
        familyMalumot?.map(item =>{
            malumotPay.push(item.pay)
        })
        let totalMalumotSumPay = malumotPay.reduce((prev,current) => Number(prev) + Number(current), 0)
        return totalMalumotSumPay
    }

    function SupplyTypes(supply){
        let types = []
        supply?.map(item =>{
            if(item?.type == 'gold'){
                types.push('Tilla Buyumlar Kafilligi')
            }else if(item?.type == 'auto'){
                types.push('Transport Vositasi Garovi')
            }else if(item?.type == 'guarrantor'){
                types.push('3 shaxs kafilligi')
            }else if(item?.type == 'insurance'){
                types.push('Sugurta kompaniyasi sugurta polisi')
            }
        })
        return types?.join(',')
    }

    function SupplySum(supply){
        let summ = []
        supply?.map(item =>{
            summ.push(item?.sum)
        })
        let totalSum = summ.reduce((prev,current) => prev + current, 0)
        return totalSum?.toLocaleString()
    }

    useEffect(()=>{
        setSof(GetSumDaromadBiznes() + getTotalSumBoshqa() + (GetDaromadSumMavsumiy())/12 - GetSumXarajatBiznes() - (GetXarajatSumMavsumiy())/12)

        let Data = new Date();
        let Year = Data.getFullYear();
        let Month = Data.getMonth() + 1;
        let Day = Data.getDate();
        let today = `${Year}-${Month}-${Day}`

        https
        .get(`/orders/${orderIdGet}`)
        .then(res =>{
            setOrderInfo(res?.data)

            let data ={
                type : 'annuitet',
                sum : res?.data?.sum,
                time : res?.data?.time,
                percent : 58,
                given_date : today,
                first_repayment_date : today
            }

            if(data?.time && data?.sum && data?.type && data?.percent){
                https
                .post('/namuna', data)
                .then(responsive =>{
                    setKreditData(responsive?.data?.['0'])
                })
                .catch(error =>{
                    console.log(error)
                    console.log(data)
                })
            }
        })
        .catch(error =>{
            console.log(error)
            console.log(orderIdGet)
        })
    },[])

    function ProcentNumber(){
        let pay = []
        familyMavjud?.map(item =>{
            pay.push(item.pay)
        })
        let totalPay = pay.reduce((prev,current) => Number(prev) + Number(current), 0)

        return((((kreditData?.interest + kreditData?.principal_debt + totalPay)/sof)*100).toFixed(2))
    }

    let navigate = useNavigate()
    function FinishStep(){
        navigate('/kl1', { replace: true });
    }
    function BackStep(){
        navigate("/kl1/addkl1/7_qism", { replace: true });
    }

    // UseForm
    const { register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();

    // Location
    const defaultState = {
        center: [geoLocation?.latitude, geoLocation?.longitude],
        zoom: 14,
    };
    function Location(){
        if(geoLocation?.latitude && geoLocation?.longitude){
            return(
                <div className='location_field'>
                    <YMaps>
                        <Map defaultState={defaultState}>
                            <Placemark geometry={[geoLocation?.latitude, geoLocation?.longitude]} />
                        </Map>
                    </YMaps>
                </div>
            )
        }else{
            return(<></>)
        }
    }

    async function PostFirst(dataBase){
        await https
        .post('/activities', dataBase)
        .then(res =>{
            console.log(res)
        })
        .catch(err =>{
            console.log(err)
            // return(
            //     Error()
            // )
        })
    }
    async function PostBoshqa(firstItem){
        await https
        .post('/other-income', firstItem)
        .then(res =>{
            console.log(res);
        })
        .catch(err =>{
            console.log(err)
            // return(
            //     Error()
            // )
        })
    }

    async function PostBiznes(biznesPlusItem){
        await https
        .post('/business-incomes', biznesPlusItem)
        .then(res =>{
            console.log(res)
        })
        .catch(err =>{
            console.log(err)
            // return(
            //     Error()
            // )
        })
    }

    async function PostBiznesMinus(biznesMinusItem){
        await https
        .post('/business-expenses', biznesMinusItem)
        .then(res =>{
            console.log(res)
        })
        .catch(err =>{
            console.log(err)
            // return(
            //     Error()
            // )
        })
    }

    async function PostFamily(familyPlusItem){
        await https
        .post('/family-incomes', familyPlusItem)
        .then(res =>{
            console.log(res)
        })
        .catch(err =>{
            console.log(err)
            // return(
            //     Error()
            // )
        })
    }

    async function PostFamilyMinus(familyMinusItem){
        await https
        .post('/family-expenses', familyMinusItem)
        .then(res =>{
            console.log(res)
        })
        .catch(err =>{
            console.log(err)
            // return(
            //     Error()
            // )
        })
    }

    async function PostFamilyKredit(familyKreditItem){
        await https
        .post('/family-loans', familyKreditItem)
        .then(res =>{
            console.log(res)
        })
        .catch(err =>{
            console.log(err)
            // return(
            //     Error()
            // )
        })
    }

    async function PostClientKredit(clientKreditItem){
        await https
        .post('/loans', clientKreditItem)
        .then(res =>{
            console.log(res)
        })
        .catch(err =>{
            console.log(err)
            return(
                Error()
            )
        })
    }

    const onSubmit = (data) =>{

        let familyMembersCopy = []
        familyMem?.map((item)=>{
            familyMembersCopy.push(item.name)
        })

        let mulkCopy = []
        mulkItem.map(item =>{
            mulkCopy.push(item.name)
        })
        
        let info = {
            user_id:1,
            order_id:infoOrder.id,
            client_id:infoClient?.id,
            doc_date:dataMalumot.doc_date,
            mark_date:dataMalumot.mark_date,
            family:familyMembersCopy,
            property:mulkCopy,
            paths:path,
            geolocation:geoLocation,
            conversation_result:dataFirstQism.conversation_result,
            living_condition:dataFirstQism.living_condition,
            credit_impact:dataTable.credit_impact,
            conclusion:dataTable.conclusion,
            credit_history:historyKredit,
            status:dataTable.status
        }

        if(checkMavsumiy){
            Object.assign(info,{ monthly_income: monthDaromad, monthly_expense: monthXarajat})
        }
        
        https
        .post('/client-marks', info)
        .then(res =>{
            console.log(info)
            console.log(res?.data)

            if(res?.data){
                // 1 Qism
                let dataBase = {
                    type: dataFirstQism.type,
                    address: dataFirstQism.address,
                    owner: dataFirstQism.owner,
                    duration: dataFirstQism.duration,
                    client_mark_id: res?.data?.id
                }
                PostFirst(dataBase)

                // Boshqa
                myDaromads?.map(item =>{
                    let firstItem = {
                        name: item?.nomi,
                        volume: item?.hajmi,
                        unit_price: item?.birlikNarxi,
                        worth: item?.qiymati,
                        comment: item?.izoh,
                        client_mark_id: res?.data?.id
                    }
                    PostBoshqa(firstItem)
                })

                // Biznes
                if(checkBiznes){
                    biznesDaromads?.map(item =>{
                        let biznesPlusItem = {
                            "name" : item?.name,
                            "monthly_volume" : item?.volume,
                            "unit_price" : item?.price,
                            "average_price" : item?.percent,
                            "monthly_income" : item?.plus,
                            "comment" : item?.commit,
                            "type" : 1,
                            "client_mark_id": res?.data?.id
                        }
                        PostBiznes(biznesPlusItem)
                    })
    
                    biznesXarajats?.map(item =>{
                        let biznesMinusItem = {
                            "name":item?.name,
                            "volume" : item?.volume,
                            "price" : item?.price,
                            "value" : item?.cost,
                            "average_monthly_expense" : item?.minus,
                            "comment" : item?.commit,
                            "type" : 1,
                            "client_mark_id": res?.data?.id
                        }
                        PostBiznesMinus(biznesMinusItem)
                    })
                }

                // 6 Qism
                if(familyDaromad[0].profit != 0){
                    familyDaromad.map(item =>{
                        let familyPlusItem = {
                            "name": item?.name,
                            "activity_type": item?.type,
                            "activity_address": item?.address,
                            "monthly_income": item?.profit,
                            "comment": item?.commit,
                            "client_mark_id": res?.data?.id
                        }
                        PostFamily(familyPlusItem)
                    })
                }

                if(familyXarajat[0].minus != 0){
                    familyXarajat.map(item =>{
                        let familyMinusItem = {
                            "name": item?.name,
                            "expense": item?.minus,
                            "comment": item?.commit,
                            "client_mark_id": res?.data?.id
                        } 
                        PostFamilyMinus(familyMinusItem)
                    })
                }

                if(familyMalumot[0].pay != 0){
                    familyMalumot.map(item =>{
                        let familyKreditItem = {
                            "name": item?.name,
                            "main": item?.rest,
                            "monthly": item?.pay,
                            "comment": item?.commit,
                            "client_mark_id": res?.data?.id
                        }
                        PostFamilyKredit(familyKreditItem)
                    })
                }

                if(familyMavjud[0].pay != 0){
                    familyMavjud.map(item =>{
                        let clientKreditItem = {
                            "name": item?.name,
                            "main": item?.rest,
                            "monthly": item?.pay,
                            "comment": item?.commit,
                            "client_mark_id": res?.data?.id
                        }
                        PostClientKredit(clientKreditItem)
                    })
                }
                
                setTimeout(()=>{
                    Success()
                },1000)
            }

        })
        .catch(err =>{
            console.log(err)
            return(
                Error()
            )
        })

    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='kl1_table'>
                    <div className='kl1_table_dark-bg'>Hulq atvori</div>
                    <div className='kl1_table_dark-bg'>Shaxsiy sifatida baholanishi</div>
                    <div className='kl1_table_dark-bg'>Moliaviy malumotlar va savodxonlik</div>
                    <div className='kl1_table_double kl1_table_noPadding'>
                        <p>сухбат</p>
                        <div className='kl1_table_inputs'>
                            <input 
                                placeholder='ижобий' 
                                type='text' 
                                value={dataTable?.first_input}
                                // {...register("first_input", { required: true })}
                                onChange={(e)=>{
                                    let array = {...dataTable}
                                    array.first_input = e.target.value
                                    setDataTable(array)
                                }}
                            />
                        </div>
                    </div>
                    <div className='kl1_table_double kl1_table_noPadding'>
                        <p>учрашув</p>
                        <div className='kl1_table_inputs'>
                            <input 
                                placeholder='ижобий' 
                                type='text' 
                                value={dataTable?.second_input}
                                // {...register("second_input", { required: true })}
                                onChange={(e)=>{
                                    let array = {...dataTable}
                                    array.second_input = e.target.value
                                    setDataTable(array)
                                }}
                            />
                        </div>
                    </div>
                    <div className='kl1_table_inputs'>
                        <input 
                            placeholder='ижобий' 
                            type='text' 
                            value={dataTable?.third_input}
                            // {...register("third_input", { required: true })}
                            onChange={(e)=>{
                                let array = {...dataTable}
                                array.third_input = e.target.value
                                setDataTable(array)
                            }}
                        />
                    </div>
                    <div className='kl1_table_double kl1_table_noPadding'>
                        <p>oylik tolov</p>
                        <p>OT/OD</p>
                    </div>
                    <div className='kl1_table_double kl1_table_dark-bg kl1_table_noPadding'>
                        <p>SD/OT</p>
                        <p>OHX</p>
                    </div>
                    <div className='kl1_table_dark-bg'>Natija</div>
                    <div className='kl1_table_double kl1_table_dark-bg kl1_table_noPadding'>
                        <p className='kl1_table_yellow-bg'>{(kreditData?.interest + kreditData?.principal_debt)?.toLocaleString()}</p>
                        <p className={ProcentNumber() > 50 ? 'kl1_table_red-bg' : 'kl1_table_green-bg'}>{ProcentNumber()}</p>
                    </div>
                    <div className='kl1_table_double kl1_table_noPadding'>
                        <p className={ ((sof/(kreditData?.interest + kreditData?.principal_debt))*100).toFixed(2) > 120 ? 'kl1_table_green-bg' : 'kl1_table_red-bg'}>{((sof/(kreditData?.interest + kreditData?.principal_debt))*100).toFixed(2)}%</p>
                        <p className='kl1_table_yellow-bg'>{(GetSumXarajatQism6() + GetMalumotPayQism6()) ? (GetSumXarajatQism6() + GetMalumotPayQism6())?.toLocaleString() : 0}</p>
                    </div>
                    <div className='kl1_table_yellow-bg'> {`<= 50% и >= 120%`}</div>
                    <div className='kl1_table_dark-bg'>Shaxsiy kapital miqdori</div>
                    <div className='kl1_table_dark-bg'>Shaxsiy kapital/kreditlar</div>
                    <div className='kl1_table_dark-bg'>Natija</div>
                    <div className='kl1_table_inputs'>
                        <input 
                            placeholder='25 000 000,00' 
                            type='number' 
                            value={dataTable?.sum_input}
                            // {...register("sum_input", { required: true })}
                            onChange={(e)=>{
                                let array = {...dataTable}
                                array.sum_input = e.target.value
                                setDataTable(array)
                            }}
                        />
                    </div>
                    <div className='kl1_table_yellow-bg'>125%</div>
                    <div className='kl1_table_yellow-bg'>50</div>
                    <div className='kl1_table_dark-bg'>Daromad manbai</div>
                    <div className='kl1_table_dark-bg'>Faoliyat barqarorligi</div>
                    <div className='kl1_table_dark-bg'>Kutilayotgan rivojlanish</div>
                    <div className='kl1_table_inputs kl1_table_input_padding'>
                        <input 
                            placeholder='баркарор' 
                            type='text' 
                            value={dataTable?.fourth_input}
                            // {...register("fourth_input", { required: true })}
                            onChange={(e)=>{
                                let array = {...dataTable}
                                array.fourth_input = e.target.value
                                setDataTable(array)
                            }}
                        />
                    </div>
                    <div className='kl1_table_inputs kl1_table_input_padding'>
                        <input 
                            placeholder='баркарор' 
                            type='text' 
                            value={dataTable?.fifth_input}
                            // {...register("fifth_input", { required: true })}
                            onChange={(e)=>{
                                let array = {...dataTable}
                                array.fifth_input = e.target.value
                                setDataTable(array)
                            }}
                        />
                    </div>
                    <div className='kl1_table_inputs kl1_table_input_padding'>
                        <input
                            placeholder='ижобий'
                            type='text'
                            value={dataTable?.sixth_input}
                            // {...register("sixth_input", { required: true })}
                            onChange={(e)=>{
                                let array = {...dataTable}
                                array.sixth_input = e.target.value
                                setDataTable(array)
                            }}
                        />
                    </div>
                    <div className='kl1_table_dark-bg'>Taminot turi</div>
                    <div className='kl1_table_dark-bg'>Taminot qiymati</div>
                    <div className='kl1_table_dark-bg'>Kreditni qoplash koeffitsenti</div>
                    <div>{SupplyTypes(orderInfo?.supply_infos)}</div>
                    <div>{SupplySum(orderInfo?.supply_infos)}</div>
                    <div className='kl1_table_yellow-bg'>100%</div>
                </div>
                <Textarea
                    width='100%'
                    bordered
                    rounded
                    color="secondary"
                    className='kl1_input'
                    placeholder='Ajratiladigan kreditga mijoz qoshimcha 150 litr LukOil moylarini, shuningdek, moy alishtirish jarayonida zaruriy bolgan avto ehtiyot qismlar savdosini ham yolga qoymoqchi. Birlamchi hisob kitoblar buyurtmachi daromadi qoshimcha 1 500 000 somga oshishini korsatmoqda.'
                    label='Ajratilgan kreditning buyurtmachi uchun tasirini baholash'
                    value={dataTable?.credit_impact}
                    {...register("credit_impact", { required: true })}
                    onChange={(e)=>{
                        let array = {...dataTable}
                        array.credit_impact = e.target.value
                        setDataTable(array)
                    }}
                />
                <Textarea
                    width='100%'
                    bordered
                    rounded
                    color="secondary"
                    className='kl1_input'
                    placeholder='дохода клиента достаточно для получения кредита'
                    label='Monitoring boyicha masul xodimning yakuniy xulosasi'
                    value={dataTable?.conclusion}
                    {...register("conclusion", { required: true })}
                    onChange={(e)=>{
                        let array = {...dataTable}
                        array.conclusion = e.target.value
                        setDataTable(array)
                    }}
                />
                <Input
                    rounded
                    bordered
                    label='Kenglik'
                    color="secondary"
                    width='100%'
                    className='kl1_input'
                    value={geoLocation?.latitude}
                    {...register("location.latitude", { required: true })}
                    onChange={(e)=>{
                        let newLocation = {...geoLocation}
                        newLocation.latitude = e.target.value
                        setGeoLocation(newLocation)
                    }}
                />
                <Input
                    rounded
                    bordered
                    label='Uzunlik'
                    color="secondary"
                    width='100%'
                    className='kl1_input'
                    value={geoLocation?.longitude}
                    {...register("location.longitude", { required: true })}
                    onChange={(e)=>{
                        let newLocation = {...geoLocation}
                        newLocation.longitude = e.target.value
                        setGeoLocation(newLocation)
                    }}
                />
                <button type='button' className='location_button' onClick={()=>{setShow(true)}}>Kartada ko'rish</button>
                {
                    show ? Location() : <></>
                }
                <div className='kl1_accepting'>
                    <p>Taqdim etilgan va toplangan malumotlar hamda kredit byurosidan olingan kredit tarixiga asoslanib men tomonimdan otkazilgan organish va tahlillar asosida ushbu buyurtma boyicha quiydagi yakuniy xulosamni kredit komissiyasida korib chiqish uchun taqdim etaman</p>
                    <Radio.Group label=' ' value={dataTable?.status} size='sm' className='kl1_accepting_radio'
                        onChange={(e)=>{
                            let array = {...dataTable}
                            array.status = e
                            setDataTable(array)
                        }}
                    >
                        <div className='kl1_accept margin_bottom'><Radio color='success' className='radio_end' value={true}>Kredit ajratish</Radio></div>
                        <div className='kl1_accept'><Radio color='error' className='radio_end' value={false}>Rad etish</Radio></div>
                    </Radio.Group>
                </div>

                <div className='step_buttons double_button'>
                    <button type='button' onClick={()=>{BackStep()}} className='previous_button'><AiOutlineDoubleLeft/><p>Oldingi</p></button>
                    <button type='submit' className='step_next'><p>KL1 qo'shish</p></button>
                </div>
            </form>
        </>
    )
}

export default Table