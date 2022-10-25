import React, { useState, useContext,useEffect, useRef } from 'react'
import { Input, Textarea } from '@nextui-org/react'
import { v4 as uuidv4 } from 'uuid'
import { Context } from '../../../Context';
import axios from 'axios';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft,AiOutlineDownload,AiFillCloseSquare } from 'react-icons/ai'
// UseForm
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

function FirstKl1() {

    let navigate = useNavigate()

    const { path, setPath } = useContext(Context)
    const  imageInput = useRef()

    // Tab active
    const { activeTab, setActiveTab, familyMem, setFamilyMem, mulkItem, setMulkItem, dataFirstQism, setDataFirstQism } = useContext(Context)
    useEffect(() => {
        setActiveTab(2)
    }, [])

    function NextStep(){
        navigate('/kl1/addkl1/boshqa', { replace: true });
    }
    function BackStep(){
        navigate("/kl1/addkl1", { replace: true });
    }

    // ********** Photo functions ************* //
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
    
    // ********___Family___********* //
    // Family Members Adding and Deleting Functions
    function addFamilyMember () {
        let newFamilyMember = [{
            id:uuidv4(),
            name:''
        }]
        setFamilyMem(familyMem.concat(newFamilyMember))
    }
    function deleteFamilyMember (id) {
        if(familyMem.length>1){
            let newFamilyMembers = familyMem.filter((fam,famId)=> famId !== (id))
            setFamilyMem(newFamilyMembers)
        }
    }

    // ***********___Mulk___**********

    // Mulk Items Adding and Deleting Functions
    function addMulkItem () {
        let newmulkItem = [{
            id:uuidv4(),
            name:''
        }]
        setMulkItem(mulkItem.concat(newmulkItem))
    }
    function deleteMulkItem (id) {
        if(mulkItem.length>1){
            let newmulkItems = mulkItem.filter((mulk,mulkId)=> mulkId !== (id))
            setMulkItem(newmulkItems)
        }
    }

    // UseForm
    const { register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();

    const onSubmit = (data) =>{
        let family = []
        let properties = []
        familyMem?.map(item => family.push(item.name))
        mulkItem?.map(item => properties.push(item.name))
        let newData ={...data, family:family, property:properties}
        console.log(newData)
        setTimeout(()=>{
            NextStep()
        },500)
    }

  return (
    <>
        <h2 className='kl1_subtitle'>Buyurtmachining oilaviy sharoitini organish natijalari</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <p className='kl1_formtitle'>Birgalikda istiqomat qiluvchilar</p>
            {
                familyMem?.map((item,index)=>(
                    <div className='kl1_product' key={item?.id}>
                        <Input
                            rounded
                            bordered
                            label='Istiqomat qiluvchi'
                            placeholder="Otasi"
                            color="secondary"
                            width='93%'
                            className='kl1_input'
                            value={familyMem.find(x => x.id === item.id).name}
                            onChange={(e)=>{
                                let newFamilyMem = [...familyMem]
                                newFamilyMem[index].name = e.target.value
                                setFamilyMem(newFamilyMem)
                            }}
                        />
                        <button
                            className='kl1_delete_button'
                            type='button'
                            onClick={() => deleteFamilyMember(index)}
                        >
                            <i className='bx bx-trash'></i>
                        </button>
                    </div>
                ))
            }
            <div className='margin_bottom20'>
                <button
                    className='kl1_add_button'
                    type='button'
                    onClick={()=>{addFamilyMember()}}
                >
                    Istiqomat qiluvchi qoshish
                </button>
            </div>
            <Textarea
                width='100%'
                bordered
                rounded
                color="secondary"
                className='kl1_input'
                label='Oila azolari bilan suhbat davomida aniqlangan muhim malumotlar'
                placeholder='Buyurtmachining va oilaning byudjeti bitta'
                value={dataFirstQism?.conversation_result}
                {...register("conversation_result", { required: true })}
                onChange={(e)=>{
                    let newFirstQism = {...dataFirstQism}
                    newFirstQism.conversation_result = e.target.value
                    setDataFirstQism(newFirstQism)
                }}
            />
            <p className='kl1_formtitle'>Buyurtmachining boshqa mulklari</p>
            {
                mulkItem.map((item,index)=>(
                    <div className='kl1_product' key={item.id}>
                        <Input
                            rounded
                            bordered
                            label='Mulk nomi'
                            placeholder="Damas"
                            color="secondary"
                            width='93%'
                            className='kl1_input'
                            value={mulkItem.find(x => x.id === item.id).name}
                            onChange={(e)=>{
                                let newMulk = [...mulkItem]
                                newMulk[index].name = e.target.value
                                setMulkItem(newMulk)
                            }}
                        />
                        <button
                            className='kl1_delete_button'
                            onClick={() => deleteMulkItem(index)}
                            type='button'
                        >
                            <i className='bx bx-trash'></i>
                        </button>
                    </div>
                ))
            }
            <div className='margin_bottom20'>
                <button
                    className='kl1_add_button'
                    onClick={()=>{addMulkItem()}}
                    type='button'
                >
                    Mulkni qoshish
                </button>
            </div>
            <Textarea
                width='100%'
                bordered
                rounded
                color="secondary"
                className='kl1_input margin_bottom20'
                label='Yashash sharoiti'
                placeholder='Yashash sharoiti ortacha. Uy 3 ta yotoqxona, oshxona, mehmonxona va hammomdan iborat. Uy tamiri orta darajada. Uy otasini nomida. Xovlining umumiy maydoni 6 sotix. Tomorqada 10 dan ortiq mevali daraxtlar bor. Shuningdek, uy xojaligini oz ehtiyojlari uchun pomidor, bodring, qalampir, baqlajon ekilgan.'
                value={dataFirstQism?.living_condition}
                {...register("living_condition", { required: true })}
                onChange={(e)=>{
                    let newFirstQism = {...dataFirstQism}
                    newFirstQism.living_condition = e.target.value
                    setDataFirstQism(newFirstQism)
                }}
            />
            <h2 className='kl1_subtitle'>Buyurtmachining faoliyati va daromad  manbalarini organish natijalari</h2>
            <Textarea
                width='100%'
                bordered
                rounded
                color="secondary"
                className='kl1_input'
                label='Buyurtmachining faoliyat turi'
                placeholder='Savdo-transport vositalari uchun moy sotadi. Savdo bolmaydigan kunlari va har kuni soat 16:00 dan 21:00 gacha Yandeks Taksida taksichilik qiladi.'
                value={dataFirstQism?.type}
                {...register("type", { required: true })}
                onChange={(e)=>{
                    let newFirstQism = {...dataFirstQism}
                    newFirstQism.type = e.target.value
                    setDataFirstQism(newFirstQism)
                }}
            />
            <Input
                rounded
                bordered
                label='Faoliyat manzili'
                placeholder="Sergeli ehtiyot qismlari bozori, C blok, 19-do'kon"
                color="secondary"
                width='100%'
                className='kl1_input'
                value={dataFirstQism?.address}
                {...register("address", { required: true })}
                onChange={(e)=>{
                    let newFirstQism = {...dataFirstQism}
                    newFirstQism.address = e.target.value
                    setDataFirstQism(newFirstQism)
                }}
            />
            <Input
                rounded
                bordered
                label='Faoliyat joyi (shaxsiy / ijara / boshqa)'
                placeholder="Ijara"
                color="secondary"
                width='100%'
                className='kl1_input'
                value={dataFirstQism?.owner}
                {...register("owner", { required: true })}
                onChange={(e)=>{
                    let newFirstQism = {...dataFirstQism}
                    newFirstQism.owner = e.target.value
                    setDataFirstQism(newFirstQism)
                }}
            />
            <Input
                rounded
                bordered
                label='Ushbu sohada foliyat yuritish davomiyligi'
                placeholder="3 yildan oshiq"
                color="secondary"
                width='100%'
                className='kl1_input'
                value={dataFirstQism?.duration}
                {...register("duration", { required: true })}
                onChange={(e)=>{
                    let newFirstQism = {...dataFirstQism}
                    newFirstQism.duration = e.target.value
                    setDataFirstQism(newFirstQism)
                }}
            />
            <p className='photo_text'>Rasimlar</p>
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
            </div> 

            <div className='step_buttons double_button'>
                <button type='button' onClick={()=>{BackStep()}} className='previous_button'><AiOutlineDoubleLeft/><p>Oldingi</p></button>
                <button type='submit' className='step_next'><p>Keyingi</p> <AiOutlineDoubleRight/></button>
            </div>
        </form>
    </>
  )
}

export default FirstKl1