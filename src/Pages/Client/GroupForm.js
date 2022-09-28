import React, { useState, useEffect} from 'react'
import { Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { Input, Radio } from '@nextui-org/react';
import { BiTrash } from 'react-icons/bi'
import { AiOutlineUsergroupAdd, AiOutlineClear, AiOutlineRollback, AiOutlineUser } from 'react-icons/ai';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
// Components
import Swal from 'sweetalert2';

import './Client.css'
import https from '../../assets/https';

  function GroupForm(props) {

    const [nameGroup, setnameGroup ] = useState('')
    const [variant, setVariant] = useState()
    const [groups, setGroups] = useState([])
    const [groupId, setGroupId] = useState([])
    const [ selector, setSelector] = useState('variant 1')
    // Input States to put in Data
    const { TabPane } = Tabs;
    // Alerts Add
    function Addition() {
        Swal.fire({
            title: "Guruh qo'shildi",
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }
    // Alerts Empty
    function Empty() {
        Swal.fire({
            title: "Ma'lumotlar to'liq emas",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }


    useEffect(() => {
      setGroups([
        {
          id:1,
          code: '',
          name: '',
          birth_date: '',
          address: '',
          temp_address:'',
          city: '',
          citizenship: '',
          nationality: '',
          pinfl: '',
          phone: '',
          doc_type: 'variant 1',
          serial_num: '',
          issued_by: '',
          issued_date: '',
          job:''
        },
        {
          id:2,
          code: '',
          name: '',
          birth_date: '',
          address: '',
          temp_address:'',
          city: '',
          citizenship: '',
          nationality: '',
          pinfl: '',
          phone: '',
          doc_type: 'variant 1',
          serial_num: '',
          issued_by: '',
          issued_date: '',
          job:''
        },
        {
          id:3,
          code: '',
          name: '',
          birth_date: '',
          address: '',
          temp_address:'',
          city: '',
          citizenship: '',
          nationality: '',
          pinfl: '',
          phone: '',
          doc_type: 'variant 1',
          serial_num: '',
          issued_by:'',
          issued_date: '',
          job:''
        }
      ])
    }, []);
  

  // Adding Client Func
  function addClient (){
    if(groups.length < 5){
      let newClient = [{
        id:uuidv4(),
        code: '',
        name: '',
        birth_date: '',
        address: '',
        temp_address:'',
        city: '',
        citizenship: '',
        nationality: '',
        pinfl: '',
        phone: '',
        doc_type: 'variant 1',
        serial_num: '',
        issued_by: '',
        issued_date: '',
        job:''
      }]
      setGroups(groups.concat(newClient))
    }
  }
  
  // Delete User
  function DeleteUser(id){
    if(groups.length > 3){
      let newGroupDelete = groups?.filter(item => item.id !== id)
      setGroups(newGroupDelete)
    }
  }

  // Selector
  const options = [
    { value: '1', label: 'variant 1' },
    { value: '2', label: 'variant 2' },
    { value: '3', label: 'variant 3' },
    { value: '4', label: 'variant 4' },
    { value: '5', label: 'variant 5' },
    { value: '6', label: 'variant 6' }
  ];
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

  // Add Button
  const operations = <div className='clientform_extra'>
    <button className={'client_add_button'} onClick={()=>addClient()}>+</button>
    <Input
      width='50%'
      clearable
      label="Guruh nomini yozing"
      bordered
      className='group-inputt'
      placeholder='Rene Bare'
      color="secondary"
      onChange={e => setnameGroup(e.target.value)}
    />
  </div>

  // Add Group
  function AddGroup() {
      const even = (element) => element == '';
      let newvalue =[]
      groups?.map(item =>{
        newvalue.push(Object.values(Object.values(item)))
        delete item.id
      })
      newvalue.push(nameGroup)
      let mainObj = (newvalue.join()).split(',');
      

      if(!mainObj.some(even)){
        let data = {
          group_name: nameGroup,
          code:123,
          client: groups
        }
        https
        .post('/clients', data)
        .then(res=>{
          Addition()
        })
        .catch(err =>{
          console.log(err);
        })
      }else{
        Empty()
      }
  }

  

  return(
  <>
    <div className='back-but'>
      <Link to='/client' className='clientform_back'>
        <AiOutlineRollback/>
        Orqaga
      </Link>
    </div>
    <Tabs tabBarExtraContent={operations}  defaultActiveKey="2"  className='client_tabs'>
    {
      groups?.map((item,index)=>{
        return(
        <TabPane
          tab={
            <div className='clientform_user'>
              <div className='clientform_icon'><AiOutlineUser/></div>
            </div>
          } 
        key={`${item?.id}`}
        >
        <div className={`client_form`}>
          <div className='clientform_title'>{index + 1}. Foydalanuvchi tafsilotlari</div>
            <div className='clientform_form margin_top_20'>
              {/* <label className='clientform_gender '>
                <p>Jinsi:</p>
                <Radio.Group
                  aria-label='Пол'
                  orientation="horizontal"
                  color='secondary'
                  defaultValue={true}
                  size='sm'
                  className='clientform_gender_radio'
                >
                  <Radio value={true}>Erkak</Radio>
                  <Radio value={false}>Ayol</Radio>
                </Radio.Group>
                <input hidden value={variant} />
              </label> */}
              <Input
                width='100%'
                clearable
                label="Parol"
                placeholder='1234'
                className='vall'
                bordered
                color="secondary"
                value={groups.find(x => x.id === item.id).code}
                onChange={e => {
                  let newGroupInfo = [...groups]
                  newGroupInfo[index].code = e.target.value
                  setGroups(newGroupInfo)
                }}
                required= 'required'
              />
              <Input
                required
                width='100%'
                clearable
                label="Ism"
                placeholder='Abdikadir'
                bordered
                className='vall'
                color="secondary"
                value={groups.find(x => x.id === item.id).name}
                onChange={e => {
                  let newGroupInfo = [...groups]
                  newGroupInfo[index].name = e.target.value
                  setGroups(newGroupInfo)
                }}
              />
              <Input
                required
                width='100%'
                label="Tug'ilgan sana"
                bordered
                className='vall'
                type='date'
                color="secondary"
                value={groups.find(x => x.id === item.id).birth_date}
                onChange={e => {
                  let newGroupInfo = [...groups]
                  newGroupInfo[index].birth_date = e.target.value
                  setGroups(newGroupInfo)
                }}
              />
              <Input
                required
                width='100%'
                clearable
                label="Vaqtinchalik yashash joyi"
                bordered
                className='vall'
                placeholder='2nd Boulevar'
                color="secondary"
                value={groups.find(x => x.id === item.id).temp_address}
                onChange={e => {
                  let newGroupInfo = [...groups]
                  newGroupInfo[index].temp_address = e.target.value
                  setGroups(newGroupInfo)
                }}
              />
              <Input
                required
                width='100%'
                clearable
                label="Tug‘ilgan joyi"
                bordered
                className='vall'
                placeholder='2nd Boulevar'
                color="secondary"
                value={groups.find(x => x.id === item.id).address}
                onChange={e => {
                  let newGroupInfo = [...groups]
                  newGroupInfo[index].address = e.target.value
                  setGroups(newGroupInfo)
                }}
              />
              <Input
                required
                width='100%'
                clearable
                label="Shahar"
                bordered
                className='vall'
                placeholder='Nukus'
                color="secondary"
                value={groups.find(x => x.id === item.id).city}
                onChange={e => {
                  let newGroupInfo = [...groups]
                  newGroupInfo[index].city = e.target.value
                  setGroups(newGroupInfo)
                }}
              />
              <Input
                required
                width='100%'
                clearable
                label="Fuqarolik"
                bordered
                className='vall'
                placeholder='Uzbekistan'
                color="secondary"
                value={groups.find(x => x.id === item.id).citizenship}
                onChange={e => {
                  let newGroupInfo = [...groups]
                  newGroupInfo[index].citizenship = e.target.value
                  setGroups(newGroupInfo)
                }}
              />
              <Input
                required
                width='100%'
                clearable
                label="Millat"
                bordered
                className='vall'
                placeholder='Uzbek'
                color="secondary"
                value={groups.find(x => x.id === item.id).nationality}
                onChange={e => {
                  let newGroupInfo = [...groups]
                  newGroupInfo[index].nationality = e.target.value
                  setGroups(newGroupInfo)
                }}
              />
              <Input
                required
                width='100%'
                clearable
                label="pinfl"
                bordered
                className='vall'
                placeholder='12345678901234'
                color="secondary"
                value={groups.find(x => x.id === item.id).pinfl}
                onChange={e => {
                  let newGroupInfo = [...groups]
                  newGroupInfo[index].pinfl = e.target.value
                  setGroups(newGroupInfo)
                }}
              />
              <Input
                required
                width='100%'
                clearable
                label="Telefon raqami"
                bordered
                className='vall'
                labelLeft='+998'
                placeholder='991235678'
                type='number'
                color="secondary"
                value={groups.find(x => x.id === item.id).phone}
                onChange={e => {
                  let newGroupInfo = [...groups]
                  newGroupInfo[index].phone = e.target.value
                  setGroups(newGroupInfo)
                }}
              />
              <div className='clientForm_selector'>
                <p>Sektor</p>
                <Select
                    // value={selectedOption}
                    defaultValue={options[0]}
                    options={options}
                    className='buyurtma_select_new'
                    styles={customStyles}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 12,
                        colors: {
                        ...theme.colors,
                        primary25: '#7828c8',
                        primary: '#7828c8',
                        },
                    })}
                    onChange={(e)=>{
                      let newGroupInfo = [...groups]
                    newGroupInfo[index].doc_type = e.label
                    setGroups(newGroupInfo)
                    }}
                />
              </div>
              <Input
                required
                width='100%'
                clearable
                label="Ishlab chiqarish raqami"
                bordered
                className='vall'
                placeholder='AD123456789'
                color="secondary"
                value={groups.find(x => x.id === item.id).serial_num}
                onChange={e => {
                  let newGroupInfo = [...groups]
                  newGroupInfo[index].serial_num = e.target.value
                  setGroups(newGroupInfo)
                }}
              />
              <Input
                required
                width='100%'
                clearable
                label="Kim bilan berilgan"
                bordered
                className='vall'
                placeholder='Robert Pattison'
                color="secondary"
                value={groups.find(x => x.id === item.id).issued_by}
                onChange={e => {
                  let newGroupInfo = [...groups]
                  newGroupInfo[index].issued_by = e.target.value
                  setGroups(newGroupInfo)
                }}
              />
              <Input
                required
                width='100%'
                label="Berilgan sana"
                bordered
                className='vall'
                type='date'
                color="secondary"
                value={groups.find(x => x.id === item.id).issued_date}
                onChange={e => {
                  let newGroupInfo = [...groups]
                  newGroupInfo[index].issued_date = e.target.value
                  setGroups(newGroupInfo)
                }}
              />
              <Input
                required
                width='100%'
                label="Faoliyat turi"
                bordered
                className='vall'
                color="secondary"
                value={groups.find(x => x.id === item.id).job}
                onChange={e => {
                  let newGroupInfo = [...groups]
                  newGroupInfo[index].job = e.target.value
                  setGroups(newGroupInfo)
                }}
              />
                <div className='submit-buttons'>
                  <button className='client_submit reset' type='reset'>
                    Formani tiklash
                    <AiOutlineClear/>
                  </button>
                  <button onClick={()=>{DeleteUser(item?.id)}} className='client_submit delete' type='button'>
                    Clientni o'chirish
                    <BiTrash/>
                  </button>
                </div>
            </div>
          </div>
        </TabPane>
        )
      })
    }
  </Tabs>
  <div className='flex_row_end'>
      <button className='client_submit  submit' type='submit' onClick={()=>{AddGroup()}}>
        Guruhni qo'shish
        <AiOutlineUsergroupAdd/>
      </button>
  </div>
  </>
  
  )
}
export default GroupForm