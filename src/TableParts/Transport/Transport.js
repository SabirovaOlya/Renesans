import React, { useState, useRef } from 'react'
import { Input,Radio } from '@nextui-org/react'
import { useForm } from "react-hook-form";                                                                                                                                                                                                                     
import https from '../../assets/https';
import axios from 'axios';

import { AiOutlineClear,AiOutlineUserAdd,AiOutlineDownload,AiFillCloseSquare } from 'react-icons/ai';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';   
import Swal from 'sweetalert2';
import './Transport.css'

function Transport({orderId}) {

    const [firstTable,setFirstTable]= useState('transport_garovPart close');
    const [secondTable,setSecondTable]= useState('transport_ishonchnomaPart close');
    const [garov, setGarov]= useState('transport_fourInputs close');
    const [isShown, setIsShown] = useState(false)
    const [image, setImage] = useState([])
    const [path, setPath] = useState([])
    const  imageInput = useRef()
    // important inputs
    const [valuedStatus, setValuedStatus] = useState(false)
    const [valuedNumber,setValuedNumber] = useState(1)
    const [possessor, setPossessor] = useState('client')
    const [ownerStatus, setOwnerStatus] = useState(false)
    const [trustOwnerStatus, setTrustOwnerStatus] = useState(false)
    const [giveSum, setGiveSum] = useState(0)
    // Alert
    function Success() {
        Swal.fire({
            title: "Ta'minot qoshildi",
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
    function CarError() {
        Swal.fire({
            title: "Qabul qilish qiymati 100% dan ortiq",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
    

    function tables(a){
        if(a===1){                                                                                      
            setFirstTable('transport_garovPart close')                                                                                                                                                                                             
            setSecondTable('transport_ishonchnomaPart close')
            setOwnerStatus(false)
            setTrustOwnerStatus(false)
            setPossessor('client')
        }                                                                                                       
        else if(a===2){
            setFirstTable('transport_garovPart open')
            setSecondTable('transport_ishonchnomaPart close')
            setOwnerStatus(true)
            setTrustOwnerStatus(false)
            setPossessor('owner')
        }else if(a===3){
            setFirstTable('transport_garovPart open')
            setSecondTable('transport_ishonchnomaPart open')
            setOwnerStatus(true)
            setTrustOwnerStatus(true)
            setPossessor('trust_owner')
        }
    }

    function fourInputs(b){
        if(b===1){
            setGarov('transport_fourInputs open')
            setValuedStatus(true)
            setValuedNumber(2)
        }
        else if(b===2){
            setGarov('transport_fourInputs close')
            setValuedStatus(false)
            setValuedNumber(1)
        }
    }

    // Photo functions
    function PhotoOpen(){
        imageInput.current.click()
    }
    function AddImage(photo){
        let form = new FormData()
        form.append('image[]',photo)

        axios({
            method: "post",
            url: "https://ioi-tech.uz/api/upload-photo",
            data: form,
            headers: { Authorization: "Bearer " + window.localStorage.getItem('token'),
            "Content-Type": "multipart/form-data" },
        })
        .then( res =>{
            setPath(path.concat(res.data.data))
        })
        .catch(err =>{
            console.log(err);
        })
    }
    function ImageDelete(id){
        let imageItems = path.filter(x => x !== path[id])
        setPath(imageItems)
    }

    // UseForm
    const { register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();

    // Transport information
    const [transportProducts, setTransportProducts] = useState([
        {
            id:1,
            name:'',
            year:'',
            number:'',
            type_of_auto:'',
            registration_cert:'',
            engine_number:'',
            body_code:'',
            chassis:'',
            sum:0
        }
    ]);

    // Addining item
    function addNewTransportProduct(){
        let newProduct = [
            {
                id:uuidv4(),
                name:'',
                year:'',
                number:'',
                type_of_auto:'',
                registration_cert:'',
                engine_number:'',
                body_code:'',
                chassis:'',
                sum:0
            }
        ]
        setTransportProducts(transportProducts.concat(newProduct))    
    }

    // Deleting item
    function deleteTransportProduct(id){
        if(transportProducts.length > 1){
            setTransportProducts( transportProducts?.filter((item,index)=> item.id !== id) )
        }else{
            setTransportProducts(transportProducts)
        }
    }

    function GetTotalSum(){
        let prices=[]
        transportProducts?.map(item =>{
            prices.push(item?.sum)
        })

        let totalSum = prices.reduce((prev, current) => Number(prev) + Number(current), 0)
        return totalSum
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
    // selectors
    const [ ownerSelector, setOwnerSelector ] = useState(options[0].label)
    const [ trustOwnerSelector, setTrustOwnerSelector ] = useState(options[0].label)


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
                // color:'white'
            }
          };
        },
        
    };

    // Form onSubmit
    const onSubmit = (data) =>{
        let transports = JSON.parse(JSON.stringify(transportProducts))
        transports?.map(item =>{
            delete item.id
        })
        const info = {...data, 
            order_id:orderId,
            type:'auto',
            possessor: possessor,
            valued_by: valuedNumber,
            auto: transports,
            paths: image
        }
        Object.assign(info.owner, {doc_type: ownerSelector})
        Object.assign(info.trust_owner, {doc_type: trustOwnerSelector})
        Object.assign(info, {percent: (giveSum == 0 || GetTotalSum() == 0) ? 0 : ((giveSum / GetTotalSum())*100).toFixed(1)})

        if((giveSum == 0 || GetTotalSum() == 0) ? 0 : ((giveSum / GetTotalSum())*100).toFixed(1) <= 80){
            
            let postInfo = JSON.parse(JSON.stringify(info))
            if(possessor === "client"){
                delete postInfo.trust_owner
                delete postInfo.owner
            }else if(possessor === "owner"){
                delete postInfo.trust_owner
            }

            if(valuedNumber === 1){
                delete postInfo.company
            }

            https
            .post('/supply-info', postInfo)
            .then(res =>{
                if(res?.request?.status === 201){
                    Success()
                    console.log(postInfo)
                }
            })
            .catch(err =>{
                console.log(err)
                console.log(postInfo);
                Warn()
            })
        }else{
            ProcentError()
        }

        
    }

  return (
    <>
        <section className='transport_section'>
            <form className='transport_main' onSubmit={handleSubmit(onSubmit)}>
                <div className='transport_garov'>
                    <p>Garov mulkining egasi</p>
                    <div>
                        <Radio.Group label=' ' orientation="horizontal" color='secondary' defaultValue={1} size='sm' className='transport_garov_radioGroup' onChange={(e)=>tables(e)}>
                            <Radio value={1} className='transport_garov_radio'>Mijozning o'zi</Radio>
                            <Radio value={2} className='transport_garov_radio'>Uchinchi shaxs</Radio>
                            <Radio value={3} className='transport_garov_radio'>Ishonchnoma asosida</Radio>
                        </Radio.Group>
                    </div>
                </div>

                <div className='transport_addition'>
                    <Radio.Group label=' ' orientation="horizontal" color='secondary' defaultValue={2} size='sm' className='transport_addition_radioGroup' onChange={(e)=>fourInputs(e)}>
                        <Radio value={1} className='transport_addition_radio'>Mustaqil baholash asosida</Radio>
                        <Radio value={2} className='transport_addition_radio'>O'zaro kelishuvga asosan</Radio>
                    </Radio.Group>
                </div>

                {/* Addition 4 inputs */}
                <div className={garov}>
                    <Input 
                        label='Transport vositasini baholovchi tashkilo'
                        placeholder='Vosiq Mirzo'
                        width='100%'
                        color="secondary"
                        bordered 
                        className='transport_fourInputs_input'
                        clearable
                        {...register(`company.name`, { required: valuedStatus} )}
                    >
                    </Input>
                    <Input 
                        label='Litsenziya'
                        placeholder='Litsenziya BL001, RR0118, 19.02.2014 y. berilgan'
                        width='100%'
                        color="secondary"
                        bordered 
                        className='transport_fourInputs_input'
                        clearable
                        {...register(`company.license`, { required: valuedStatus} )}
                    >
                    </Input>
                    <Input 
                        label='Baholovchining ismi sharifi'
                        placeholder='B.Asomov'
                        width='100%'
                        color="secondary"
                        bordered 
                        className='transport_fourInputs_input'
                        clearable
                        {...register(`company.valuer_name`, { required: valuedStatus} )}
                    >
                    </Input>
                    <Input 
                        label='Baholash hujjati raqami'
                        placeholder='06/002'
                        width='100%'
                        color="secondary"
                        bordered 
                        className='transport_fourInputs_input'
                        clearable
                        {...register(`company.doc_code`, { required: valuedStatus} )}
                    >
                    </Input>    
                </div>

                <div className='transport_mainInputs'>
                    <Input 
                        label='Baholovchi hujjat sanasi'
                        width='100%'
                        color="secondary"
                        bordered 
                        className='transport_mainInputs_input' 
                        type='date'
                        {...register(`date`, { required: true} )}
                    >
                    </Input>  
                    <Input 
                        label='Baholangan qiymati'
                        type='text'
                        value={GetTotalSum().toLocaleString()}
                        readOnly
                        width='100%'
                        color="secondary"
                        bordered 
                        className='transport_mainInputs_input' 
                    >
                    </Input>  
                </div>

        {/****************************--- TABLE ---****************************/}

                <div className='transport_table'>
                    <div className='transport_table_title_part'>
                        <p className='transport_table_title'>Baholash natijalari</p>
                    </div>
                    {
                        transportProducts.map((item,index)=>{
                            return(
                                    <div className='transport_table_product' key={item?.id}>
                                        <div className='transport_table_product_title'>
                                            <p>Mahsulot {index + 1}</p>
                                            <button type='button' onClick={()=>deleteTransportProduct(item?.id)}><i className='bx bxs-trash'></i></button>
                                        </div>
                                        <div className='transport_table_things'>
                                            <Input 
                                                label='Nomi'
                                                placeholder='Damos'
                                                clearable
                                                color="secondary"
                                                bordered 
                                                className='transport_tableProduct_input' 
                                                value={transportProducts?.find(x => x.id === item.id).name}
                                                onChange={(e)=>{
                                                    const newArray = [...transportProducts]
                                                    newArray[index].name = e.target.value
                                                    setTransportProducts(newArray)
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
                                                value={transportProducts?.find(x => x.id === item.id).year}
                                                onChange={(e)=>{
                                                    const newArray = [...transportProducts]
                                                    newArray[index].year = e.target.value
                                                    setTransportProducts(newArray)
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
                                                value={transportProducts?.find(x => x.id === item.id).number}
                                                onChange={(e)=>{
                                                    const newArray = [...transportProducts]
                                                    newArray[index].number = e.target.value.toUpperCase()
                                                    setTransportProducts(newArray)
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
                                                value={transportProducts?.find(x => x.id === item.id).type_of_auto}
                                                onChange={(e)=>{
                                                    const newArray = [...transportProducts]
                                                    newArray[index].type_of_auto = e.target.value
                                                    setTransportProducts(newArray)
                                                }}
                                            >
                                            </Input>
                                            <Input 
                                                label='Qayd etish guvohnomasi'
                                                placeholder='FDS92452'
                                                clearable
                                                color="secondary"
                                                bordered 
                                                className='transport_tableProduct_input' 
                                                value={transportProducts?.find(x => x.id === item.id).registration_cert}
                                                onChange={(e)=>{
                                                    const newArray = [...transportProducts]
                                                    newArray[index].registration_cert = e.target.value
                                                    setTransportProducts(newArray)
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
                                                value={transportProducts?.find(x => x.id === item.id).engine_number}
                                                onChange={(e)=>{
                                                    const newArray = [...transportProducts]
                                                    newArray[index].engine_number = e.target.value
                                                    setTransportProducts(newArray)
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
                                                value={transportProducts?.find(x => x.id === item.id).body_code}
                                                onChange={(e)=>{
                                                    const newArray = [...transportProducts]
                                                    newArray[index].body_code = e.target.value
                                                    setTransportProducts(newArray)
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
                                                value={transportProducts?.find(x => x.id === item.id).chassis}
                                                onChange={(e)=>{
                                                    const newArray = [...transportProducts]
                                                    newArray[index].chassis = e.target.value
                                                    setTransportProducts(newArray)
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
                                                value={transportProducts?.find(x => x.id === item.id).sum}
                                                onChange={(e)=>{
                                                    const newArray = [...transportProducts]
                                                    newArray[index].sum = e.target.value
                                                    setTransportProducts(newArray)
                                                }}
                                            >
                                            </Input>
                                        </div>
                                    </div>
                            )
                        })
                    }
                    <div className='transport_product_addPlace'>
                        <button className='transport_product_addButton' type='button' onClick={()=>addNewTransportProduct()}><i className='bx bx-plus-circle'></i></button>
                    </div>
                </div>


                <div className='transport_endMainInputs'>
                    <Input 
                        label='Qabul qilish qiymati, %da'
                        width='100%'
                        color="secondary"
                        className='transport_endMainInputs_input' 
                        bordered 
                        value={(giveSum == 0 || GetTotalSum() == 0) ? 0 : ((giveSum / GetTotalSum())*100).toFixed(1)}
                        status={
                            ((giveSum == 0 || GetTotalSum() == 0) ? 0 : ((giveSum / GetTotalSum())*100).toFixed(1)) > 80 ? 'error' : ''
                        }
                        readOnly
                    >
                    </Input>  
                    <Input 
                        label="Qabul qilish qiymati, so'mda"
                        placeholder=' 50 000 000'
                        type='number'
                        className='transport_endMainInputs_input' 
                        width='100%'
                        color="secondary"
                        bordered 
                        value={giveSum}
                        {...register("sum", { required: true} )}
                        onChange={(e)=>{
                            setGiveSum(e.target.value)
                        }}
                    >
                    </Input> 

                    {/* <p className='photo_text'>Rasimlar</p>
                    <div className='taminot_photo_add'>
                        <div className='photo_add_buttons'>
                            <button type='button' onClick={()=>{PhotoOpen()}}>Qo'shish <AiOutlineDownload className='icon_load'/></button>
                        </div>
                        <input ref={imageInput} type="file" onChange={(e)=>{AddImage((e.target.files[0]))}}/>
                        <div className='photo_images'>
                        {
                            path?.map((item,index)=>{
                                return(
                                    <div className='image_container' key={index}>
                                        <img className='photo_show' src={`https://ioi-tech.uz${item}`}></img>
                                        <button type='button' onClick={()=>{ImageDelete(index)}}><AiFillCloseSquare className='icon_no'/></button>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>  */}

                </div>
                
                {/* Owner */}
                <div className={firstTable}>
                    <p className='additionPart_title'>Garov mulki egasining ma'lumotlari</p>
                    <div>
                        <Input 
                            label='Garov mulki egasining F.I.Sh.'
                            placeholder=' Muxammadshukurov Xusniddin Fatxulla o`g`li'
                            clearable
                            width='100%'
                            color="secondary"
                            bordered 
                            className='transport_garovPart_input' 
                            {...register(`owner.fio`, { required: ownerStatus} )}
                        >
                        </Input>
                        <div className='transport_garovPart_selectPart'>
                            <p>Shaxsini tasdiqlovchi xujjat turi</p>
                            <Select
                                defaultValue={options[0]}
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
                                onChange={(event) => setOwnerSelector(event.label)}
                            />
                        </div>
                        <Input 
                            label='Seriyasi va raqami'
                            placeholder='AA 87654321'
                            clearable
                            width='100%'
                            color="secondary"
                            bordered 
                            className='transport_garovPart_input' 
                            {...register(`owner.serial_num`, { required: ownerStatus} )}
                        >
                        </Input>
                        <Input 
                            label='Kim tomonidan berilgan'
                            clearable
                            placeholder='Toshkent viloyati Bo`ka tumani Mudofa '
                            width='100%'
                            color="secondary"
                            bordered 
                            className='transport_garovPart_input' 
                            {...register(`owner.issued_by`, { required: ownerStatus} )}
                        >
                        </Input>
                        <Input 
                            label='Berilgan sana'
                            type='date'
                            width='100%'
                            color="secondary"
                            bordered 
                            className='transport_garovPart_input' 
                            {...register(`owner.issue_date`, { required: ownerStatus} )}
                        >
                        </Input>
                        <Input 
                            label="Ro'yxat bo'yicha yashash manzili"
                            clearable
                            placeholder='Toshkent viloyati Bo`ka tumani Y.Xojimetov fu O`zbekiston ko`chasi 92 uy'
                            width='100%'
                            color="secondary"
                            bordered 
                            className='transport_garovPart_input' 
                            {...register(`owner.address`, { required: ownerStatus} )}
                        >
                        </Input>
                        <Input 
                            label="Telefon raqami"
                            clearable
                            placeholder='909900909'
                            labelLeft='+998'
                            width='100%'
                            color="secondary"
                            bordered 
                            className='transport_garovPart_input' 
                            {...register(`owner.phone`, { required: ownerStatus} )}
                        >
                        </Input>
                        <Input 
                            label='Identifikatsiya raqami (JShShIR)'
                            placeholder='123456789'
                            clearable
                            width='100%'
                            color="secondary"
                            bordered
                            type='number'
                            className='transport_garovPart_input' 
                            {...register(`owner.pinfl`, { required: ownerStatus, minLength: 14})}
                        >
                        </Input>   
                    </div>
                </div>

                {/* Trust Owner */}
                <div className={secondTable}>
                    <p className='additionPart_title'>Ishonchnoma berilgan shaxs ma'lumotlari</p>
                    <div>
                        <Input 
                            label='F.I.Sh.'
                            placeholder='Maxkamova Kimdir Kimsanovna'
                            clearable
                            width='100%'
                            color="secondary"
                            bordered 
                            className='transport_ishonchnomaPart_input' 
                            {...register(`trust_owner.fio`, { required: trustOwnerStatus} )}
                        >
                        </Input>
                        <div className='transport_garovPart_selectPart'>
                            <p>Shaxsini tasdiqlovchi hujjat turi</p>
                            <Select
                                defaultValue={options[0]}
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
                                onChange={(event)=>{setTrustOwnerSelector(event.label)}}
                            />
                        </div>
                        <Input 
                            label='Seriyasi va raqami'
                            placeholder='AA 87654321'
                            clearable
                            width='100%'
                            color="secondary"
                            bordered 
                            className='transport_ishonchnomaPart_input' 
                            {...register(`trust_owner.serial_num`, { required: trustOwnerStatus} )}
                        >
                        </Input>
                        <Input 
                            label='Kim tomonidan berilgan'
                            clearable
                            placeholder='Toshkent viloyati Bo`ka tumani Mudofa '
                            width='100%'
                            color="secondary"
                            bordered 
                            className='transport_ishonchnomaPart_input' 
                            {...register(`trust_owner.issued_by`, { required: trustOwnerStatus} )}
                        >
                        </Input>
                        <Input 
                            label='Berilgan sana'
                            type='date'
                            width='100%'
                            color="secondary"
                            bordered 
                            className='transport_ishonchnomaPart_input' 
                            {...register(`trust_owner.issue_date`, { required: trustOwnerStatus} )}
                        >
                        </Input>
                        <Input 
                            label="Ro'yxat bo'yicha yashash manzili"
                            clearable
                            placeholder='Toshkent viloyati Bo`ka tumani Y.Xojimetov fu O`zbekiston ko`chasi 92 uy'
                            width='100%'
                            color="secondary"
                            bordered 
                            className='transport_ishonchnomaPart_input' 
                            {...register(`trust_owner.address`, { required: trustOwnerStatus} )}
                        >
                        </Input>
                        <Input 
                            label='Ishonchnoma raqami'
                            placeholder='123456789'
                            clearable
                            width='100%'
                            color="secondary"
                            bordered 
                            className='transport_ishonchnomaPart_input' 
                            type='number'
                            {...register(`trust_owner.proxy_number`, { required: trustOwnerStatus} )}
                        >
                        </Input>  
                        <Input 
                            label=' Ishonchnoma berilgan sana'
                            type='date'
                            width='100%'
                            color="secondary"
                            bordered 
                            className='transport_ishonchnomaPart_input' 
                            {...register(`trust_owner.date`, { required: trustOwnerStatus} )}
                        >
                        </Input>  
                        <Input 
                            label='Identifikatsiya raqami (JShShIR)'
                            clearable
                            width='100%'
                            color="secondary"
                            bordered 
                            className='transport_ishonchnomaPart_input'
                            type='number' 
                            {...register(`trust_owner.pinfl`, { required: trustOwnerStatus, minLength:14} )}
                        >
                        </Input>   
                    </div>
                </div>

                <div className='submit-buttons'>
                    <button className='client_submit reset' type='button'>
                        Formani tiklash
                        <AiOutlineClear/>
                    </button>
                    <button type='submit' className='client_submit submit'>
                        Ta'minotni qo'shish
                        <AiOutlineUserAdd/>
                    </button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Transport