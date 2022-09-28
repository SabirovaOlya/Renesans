import React,{useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
// Styles
import './Xodim.css'
// Icons
import { AiOutlineRollback, AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
// Components
import { Input } from '@nextui-org/react';
import Select from 'react-select';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
// UseForm
import { useForm } from "react-hook-form";
// API
import https from '../../assets/https'

import Swal from 'sweetalert2';


function AddXodim() {
    // Alert
    function Success() {
        Swal.fire({
            title: "Xodim qoshildi",
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
    // UseNavigate
    // let navigate = useNavigate()
    // Warning Modal
    // const [open, setOpen] = useState(false);
    // const [warn, setWarn] = useState(false);

    // Filial Section
    const [filialOptions, setFilialOptions] = useState([])
    const [sectionOptions, setSectionOptions] = useState([])

    const [filial, setFilial] = useState()
    const [section, setSection] = useState()

    const [filialRole, setFilialRole] = useState()
    const [sectionRole, setSectionRole] = useState()

    async function fetchBranches() {
        const res = await https.get('/all/branches')
        let selectFilial = []
        res?.data?.map((item)=>{
            selectFilial.push(
                { value: item?.id, label: item?.name }
            )
        })
        setFilialOptions(selectFilial)
        setFilial(selectFilial[0])
        setFilialRole(selectFilial[0].value)
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
        setSection(selectSection[0])
        setSectionRole(selectSection[0].value)
    }

    useEffect(() => {
        fetchBranches()
        fetchSection()
    }, [])
    
    // UseForm
    const { register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm();

    const onSubmit = (data) => {
        let newData = { ...data, branch_id: filialRole, section_id:sectionRole }
        https
        .post('/employees',newData)
        .then(res =>{
            if(res.status == 200){
                Success()
                console.log(newData);
            }
        })
        .catch(err =>{
            console.log(err);
            console.log(data);

        })
    }

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            padding: 10,
            borderRadius:5
        }),
        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';
            return { ...provided, opacity, transition };
        }
    }

    return (
        <>
        {/* Reset Warning
        <div className={resetWarning}>
            <p>Haqiqatan ham ma'lumontlarni qayta tiklamoqchimisiz?</p>
            <div >
            <button onClick={closeReset}>Ha</button>
            <button onClick={closeReset}>Yoq</button>
            </div>
        </div> */}

            <section className='xodimform'>
                <div className='xodimform_header'>
                    <Link to='/xodim' className='clientform_back'>
                        <AiOutlineRollback/>
                        Orqaga
                    </Link>
                </div>
                <form className='xodimform_form' onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='xodimform_title'>Shakllarni To'ldiring:</h1>
                    <div className='xodim_selectform'>
                        <p>Filiali</p>
                        <Select
                        width='100%'
                        defaultValue={filial}
                        value={filial}
                        options={filialOptions}
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
                            setFilialRole(event.value)
                            setFilial(event)
                        }}
                        />
                        {/* <input hidden value={filialRole} {...register("branch_id", { required: true })}/> */}
                    </div>
                    <div className='xodim_selectform'>
                        <p>Bo'limi</p>
                        <Select
                        width='100%'
                        defaultValue={section}
                        value={section}
                        options={sectionOptions}
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
                            setSectionRole(event.value)
                            setSection(event)
                        }}
                        />
                        {/* <input hidden value={sectionRole} {...register("section_id", { required: true })}/> */}
                    </div>
                    <Input
                        width='100%'
                        clearable
                        bordered
                        label="Ismi"
                        placeholder='Name'
                        className='xodim_input'
                        color="secondary"
                        {...register("name", { required: true })}
                    />
                    <Input
                        width='100%'
                        clearable
                        bordered
                        label="Lavozim"
                        placeholder='Bank'
                        className='xodim_input'
                        color="secondary"
                        {...register("job", { required: true })}
                    />
                    <Input
                        width='100%'
                        clearable
                        bordered
                        label="Code"
                        type='number'
                        placeholder="1234567"
                        className='xodim_input'
                        color="secondary"
                        {...register("code", { required: true })}
                    />
                    <div className='xodim_buttons'>
                        <button type='reset' className='client_submit reset' onClick={()=>{console.log(filial, section)}}>
                            Formani tiklash
                            <AiOutlineClear/>
                        </button>
                        <button className='client_submit submit'>
                            Xodimni qo'shish
                            <AiOutlineUserAdd/>
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default AddXodim