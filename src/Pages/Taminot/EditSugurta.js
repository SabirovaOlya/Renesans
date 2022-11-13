import React,{ useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Input } from '@nextui-org/react'
import { AiOutlineRollback, AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import https from '../../assets/https';
import { useForm } from "react-hook-form";
// Alert
import Swal from 'sweetalert2'
import { List } from 'react-content-loader'
import './Taminot.css'

function EditSugurta() {

    const [loading, setLoading] = useState(true)

    const [sugurtaEdit, setSugurtaEdit] = useState({})
    const [sugurtaBack, setSugurtaBack] = useState({})
    const [name, setName] = useState('')
    const [orderId, setOrderId] = useState()

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
  
    useEffect(()=>{
        https
        .get(`/supply-info/${id}`)
        .then(res =>{
            setSugurtaEdit(res?.data?.insurance)
            setSugurtaBack(res?.data?.insurance)
            setName(res?.data?.order?.client?.name)
            setOrderId(res?.data?.order?.id)
            setTimeout(()=>{
                setLoading(false)
            },300)
        })
        .catch(err =>{
            console.log(err)
        })
    },[])

    function BackFun(){
        setSugurtaEdit(sugurtaBack)
    }

    const onSubmit = (data) =>{

        let info = {
            order_id:orderId,
            type:'insurance',
            insurance:{...data, id:sugurtaEdit?.id},
            paths:[]
        }

        https
        .patch(`/supply-info/${id}`, info)
        .then(res =>{
            if(res.request.status === 200){
                Success()
            }
        })
        .catch(err =>{
            Warn()
            console.log(err);
        })
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
          <h1 className='text_center filial_edit_text'>{name}</h1>
          <div className='pdf_margin_top_15'>
            <form onSubmit={handleSubmit(onSubmit)} className='single_buyurtma_info'>
                <div className='single_buyurtma_inputs'>
                    <p>Ta'minot turi:</p>
                    <p>Sugurta kompaniyasi sugurta polisi</p>
                </div>
                <Input 
                    label="Sug'urta kompaniyasining nomi"
                    width='100%'
                    color="secondary"
                    bordered 
                    className='vall'
                    clearable
                    value={sugurtaEdit?.company_name}
                    {...register("company_name", { required: true })}
                    onChange={(e)=>{
                        let newArray = {...sugurtaEdit}
                        newArray.company_name = e.target.value
                        setSugurtaEdit(newArray)
                    }}
                >  
                </Input>
                <Input 
                    label="Sugurta polis raqami"
                    width='100%'
                    color="secondary"
                    bordered 
                    className='vall'
                    clearable
                    value={sugurtaEdit?.policy}
                    {...register("policy", { required: true })}
                    onChange={(e)=>{
                        let newArray = {...sugurtaEdit}
                        newArray.policy = e.target.value
                        setSugurtaEdit(newArray)
                    }}
                >  
                </Input>
                <Input 
                    label="Sug'urta summasi"
                    width='100%'
                    color="secondary"
                    bordered 
                    className='vall'
                    clearable
                    value={sugurtaEdit?.sum}
                    {...register("sum", { required: true })}
                    onChange={(e)=>{
                        let newArray = {...sugurtaEdit}
                        newArray.sum = e.target.value
                        setSugurtaEdit(newArray)
                    }}
                >  
                </Input>
                <Input 
                    label="Sug'urta sanasi"
                    width='100%'
                    color="secondary"
                    bordered 
                    className='vall'
                    type='date'
                    value={sugurtaEdit?.issue_date}
                    {...register("issue_date", { required: true })}
                    onChange={(e)=>{
                        let newArray = {...sugurtaEdit}
                        newArray.issue_date = e.target.value
                        setSugurtaEdit(newArray)
                    }}
                >  
                </Input>
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

export default EditSugurta