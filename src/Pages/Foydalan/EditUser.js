import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineRollback, AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import { Input } from '@nextui-org/react'
import https from '../../assets/https'
import Select from 'react-select';
// Alert
import Swal from 'sweetalert2'


function EditUser() {

    let { id } = useParams()
    const [user, setUser] = useState({})
    const [backUser, setBackUser] = useState({})
    const userID = window.localStorage.getItem('user_id')

    // Alert
    function Success() {
        Swal.fire({
            title: "User o'zgartirildi",
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

    const [roles, setRoles] = useState([])

    async function fetchRoles() {
        const res = await https.get('/roles')
        let selectRoles = []
        res?.data?.map((item) => {
            selectRoles.push(
                { value: item?.id, label: item?.name }
            )
        })
        setRoles(selectRoles)
    }

    useEffect(() => {
        fetchRoles()

        https
            .get(`/users/${id}`)
            .then(res => {
                setUser(res?.data?.data)
                setBackUser(res?.data?.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    function FindRoles(){
        let rolesArr = []
        user?.role?.map(item =>{
            rolesArr.push(roles?.find(x => x.value == item?.id))
        })
        return(rolesArr)
    }

    // Edit
    function Edit() {
        let roless = []
        user?.role?.map(item =>{
            roless.push(item?.id)
        })
        let data = {
            name: user?.name,
            email: user?.email,
            password: user?.password,
            password_confirmation: user?.password,
            employee_id: user?.employee?.id,
            role:roless
        }
        https
            .patch(`/update/users/${id}`, data)
            .then(res => {
                Success()
                if (user?.id == userID) {
                    window.localStorage.removeItem('name')
                    window.localStorage.setItem('name', user?.name)
                }
            })
            .catch(err => {
                Warn()
                console.log(err);
                console.log(data);
            })
    }

    // Back
    function BackFun() {
        setUser(backUser)
    }

    return (
        <section>
            <div className='filialform_header'>
                <Link to='/foydalanuvchi' className='clientform_back'>
                    <AiOutlineRollback />
                    Orqaga
                </Link>
            </div>
            <div className='FilialEditTable single_buyurtma'>
                <h1 className='text_center filial_edit_text'>{user?.name}</h1>
                <Input
                    width='100%'
                    bordered
                    label="F.I.Sh."
                    value={user?.name}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newUser = { ...user }
                        newUser.name = e.target.value
                        setUser(newUser)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Email"
                    type='email'
                    value={user?.email}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newUser = { ...user }
                        newUser.email = e.target.value
                        setUser(newUser)
                    }}
                />
                <Input
                    width='100%'
                    bordered
                    label="Parol"
                    value={user?.password}
                    placeholder='filial'
                    className='filial_input'
                    color="secondary"
                    onChange={(e) => {
                        let newUser = { ...user }
                        newUser.password = e.target.value
                        setUser(newUser)
                    }}
                />
                
                    <div className='xodim_selectform'>
                        <p>Roli</p>
                        <Select
                            width='10%'
                            defaultValue={FindRoles()}
                            value={FindRoles()}
                            isMulti
                            options={roles}
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
                                let arr = []
                                event?.map(item => {
                                    arr.push({
                                     id:item.value
                                    })
                                })
                                let newUser = { ...user }
                                newUser.role = arr
                                setUser(newUser)
                            }}
                        />
                    </div>
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
        </section>
    )
}

export default EditUser