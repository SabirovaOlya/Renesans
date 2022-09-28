import React, {useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineRollback, AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import { Input } from '@nextui-org/react'
import https from '../../assets/https';

// useForm
import { useForm } from "react-hook-form";

// Alert
import Swal from 'sweetalert2'


function EditSection() {

    const { id } = useParams();
    const [section, setSection] = useState({})
    const [backSection, setBackSection] = useState({})

    const [ status, setStatus] = useState('')

    // Alert
    function Success() {
        Swal.fire({
            title: "Bo'lim o'zgartirildi",
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

    // // UseForm
    //     const { 
    //         register,
    //         handleSubmit,
    //         watch,
    //         formState: { errors, isValid }
    // } = useForm();
    
    // GET
    useEffect(()=>{
        https
        .get(`/sections/${id}`)
        .then(res =>{
            setSection(
                res.data.data
            )
            setBackSection(
                res.data.data
            )
        })
        .catch( err =>{
            console.log(err);
        })
    },[id])
    
    // Edit
    function EditDate(a){
        if(a.trim()){
            let data = {
                "name":section.name
            }
            https
            .put(`/sections/${id}`, data)
            .then( res =>{
                if(res.request.status === 200){
                    Success()
                    setStatus('')
                }
            })
            .catch(err =>{
                Warn()
            })
        }else{
            setStatus("error")
        }
    }

    // Back 
    function BackFun(){
        setSection(backSection)
    }

  return (
    <section>
        <div className='filialform_header'>
            <Link to='/section' className='clientform_back'>
                <AiOutlineRollback />
                Orqaga
            </Link>
        </div>
        <div className='single_buyurtma'>
            <h1 className='text_center filial_edit_text'>{section?.name}</h1>
            <div className='pdf_margin_top_15'>
                <Input
                    width='100%'
                    bordered
                    label="Nomi"
                    value={section?.name}
                    className='filial_input'
                    color="secondary"
                    onChange={(e)=>{
                        let newsection = {...section}
                        newsection.name =  e.target.value
                        setSection(newsection)
                    }}
                    status={status}
                />
                {/* <Input
                    width='100%'
                    bordered
                    label="Kod"
                    // value={section?.code}
                    className='filial_input'
                    color="secondary"
                    // onChange={(e)=>{
                    //     let newsection = {...section}
                    //     newsection.code =  e.target.value
                    //     setSection(newsection)
                    // }}
                    placeholder={123241}
                />
                <Input
                    width='100%'
                    bordered
                    label="Filial"
                    // value={section?.filial}
                    className='filial_input'
                    color="secondary"
                    // onChange={(e)=>{
                    //     let newsection = {...section}
                    //     newsection.filial =  e.target.value
                    //     setSection(newsection)
                    // }}
                    placeholder={'Nukus filial'}
                />
                <Input
                    width='100%'
                    bordered
                    label="Manzil"
                    // value={section?.address}
                    className='filial_input'
                    color="secondary"
                    // onChange={(e)=>{
                    //     let newsection = {...section}
                    //     newsection.address =  e.target.value
                    //     setSection(newsection)
                    // }}
                    placeholder={'Aydin jol ko`chasi 45'}
                /> */}
                <div className='xodim_buttons'>
                    <button type='reset' className='client_submit reset back_red' onClick={()=>{BackFun()}}>
                        O'zgarishni bekor qilish
                        <AiOutlineClear/>
                    </button>
                    <button type='submit' className='client_submit submit back_green' onClick={()=>{EditDate(section?.name)}}>
                        O'zgarishni kiritish
                        <AiOutlineUserAdd/>
                    </button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default EditSection