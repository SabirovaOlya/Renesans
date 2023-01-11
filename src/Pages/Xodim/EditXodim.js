import React, {useState,useEffect, useContext, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import https from '../../assets/https'
import axios from 'axios';
import { Input } from '@nextui-org/react'
import { AiOutlineRollback, AiOutlineClear, AiOutlineUserAdd, AiOutlineDownload,AiFillCloseSquare } from 'react-icons/ai'
import Select from 'react-select';
import UserContext from '../../Context.js'
import { Spin } from 'antd'
// Alert
import Swal from 'sweetalert2'

function EditXodim() {

    let { id } = useParams()

    const [ xodim, setXodim] = useState({})
    const [ backXodim, setBackXodim] = useState({})
    const [ filial, setFilial ] = useState('')

    // Select Info
    const [branches, setBranches] = useState([])
    const [filialOptions, setFilialOptions] = useState([])
    const [sectionOptions, setSectionOptions] = useState([])
    const [path, setPath] = useState([])


    function Edited() {
        Swal.fire({
            title: "Xodim o`zgartirildi",
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }
    function Error() {
        Swal.fire({
            title: "Xato",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }

    let positions = [
        {
            value:'chief_treasurer',
            label:"Bosh g'aznachi"
        },
        {
            value:'head_of_credit',
            label:"Bosh kreditor"
        },
        {
            value:'chief_accountant',
            label:"Bosh buxgalter"
        },
        {
            value:'head_of_branch',
            label:"Boshqaruvchi"
        },
        {
            value:null,
            label:"Qo'mita azosi emas"
        }
    ]

    useEffect(()=>{
        https
        .get(`/employees/${id}`)
        .then(res =>{
            setXodim({
                branch_id : res?.data?.branch?.id,
                section_id: res?.data?.section?.id,
                job: res?.data?.job,
                name: res?.data?.name,
                code: res?.data?.code,
                position:res?.data?.position
            })
            let images = []
            images.push(res?.data?.photo)
            setPath(images)
            setBackXodim({
                branch_id : res?.data?.branch?.id,
                section_id: res?.data?.section?.id,
                job: res?.data?.job,
                name: res?.data?.name,
                code: res?.data?.code,
                position:res?.data?.position
            }) 
        })
        .catch(err =>{
            console.log(err);
        })
        
    },[])

    async function fetchBranches() {
        const res = await https.get('/all/branches')
        let selectFilial = []
        res?.data?.map((item)=>{
            selectFilial.push(
                { value: item?.id, label: item?.name }
            )
        })
        setFilialOptions(selectFilial)
    }

    async function fetchSection() {
        const ress = await https.get('/all/sections')
        let selectSection = []
        ress?.data?.data?.map((item)=>{
            selectSection.push(
                { value: item?.id, label: item?.name }
            )
        })
        setSectionOptions(selectSection)
    }

    useEffect(() => {
        fetchBranches()
        fetchSection()
    }, [])

    
    // ********** Photo functions ************* //
    const  imageInput = useRef()

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
            setPath(path.concat(res?.data?.data))
        })
        .catch(err =>{
            console.log(err);
        })
    }
    function ImageDelete(id){
        let imageItems = path.filter(x => x !== path[id])
        setPath(imageItems)
    }

    // Selector

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            padding: 5,
            borderRadius: 5
        }),
        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';
            return { ...provided, opacity, transition };
        }
    }

    function BackFun(){
        setXodim(backXodim)
    }

    function EditEmployee(){
        let info = {...xodim, paths:path}
        https
        .put(`/employees/${id}`, info)
        .then(res =>{
            if(res.request.status === 200){
                Edited()
            }
        })
        .catch(err =>{
            console.log(err)
            console.log(info)

        })
    }


  return (
    <section>
        <div className='filialform_header'>
            <Link to='/xodim' className='clientform_back'>
                <AiOutlineRollback />
                Orqaga
            </Link>
        </div>
        <div className='single_buyurtma'>
            <h1 className='text_center filial_edit_text'>{xodim?.name}</h1>
            <div className='pdf_margin_top_15'>
                <Input
                    width='100%'
                    bordered
                    label="Ismi"
                    value={xodim?.name}
                    placeholder='Xodim'
                    className='filial_input'
                    color="secondary"
                    onChange={(e)=>{
                        let newxodim = {...xodim}
                        newxodim.name =  e.target.value
                        setXodim(newxodim)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Lavozim"
                    value={xodim?.job}
                    placeholder='monitoring'
                    className='filial_input'
                    color="secondary"
                    onChange={(e)=>{
                        let newxodim = {...xodim}
                        newxodim.job =  e.target.value
                        setXodim(newxodim)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Kod"
                    value={xodim?.code}
                    placeholder='12345'
                    className='filial_input'
                    color="secondary"
                    onChange={(e)=>{
                        let newxodim = {...xodim}
                        newxodim.code =  e.target.value
                        setXodim(newxodim)
                    }}
                /> 
                <div className='xodim_selectform'>
                    <p>Filial</p>
                    <Select
                        width='100%'
                        maxMenuHeight="150px"
                        options={filialOptions}
                        defaultValue={filialOptions?.find(x => x.value == xodim.branch_id)} 
                        value={filialOptions?.find(x => x.value == xodim.branch_id)}      
                        className='xodim_select basic-multi-select'
                        classNamePrefix="select"
                        styles={customStyles}
                        theme={(theme) => ({
                            ...theme,   
                            borderRadius: 12,
                            colors: {
                                ...theme.colors,
                                primary25: 'rgb(216,215,215)',
                                primary: '#7828c8',
                            },
                        })}
                        onChange={(event) => { 
                            let newxodim = {...xodim}
                            newxodim.branch_id =  event.value
                            setXodim(newxodim) 
                        }}
                    />
                </div>
                <div className='xodim_selectform'>
                    <p>Bo'lim</p>
                    <Select
                        width='100%'
                        maxMenuHeight="150px"
                        defaultValue={sectionOptions?.find(x => x.value == xodim.section_id)}
                        value={sectionOptions?.find(x => x.value == xodim.section_id)}
                        options={sectionOptions}
                        className='xodim_select basic-multi-select'
                        classNamePrefix="select"
                        styles={customStyles}
                        theme={(theme) => ({
                            ...theme,   
                            borderRadius: 12,
                            colors: {
                                ...theme.colors,
                                primary25: 'rgb(216,215,215)',
                                primary: '#7828c8',
                            },
                        })}
                        onChange={(event) => { 
                            let newxodim = {...xodim}
                            newxodim.section_id =  event.value
                            setXodim(newxodim)  
                        }}
                    />
                </div>
                <div className='xodim_selectform'>
                    <p>Kommisiya</p>
                    <Select
                    width='100%'
                    defaultValue={positions?.find(x => x.value == xodim?.position)}
                    value={positions?.find(x => x.value == xodim?.position)}
                    options={positions}
                    className='xodim_select'
                    styles={customStyles}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 12,
                        colors: {
                        ...theme.colors,
                        primary25: 'rgb(216,215,215)',
                        primary: '#7828c8',
                        },
                    })}
                    onChange={(event)=> {
                        let newxodim = {...xodim}
                        newxodim.position =  event.value
                        setXodim(newxodim) 
                    }}
                    />
                </div>
                <p className='photo_text'>Rasim</p>
                <div className='taminot_photo_add'>
                    <div className='photo_add_buttons'>
                        <button type='button' onClick={()=>{PhotoOpen()}}>Qo'shish <AiOutlineDownload className='icon_load'/></button>
                    </div>
                    <input ref={imageInput} type="file" onChange={(e)=>{AddImage((e.target.files[0]))}}/>
                    <div className='photo_images'>
                    {
                        path?.map((item,index)=>{
                            return(
                                <div className='image_container_user' key={index}>
                                    <img className='photo_show_user' src={`https://ioi-tech.uz/${item}`}></img>
                                    <button type='button' onClick={()=>{ImageDelete(index)}}><AiFillCloseSquare className='icon_no'/></button>
                                </div>
                            )
                        })
                    }
                    </div>
                </div> 
                <div className='xodim_buttons'>
                    <button className='client_submit reset back_red' onClick={()=>{BackFun()}}>
                        O'zgarishni bekor qilish
                        <AiOutlineClear/>
                    </button>
                    <button type='submit' className='client_submit submit back_green' onClick={() =>{EditEmployee()}}>
                        O'zgarishni kiritish
                        <AiOutlineUserAdd/>
                    </button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default EditXodim