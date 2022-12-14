import React, { useState } from 'react'
// Components
import { Input, Textarea } from '@nextui-org/react'
import { v4 as uuidv4 } from 'uuid';


function EditBiznes() {
    // Daromad    
    const [biznesDaromads, setBiznesDaromads] = useState([{
        id:1,
        name:'',
        volume:0,
        price:0,
        percent:0,
        plus:0,
        commit:''
    }])

    // Biznes Daromads adding and deleting functions
    function addBiznesDaromad(){
        let newBiznesDaromad = [{
            id:uuidv4(),
            name:'',
            volume:0,
            price:0,
            percent:0,
            plus:0,
            commit:''
        }]
        setBiznesDaromads(biznesDaromads.concat(newBiznesDaromad))
    }
    function deleteBiznesDaromad(id){
        if(biznesDaromads.length > 1){
            let newBiznesDaromads = biznesDaromads.filter((item,index)=>index !== id)
            setBiznesDaromads(newBiznesDaromads)
        }
    }

    function GetSumDaromad(){
        let newBiznesDaromad = []
        biznesDaromads.map((item,index)=>{
            newBiznesDaromad.push(item.plus)
        })
        let totalDaromad = newBiznesDaromad.reduce((prev,current)=> Number(prev) + Number(current), 0)
        return totalDaromad.toLocaleString()
    }

    // Xarajat
    const [biznesXarajats, setBiznesXarajats] = useState([{
        id:1,
        name:'',
        volume:0,
        price:0,
        cost:0,
        minus:0,
        commit:''
    }])

    // Biznes Xarajats adding and deleting functions
    function addBiznesXarajat(){
        let newBiznesXarajat = [{
            id:uuidv4(),
            name:'',
            volume:0,
            price:0,
            cost:0,
            minus:0,
            commit:''
        }]
        setBiznesXarajats(biznesXarajats.concat(newBiznesXarajat))
    }
    function deleteBiznesXarajat(id){
        if(biznesXarajats.length > 1){
            let newBiznesXarajats = biznesXarajats.filter((item,index)=>index !== id)
            setBiznesXarajats(newBiznesXarajats)
        }
    }

    function GetSumXarajat(){
        let newBiznesXarajat = []
        biznesXarajats.map((item,index)=>{
            newBiznesXarajat.push(item.minus)
        })
        let totalXarajat = newBiznesXarajat.reduce((prev,current)=> Number(prev) + Number(current), 0)
        return totalXarajat.toLocaleString()
    }

    function Empty(a){
        if(a){
            return a
        }else{
            return 0
        }
    }
    return (
        <>
          <div>
              <p className='kl1_formtitle'>Biznes daromadlar turi</p>
              {
                biznesDaromads?.map((item,index)=>{
                    return(
                    <div className='kl1_products' key={item?.id}>
                        <div className='kl1_product_title'>
                        Biznes daromad {index +1}
                            <button className='kl1_delete_button' onClick={()=>{deleteBiznesDaromad(index)}}><i className='bx bx-trash'></i></button>
                        </div>
                        <div className='kl1_product'>
                            <Input
                              rounded
                              bordered
                              label='Daromad nomi'
                              color="secondary"
                              width='100%'
                              className='kl1_input'
                              value={biznesDaromads.find(x => x.id === item.id).name}
                              onChange={(e)=>{
                                  let newBiznesDaromadArr = [...biznesDaromads]
                                  newBiznesDaromadArr[index].name = e.target.value
                                  setBiznesDaromads(newBiznesDaromadArr)
                              }}
                            />
                            <Input
                              rounded
                              bordered
                              label='Oylik hajm'
                              color="secondary"
                              width='47%'
                              type='number'
                              className='kl1_input'
                              value={biznesDaromads.find(x => x.id === item.id).volume}
                              onChange={(e)=>{
                                  let newBiznesDaromadArr = [...biznesDaromads]
                                  newBiznesDaromadArr[index].volume = e.target.value
                                  newBiznesDaromadArr[index].plus = (e.target.value)*((newBiznesDaromadArr[index].percent)/100)*(newBiznesDaromadArr[index].price)
                                  setBiznesDaromads(newBiznesDaromadArr)
                              }}
                            />
                            <Input
                              rounded
                              bordered
                              label='1 birlikning o`rtacha sotish naxri'
                              color="secondary"
                              width='47%'
                              type='number'
                              className='kl1_input'
                              value={biznesDaromads.find(x => x.id === item.id).price}
                              onChange={(e)=>{
                                  let newBiznesDaromadArr = [...biznesDaromads]
                                  newBiznesDaromadArr[index].price = e.target.value
                                  newBiznesDaromadArr[index].plus = (e.target.value)*((newBiznesDaromadArr[index].percent)/100)*(newBiznesDaromadArr[index].volume)
                                  setBiznesDaromads(newBiznesDaromadArr)
                              }}
                            />
                            <Input
                              rounded
                              bordered
                              label='O`rtacha ustamasi % da'
                              color="secondary"
                              width='47%'
                              type='number'
                              className='kl1_input'
                              value={biznesDaromads.find(x => x.id === item.id).percent}
                              onChange={(e)=>{
                                  let newBiznesDaromadArr = [...biznesDaromads]
                                  newBiznesDaromadArr[index].percent = e.target.value
                                  newBiznesDaromadArr[index].plus = (newBiznesDaromadArr[index].volume)*((e.target.value)/100)*(newBiznesDaromadArr[index].price)
                                  setBiznesDaromads(newBiznesDaromadArr)
                              }}
                            />
                            <Input
                              rounded
                              bordered
                              label='Bir oylik daromad'
                              color="secondary"
                              width='47%'
                              type='number'
                              readOnly
                              className='kl1_input'
                              value={biznesDaromads.find(x => x.id === item.id).plus}
                              onChange={(e)=>{
                                  let newBiznesDaromadArr = [...biznesDaromads]
                                  newBiznesDaromadArr[index].plus = e.target.value
                                  setBiznesDaromads(newBiznesDaromadArr)
                              }}
                            />
                            <Textarea
                              width='100%'
                              bordered
                              rounded
                              color="secondary"
                              className='kl1_input'
                              label='Izoh'
                              value={biznesDaromads.find(x => x.id === item.id).commit}
                              onChange={(e)=>{
                                  let newBiznesDaromadArr = [...biznesDaromads]
                                  newBiznesDaromadArr[index].commit = e.target.value
                                  setBiznesDaromads(newBiznesDaromadArr)
                              }}
                            />
                        </div>
                    </div>
                    )
                })
              }
              <div className='kl1_product_footer'>
                  <button className='kl1_add_button' onClick={()=>{addBiznesDaromad()}}>
                      Biznes daromad qoshish
                  </button>
                  <p className='kl1_jami'>JAMI: {GetSumDaromad()} so`m</p>  
              </div>
              </div>
              
            <div>
                <p className='kl1_formtitle'>Biznes uchun xarajatlar</p>
                {
                  biznesXarajats?.map((item,index)=>{
                      return(
                      <div className='kl1_products' key={index}>
                          <div className='kl1_product_title'>
                          Biznes xarajat {index +1}
                              <button className='kl1_delete_button' onClick={()=>{deleteBiznesXarajat(index)}}><i className='bx bx-trash'></i></button>
                          </div>
                          <div className='kl1_product'>
                              <Input
                                rounded
                                bordered
                                label='Xarajat nomi'
                                color="secondary"
                                width='100%'
                                className='kl1_input'
                                value={biznesXarajats.find(x => x.id === item.id).name}
                                onChange={(e)=>{
                                let newBiznesXarajatArr = [...biznesXarajats]
                                newBiznesXarajatArr[index].name = e.target.value
                                setBiznesXarajats(newBiznesXarajatArr)
                              }}
                              />
                              <Input
                                rounded
                                bordered
                                label='Hajm'
                                color="secondary"
                                width='47%'
                                type='number'
                                className='kl1_input'
                                value={biznesXarajats.find(x => x.id === item.id).volume}
                                onChange={(e)=>{
                                let newBiznesXarajatArr = [...biznesXarajats]
                                newBiznesXarajatArr[index].volume = e.target.value
                                setBiznesXarajats(newBiznesXarajatArr)
                              }}
                              />
                              <Input
                                rounded
                                bordered
                                label='Naxri'
                                color="secondary"
                                width='47%'
                                type='number'
                                className='kl1_input'
                                value={biznesXarajats.find(x => x.id === item.id).price}
                                onChange={(e)=>{
                                let newBiznesXarajatArr = [...biznesXarajats]
                                newBiznesXarajatArr[index].price = e.target.value
                                setBiznesXarajats(newBiznesXarajatArr)
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
                                value={biznesXarajats.find(x => x.id === item.id).cost}
                                onChange={(e)=>{
                                let newBiznesXarajatArr = [...biznesXarajats]
                                newBiznesXarajatArr[index].cost = e.target.value
                                setBiznesXarajats(newBiznesXarajatArr)
                              }}
                              />
                              <Input
                                rounded
                                bordered
                                label='O`rtacha oylik xarajat'
                                color="secondary"
                                width='47%'
                                type='number'
                                className='kl1_input'
                                value={biznesXarajats.find(x => x.id === item.id).minus}
                                onChange={(e)=>{
                                let newBiznesXarajatArr = [...biznesXarajats]
                                newBiznesXarajatArr[index].minus = e.target.value
                                setBiznesXarajats(newBiznesXarajatArr)
                              }}
                              />
                              <Textarea
                                width='100%'
                                bordered
                                rounded
                                color="secondary"
                                className='kl1_input'
                                label='Izoh'
                                value={biznesXarajats.find(x => x.id === item.id).commit}
                                onChange={(e)=>{
                                let newBiznesXarajatArr = [...biznesXarajats]
                                newBiznesXarajatArr[index].commit = e.target.value
                                setBiznesXarajats(newBiznesXarajatArr)
                              }}
                              />
                          </div>
                      </div>
                      )
                  })
                }
                <div className='kl1_product_footer'>
                    <button className='kl1_add_button' onClick={()=>{addBiznesXarajat()}}>
                        Biznes xarajat qoshish
                    </button>
                    <p className='kl1_jami'>JAMI: {GetSumXarajat()} so`m</p>
                </div>
            </div>
        </>
    )
}

export default EditBiznes