import React, {useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineRollback, AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import { Input } from '@nextui-org/react'
import https from '../../assets/https'

// Alert
import Swal from 'sweetalert2'


function EditMahsulot() {

    let { id } = useParams()
    const [product, setProduct] = useState({})
    const [backProduct, setBackProduct] = useState({})

    function BackFun(){
        setProduct(backProduct)
    }

     // Alert
     function Success() {
        Swal.fire({
            title: "Mahsulot o'zgartirildi",
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

    useEffect(()=>{
        https
        .get(`/products/${id}`)
        .then(res =>{
            setProduct(res.data.data)
            setBackProduct(res.data.data)
        })
        .catch(err =>{
            Warn()
        })
    },[])

    function Edit(){
        https
        .put(`/products/${id}`,product)
        .then(res =>{
            if(res.request.status === 200){
                Success()
            }
        })
        .catch(err =>{
            console.log(err);
        })
    }

  return (
    <section>
        <div className='filialform_header'>
            <Link to='/mahsulot' className='clientform_back'>
                <AiOutlineRollback />
                Orqaga
            </Link>
        </div>
        <div className='single_buyurtma'>
            <h1 className='text_center filial_edit_text'>{product?.name}</h1>
            <div className='pdf_margin_top_15'>
                <Input
                    width='100%'
                    bordered
                    label="Nomi"
                    value={product?.name}
                    className='filial_input'
                    color="secondary"
                    onChange={(e)=>{
                        let newproduct = {...product}
                        newproduct.name =  e.target.value
                        setProduct(newproduct)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Kod"
                    value={product?.code}
                    className='filial_input'
                    color="secondary"
                    onChange={(e)=>{
                        let newproduct = {...product}
                        newproduct.code =  e.target.value
                        setProduct(newproduct)
                    }}
                />
                <div className='xodim_buttons'>
                    <button className='client_submit reset back_red' onClick={()=>{BackFun()}}>
                        O'zgarishni bekor qilish
                        <AiOutlineClear/>
                    </button>
                    <button type='submit' className='client_submit submit back_green' onClick={()=>{Edit()}}>
                        O'zgarishni kiritish
                        <AiOutlineUserAdd/>
                    </button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default EditMahsulot