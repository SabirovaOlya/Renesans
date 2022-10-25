import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '@nextui-org/react'
import https from '../../assets/https'
// Alert
import Swal from 'sweetalert2'

function KL1Form() {

  const [ forms, setForms] = useState([])
  const [ paginations, setPaginations ] = useState([])

  // Modalka
  const [modalka, setModalka] = useState('shartnoma_modal close')
  const [modalCode, setModalCode] = useState('')
  let navigate = useNavigate()

  // Alert
  function DeleteAlert() {
    Swal.fire({
        title: "Shakl o'chirildi",
        icon: 'success',
        confirmButtonText: 'Ok'
    })
  }
  function Warn() {
      Swal.fire({
          title: "Parolni kiriting",
          icon: 'error',
          confirmButtonText: 'Ok'
      })
  }
  function Error404() {
      Swal.fire({
          title: "Bunday buyurtma yo'q",
          icon: 'error',
          confirmButtonText: 'Ok'
      })
  }


  async function GetDate(url){
    await https
    .get(`/${url}`)
    .then(res =>{
      setForms(res?.data?.data)
      setPaginations(res?.data?.meta?.links)
    })
    .catch(err =>{
      console.log(err)
    })
  }

  function Label(a){
    if(a == '&laquo; Previous'){
      return '<'
    }else if(a == 'Next &raquo;'){
      return '>'
    }else{
      return a
    }
  }

  useEffect(()=>{
    GetDate('client-marks')
  },[])

  function navigateAdd(id) {
      if(!id){
          return Warn()
      }
      
      let dataId ={
        code: Number(id)
      }
      
      https
      .post('/check/order/code', dataId)
      .then(res =>{
          navigate("/kl1/addkl1", {state:{id:res?.data?.data?.order?.id}})
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

  function Delete(index){
    https
    .delete(`/client-marks/${index}`)
    .then(res =>{
      setForms(forms.filter(x => x?.id !== index))
      if(res.request.status === 200){
        DeleteAlert()
      }
    })
    .catch(err =>{
      console.log(err)
    })
  }


  return (
    <>
      {/* Modalka */}
      <div className={modalka}>
        <Input
            rounded
            bordered
            width='300px'
            color='secondary'
            label='Buyurtma kodi'
            placeholder='12345'
            clearable
            onChange={(e) => setModalCode(e.target.value)}
        ></Input>
        <div>
            <button
                onClick={()=>{navigateAdd(modalCode)}}
                className='shartnoma_modal_button'>Qo'shish</button>
            <button onClick={() => setModalka('shartnoma_modal close')} className='shartnoma_modal_button'>Orqaga</button>
        </div>
      </div>


      <section className='foydalan_main'>
        <h1 className='filial_title'>KL1 Shakl</h1>
        <div className='filial_header'>
          <button onClick={() => setModalka('shartnoma_modal open')} className='shartnamaLink'>
              KL1 Shakl Qoshish
              <i className='bx bx-plus-circle'></i>
          </button>
          <Input
              rounded
              bordered
              placeholder="KL1 code..."
              color="secondary"
              width='300px'
              className='filial_search'
              label=' '
              contentRight={
                  <i className='bx bx-search-alt-2'></i>
              }
          />
        </div>
        {/* <Link to='/kl1/stepkl1' >Stepper</Link> */}
          <div className='shartnamaTablePart'>
              <div className='shartTable'>
                  <div className='tableHeader'>
                      <p className='headerTable-title_shartnoma'>Ism</p>
                      <p className='headerTable-title_shartnoma'>Shartnoma raqami</p>
                      <p className='headerTable-title_shartnoma'>Tuzilgan sana</p>
                  </div>
                  <ul className='tableInfo'>
                      {
                          forms?.map((item, index) => {
                              return <li className='client_row' key={item?.id}>
                                  <p className='liName li_shartnoma'>{item?.clients?.name ? item?.clients?.name : 'without name'}</p>
                                  <p className='li_shartnoma'>{item?.doc_date}</p>
                                  <p className='li_shartnoma'>{item?.mark_date}</p>
                                  <div className='userButtons_shartnoma'>
                                      <button><Link to={`/kl1/singlekl1/${item?.id}`}><i className='bx bx-user white'></i></Link></button>
                                      <button><Link to={`/kl1/editkl1/${item?.id}`}><i className='bx bx-edit-alt white'></i></Link></button>
                                      <button onClick={() => Delete(item?.id)}><i className='bx bx-trash'></i></button>
                                  </div>
                              </li>
                          })
                      }
                  </ul>
              </div>
          </div>
          <div className='pagination_block_wrapper'>
              <div className='pagination_block'>
                  {
                      paginations?.map((item, index)=>{
                        return(
                          <button key={item?.label} className={ item?.active ? 'pagiantion_active' : ''}  onClick={()=>{GetDate(((item?.url).split('/'))[4])}}>{Label(item?.label)}</button>
                        )
                      })
                  }
              </div>
          </div>
      </section>
    </>

  )
}

export default KL1Form