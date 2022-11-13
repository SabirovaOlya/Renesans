import React,{ useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Input } from '@nextui-org/react'
import { AiOutlineRollback, AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import https from '../../assets/https';
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
// Alert
import Swal from 'sweetalert2'
import { Radio } from "@nextui-org/react";
import { List } from 'react-content-loader'
import Select from 'react-select';
import { BiTrash } from 'react-icons/bi';
import './Taminot.css'

function EditAvto() {

    const [loading, setLoading] = useState(true)

    const [avtoInfo, setAvtoInfo] = useState({})
    const [avtoBack, setAvtoBack] = useState({})
    const [cars, setCars] = useState([])

    let { id } = useParams()

    const { register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();

    // Alert
    function Success() {
        Swal.fire({
            title: "Ta'minot o'zgartirildi",
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }
    function Warn() {
        Swal.fire({
            title: "Xato",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
    function ProcentError() {
        Swal.fire({
            title: "Qabul qilish qiymati 100% dan ortiq",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }

    // Selector Options
    const options = [
        { value: '1', label: "O'zR fuqarosining ID kartasi" },
        { value: '2', label: "O'zR Fuqarosining pasporti" },
        { value: '3', label: "Harbiy xizmatchi guvohnomasi" },
        { value: '4', label: "Xizmat guvohnomasi" },
        { value: '5', label: "Xorijiy fuqaro pasporti" },
        { value: '6', label: "Yashash guvohnomasi" },
        { value: '7', label: "O'zR Fuqarosining biometrik pasporti" },
        { value: '8', label: "Tug'ulganlik haqidagi guvohnoma" },
        { value: '9', label: "O'zR fuqarosining yangi namunadagi haydovchilik guvohnomasi" },
        { value: '10', label: "Boshqa" }
    ];

    // Style of selector
    const colourStyles = {
        control: styles => ({ ...styles, backgroundColor: 'white'}),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          return {
            ...styles,
            backgroundColor: isSelected ? 'rgb(215,215,215)' : 'white',
            color:'black',
            margin: '0 5px',
            width: 'cal(100% - 10px)',
            fontWeight:500,
            borderRadius:'5px',
            border: isSelected ? '2px solid rgb(215,215,215)' : '2px solid white',
            cursor: isDisabled ? 'not-allowed' : 'default',
            "&:hover": {
                border:'2px solid rgb(215,215,215)'
            }
          };
        },
        
    };

    async function GetData(){
        await https
        .get(`/supply-info/${id}`)
        .then(res =>{
            if(res?.data?.valued_by == 1){
                let arr ={...res?.data, company : {name:'', license:'', doc_code:'', valuer_name:''}}
                if(res?.data?.possessor == "client"){
                    let arr2 = {...arr, 
                        owner:{
                            fio:'',
                            doc_type:'',
                            serial_num:'',
                            issued_by:'',
                            issue_date:'',
                            address:'',
                            pinfl:'',
                            phone:''
                        },
                        trust_owner:{
                            fio:'',
                            doc_type:'',
                            serial_num:'',
                            issued_by:'',
                            issue_date:'',
                            address:'',
                            pinfl:'',
                            date:'',
                            proxy_number:''
                        }
                    }
                    setAvtoInfo(arr2)
                    setAvtoBack(arr2)
                }else if(res?.data?.possessor == "owner"){
                    let arr3 = {...arr,
                        trust_owner:{
                            fio:'',
                            doc_type:'',
                            serial_num:'',
                            issued_by:'',
                            issue_date:'',
                            address:'',
                            pinfl:'',
                            date:'',
                            proxy_number:''
                        }
                    }
                    setAvtoInfo(arr3)
                    setAvtoBack(arr3)
                }else if(res?.data?.possessor == "trust_owner"){
                    setAvtoInfo(arr)
                    setAvtoBack(arr)
                }
            }else{
                setAvtoInfo(res?.data)
                setAvtoBack(res?.data)
                let array = {...res?.data}
                if(res?.data?.possessor == "client"){
                    let array2 = {...array, 
                        owner:{
                            fio:'',
                            doc_type:'',
                            serial_num:'',
                            issued_by:'',
                            issue_date:'',
                            address:'',
                            pinfl:'',
                            phone:''
                        },
                        trust_owner:{
                            fio:'',
                            doc_type:'',
                            serial_num:'',
                            issued_by:'',
                            issue_date:'',
                            address:'',
                            pinfl:'',
                            date:'',
                            proxy_number:''
                        }
                    }
                    setAvtoInfo(array2)
                    setAvtoBack(array2)
                }else if(res?.data?.possessor == "owner"){
                    let array3 = {...array,
                        trust_owner:{
                            fio:'',
                            doc_type:'',
                            serial_num:'',
                            issued_by:'',
                            issue_date:'',
                            address:'',
                            pinfl:'',
                            date:'',
                            proxy_number:''
                        }
                    }
                    setAvtoInfo(array3)
                    setAvtoBack(array3)
                }else if(res?.data?.possessor == "trust_owner"){
                    setAvtoInfo(array)
                    setAvtoBack(array)
                }
            }
            setCars(res?.data?.auto)
            setTimeout(()=>{
                setLoading(false)
            },300)
        })
        .catch(err =>{
            console.log(err)
        })
    }

    useEffect(()=>{
        GetData()
    },[])

    // Addining Item
    function addNewCar() {
        let newCar = {
            id:uuidv4(),
            name:'',
            year:'',
            number:'',
            type_of_auto:'',
            engine_number:'',
            body_code:'',
            chassis:'',
            sum:0
        }
        setCars(cars.concat(newCar))
    }
    // Deleting Item
    function deleteCar(id) {
        if(cars.length > 1){
            let carItems = cars.filter(x => x.id !== id)
            setCars(carItems)
        }
    }
    // Getting Total Sum of golds
    function TotalSum(){
        let SumArray = []
        cars?.map((item)=>{
            SumArray.push(item?.sum)
        })
        let total = SumArray.reduce((prev, current) => Number(prev) + Number(current), 0)

        return total
    }

    function BackFun(){
        setAvtoInfo(avtoBack)
    }

    function RadioColl(){
        if(avtoInfo?.valued_by){
            return(
                <Radio.Group label=' ' color='secondary' orientation="horizontal" defaultValue={avtoInfo?.valued_by == 2 ? 2 : 1} size='sm' className='taminot_ratio' 
                    onChange={(event)=>{
                        let newArray = {...avtoInfo}
                        newArray.valued_by = event
                        setAvtoInfo(newArray)
                    }}
                >
                    <Radio value={2}>Mustaqil Baholash Asosida</Radio>
                    <Radio value={1}>O'zaro kelishuvga asosan</Radio>
                </Radio.Group>
            )
        }else{
            <></>
        }
    }

    function RadioThree() {
        if(avtoInfo?.possessor){
            return(
            <div className='transport_garov'>
                <p>Garov mulkining egasi</p>
                <div>
                    <Radio.Group label=' ' orientation="horizontal" color='secondary' defaultValue={avtoInfo?.possessor} size='sm' className='transport_garov_radioGroup' onChange={(e)=>{
                        let newArray = {...avtoInfo}
                        newArray.possessor = e
                        setAvtoInfo(newArray)
                    }}>
                        <Radio value={'client'} className='transport_garov_radio'>Mijozning o'zi</Radio>
                        <Radio value={'owner'} className='transport_garov_radio'>Uchinchi shaxs</Radio>
                        <Radio value={'trust_owner'} className='transport_garov_radio'>Ishonchnoma asosida</Radio>
                    </Radio.Group>
                </div>
            </div>
            )
        }
    }

    const onSubmit = (data) =>{
        let carsNoId = JSON.parse(JSON.stringify(cars))
        carsNoId?.map(item =>{
            delete item.id
        })

        let info = { 
            order_id:avtoInfo?.order?.id,
            type: 'auto',
            possessor: avtoInfo?.possessor,
            valued_by:avtoInfo?.valued_by,
            date:data.date,
            sum:data.sum,
            percent:data.percent,
            company:data.company,
            owner:data?.owner,
            trust_owner:data?.trust_owner,
            auto:carsNoId
        }
        Object.assign(info.owner, {doc_type: avtoInfo?.owner?.doc_type, id:avtoInfo?.owner?.id})
        Object.assign(info.trust_owner, {doc_type: avtoInfo?.trust_owner?.doc_type, id:avtoInfo?.trust_owner?.id})

        let postInfo = JSON.parse(JSON.stringify(info))
        if(avtoInfo?.valued_by == 1){
            delete  postInfo.company
        }
        if(avtoInfo?.possessor === "client"){
            delete postInfo.trust_owner
            delete postInfo.owner
        }else if(avtoInfo?.possessor === "owner"){
            delete postInfo.trust_owner
        }

        if(avtoInfo?.percent <= 100){
            https
            .patch(`/supply-info/${id}`, postInfo)
            .then(res =>{
                if(res.request.status === 200){
                    Success()
                    console.log(postInfo)
                }
            })
            .catch(err =>{
                Warn()
                console.log(err)
                console.log(postInfo);
            })
        }else{
            ProcentError()
        }
    }


  return (
    <section>
        <div className='filialform_header'>
          <Link to='/taminot' className='clientform_back'>
              <AiOutlineRollback />
              Orqaga
          </Link>
        </div>
        <div className='single_buyurtma'>
            {
                loading ? (
                    <div className='margin_top_30'>
                        <List />
                    </div>
                ) : (
                <>        
            <h1 className='text_center filial_edit_text'>{avtoInfo?.order?.client?.name}</h1>
            <div className='pdf_margin_top_15'>
                <form onSubmit={handleSubmit(onSubmit)} className='single_buyurtma_info'>
                    {
                        RadioThree()
                    }
                    <div className='taminot_ratio_parent taminot_tilla_radio'>
                        {
                            RadioColl()
                        }
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Ta'minot turi:</p>
                        <p>Transport Vositasi Garovi</p>
                    </div>
                    <div className={ avtoInfo?.valued_by == 2 ? 'taminot_bahoType' : 'close'}>
                        <Input
                            bordered
                            label='Tilla buyumlarni baholovchi tashkilot'
                            className='vall'
                            width='100%'
                            clearable
                            color="secondary"
                            value={avtoInfo?.company?.name}
                            {...register(`company.name`, { required: avtoInfo?.valued_by == 2 ? true : false} )}
                            onChange={(e)=>{
                                let newArray = {...avtoInfo}
                                newArray.company.name = e.target.value
                                setAvtoInfo(newArray)
                            }}
                        />
                        <Input
                            bordered
                            label='Litsenziya'
                            className='vall'
                            width='100%'
                            clearable
                            color="secondary"
                            value={avtoInfo?.company?.license}
                            {...register(`company.license`, { required: avtoInfo?.valued_by == 2 ? true : false} )}
                            onChange={(e)=>{
                                let newArray = {...avtoInfo}
                                newArray.company.license = e.target.value
                                setAvtoInfo(newArray)
                            }}    
                        />
                        <Input
                            bordered
                            label='Baholovchining ismi sharifi'
                            className='vall'
                            width='100%'
                            clearable
                            color="secondary"
                            value={avtoInfo?.company?.valuer_name}
                            {...register(`company.valuer_name`, { required: avtoInfo?.valued_by == 2 ? true : false} )}
                            onChange={(e)=>{
                                let newArray = {...avtoInfo}
                                newArray.company.valuer_name = e.target.value
                                setAvtoInfo(newArray)
                            }}   
                        />
                        <Input
                            bordered
                            label='Baholash hujjati raqami'
                            width='100%'
                            clearable
                            className='vall'
                            color="secondary"
                            value={avtoInfo?.company?.doc_code}
                            {...register(`company.doc_code`, { required: avtoInfo?.valued_by == 2 ? true : false} )}
                            onChange={(e)=>{
                                let newArray = {...avtoInfo}
                                newArray.company.doc_code = e.target.value
                                setAvtoInfo(newArray)
                            }}  
                        />
                    </div>
                    <div className='transport_mainInputs'>  
                        <Input 
                            label='Baholovchi hujjat sanasi'
                            width='100%'
                            color="secondary"
                            bordered 
                            className='transport_mainInputs_input' 
                            type='date'
                            value={avtoInfo?.date}
                            {...register(`date`, { required: true} )}
                            onChange={(e)=>{
                                let newArray = {...avtoInfo}
                                newArray.date = e.target.value
                                setAvtoInfo(newArray)
                            }}  
                        >
                        </Input>  
                        <Input 
                            label='Baholangan qiymati'
                            value={TotalSum()}
                            readOnly
                            width='100%'
                            color="secondary"
                            bordered 
                            className='transport_mainInputs_input' 
                        >
                        </Input>  
                    </div>
                    {/*********--- TABLE ---*********/}
                    <div className='transport_table'>
                        <div className='transport_table_title_part'>
                            <p className='transport_table_title'>Baholash natijalari</p>
                        </div>
                        {
                            cars?.map((item,index)=>{
                                return(
                                    <div className='transport_table_product' key={item?.id}>
                                        <div className='transport_table_product_title'>
                                            <p>Mahsulot {index + 1}</p>
                                            <button type='button' onClick={()=>deleteCar(item?.id)}><i className='bx bxs-trash'></i></button>
                                        </div>
                                        <div className='transport_table_things'>
                                            <Input 
                                                label='Nomi'
                                                placeholder='Damos'
                                                clearable
                                                color="secondary"
                                                bordered 
                                                className='transport_tableProduct_input' 
                                                value={cars?.find(x => x.id === item.id).name}
                                                onChange={(e)=>{
                                                    const newArray = [...cars]
                                                    newArray[index].name = e.target.value
                                                    setCars(newArray)
                                                }}
                                            >
                                            </Input>  
                                            <Input 
                                                label='Ishlab chiqarilgan yil'
                                                placeholder='2009'
                                                clearable
                                                color="secondary"
                                                type='number'
                                                bordered 
                                                className='transport_tableProduct_input' 
                                                value={cars?.find(x => x.id === item.id).year}
                                                onChange={(e)=>{
                                                    const newArray = [...cars]
                                                    newArray[index].year = e.target.value
                                                    setCars(newArray)
                                                }}
                                            >
                                            </Input>
                                            <Input 
                                                label='Davlat raqam belgisi'
                                                placeholder='FR 447 RJ'
                                                clearable
                                                color="secondary"
                                                bordered 
                                                className='transport_tableProduct_input' 
                                                value={cars?.find(x => x.id === item.id).number}
                                                onChange={(e)=>{
                                                    const newArray = [...cars]
                                                    newArray[index].number = e.target.value.toUpperCase()
                                                    setCars(newArray)
                                                }}
                                            >
                                            </Input>
                                            <Input 
                                                label='Transport vositasi turi'
                                                placeholder='yengil sedan'
                                                clearable
                                                color="secondary"
                                                bordered 
                                                className='transport_tableProduct_input' 
                                                value={cars?.find(x => x.id === item.id).type_of_auto}
                                                onChange={(e)=>{
                                                    const newArray = [...cars]
                                                    newArray[index].type_of_auto = e.target.value
                                                    setCars(newArray)
                                                }}
                                            >
                                            </Input>
                                            <Input 
                                                label='Qayd etish guvohnomasi'
                                                color="secondary"
                                                bordered 
                                                className='transport_tableProduct_input' 
                                                clearable
                                                value={cars?.find(x => x.id === item.id).registration_cert}
                                                onChange={(e)=>{
                                                    const newArray = [...cars]
                                                    newArray[index].registration_cert = e.target.value
                                                    setCars(newArray)
                                                }}  
                                            >
                                            </Input>
                                            <Input 
                                                label='Dvigatel raqami'
                                                placeholder='447 118'
                                                clearable
                                                color="secondary"
                                                bordered 
                                                type='number'
                                                className='transport_tableProduct_input' 
                                                value={cars?.find(x => x.id === item.id).engine_number}
                                                onChange={(e)=>{
                                                    const newArray = [...cars]
                                                    newArray[index].engine_number = e.target.value
                                                    setCars(newArray)
                                                }}
                                            >
                                            </Input>
                                            <Input 
                                                label='Kuzov raqami'
                                                placeholder='JF92JJFLDKSF9034J'
                                                clearable
                                                color="secondary"
                                                bordered 
                                                className='transport_tableProduct_input' 
                                                value={cars?.find(x => x.id === item.id).body_code}
                                                onChange={(e)=>{
                                                    const newArray = [...cars]
                                                    newArray[index].body_code = e.target.value
                                                    setCars(newArray)
                                                }}
                                            >
                                            </Input>
                                            <Input 
                                                label='Shassi №'
                                                placeholder='Raqamsiz'
                                                clearable
                                                color="secondary"
                                                bordered 
                                                className='transport_tableProduct_input' 
                                                value={cars?.find(x => x.id === item.id).chassis}
                                                onChange={(e)=>{
                                                    const newArray = [...cars]
                                                    newArray[index].chassis = e.target.value
                                                    setCars(newArray)
                                                }}
                                            >
                                            </Input>
                                            <Input 
                                                label="Baholangan qiymati, so'm"
                                                placeholder='140 000 000'
                                                clearable
                                                color="secondary"
                                                bordered 
                                                type='number'
                                                className='transport_tableProduct_input' 
                                                value={cars?.find(x => x.id === item.id).sum}
                                                onChange={(e)=>{
                                                    const newArray = [...cars]
                                                    const newArr = {...avtoInfo}
                                                    newArray[index].sum = e.target.value
                                                    newArr.percent = (newArr.sum == 0 || TotalSum() == 0) ? 0 : ((newArr.sum / TotalSum())*100).toFixed(1)
                                                    setCars(newArray)
                                                    setAvtoInfo(newArr)
                                                }}
                                            >
                                            </Input>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className='transport_product_addPlace'>
                            <button className='transport_product_addButton' type='button' onClick={()=>addNewCar()}><i className='bx bx-plus-circle'></i></button>
                        </div>
                    </div>

                    <div className='transport_endMainInputs'>
                        <Input 
                            label='Qabul qilish qiymati, %da'
                            value={avtoInfo?.percent}
                            width='100%'
                            color="secondary"
                            bordered 
                            readOnly
                            className='transport_endMainInputs_input' 
                            {...register(`percent`, { required: true} )}
                            status={avtoInfo?.percent > 100 ? 'error' : ''}
                        >
                        </Input>  
                        <Input 
                            label="Qabul qilish qiymati, so'mda"
                            placeholder=' 50 000 000'
                            type='number'
                            width='100%'
                            value={avtoInfo?.sum}
                            color="secondary"
                            bordered 
                            className='transport_endMainInputs_input' 
                            {...register(`sum`, { required: true} )}
                            onChange={(e)=>{
                                const newArray = {...avtoInfo}
                                newArray.sum = e.target.value
                                newArray.percent = (e.target.value == 0 || TotalSum() == 0) ? 0 : ((e.target.value / TotalSum())*100).toFixed(1)
                                setAvtoInfo(newArray)
                            }}
                        >
                        </Input>  
                    </div>

                    {/* Owner */}
                    <div className={(avtoInfo?.possessor =='trust_owner' || avtoInfo?.possessor =='owner') ? 'margin_top_30' : 'close'}>
                        <p className='additionPart_title'>Garov mulki egasining ma'lumotlari</p>
                        <div className='margin_top_10'>
                            <Input 
                                label='Garov mulki egasining F.I.Sh.'
                                clearable
                                width='100%'
                                color="secondary"
                                bordered 
                                className='vall' 
                                value={avtoInfo?.owner?.fio}
                                {...register(`owner.fio`, { required: (avtoInfo?.possessor =='trust_owner' || avtoInfo?.possessor =='owner') ? true : false } )}
                                onChange={(e)=>{
                                    let newArray = {...avtoInfo}
                                    newArray.owner.fio = e.target.value
                                    setAvtoInfo(newArray)
                                }}
                            >
                            </Input>
                            <div className='transport_garovPart_selectPart'>
                                <p>Shaxsini tasdiqlovchi xujjat turi</p>
                                <Select
                                    defaultValue={options.find(x => x.label == avtoInfo?.owner?.doc_type)}
                                    value={options.find(x => x.label == avtoInfo?.owner?.doc_type)}
                                    options={options}
                                    className='buyurtma_select_new'
                                    styles={colourStyles}
                                    theme={(theme) => ({
                                        ...theme,
                                        borderRadius: 12,
                                        colors: {
                                        ...theme.colors,
                                        primary25: '#7828c8',
                                        primary: '#7828c8',
                                        },
                                    })}
                                    onChange={(event) => {
                                        let newArray = {...avtoInfo}
                                        newArray.owner.doc_type = event.label
                                        setAvtoInfo(newArray)}
                                    }
                                />
                            </div>
                            <Input 
                                label='Seriyasi va raqami'
                                clearable
                                width='100%'
                                color="secondary"
                                bordered 
                                className='vall' 
                                value={avtoInfo?.owner?.serial_num}
                                {...register(`owner.serial_num`, { required: (avtoInfo?.possessor =='trust_owner' || avtoInfo?.possessor =='owner') ? true : false} )}
                                onChange={(e)=>{
                                    let newArray = {...avtoInfo}
                                    newArray.owner.serial_num = e.target.value
                                    setAvtoInfo(newArray)
                                }}
                            >
                            </Input>
                            <Input 
                                label='Kim tomonidan berilgan'
                                clearable
                                width='100%'
                                color="secondary"
                                bordered 
                                className='vall' 
                                value={avtoInfo?.owner?.issued_by}
                                {...register(`owner.issued_by`, { required: (avtoInfo?.possessor =='trust_owner' || avtoInfo?.possessor =='owner') ? true : false} )}
                                onChange={(e)=>{
                                    let newArray = {...avtoInfo}
                                    newArray.owner.issued_by = e.target.value
                                    setAvtoInfo(newArray)
                                }}
                            >
                            </Input>
                            <Input 
                                label='Berilgan sana'
                                type='date'
                                width='100%'
                                color="secondary"
                                bordered 
                                className='vall' 
                                value={avtoInfo?.owner?.issue_date}
                                {...register(`owner.issue_date`, { required: (avtoInfo?.possessor =='trust_owner' || avtoInfo?.possessor =='owner') ? true : false} )}
                                onChange={(e)=>{
                                    let newArray = {...avtoInfo}
                                    newArray.owner.issue_date = e.target.value
                                    setAvtoInfo(newArray)
                                }}
                            >
                            </Input>
                            <Input 
                                label="Ro'yxat bo'yicha yashash manzili"
                                clearable
                                width='100%'
                                color="secondary"
                                bordered 
                                className='vall' 
                                value={avtoInfo?.owner?.address}
                                {...register(`owner.address`, { required: (avtoInfo?.possessor =='trust_owner' || avtoInfo?.possessor =='owner') ? true : false} )}
                                onChange={(e)=>{
                                    let newArray = {...avtoInfo}
                                    newArray.owner.address = e.target.value
                                    setAvtoInfo(newArray)
                                }}
                            >
                            </Input>
                            <Input 
                                label="Telefon raqami"
                                clearable
                                width='100%'
                                color="secondary"
                                bordered 
                                className='vall' 
                                value={avtoInfo?.owner?.phone}
                                {...register(`owner.phone`, { required: (avtoInfo?.possessor =='trust_owner' || avtoInfo?.possessor =='owner') ? true : false} )}
                                onChange={(e)=>{
                                    let newArray = {...avtoInfo}
                                    newArray.owner.phone = e.target.value
                                    setAvtoInfo(newArray)
                                }}
                            >
                            </Input>
                            <Input 
                                label='Identifikatsiya raqami (JShShIR)'
                                clearable
                                width='100%'
                                color="secondary"
                                bordered
                                type='number'
                                className='vall' 
                                value={avtoInfo?.owner?.pinfl}
                                {...register(`owner.pinfl`, { required: (avtoInfo?.possessor =='trust_owner' || avtoInfo?.possessor =='owner') ? true : false , minLength: 14})}
                                onChange={(e)=>{
                                    let newArray = {...avtoInfo}
                                    newArray.owner.pinfl = e.target.value
                                    setAvtoInfo(newArray)
                                }}
                            >
                            </Input>   
                        </div>
                    </div>

                    {/* Trust Owner */}
                    <div className={avtoInfo?.possessor =='trust_owner' ? 'margin_top_30' : 'close'}>
                        <p className='additionPart_title'>Ishonchnoma berilgan shaxs ma'lumotlari</p>
                        <div className='margin_top_10'>
                            <Input 
                                label='F.I.Sh.'
                                clearable
                                width='100%'
                                color="secondary"
                                bordered 
                                className='vall' 
                                value={avtoInfo?.trust_owner?.fio}
                                {...register(`trust_owner.fio`, { required: avtoInfo?.possessor =='trust_owner' ? true : false} )}
                                onChange={(e)=>{
                                    let newArray = {...avtoInfo}
                                    newArray.trust_owner.fio = e.target.value
                                    setAvtoInfo(newArray)
                                }}
                            >
                            </Input>
                            <div className='transport_garovPart_selectPart'>
                                <p>Shaxsini tasdiqlovchi hujjat turi</p>
                                <Select
                                    defaultValue={options.find(x => x.label == avtoInfo?.trust_owner?.doc_type)}
                                    value={options.find(x => x.label == avtoInfo?.trust_owner?.doc_type)}
                                    options={options}
                                    className='buyurtma_select_new'
                                    styles={colourStyles}
                                    theme={(theme) => ({
                                        ...theme,
                                        borderRadius: 12,
                                        colors: {
                                        ...theme.colors,
                                        primary25: '#7828c8',
                                        primary: '#7828c8',
                                        },
                                    })}
                                    onChange={(event)=>{
                                        let newArray = {...avtoInfo}
                                        newArray.trust_owner.doc_type = event.label
                                        setAvtoInfo(newArray)
                                    }}
                                />
                            </div>
                            <Input 
                                label='Seriyasi va raqami'
                                clearable
                                width='100%'
                                color="secondary"
                                bordered 
                                className='vall' 
                                value={avtoInfo?.trust_owner?.serial_num}
                                {...register(`trust_owner.serial_num`, { required: avtoInfo?.possessor =='trust_owner' ? true : false} )}
                                onChange={(e)=>{
                                    let newArray = {...avtoInfo}
                                    newArray.trust_owner.serial_num = e.target.value
                                    setAvtoInfo(newArray)
                                }}
                            >
                            </Input>
                            <Input 
                                label='Kim tomonidan berilgan'
                                clearable
                                width='100%'
                                color="secondary"
                                bordered 
                                className='vall' 
                                value={avtoInfo?.trust_owner?.issued_by}
                                {...register(`trust_owner.issued_by`, {required: avtoInfo?.possessor =='trust_owner' ? true : false} )}
                                onChange={(e)=>{
                                    let newArray = {...avtoInfo}
                                    newArray.trust_owner.issued_by = e.target.value
                                    setAvtoInfo(newArray)
                                }}
                            >
                            </Input>
                            <Input 
                                label='Berilgan sana'
                                type='date'
                                width='100%'
                                color="secondary"
                                bordered 
                                className='vall' 
                                value={avtoInfo?.trust_owner?.issue_date}
                                {...register(`trust_owner.issue_date`, { required: avtoInfo?.possessor =='trust_owner' ? true : false} )}
                                onChange={(e)=>{
                                    let newArray = {...avtoInfo}
                                    newArray.trust_owner.issue_date = e.target.value
                                    setAvtoInfo(newArray)
                                }}
                            >
                            </Input>
                            <Input 
                                label="Ro'yxat bo'yicha yashash manzili"
                                clearable
                                width='100%'
                                color="secondary"
                                bordered 
                                className='vall' 
                                value={avtoInfo?.trust_owner?.address}
                                {...register(`trust_owner.address`, { required: avtoInfo?.possessor =='trust_owner' ? true : false } )}
                                onChange={(e)=>{
                                    let newArray = {...avtoInfo}
                                    newArray.trust_owner.address = e.target.value
                                    setAvtoInfo(newArray)
                                }}
                            >
                            </Input>
                            <Input 
                                label='Ishonchnoma raqami'
                                clearable
                                width='100%'
                                color="secondary"
                                bordered 
                                className='vall' 
                                type='number'
                                value={avtoInfo?.trust_owner?.proxy_number}
                                {...register(`trust_owner.proxy_number`, { required: avtoInfo?.possessor =='trust_owner' ? true : false } )}
                                onChange={(e)=>{
                                    let newArray = {...avtoInfo}
                                    newArray.trust_owner.proxy_number = e.target.value
                                    setAvtoInfo(newArray)
                                }}
                            >
                            </Input>  
                            <Input 
                                label=' Ishonchnoma berilgan sana'
                                type='date'
                                width='100%'
                                color="secondary"
                                bordered 
                                className='vall' 
                                value={avtoInfo?.trust_owner?.date}
                                {...register(`trust_owner.date`, { required: avtoInfo?.possessor =='trust_owner' ? true : false } )}
                                onChange={(e)=>{
                                    let newArray = {...avtoInfo}
                                    newArray.trust_owner.date = e.target.value
                                    setAvtoInfo(newArray)
                                }}
                            >
                            </Input>  
                            <Input 
                                label='Identifikatsiya raqami (JShShIR)'
                                clearable
                                width='100%'
                                color="secondary"
                                bordered 
                                className='vall'
                                type='number' 
                                value={avtoInfo?.trust_owner?.pinfl}
                                {...register(`trust_owner.pinfl`, { required: avtoInfo?.possessor =='trust_owner' ? true : false , minLength:14} )}
                                onChange={(e)=>{
                                    let newArray = {...avtoInfo}
                                    newArray.trust_owner.pinfl = e.target.value
                                    setAvtoInfo(newArray)
                                }}
                            >
                            </Input>   
                        </div>
                    </div>
                    <div className='xodim_buttons'>
                        <button type='button' className='client_submit reset back_red' onClick={() => { BackFun() }}>
                            O'zgarishni bekor qilish
                            <AiOutlineClear />
                        </button>
                        <button type='submit' className='client_submit submit back_green'>
                            O'zgarishni kiritish
                            <AiOutlineUserAdd />
                        </button>
                    </div>
                </form>
            </div>
                </>)
            }
        </div>
    </section>
  )
}

export default EditAvto