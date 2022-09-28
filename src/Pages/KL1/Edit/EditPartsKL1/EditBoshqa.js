import React, { useState, useContext } from 'react'
// Components
import { Input, Textarea,Checkbox } from '@nextui-org/react'
import { v4 as uuidv4 } from 'uuid';


function EditBoshqa(props) {

    // Jami boshqa DAROMADlar
    const [myDaromads, setMyDaromads] = useState(
    [
        {   
            id: 1,
            nomi:'',
            qiymati:'',
            birlikNarxi:0,
            hajmi:0,
            oylik:0,
            izoh:''
        }
    ])

    // My Daromads adding and deleting funtions
    function addMyDaromad(){
        let newMyDaromad = [{
            id: uuidv4(),
            nomi:'',
            qiymati:'',
            birlikNarxi:0,
            hajmi:0,
            oylik:0,
            izoh:''
        }]
        setMyDaromads(myDaromads.concat(newMyDaromad))
    }
    function deleteMyDaromad(id){
        if(myDaromads.length > 1){
            let newMyDaromads = myDaromads.filter((item,index)=>item.id !== id)
            setMyDaromads(newMyDaromads)
        }
    }
    // get total price of Daromad
    const getTotalSum = () => {
        const newSumArray = []
        myDaromads.map((item, index) => {
            newSumArray.push(item.oylik)
        })
        let totalPrices = newSumArray.reduce((prev, current) => prev + current, 0)
        return totalPrices.toLocaleString()
    }


    // Jami boshqa XARAJATlar
    const [myXarajats, setMyXarajats] = useState(
        [
            {
                id: 1,
                nomi:'',
                qiymati:0,
                birlikNarxi:0,
                hajmi:0,
                oylik:0,
                izoh:''
            }
        ]
    )

    // My Xarajats adding and deleting funtions
    function addMyXarajat(){
        let newMyXarajat = [
            {
                id: uuidv4(),
                nomi:'',
                qiymati:0,
                birlikNarxi:0,
                hajmi:0,
                oylik:0,
                izoh:''
            }
        ]
        setMyXarajats(myXarajats.concat(newMyXarajat))
    }
    function deleteMyXarajat(id){
        if(myXarajats.length > 1){
            let newMyXarajats = myXarajats.filter((item,index)=> item.id !== id)
            setMyXarajats(newMyXarajats)
        }
    }

    // get total Price of Xarajat
    const getTotalSum2 = () =>{
        const newSumArray2 = []
        myXarajats?.map((item,index)=>{
            newSumArray2.push(item.oylik)
        })
        let totalPrices2 = newSumArray2.reduce((prev,current) => prev + current, 0)
        return totalPrices2.toLocaleString()
    }


    function Empty(a){
        if(a){
            return a
        }else{
            return 0
        }
    }

    function NumberSpace(a){
        return a.toLocaleString()
    }

    function onPutDate(){
        let daromadId = [...myDaromads]
        let xarajatId = [...myXarajats]
        daromadId?.map(item =>{
            delete item?.id
        })
        xarajatId?.map(item =>{
            delete item?.id
        })

        let data ={
            daromads: daromadId,
            xarajats: xarajatId,
            daromad_sum: getTotalSum(),
            xarajat_sum: getTotalSum2()
        }
        console.log(data);
    }


  return (
    <>
      <h2 className='kl1_subtitle'>Buyurtmachining daromadlari</h2>
      <div className='kl1_radio'>
          <Checkbox size='sm' color='secondary' defaultValue={false} 
          onChange={(e)=>{
              if(e){
                props.setBiznesWindow('open')
              }else{
                props.setBiznesWindow('close')
              }
          }}
          >Biznes daromadlar</Checkbox>
          <Checkbox size='sm' className='kl1_radio_checkbox' color='secondary' defaultValue={false} 
          onChange={(e)=>{
              if(e){
                props.setMavsumiyWindow('open')
              }else{
                props.setMavsumiyWindow('close')
              }
          }}
          >Mavsumiy daromadlar</Checkbox>
          <Checkbox size='sm' className='kl1_radio_checkbox' color='secondary' defaultSelected={true}>Boshqa daromadlar</Checkbox>
      </div>

      <p className='kl1_formtitle'>Boshqa daromad turlari shuningdek passiv daromadlar</p>
      {
          myDaromads?.map((item,index)=>{
              return(
                  <div className='kl1_products' key={item.id}>
                      <div className='kl1_product_title'>
                          Daromad {index + 1}
                          <button className='kl1_delete_button' onClick={()=>{deleteMyDaromad(item.id)}}><i className='bx bx-trash'></i></button>
                      </div>
                      <div className='kl1_product'>
                          <Input
                              rounded
                              bordered
                              label='Daromad nomi'
                              color="secondary"
                              width='100%'
                              className='kl1_input'
                              value={myDaromads.find(x => x.id === item.id).nomi}
                              onChange={(e)=>{
                                  const newBoshqaDaromads = [...myDaromads]
                                  newBoshqaDaromads[index].nomi = e.target.value
                                  setMyDaromads(newBoshqaDaromads)
                              }}
                          /> 
                          <Input
                              rounded
                              bordered
                              label='Hajmi'
                              color="secondary"
                              type='number'
                              width='47%'
                              className='kl1_input'
                              value={myDaromads.find(x => x.id === item.id).hajmi}
                              onChange={(e)=>{
                                  const newBoshqaDaromads = [...myDaromads]
                                  newBoshqaDaromads[index].oylik = (e.target.value)*(Empty(newBoshqaDaromads[index].birlikNarxi))
                                  newBoshqaDaromads[index].hajmi = e.target.value
                                  setMyDaromads(newBoshqaDaromads)
                              }}
                          />
                          <Input
                              rounded
                              bordered
                              label='Birlik narxi'
                              type='number'
                              color="secondary"
                              width='47%'
                              className='kl1_input'
                              value={myDaromads.find(x => x.id === item.id).birlikNarxi}
                              onChange={(e)=>{
                                  const newBoshqaDaromads = [...myDaromads]
                                  newBoshqaDaromads[index].birlikNarxi = e.target.value
                                  newBoshqaDaromads[index].oylik = (e.target.value)*(Empty(newBoshqaDaromads[index].hajmi))
                                  setMyDaromads(newBoshqaDaromads)
                              }}
                          />
                          <Input
                              rounded
                              bordered
                              label='Qiymati'
                              color="secondary"
                              width='47%'
                              type='number'
                              className='kl1_input'
                              value={myDaromads.find(x => x.id === item.id).qiymati}
                              onChange={(e)=>{
                                  const newBoshqaDaromads = [...myDaromads]
                                  newBoshqaDaromads[index].qiymati = e.target.value
                                  setMyDaromads(newBoshqaDaromads)
                              }}
                          />
                          <Input
                              rounded
                              bordered
                              label='Oylik daromad'
                              color="secondary"
                              width='47%'
                              type='number'
                              readOnly
                              className='kl1_input'
                              value={Empty((myDaromads[index].birlikNarxi)*(myDaromads[index].hajmi))}
                              onChange={(e)=>{
                                  const newBoshqaDaromads = [...myDaromads]
                                  newBoshqaDaromads[index].oylik = e.target.value
                                  setMyDaromads(newBoshqaDaromads)
                              }}
                          />
                          <Textarea
                              width='100%'
                              bordered
                              rounded
                              color="secondary"
                              className='kl1_input'
                              label='Izoh'
                              value={myDaromads.find(x => x.id === item.id).izoh}
                              onChange={(e)=>{
                                  const newBoshqaDaromads = [...myDaromads]
                                  newBoshqaDaromads[index].izoh = e.target.value
                                  setMyDaromads(newBoshqaDaromads)
                              }}
                          />
                      </div>
                  </div>
              )
          })
      }
      <div className='kl1_product_footer'>
          <button className='kl1_add_button' onClick={()=>{addMyDaromad()}}>
              Daromad qoshish
          </button>
          <p className='kl1_jami'>JAMI: {getTotalSum()} so`m</p>
      </div>
          <p className='kl1_jami_main'>Jami o`rtacha oylik daromadlari: {getTotalSum()} so`m</p>
      
      <div className='kl1_daromad_part'>
          <p className='kl1_formtitle'>Boshqa xarajatlar turi</p>
          {
              myXarajats?.map((item,index)=>{
                  return(
                      <div className='kl1_products' key={item.id}>
                          <div className='kl1_product_title'>
                              Xarajat {index + 1}
                              <button className='kl1_delete_button' onClick={()=>{deleteMyXarajat(item.id)}}><i className='bx bx-trash'></i></button>
                          </div>
                          <div className='kl1_product'>
                              <Input
                                  rounded
                                  bordered
                                  label='Xarajat nomi'
                                  color="secondary"
                                  width='100%'
                                  className='kl1_input'
                                  value={myXarajats.find(x=> x.id === item.id).nomi}
                                  onChange={(e)=>{
                                    const newBoshqaXarajats = [...myXarajats]
                                    newBoshqaXarajats[index].nomi = e.target.value
                                    setMyXarajats(newBoshqaXarajats)
                                  }}
                              />
                              <Input
                                  rounded
                                  bordered
                                  label='Hajmi'
                                  type='number'
                                  color="secondary"
                                  width='47%'
                                  className='kl1_input'
                                  value={myXarajats.find(x => x.id === item.id).hajmi}
                                  onChange={(e)=>{
                                    const newBoshqaXarajats = [...myXarajats]
                                    newBoshqaXarajats[index].hajmi = e.target.value
                                    newBoshqaXarajats[index].oylik = (e.target.value)*(Empty(newBoshqaXarajats[index].birlikNarxi))
                                    setMyXarajats(newBoshqaXarajats)
                                  }}
                              />
                              <Input
                                  rounded
                                  bordered
                                  label='Narxi'
                                  type='number'
                                  color="secondary"
                                  width='47%'
                                  className='kl1_input'
                                  value={myXarajats.find(x => x.id === item.id).birlikNarxi}
                                  onChange={(e)=>{
                                    const newBoshqaXarajats = [...myXarajats]
                                    newBoshqaXarajats[index].birlikNarxi = e.target.value
                                    newBoshqaXarajats[index].oylik = (e.target.value)*(Empty(newBoshqaXarajats[index].hajmi))
                                    setMyXarajats(newBoshqaXarajats)
                                  }}
                              />
                              <Input
                                  rounded
                                  bordered
                                  label='Qiymati'
                                  color="secondary"
                                  width='47%'
                                  type='number'
                                  className='kl1_input'
                                  value={myXarajats.find(x => x.id === item.id).qiymati}
                                  onChange={(e)=>{
                                    const newBoshqaXarajats = [...myXarajats]
                                    newBoshqaXarajats[index].qiymati = e.target.value
                                    setMyXarajats(newBoshqaXarajats)
                                  }}
                              />
                              <Input
                                  rounded
                                  bordered
                                  label='Oylik xarajat'
                                  color="secondary"
                                  width='47%'
                                  type='number'
                                  className='kl1_input'
                                  value={Empty((myXarajats[index].birlikNarxi)*(myXarajats[index].hajmi))}
                                  onChange={(e)=>{
                                    const newBoshqaXarajats = [...myXarajats]
                                    newBoshqaXarajats[index].oylik = e.target.value
                                    setMyXarajats(newBoshqaXarajats)
                                  }}
                              />
                              <Textarea
                                  width='100%'
                                  bordered
                                  rounded
                                  color="secondary"
                                  className='kl1_input'
                                  label='Izoh'
                                  value={myXarajats.find(x => x.id === item.id).izoh}
                                  onChange={(e)=>{
                                    const newBoshqaXarajats = [...myXarajats]
                                    newBoshqaXarajats[index].izoh = e.target.value
                                    setMyXarajats(newBoshqaXarajats)
                                  }}
                              />
                          </div>
                      </div>
                  )
              })
          }
          <div className='kl1_product_footer'>
              <button className='kl1_add_button' onClick={()=>{addMyXarajat()}}>
                  Xarajat qoshish
              </button>
              <p className='kl1_jami'>JAMI: {getTotalSum2()} so`m</p>
          </div>
              <p className='kl1_jami_main'>Jami o`rtacha oylik xarajatlari: {getTotalSum2()} so`m</p>
              <button onClick={()=>{onPutDate()}}>Date</button>
      </div>
    </>
  )
}

export default EditBoshqa