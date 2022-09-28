import React, { useState } from 'react'
import { Input, Textarea } from '@nextui-org/react'
import { v4 as uuidv4 } from 'uuid'
// UseForm
import { useForm } from "react-hook-form";

function EditPart1() {

    // ********___Family___*********//
    const [ familyMem, setFamilyMem ] = useState([{
        id:1,
        name:''
    }])
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
    const [ mulkItem, setMulkItem ] = useState([{
        id:1,
        name:''
    }])
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
        let newData ={...data, family_members:family, property:properties}
        console.log(newData)
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
                            width='90%'
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
                {...register("family_info", { required: true })}
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
                        width='90%'
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
                {...register("life_terms", { required: true })}
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
                {...register("job_type", { required: true })}
            />
            <Input
                rounded
                bordered
                label='Faoliyat manzili'
                placeholder="Sergeli ehtiyot qismlari bozori, C blok, 19-do'kon"
                color="secondary"
                width='100%'
                className='kl1_input'
                {...register("job_address", { required: true })}
            />
            <Input
                rounded
                bordered
                label='Faoliyat joyi (shaxsiy / ijara / boshqa)'
                placeholder="Ijara"
                color="secondary"
                width='100%'
                className='kl1_input'
                {...register("job_possession", { required: true })}
            />
            <Input
                rounded
                bordered
                label='Ushbu sohada foliyat yuritish davomiyligi'
                placeholder="3yildan oshiq"
                color="secondary"
                width='100%'
                className='kl1_input'
                {...register("job_duration", { required: true })}
            />
            <button type='submit'>Date</button>
        </form>
    </>
  )
}

export default EditPart1