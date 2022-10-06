import { Input } from '@nextui-org/react';
import React, { useState } from 'react';
import { Radio } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import https from '../assets/https';

// Icons
import { AiOutlineClear, AiOutlineUserAdd} from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';


import '../Pages/Taminot/Taminot.css';

function TillaBuyum({orderId}) {
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
            title: "Error",
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

    // UseForm
    const { register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();

    const [ bahoType, setBahoType ] = useState(2)
    const [ addStatus, setAddStatus ] = useState(true)
    const [ giveSum, setGiveSum ] = useState(0)
    const [procentStatus, setProcentStatus] = useState('success')
    
    // Main Gold Items
    const [ bahoItems, setBahoItems ] = useState([
        {
            id:1,
            name:'',
            gold_num:0,
            measure:'',
            quantity:0,
            weight:0,
            stone_weight:0,
            clean_weight:0,
            gold_num_sum:0,
            sum:0
        }
    ])

    // Addining Item
    function addNewPoint(e) {
        let newItem = {
            id:uuidv4(),
            name:'',
            gold_num:0,
            measure:'',
            quantity:0,
            weight:0,
            stone_weight:0,
            clean_weight:0,
            gold_num_sum:0,
            sum:0
        }
        setBahoItems(bahoItems.concat(newItem))
        
    }

    // Deleting Item
    function deletePoint(id) {
        if(bahoItems.length > 1){
            let goldItems = bahoItems.filter(x => x.id !== id)
            setBahoItems(goldItems)
        }
    }

    // Getting Total Sum of golds
    function TotalSum(){
        let SumArray = []
        bahoItems?.map((item)=>{
            SumArray.push(item?.sum)
        })
        let total = SumArray.reduce((prev, current) => prev + current, 0)
        return total
    }

    const onSubmit = (data) => {
        let products =  JSON.parse(JSON.stringify(bahoItems))
        products?.map((item)=>{
            delete item.id
        })
        const info = {...data, 
            order_id:orderId,
            type:'gold',
            possessor:'client',
            valued_by:bahoType,
            gold: products
        }
        Object.assign(info, {percent:(giveSum == 0 || TotalSum() == 0) ? 0 : ((giveSum / TotalSum())*100).toFixed(1)})

        if(((giveSum == 0 || TotalSum() == 0) ? 0 : ((giveSum / TotalSum())*100).toFixed(1)) <= 100){
            if(bahoType === 2){
                https
                .post('/supply-info', info)
                .then(res =>{
                    if(res?.request?.status ===  201){
                        Success()
                        console.log(info);
                    }
                })
                .catch(err =>{
                    console.log(err);
                    console.log(info);
                })
            }else if(bahoType === 1){
                // post info without company value
                let infoNoCompany = JSON.parse(JSON.stringify(info))
                delete infoNoCompany.company

                https
                .post('/supply-info', infoNoCompany)
                .then(res =>{
                    if(res?.request?.status ===  201){
                        Success()
                        console.log(infoNoCompany);
                    }
                })
                .catch(err =>{
                    console.log(err);
                    console.log(infoNoCompany);
                })
            }

        }else{
            ProcentError()
        }
    }
    

    return (
    <>
        <form className='taminot_form' onSubmit={handleSubmit(onSubmit)}>
            <div className='taminot_ratio_parent taminot_tilla_radio'>
                <Radio.Group label=' ' color='secondary' orientation="horizontal" defaultValue={2} size='sm' className='taminot_ratio' 
                    onChange={(event)=>{
                        setBahoType(event)
                        if(event == 2){
                            setAddStatus(true)
                        }else if(event == 1){
                            setAddStatus(false)
                        }
                    }}
                >
                    <Radio value={2}>Mustaqil Baholash Asosida</Radio>
                    <Radio value={1}>O'zaro kelishuvga asosan</Radio>
                </Radio.Group>
            </div>
            <div className='taminot_grid_inputs'>
                <div className={ bahoType === 2 ? 'taminot_bahoType' : 'close'}>
                    <Input
                        bordered
                        label='Tilla buyumlarni baholovchi tashkilot'
                        className='taminot_tableform_input'
                        width='100%'
                        clearable
                        placeholder="Voziq Mirzo"
                        color="secondary"
                        {...register(`company.name`, { required: addStatus} )}
                    />
                    <Input
                        bordered
                        label='Litsenziya'
                        className='taminot_tableform_input'
                        width='100%'
                        clearable
                        placeholder=" Litsenziya BL001, RR0118, 19.02.2014 y. berilgan"
                        color="secondary"
                        {...register(`company.license`, { required: addStatus })}
                    />
                    <Input
                        bordered
                        label='Baholovchining ismi sharifi'
                        className='taminot_tableform_input'
                        width='100%'
                        clearable
                        placeholder="B.Asomov"
                        color="secondary"
                        {...register(`company.valuer_name`, { required: addStatus })}
                    />
                    <Input
                        bordered
                        label='Baholash hujjati raqami'
                        className='taminot_tableform_input'
                        width='100%'
                        clearable
                        placeholder="06/002"
                        color="secondary"
                        {...register(`company.doc_code`, { required: addStatus })}
                    />
                </div>
                <Input
                    bordered
                    label='Baholash hujjati sanasi'
                    className='taminot_tableform_input'
                    width='100%'
                    type='date'
                    placeholder="11.02.22"
                    color="secondary"
                    {...register("date", { required: true })}
                />
                <Input
                    bordered
                    label='Tilla buyumlarning baholangan qiymati'
                    className='taminot_tableform_input'
                    width='100%'
                    type='number'
                    value={TotalSum()}
                    color="secondary"
                    readOnly
                />
            </div>
            <div className='tamilot_main_table'>
                <h1>Baholash natijalari</h1>
                {
                    bahoItems?.map((item,index)=>(
                        <div className='taminot_tableform_item' key={item?.id}>
                            <div className='taminot_tableform_title'>
                                <h2>Mahsulot №{index+1}</h2>
                                <button 
                                    className='taminot_tableform_delete taminot_tableform_delete_active'
                                    onClick={()=> deletePoint(item?.id)}
                                    type='button'
                                >
                                    <BiTrash/>
                                </button>
                            </div>
                            <div className='taminot_gold_product'>
                                <Input
                                    bordered
                                    label='Nomi'
                                    className='taminot_tableform_input'
                                    clearable
                                    placeholder="Uzuk"
                                    color="secondary"
                                    value={bahoItems.find(x => x.id === item.id).name}
                                    onChange={(e)=>{
                                        const newGold = [...bahoItems]
                                        newGold[index].name = e.target.value
                                        setBahoItems(newGold)
                                    }}
                                />
                                <Input
                                    bordered
                                    label='Proba'
                                    className='taminot_tableform_input'
                                    clearable
                                    placeholder="583"
                                    type='number'
                                    color="secondary"
                                    value={bahoItems.find(x => x.id === item.id).gold_num}
                                    onChange={(e)=>{
                                        const newGold = [...bahoItems]
                                        newGold[index].gold_num = e.target.value
                                        setBahoItems(newGold)
                                    }}
                                />
                                <Input
                                    bordered
                                    label="O'lchov birligi"
                                    className='taminot_tableform_input'
                                    placeholder="dona"
                                    color="secondary"
                                    value={bahoItems.find(x => x.id === item.id).measure}
                                    onChange={(e)=>{
                                        const newGold = [...bahoItems]
                                        newGold[index].measure = e.target.value
                                        setBahoItems(newGold)
                                    }}
                                    clearable
                                />
                                <Input
                                    bordered
                                    type='number'
                                    label='Soni'
                                    className='taminot_tableform_input'
                                    placeholder="1"
                                    color="secondary"
                                    value={bahoItems.find(x => x.id === item.id).quantity}
                                    onChange={(e)=>{
                                        const newGold = [...bahoItems]
                                        newGold[index].quantity = e.target.value
                                        setBahoItems(newGold)
                                    }}
                                    clearable
                                />
                                <Input
                                    bordered
                                    type='number'
                                    label='Umumiy og`irligi(gr)'
                                    className='taminot_tableform_input'
                                    placeholder="1"
                                    color="secondary"
                                    value={bahoItems.find(x => x.id === item.id).weight}
                                    onChange={(e)=>{
                                        const newGold = [...bahoItems]
                                        newGold[index].weight = e.target.value
                                        newGold[index].clean_weight = e.target.value - newGold[index].stone_weight
                                        newGold[index].sum = (e.target.value - newGold[index].stone_weight) * newGold[index].gold_num_sum
                                        setBahoItems(newGold)
                                    }}
                                    clearable
                                />
                                <Input
                                    bordered
                                    type='number'
                                    label='Toshlari og`irligi(gr)'
                                    className='taminot_tableform_input'
                                    placeholder="1"
                                    color="secondary"
                                    value={bahoItems.find(x => x.id === item.id).stone_weight}
                                    onChange={(e)=>{
                                        const newGold = [...bahoItems]
                                        newGold[index].stone_weight = e.target.value
                                        newGold[index].clean_weight = newGold[index].weight - e.target.value
                                        newGold[index].sum = (newGold[index].weight - e.target.value) * newGold[index].gold_num_sum
                                        setBahoItems(newGold)
                                    }}
                                    clearable
                                />
                                <Input
                                    bordered
                                    type='number'
                                    label='Sof og`irligi(gr)'
                                    className='taminot_tableform_input'
                                    placeholder="1"
                                    color="secondary"
                                    readOnly
                                    value={bahoItems.find(x => x.id === item.id).clean_weight}
                                />
                                <Input
                                    bordered
                                    type='number'
                                    label='Gramm uchun narx(so`m)'
                                    className='taminot_tableform_input'
                                    placeholder="1"
                                    color="secondary"
                                    value={bahoItems.find(x => x.id === item.id).gold_num_sum}
                                    onChange={(e)=>{
                                        const newGold = [...bahoItems]
                                        newGold[index].gold_num_sum = e.target.value
                                        newGold[index].sum = e.target.value * newGold[index].clean_weight
                                        setBahoItems(newGold)
                                    }}
                                    clearable
                                />
                                <Input
                                    bordered
                                    type='number'
                                    label='Baholangan qiymati(som)'
                                    className='taminot_tableform_input'
                                    placeholder="1"
                                    color="secondary"
                                    readOnly
                                    value={bahoItems.find(x => x.id === item.id).sum}
                                    
                                />
                            </div>
                        </div>
                    ))
                }
                <div className='transport_product_addPlace'>
                    <button type='button' className='transport_product_addButton' onClick={(event) => addNewPoint(event)}><i className='bx bx-plus-circle'></i></button>
                </div>
                <div className='taminot_grid'>
                    <Input
                        bordered
                        type='number'
                        label='Qabul qilish qiymati, %da'
                        className='taminot_tableform_input'
                        width='100%'
                        readOnly
                        value={(giveSum == 0 || TotalSum() == 0) ? 0 : ((giveSum / TotalSum())*100).toFixed(1)}
                        color="secondary"
                        status={
                            ((giveSum == 0 || TotalSum() == 0) ? 0 : ((giveSum / TotalSum())*100).toFixed(1)) > 100 ? 'error' : ''
                        }
                    />
                    <Input
                        bordered
                        type='number'
                        label='Qabul qilish qiymati, somda'
                        className='taminot_tableform_input'
                        width='100%'
                        placeholder="1"
                        value={giveSum}
                        color="secondary"
                        {...register("sum", { required: true })}
                        onChange={(e)=>{
                            setGiveSum(e.target.value)
                        }}
                    />
                </div>
            </div>
            <div className='submit-buttons margin_top_30'>
                <button type='reset' className='client_submit reset'>
                    Formani tiklash
                    <AiOutlineClear/>
                </button>
                <button type='submit' className='client_submit submit'>
                    Ta'minotni qo'shish
                    <AiOutlineUserAdd/>
                </button>
            </div>
        </form>
    </>
    )
}

export default TillaBuyum