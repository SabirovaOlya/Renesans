import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import https from '../../assets/https';
import { AiOutlineRollback,AiOutlineEdit,AiOutlineClear, AiOutlineUserAdd} from 'react-icons/ai'
import { Input } from '@nextui-org/react';
import { BiTrash } from 'react-icons/bi'
import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form";
import Select from 'react-select';
import Swal from 'sweetalert2'

import './Client.css'
import '../Group/Group.css'

function EditGroup() {
    const [group, setGroup] = useState({})
    const [backGroup, setBackGroup] = useState({})

    let { id } = useParams()
    let navigate = useNavigate();

    // Alert
    function DeleteAlert() {
        Swal.fire({
            title: "Klient o'chirildi",
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }
    // Alert
    function EditAlert() {
        Swal.fire({
            title: "Guruh o'zgartirildi",
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }
    function Success() {
        Swal.fire({
            title: "Klient qo'shildi",
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }
    function Warn() {
        Swal.fire({
            title: "Klient qo'shilmadi",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
    function WarnEmpty() {
        Swal.fire({
            title: "Kodni kiriting",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
    function Error404() {
        Swal.fire({
            title: "Bunday klient yo'q",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }

    useEffect(()=>{
        https
        .get(`/groups/${id}`)
        .then(res =>{
            setGroup(res.data)
            setBackGroup(res.data)
        })
    },[])

    function AddClientGroup(){
        navigate('/group/add_client_group', {state:{id:id}})
    }

    function DeleteClient(index){
        https
        .delete(`/clients/${index}`)
        .then(res =>{
            if(res.request.status === 200){
                DeleteAlert()
            }
        })
        .catch(err =>{
            console.log(err);
        })

        https
        .get(`/groups/${id}`)
        .then(res =>{
            setGroup(res.data)
            setBackGroup(res.data)
        })
    }

    function BackFun(){
        setGroup(backGroup)
    }

    // Opening Form
    const [addForm, setAddForm] = useState('add_mahsulot_main close')

    function openForm() {
        setAddForm('add_mahsulot_main open')
    }
    function closeForm() {
        setAddForm('add_mahsulot_main close')
    }

    // UseForm
    const { register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();

    const onSubmit = (data) => {
        if(!data?.code){
            return WarnEmpty()
        }
        
        let dataCode ={
          code: Number(data?.code)
        }
        
        https
        .post('/check/client/code', dataCode)
        .then(res =>{
            https
                .post(`/client/${res?.data?.data?.id}/group/${group?.id}`)
                .then(res =>{
                    Success()
                    setAddForm('add_mahsulot_main close')
                })
                .catch(err=>{
                    console.log(err)
                    Warn()
                })
        })
        .catch(err =>{
            if(err?.request?.status === 404){
              console.log(err);
                return(
                    Error404()
                )
            }else{
                console.log(err);
            }
        })
    }

    function Edit(){
        let data = {
            name: group?.name,
            code: group?.code
        }
        https
        .put(`/groups/${id}`, data)
        .then(res =>{
            if(res.request.status === 200){
                EditAlert()
            }
        })
        .catch(err =>{
            console.log(err);
        })
    }

  return (
    <>
        {/* Modal */}
        <form className={addForm} onSubmit={handleSubmit(onSubmit)}>
            <p>Klient qo'shish</p>
            <Input
                rounded
                bordered
                placeholder="Kodi..."
                color="secondary"
                width='100%'
                label="Klient kodi"
                {...register("code", { required: true })}
            />
            <div className='add_mahsulot_buttons'>
                <button onClick={closeForm}>Orqaga</button>
                <button type='submit'>Qo'shish</button>
            </div>
        </form>


        <section>
            <div className='filialform_header'>
                <Link to={`/group`} className='clientform_back'>
                    <AiOutlineRollback />
                    Orqaga
                </Link>
            </div>
            <div className='single_buyurtma'>
                <h1 className='text_center filial_edit_text'>{group?.name}</h1>
                <Input
                    width='100%'
                    bordered
                    label="Guruh nomi"
                    value={group?.name}
                    placeholder='name'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newGroup= { ...group }
                        newGroup.name = e.target.value
                        setGroup(newGroup)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Guruh kodi"
                    value={group?.code}
                    placeholder='code'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newGroup= { ...group }
                        newGroup.code = e.target.value
                        setGroup(newGroup)
                    }}
                />
                <div className='pdf_margin_top_15 addGroup_client_title'>
                    <p className='title'>Klientlar:</p>
                    <div>
                        <button onClick={()=>{openForm()}} className='addGroup_client'>Klient qo'shish</button>
                        <button onClick={()=>{AddClientGroup()}} className='addGroup_client'>Yangi klient qo'shish</button>
                    </div>
                </div>
                <div className='group_single_table pdf_margin_top_15'>
                    <div className='group_single_table_header'>
                        <p>Ism</p>
                        <p>Telefon raqam</p>
                        <p>Manzil</p>
                    </div>
                    {
                        group?.clients?.map((item,index)=>{
                            return(
                                <div className='group_single_table_header' key={item?.id}>
                                    <p>{index + 1}. {item?.name}</p>
                                    <p>{item?.phone?.[0]}</p>
                                    <p>{item?.address}</p>
                                    <div className='group_edit_table_buttons'>
                                        <button><Link to={`/client/singleClient/${item?.id}`} className='center_center'><i className='bx bx-user'></i></Link></button>
                                        <button><Link to={`/client/editClient/${item?.id}`} className='center_center'><i className='bx bx-edit-alt'></i></Link></button>
                                        <button onClick={()=>{DeleteClient(item?.id)}}><i className='bx bx-trash'></i></button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>  
                <div className='pdf_margin_top_40'>
                    <div className='xodim_buttons'>
                        <button type='reset' className='client_submit reset back_red' onClick={() => { BackFun() }}>
                            O'zgarishni bekor qilish
                            <AiOutlineClear />
                        </button>
                        <button type='submit' className='client_submit submit back_green' onClick={() => { Edit() }}>
                            O'zgarishni kiritish
                            <AiOutlineUserAdd />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default EditGroup