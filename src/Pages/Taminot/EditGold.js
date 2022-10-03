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
import Select from 'react-select';
import { BiTrash } from 'react-icons/bi';
import './Taminot.css'

function EditGold() {

    const [goldInfo, setGoldInfo] = useState({})
    const [goldBack, setGoldBack] = useState({})
    const [golds, setGolds] = useState([])

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

    async function GetData(){
        await https
        .get(`/supply-info/${id}`)
        .then(res =>{
            setGoldInfo(res?.data)
            setGoldBack(res?.data)
            setGolds(res?.data?.gold)
        })
        .catch(err =>{
            console.log(err)
        })
    }

    useEffect(()=>{
        GetData()
    },[])

    function RadioColl(){
        if(goldInfo?.valued_by){
            return(
                <Radio.Group label=' ' color='secondary' orientation="horizontal" defaultValue={goldInfo?.valued_by == 2 ? 2 : 1} size='sm' className='taminot_ratio' 
                    onChange={(event)=>{
                        let newArray = {...goldInfo}
                        newArray.valued_by = event
                        setGoldInfo(newArray)
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

    // Addining Item
    function addNewGold() {
        let newGold = {
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
        setGolds(golds.concat(newGold))
    }
    // Deleting Item
    function deleteGold(id) {
        if(golds.length > 1){
            let goldItems = golds.filter(x => x.id !== id)
            setGolds(goldItems)
        }
    }
    // Getting Total Sum of golds
    function TotalSum(){
        let SumArray = []
        golds?.map((item)=>{
            SumArray.push(item?.sum)
        })
        let total = SumArray.reduce((prev, current) => prev + current, 0)

        return total
    }

    function BackFun(){
        setGoldInfo(goldBack)
    }

    const onSubmit = (data) =>{
        let goldsNoId = JSON.parse(JSON.stringify(golds))
        goldsNoId.map(item =>{
            delete item.id
        })

        if(goldInfo?.valued_by == 2){
            let info = {
                order_id:goldInfo?.order?.id,
                possessor: 'client',
                type: 'gold',
                valued_by: goldInfo?.valued_by,
                date:data.date,
                sum:data.sum,
                percent:data.percent,
                company:data.company,
                gold:goldsNoId
            }

            if(goldInfo?.percent <= 100){
                https
                .patch(`/supply-info/${id}`, info)
                .then(res =>{
                    if(res.request.status == 200){
                        Success()
                    }
                })
                .catch(err =>{
                    console.log(err);
                    Warn()
                })
            }else{
                ProcentError()
            }


        }else{
            let info = {
                order_id:goldInfo?.order?.id,
                possessor: 'client',
                type: 'gold',
                valued_by: goldInfo?.valued_by,
                date:data.date,
                sum:data.sum,
                percent:data.percent,
                gold:goldsNoId
            }

            if(goldInfo?.percent <= 100){
                https
                .patch(`/supply-info/${id}`, info)
                .then(res =>{
                    if(res.request.status == 200){
                        Success()
                    }
                })
                .catch(err =>{
                    console.log(err);
                    Warn()
                })
            }else{
                ProcentError()
            }

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
            <h1 className='text_center filial_edit_text'>{goldInfo?.order?.client?.name}</h1>
            <div className='pdf_margin_top_15'>
                <form onSubmit={handleSubmit(onSubmit)} className='single_buyurtma_info'>
                    <div className='taminot_ratio_parent taminot_tilla_radio'>
                        {
                            RadioColl()
                        }
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Ta'minot turi:</p>
                        <p>Tilla Buyumlar Kafilligi</p>
                    </div>
                    <div className={ goldInfo?.valued_by == 2 ? 'taminot_bahoType' : 'close'}>
                        <Input
                            bordered
                            label='Tilla buyumlarni baholovchi tashkilot'
                            className='vall'
                            width='100%'
                            clearable
                            placeholder="Voziq Mirzo"
                            color="secondary"
                            value={goldInfo?.company?.name}
                            {...register(`company.name`, { required: goldInfo?.valued_by == 2 ? true : false} )}
                            onChange={(e)=>{
                                let newArray = {...goldInfo}
                                newArray.company.name = e.target.value
                                setGoldInfo(newArray)
                            }}
                        />
                        <Input
                            bordered
                            label='Litsenziya'
                            className='vall'
                            width='100%'
                            clearable
                            placeholder=" Litsenziya BL001, RR0118, 19.02.2014 y. berilgan"
                            color="secondary"
                            value={goldInfo?.company?.license}
                            {...register(`company.license`, { required: goldInfo?.valued_by == 2 ? true : false} )}
                            onChange={(e)=>{
                                let newArray = {...goldInfo}
                                newArray.company.license = e.target.value
                                setGoldInfo(newArray)
                            }}    
                        />
                        <Input
                            bordered
                            label='Baholovchining ismi sharifi'
                            className='vall'
                            width='100%'
                            clearable
                            placeholder="B.Asomov"
                            color="secondary"
                            value={goldInfo?.company?.valuer_name}
                            {...register(`company.valuer_name`, { required: goldInfo?.valued_by == 2 ? true : false} )}
                            onChange={(e)=>{
                                let newArray = {...goldInfo}
                                newArray.company.valuer_name = e.target.value
                                setGoldInfo(newArray)
                            }}   
                        />
                        <Input
                            bordered
                            label='Baholash hujjati raqami'
                            width='100%'
                            clearable
                            className='vall'
                            placeholder="06/002"
                            color="secondary"
                            value={goldInfo?.company?.doc_code}
                            {...register(`company.doc_code`, { required: goldInfo?.valued_by == 2 ? true : false} )}
                            onChange={(e)=>{
                                let newArray = {...goldInfo}
                                newArray.company.doc_code = e.target.value
                                setGoldInfo(newArray)
                            }}  
                        />
                    </div>
                    <div className='margin_top_15'>
                        <Input
                            bordered
                            label='Baholash hujjati sanasi'
                            className='vall'
                            width='100%'
                            type='date'
                            placeholder="11.02.22"
                            color="secondary"
                            value={goldInfo?.date}
                            {...register(`date`, { required: true} )}
                            onChange={(e)=>{
                                let newArray = {...goldInfo}
                                newArray.date = e.target.value
                                setGoldInfo(newArray)
                            }}  
                        />
                        <Input
                            bordered
                            label='Tilla buyumlarning baholangan qiymati'
                            className='vall'
                            width='100%'
                            type='number'
                            value={TotalSum()}
                            color="secondary"
                            readOnly
                        />
                        <h1>Baholash natijalari</h1>
                        {
                            golds?.map((item,index)=>(
                                <div className='taminot_tableform_item' key={item?.id}>
                                    <div className='taminot_tableform_title'>
                                        <h2>Mahsulot №{index + 1}</h2>
                                        <button 
                                            className='taminot_tableform_delete taminot_tableform_delete_active'
                                            onClick={()=> deleteGold(item?.id)}
                                            type='button'
                                        >
                                            <BiTrash/>
                                        </button>
                                    </div>
                                    <div className='taminot_gold_product'>
                                        <Input
                                            bordered
                                            label='Nomi'
                                            className='vall'
                                            clearable
                                            placeholder="Uzuk"
                                            color="secondary"
                                            value={golds.find(x => x.id === item.id).name}
                                            onChange={(e)=>{
                                                const newGold = [...golds]
                                                newGold[index].name = e.target.value
                                                setGolds(newGold)
                                            }}
                                        />
                                        <Input
                                            bordered
                                            label='Proba'
                                            className='vall'
                                            clearable
                                            placeholder="583"
                                            type='number'
                                            color="secondary"
                                            value={golds.find(x => x.id === item.id).gold_num}
                                            onChange={(e)=>{
                                                const newGold = [...golds]
                                                newGold[index].gold_num = e.target.value
                                                setGolds(newGold)
                                            }}
                                        />
                                        <Input
                                            bordered
                                            label="O'lchov birligi"
                                            className='vall'
                                            placeholder="dona"
                                            color="secondary"
                                            value={golds.find(x => x.id === item.id).measure}
                                            onChange={(e)=>{
                                                const newGold = [...golds]
                                                newGold[index].measure = e.target.value
                                                setGolds(newGold)
                                            }}
                                            clearable
                                        />
                                        <Input
                                            bordered
                                            type='number'
                                            label='Soni'
                                            className='vall'
                                            placeholder="1"
                                            color="secondary"
                                            value={golds.find(x => x.id === item.id).quantity}
                                            onChange={(e)=>{
                                                const newGold = [...golds]
                                                newGold[index].quantity = e.target.value
                                                setGolds(newGold)
                                            }}
                                            clearable
                                        />
                                        <Input
                                            bordered
                                            type='number'
                                            label='Umumiy og`irligi(gr)'
                                            className='vall'
                                            placeholder="1"
                                            color="secondary"
                                            value={golds.find(x => x.id === item.id).weight}
                                            onChange={(e)=>{
                                                const newGold = [...golds]
                                                newGold[index].weight = e.target.value
                                                newGold[index].clean_weight = e.target.value - newGold[index].stone_weight
                                                newGold[index].sum = (e.target.value - newGold[index].stone_weight) * newGold[index].gold_num_sum
                                                setGolds(newGold)
                                                let newObj = {...goldInfo}
                                                newObj.percent = (newObj.sum == 0 || TotalSum() == 0) ? 0 : ((newObj.sum / TotalSum())*100).toFixed(1)
                                                setGoldInfo(newObj)
                                            }}
                                            clearable
                                        />
                                        <Input
                                            bordered
                                            type='number'
                                            label='Toshlari og`irligi(gr)'
                                            className='vall'
                                            placeholder="1"
                                            color="secondary"
                                            value={golds.find(x => x.id === item.id).stone_weight}
                                            onChange={(e)=>{
                                                const newGold = [...golds]
                                                newGold[index].stone_weight = e.target.value
                                                newGold[index].clean_weight = newGold[index].weight - e.target.value
                                                newGold[index].sum = (newGold[index].weight - e.target.value) * newGold[index].gold_num_sum
                                                setGolds(newGold)
                                                let newObj = {...goldInfo}
                                                newObj.percent = (newObj.sum == 0 || TotalSum() == 0) ? 0 : ((newObj.sum / TotalSum())*100).toFixed(1)
                                                setGoldInfo(newObj)
                                            }}
                                            clearable
                                        />
                                        <Input
                                            bordered
                                            type='number'
                                            label='Sof og`irligi(gr)'
                                            className='vall'
                                            placeholder="1"
                                            color="secondary"
                                            readOnly
                                            value={golds.find(x => x.id === item.id).clean_weight}
                                        />
                                        <Input
                                            bordered
                                            type='number'
                                            label='Gramm uchun narx(so`m)'
                                            className='vall'
                                            placeholder="1"
                                            color="secondary"
                                            value={golds.find(x => x.id === item.id).gold_num_sum}
                                            onChange={(e)=>{
                                                const newGold = [...golds]
                                                newGold[index].gold_num_sum = e.target.value
                                                newGold[index].sum = e.target.value * newGold[index].clean_weight
                                                setGolds(newGold)
                                                let newObj = {...goldInfo}
                                                newObj.percent = (newObj.sum == 0 || TotalSum() == 0) ? 0 : ((newObj.sum / TotalSum())*100).toFixed(1)
                                                setGoldInfo(newObj)
                                            }}
                                            clearable
                                        />
                                        <Input
                                            bordered
                                            type='number'
                                            label='Baholangan qiymati(som)'
                                            className='vall'
                                            placeholder="1"
                                            color="secondary"
                                            readOnly
                                            value={golds.find(x => x.id === item.id).sum}                                       
                                        />
                                    </div>
                                </div>
                            ))
                        }
                        <div className='transport_product_addPlace margin_top_15'>
                            <button type='button' className='transport_product_addButton' onClick={() => addNewGold()}><i className='bx bx-plus-circle'></i></button>
                        </div>
                        <Input
                            bordered
                            type='number'
                            label='Qabul qilish qiymati, %da'
                            className='vall'
                            width='100%'
                            readOnly
                            value={goldInfo?.percent}
                            color="secondary"
                            status={goldInfo?.percent > 100 ? 'error' : ''}
                            {...register("percent", { required: true })}
                        />
                        <Input
                            bordered
                            type='number'
                            label='Qabul qilish qiymati, somda'
                            className='vall'
                            width='100%'
                            placeholder="1"
                            value={goldInfo?.sum}
                            color="secondary"
                            {...register("sum", { required: true })}
                            onChange={(e)=>{
                                let newArray = {...goldInfo}
                                newArray.sum = e.target.value
                                newArray.percent = (e.target.value == 0 || TotalSum() == 0) ? 0 : ((e.target.value / TotalSum())*100).toFixed(1)
                                setGoldInfo(newArray)
                            }}
                        />
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
        </div>
    </section>
  )
}

export default EditGold