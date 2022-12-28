import React, { useState, useEffect} from 'react'
import { Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { Input, Radio } from '@nextui-org/react';
import { BiTrash } from 'react-icons/bi'
import { AiOutlineUsergroupAdd, AiOutlineClear, AiOutlineRollback, AiOutlineUser } from 'react-icons/ai';
import Select from 'react-select';
import { render } from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import https from '../../assets/https';
// Components
import Swal from 'sweetalert2';
import '../KL1/KL1.css'
import './Client.css'
import { log } from '@antv/g2plot/lib/utils';

  function GroupForm(props) {

    const [nameGroup, setnameGroup ] = useState('')
    const [variant, setVariant] = useState()
    const [groups, setGroups] = useState([])
    const [groupId, setGroupId] = useState([])
    const [num, setNum] = useState(0);
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
    function Success() {
      Swal.fire({
          title: "Guruh qoshildi",
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
    function BirthdayError(client) {
      Swal.fire({
          title: `Klient ${client}. Tug'ilgan sana noto'g'ri`,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
    }
    function DocumentError(client) {
      Swal.fire({
          title: `Klient ${client}. Hujjat muddati tugagan`,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
    }
    function DocumentBirthdayError(client) {
      Swal.fire({
          title: `Klient ${client}. Hujjat sanasi yoki Tug'ilgan sana noto'g'ri`,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
    }

  // Section
  const [sectionOptions, setSectionOptions] = useState([
    { value: '1', label: "O'zR fuqarosining ID kartasi" },
    { value: '2', label: "O'zR Fuqarosining pasporti" },
    { value: '3', label: "Harbiy xizmatchi guvohnomasi" },
    { value: '4', label: "Xizmat guvohnomasi" },
    { value: '5', label: "Xorijiy fuqaro pasporti" },
    { value: '6', label: "Yashash guvohnomasi" },
    { value: '7', label: "O'zR Fuqarosining biometrik pasporti" },
    { value: '8', label: "Tug'ulganlik haqidagi guvohnoma" },
    { value: '9', label: "O'zR fuqarosining yangi namunadagi haydovchilik guvohnomasi" },
    { value: '10', label: "Boshqa" }
  ])
  const [section, setSection] = useState(sectionOptions[0])
  const [sectionRole, setSectionRole] = useState(sectionOptions[0].label)
  // Countries select
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState({})
  const GetCountries = async() =>{
    await https
    .get('/countries')
    .then(res =>{
      let array =[]
      res?.data?.map( item =>{
        array.push({
          value:item?.num_code,
          label:item?.nationality
        })
      })
      setCountries(array)
      setSelectedCountry(array[238])
    })
  }
  // Shahar Select
  const [ regions, setRegions] = useState([])
  const [ selectedRegion, setSelectedRegion] = useState({})
  const GetRegions = async() =>{
    await https
    .get('/regions')
    .then(res =>{
      let array  = []
      res?.data?.map((item,index) =>{
        array.push({
          value:index,
          label:item?.name_uz
        })
      })
      setRegions(array)
      setSelectedRegion(array[0])
    })
  }
  // Tumon Select
  const [ districts, setDistricts] = useState([])
  const [ selectedDistrict, setSelectedDistrict] = useState({})
  const GetDistracts = async() =>{
    await https
    .get('/districts')
    .then(res =>{
      let array  = []
      res?.data?.map((item,index) =>{
        array.push({
          value:index,
          label:item?.name_uz
        })
      })
      setDistricts(array)
      setSelectedDistrict(array[0])
    })
  }


    useEffect(() => {
      GetCountries()
      GetRegions()
      GetDistracts()

      setGroups([
        {
          id:1,
          code: '',
          name: '',
          birth_date: '',
          address: '',
          temp_address:'',
          city: regions[0]?.label,
          citizenship: countries[238]?.label,
          nationality: '',
          pinfl: '',
          phone: [''],
          doc_type: sectionOptions[0]?.label,
          serial_num: '',
          issued_by: '',
          issued_date: '',
          job:'',
          gender:'male',
          doc_end:'',
          district:districts[0]?.label
        },
        {
          id:2,
          code: '',
          name: '',
          birth_date: '',
          address: '',
          temp_address:'',
          city: regions[0]?.label,
          citizenship: countries[238]?.label,
          nationality: '',
          pinfl: '',
          phone: [''],
          doc_type: sectionOptions[0]?.label,
          serial_num: '',
          issued_by: '',
          issued_date: '',
          job:'',
          gender:'male',
          doc_end:'',
          district:districts[0]?.label
        },
        {
          id:3,
          code: '',
          name: '',
          birth_date: '',
          address: '',
          temp_address:'',
          city: regions[0]?.label,
          citizenship: countries[238]?.label,
          nationality: '',
          pinfl: '',
          phone: [''],
          doc_type: sectionOptions[0]?.label,
          serial_num: '',
          issued_by:'',
          issued_date: '',
          job:'',
          gender:'male',
          doc_end:'',
          district:districts[0]?.label
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
        city: regions[0]?.label,
        citizenship: countries[238]?.label,
        nationality: '',
        pinfl: '',
        phone: [''],
        doc_type: sectionOptions[0]?.label,
        serial_num: '',
        issued_by:'',
        issued_date: '',
        job:'',
        gender:'male',
        doc_end:'',
        district:districts[0]?.label
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

  // Selector Style
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
      let groupMembers = JSON.parse(JSON.stringify(groups))
      let newvalue =[]
      groupMembers?.map(item =>{
        newvalue.push(Object.values(Object.values(item)))
        item.code = `99${item.code}`
        item.phone.map((number,index) =>{
          item.phone[index] = `+998${number}`
        })
        delete item.id
      })
      newvalue.push(nameGroup)
      let mainObj = (newvalue.join()).split(',');

      if(!mainObj.some(even)){

        let data = {
          group_name: nameGroup,
          code:Math.floor(Math.random() * (10000 - 1 + 1)) + 10000,
          client: groupMembers
        }
        data?.client?.map((item, index) =>{
          if(!(item?.city)){
            item.city = regions[0]?.label
          }
          if(!(item?.district)){
            item.district = districts[0]?.label
          }
          if(!(item?.citizenship)){
            item.citizenship = countries[238]?.label
          }
        })

        for(let i= 0; i < data?.client?.length; i++){
          var now = new Date()
          if(new Date(data?.client?.[i]?.birth_date) > new Date(now.getFullYear(), now.getMonth(), now.getDate())){
            console.log(i, "birth")
            return(BirthdayError(i + 1))
          }
          if(new Date(data?.client?.[i]?.doc_end) < new Date(now.getFullYear(), now.getMonth(), now.getDate())){
            console.log(i, "doc")
            return(DocumentError(i + 1))
          }
          if(new Date(data?.client?.[i]?.issued_date) < new Date(data?.client?.[i]?.birth_date)){
            console.log(i, "both")
            return(DocumentBirthdayError(i + 1))
          }
        }

        https
          .post('/clients', data)
          .then(res=>{
            console.log(data)
            Success()
          })
          .catch(err =>{
            console.log(err)
            console.log(data)
            Error()
          })
        }else{
          Empty()
        }
  }

  

  return(
  <>
    <div className='back-but'>
      <Link to='/group' className='clientform_back'>
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
              <Input
                width='100%'
                clearable
                label="Klient kodi"
                placeholder='1234'
                className='vall'
                bordered
                labelLeft='99'
                color="secondary"
                value={groups.find(x => x.id === item.id).code}
                onChange={e => {
                  if(e.target.value.trim().length < 7){
                    let newGroupInfo = [...groups]
                    newGroupInfo[index].code = e.target.value
                    setGroups(newGroupInfo)
                  }
                }}
                required= 'required'
              />
              <Input
                required
                width='100%'
                clearable
                label="F.I.SH."
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
                label="Doimi Manzil"
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
              {
                regions[0]?.label ? (
                  <div className='clientForm_selector'>
                    <p>Shahar</p>
                    <Select
                      defaultValue={regions.find(x => x.label === item.city) ? regions.find(x => x.label === item.city) : regions[0]}
                      value={regions.find(x => x.label === item.city) ? regions.find(x => x.label === item.city) : regions[0]}
                      options={regions}
                      className={"buyurtma_select_new region_select"}
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
                      onChange={(e) => {
                        let newGroupInfo = [...groups]
                        newGroupInfo[index].city = e.label
                        setGroups(newGroupInfo)
                      }}
                    />
                  </div>
                ) : <></>
              }
              {
                districts[0]?.label ? (
                  <div className='clientForm_selector'>
                    <p>Tuman</p>
                    <Select
                      defaultValue={districts?.find(x => x.label === item.district) ? districts?.find(x => x.label === item.district) : districts[0]}
                      value={districts?.find(x => x.label === item.district) ? districts?.find(x => x.label === item.district) : districts[0]}
                      options={districts}
                      className={"buyurtma_select_new ditrict_select"}
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
                      onChange={(e) => {
                        let newGroupInfo = [...groups]
                        newGroupInfo[index].district = e.label
                        setGroups(newGroupInfo)
                      }}
                    />
                  </div>
                ) : <></>
              }
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

              <Radio.Group orientation="horizontal" label="Jinsi:" defaultValue="male" className='radio_group' 
                  onChange={(e)=>{
                    let newGroupInfo = [...groups]
                    newGroupInfo[index].gender = e
                    setGroups(newGroupInfo)
                  }}
                >
                <Radio value="male" color="secondary" size="sm">
                  Erkak
                </Radio>
                <Radio value="female" color="secondary" size="sm" className='radio_second'>
                  Ayol
                </Radio>
              </Radio.Group>

              {
                countries[0]?.label ? (
                  <div className='clientForm_selector'>
                    <p>Fuqarolik</p>
                    <Select
                      defaultValue={countries?.find(x => x.label === item.citizenship) ? countries?.find(x => x.label === item.citizenship) : countries[238]}
                      value={countries?.find(x => x.label === item.citizenship) ? countries?.find(x => x.label === item.citizenship) : countries[238]}
                      options={countries}
                      className={"buyurtma_select_new country_select"}
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
                      onChange={(e) => {
                        let newGroupInfo = [...groups]
                        newGroupInfo[index].citizenship = e.label
                        setGroups(newGroupInfo)
                      }}
                    />
                  </div>
                ) : <></>
              }
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
                label="PINFL"
                bordered
                className='vall'
                type='number'
                color="secondary"
                value={groups.find(x => x.id === item.id).pinfl}
                onChange={e => {
                  if(e.target.value.trim().length < 15){
                    let newGroupInfo = [...groups]
                    newGroupInfo[index].pinfl = e.target.value
                    setGroups(newGroupInfo)
                  }
                }}
              />
              {
                item?.phone?.map((itemPhone, indexPhone)=>{
                  return(
                    <div className='kl1_product' key={indexPhone}>
                      <Input
                        width='93%'
                        clearable
                        label={`Telefon raqami (${indexPhone + 1})`}
                        bordered
                        className='vall'
                        pattern='[0-9]'
                        labelLeft='+998'
                        type="number"
                        color="secondary"
                        required
                        value={(groups.find(x => x.id === item.id).phone)[indexPhone]}
                        onChange={(e)=>{
                          let newGroupInfo = [...groups]
                          newGroupInfo[index].phone[indexPhone] = e.target.value
                          setGroups(newGroupInfo)
                        }}
                      />
                      <button
                          className='kl1_delete_button'
                          type='button'
                          onClick={() => {
                            let newGroupInfo = [...groups]
                            if(newGroupInfo[index].phone.length > 1){
                              newGroupInfo[index].phone = newGroupInfo[index]?.phone?.filter(x => x !== (newGroupInfo.find(x => x.id === item.id).phone)[indexPhone])
                            }
                            setGroups(newGroupInfo)
                        }}
                      >
                          <i className='bx bx-trash'></i>
                      </button>
                    </div>
                  )
                })
              }
              <div className='margin_bottom20'>
                <button
                    className='kl1_add_button'
                    type='button'
                    onClick={()=>{
                      let newNumber = ['']
                      let newGroupInfo = [...groups]
                      newGroupInfo[index].phone = newGroupInfo[index].phone.concat(newNumber)
                      setGroups(newGroupInfo)
                    }}
                >
                    Telefon raqam qo'shish
                </button>
              </div>
              <div className='clientForm_selector'>
                <p>Shaxsini tasdiqlovchi hujjat</p>
                <Select
                    defaultValue={sectionOptions.find(x => x.label === item.doc_type)}
                    value={sectionOptions.find(x => x.label === item.doc_type)}
                    options={sectionOptions}
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
                label="Hujjat seriya raqami"
                bordered
                className='vall'
                placeholder='AD123456789'
                color="secondary"
                value={groups.find(x => x.id === item.id).serial_num}
                onChange={e => {
                  let newGroupInfo = [...groups]
                  newGroupInfo[index].serial_num = e.target.value.toUpperCase()
                  setGroups(newGroupInfo)
                }}
              />
              <Input
                required
                width='100%'
                clearable
                label="Kim tomondan berildi"
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
                label="Hujjat berilgan sana"
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
                label="Hujjat tugash sana"
                bordered
                className='vall'
                type='date'
                color="secondary"
                value={groups.find(x => x.id === item.id).doc_end}
                onChange={e => {
                  let newGroupInfo = [...groups]
                  newGroupInfo[index].doc_end = e.target.value
                  setGroups(newGroupInfo)
                }}
              />
              <Input
                required
                width='100%'
                label="Ish lavozmi"
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