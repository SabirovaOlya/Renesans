import React, {useState,useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineRollback, AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import { Input } from '@nextui-org/react'
import https from '../../assets/https'
import Select from 'react-select';
import UserContext from '../../Context.js'
import { Spin } from 'antd'
// Alert
import Swal from 'sweetalert2'

function EditXodim() {

    // const user = useContext(UserContext);
    // console.log(user);

    let { id } = useParams()

    const [ xodim, setXodim] = useState({})
    const [ backXodim, setBackXodim] = useState({})
    const [ filial, setFilial ] = useState('')

    // Select Info
    const [branches, setBranches] = useState([])
    const [filialOptions, setFilialOptions] = useState([])
    const [sectionOptions, setSectionOptions] = useState([])

    // const [selector, setSelector] = useState(<></>)
    // const [loadingFetchToBranches, setLoadingFetchToBranches] = useState(false)

    function Edited() {
        Swal.fire({
            title: "Xodim o`zgartirildi",
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }

    useEffect(()=>{
        https
        .get(`/employees/${id}`)
        .then(res =>{
            setXodim({
                branch_id : res.data.branch.id,
                section_id: res.data.section.id,
                job: res.data.job,
                name: res.data.name,
                code: res.data.code
            })
            setBackXodim({
                branch_id : res.data.branch.id,
                section_id: res.data.section.id,
                job: res.data.job,
                name: res.data.name,
                code: res.data.code
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

    function BackFun(){
        setXodim(backXodim)
    }

    function EditEmployee(){
        https
        .put(`/employees/${id}`, xodim)
        .then(res =>{
            if(res.request.status === 200){
                Edited()
            };
        })
        .catch(err =>{
            console.log(err);
        })
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