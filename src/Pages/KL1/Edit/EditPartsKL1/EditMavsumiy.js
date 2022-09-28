import React, { useState } from 'react'
// Components
import { Input } from '@nextui-org/react'
import { v4 as uuidv4 } from 'uuid';

function EditMavsumiy() {
    
    const [mavsumiyDaromads, setMavsumiyDaromads] = useState([{
        id:1,
        name:'',
        value:0
    }])

    // Mavsumiy Daromads adding and deleting funtions
    function addMavsumiyDaromad(){
        let newMavsumiyDaromad = [{
            id:uuidv4(),
            name:'',
            value:0
        }]
        setMavsumiyDaromads(mavsumiyDaromads.concat(newMavsumiyDaromad))
    }
    function deleteMavsumiyDaromad(id){
        if(mavsumiyDaromads.length > 1){
            let newMavsumiyDaromads = mavsumiyDaromads.filter((item,index)=>index !== id)
            setMavsumiyDaromads(newMavsumiyDaromads)
        }
    }

    const GetDaromadSum = () =>{
        const SumArr1 = []
        mavsumiyDaromads.map((item,index)=>{
            SumArr1.push(Number(item.value))
        })
        let totalSum1 = SumArr1.reduce((prev, current)=> prev + current, 0)
        return totalSum1.toLocaleString()
    }

    // MonthDaromad
    const [monthDaromad,setMonthDaromad] = useState({
        january:0,
        february:0,
        march:0,
        april:0,
        may:0,
        june:0,
        july:0,
        august:0,
        september:0,
        october:0,
        november:0,
        december:0
    })

    function MonthsSum1(){
        let MonthArrSum1 = Object.values(monthDaromad);
        let totalMonth1 = MonthArrSum1.reduce((prev,current)=> Number(prev) + Number(current), 0)

        return totalMonth1.toLocaleString()
    }
    
    const [mavsumiyXarajats, setMavsumiyXarajats] = useState([{
        id:1,
        name:'',
        value:0
    }])

    // Mavsumiy Xarajats adding and deleting funtions
    function addMavsumiyXarajat(){
        let newMavsumiyXarajat = [{
            id: uuidv4(),
            name:'',
            value:0
        }]
        setMavsumiyXarajats(mavsumiyXarajats.concat(newMavsumiyXarajat))
    }
    function deleteMavsumiyXarajat(id){
        if(mavsumiyXarajats.length > 1){
            let newMavsumiyXarajats = mavsumiyXarajats.filter((item,index)=>index !== id)
            setMavsumiyXarajats(newMavsumiyXarajats)
        }
    }

    const GetXarajatSum = () =>{
        const SumArr2 = []
        mavsumiyXarajats.map((item,index)=>{
            SumArr2.push(Number(item.value))
        })
        let totalSum2 = SumArr2.reduce((prev, current)=> prev + current, 0)
        return totalSum2.toLocaleString()
    }

    // MonthXarajat
    const [monthXarajat,setMonthXarajat] = useState({
        january:0,
        february:0,
        march:0,
        april:0,
        may:0,
        june:0,
        july:0,
        august:0,
        september:0,
        october:0,
        november:0,
        december:0
    })

    function MonthsSum2(){
        let MonthArrSum2 = Object.values(monthXarajat);
        let totalMonth2 = MonthArrSum2.reduce((prev,current)=> Number(prev) + Number(current), 0)

        return totalMonth2.toLocaleString()
    }

                    
    return (
        <section>
            {/* <KL1Context.Provider value={{numb,numb2}}>
                
            </KL1Context.Provider> */}

                <p className='kl1_formtitle'>Mavsumiy daromad turi, manbasi va faoliyat joyi</p>
            {
            mavsumiyDaromads?.map((item,index)=>{
                return(
                <div className='kl1_products' key={item.id}>
                    <div className='kl1_product_title'>
                    Mavsumiy daromad {index +1}
                        <button className='kl1_delete_button' onClick={()=>{deleteMavsumiyDaromad(index)}}><i className='bx bx-trash'></i></button>
                    </div>
                    <div className='kl1_product'>
                        <Input
                            rounded
                            bordered
                            label='Daromad nomi'
                            color="secondary"
                            width='47%'
                            className='kl1_input'
                            value={mavsumiyDaromads.find(x => x.id === item.id).name}
                            onChange={(e)=>{
                                const newArrayMavsumiyDaromads = [...mavsumiyDaromads]
                                newArrayMavsumiyDaromads[index].name = e.target.value
                                setMavsumiyDaromads(newArrayMavsumiyDaromads)
                            }}
                        />
                        <Input
                            rounded
                            bordered
                            label='Yillik daromad hajmi'
                            color="secondary"
                            width='47%'
                            type='number'
                            className='kl1_input'
                            value={mavsumiyDaromads.find(x => x.id === item.id).value}
                            onChange={(e)=>{
                                const newArrayMavsumiyDaromads = [...mavsumiyDaromads]
                                newArrayMavsumiyDaromads[index].value = e.target.value
                                setMavsumiyDaromads(newArrayMavsumiyDaromads)
                            }}
                        />
                    </div>
                </div>
                )
            })
        }
        <div className='kl1_product_footer'>
            <button className='kl1_add_button' onClick={()=>{addMavsumiyDaromad()}}>
            Mavsumiy daromad qoshish
            </button>
            <p className='kl1_jami'>JAMI: {GetDaromadSum()} so`m</p>
        </div>
            <p className='kl1_formtitle'>Mavsumiy daromadlarning oylar bo'yicha taqsimlanishi</p>
            <div className='kl1_calendar'>
                <Input
                    rounded
                    bordered
                    label='Yanvar'
                    placeholder='1 000 000'
                    color="secondary"
                    width='23%'
                    className='kl1_input'
                    type='number'
                    onChange={(e)=>{
                        const newMonths1 = {...monthDaromad}
                        newMonths1.january = e.target.value
                        setMonthDaromad(newMonths1)
                    }}
                />
                <Input
                    rounded
                    bordered
                    label='Fevral'
                    placeholder='1 000 000'
                    color="secondary"
                    width='23%'
                    className='kl1_input'
                    type='number'
                    onChange={(e)=>{
                        const newMonths1 = {...monthDaromad}
                        newMonths1.february = e.target.value
                        setMonthDaromad(newMonths1)
                    }}
                />
                <Input
                    rounded
                    bordered
                    label='Mart'
                    placeholder='1 000 000'
                    color="secondary"
                    width='23%'
                    className='kl1_input'
                    type='number'
                    onChange={(e)=>{
                        const newMonths1 = {...monthDaromad}
                        newMonths1.march = e.target.value
                        setMonthDaromad(newMonths1)
                    }}
                />
                <Input
                    rounded
                    bordered
                    label='Aprel'
                    placeholder='1 000 000'
                    color="secondary"
                    width='23%'
                    className='kl1_input'
                    type='number'
                    onChange={(e)=>{
                        const newMonths1 = {...monthDaromad}
                        newMonths1.april = e.target.value
                        setMonthDaromad(newMonths1)
                    }}
                />
                <Input
                    rounded
                    bordered
                    label='May'
                    placeholder='1 000 000'
                    color="secondary"
                    width='23%'
                    className='kl1_input'
                    type='number'
                    onChange={(e)=>{
                        const newMonths1 = {...monthDaromad}
                        newMonths1.may = e.target.value
                        setMonthDaromad(newMonths1)
                    }}
                />
                <Input
                    rounded
                    bordered
                    label='Iyun'
                    placeholder='1 000 000'
                    color="secondary"
                    width='23%'
                    className='kl1_input'
                    type='number'
                    onChange={(e)=>{
                        const newMonths1 = {...monthDaromad}
                        newMonths1.june = e.target.value
                        setMonthDaromad(newMonths1)
                    }}
                />
                <Input
                    rounded
                    bordered
                    label='Iyul'
                    placeholder='1 000 000'
                    color="secondary"
                    width='23%'
                    className='kl1_input'
                    type='number'
                    onChange={(e)=>{
                        const newMonths1 = {...monthDaromad}
                        newMonths1.july = e.target.value
                        setMonthDaromad(newMonths1)
                    }}
                />
                <Input
                    rounded
                    bordered
                    label='Avgust'
                    placeholder='1 000 000'
                    color="secondary"
                    width='23%'
                    className='kl1_input'
                    type='number'
                    onChange={(e)=>{
                        const newMonths1 = {...monthDaromad}
                        newMonths1.august = e.target.value
                        setMonthDaromad(newMonths1)
                    }}
                />
                <Input
                    rounded
                    bordered
                    label='Sentabr'
                    placeholder='1 000 000'
                    color="secondary"
                    width='23%'
                    className='kl1_input'
                    type='number'
                    onChange={(e)=>{
                        const newMonths1 = {...monthDaromad}
                        newMonths1.september = e.target.value
                        setMonthDaromad(newMonths1)
                    }}
                />
                <Input
                    rounded
                    bordered
                    label='Oktabr'
                    placeholder='1 000 000'
                    color="secondary"
                    width='23%'
                    className='kl1_input'
                    type='number'
                    onChange={(e)=>{
                        const newMonths1 = {...monthDaromad}
                        newMonths1.october = e.target.value
                        setMonthDaromad(newMonths1)
                    }}
                />
                <Input
                    rounded
                    bordered
                    label='Noyabr'
                    placeholder='1 000 000'
                    color="secondary"
                    width='23%'
                    className='kl1_input'
                    type='number'
                    onChange={(e)=>{
                        const newMonths1 = {...monthDaromad}
                        newMonths1.november = e.target.value
                        setMonthDaromad(newMonths1)
                    }}
                />
                <Input
                    rounded
                    bordered
                    label='Dekabr'
                    placeholder='1 000 000'
                    color="secondary"
                    width='23%'
                    className='kl1_input'
                    type='number'
                    onChange={(e)=>{
                        const newMonths1 = {...monthDaromad}
                        newMonths1.december = e.target.value
                        setMonthDaromad(newMonths1)
                    }}
                />
            </div>
            <div className='endRow'>
                <p className={(MonthsSum1() != GetDaromadSum())? 'text_black_18 red_text text_degree' : 'text_black_18 text_degree'}>Jami: {MonthsSum1()} so'm</p>
            </div>

                <p className='kl1_formtitle'>Mavsumiy xarajatlar</p>
        {
            mavsumiyXarajats?.map((item,index)=>{
                return(
                <div className='kl1_products' key={index}>
                    <div className='kl1_product_title'>
                    Mavsumiy xarajat {index +1}
                        <button className='kl1_delete_button' onClick={()=>{deleteMavsumiyXarajat(index)}}><i className='bx bx-trash'></i></button>
                    </div>
                    <div className='kl1_product'>
                        <Input
                            rounded
                            bordered
                            label='Xarajat nomi'
                            color="secondary"
                            width='47%'
                            className='kl1_input'
                            value={mavsumiyXarajats.find(x => x.id === item.id).name}
                            onChange={(e)=>{
                                const newArrayMavsumiyXarajats = [...mavsumiyXarajats]
                                newArrayMavsumiyXarajats[index].name = e.target.value
                                setMavsumiyXarajats(newArrayMavsumiyXarajats)
                            }}
                        />
                        <Input
                            rounded
                            bordered
                            label='Yillik xarajat hajmi'
                            color="secondary"
                            width='47%'
                            type='number'
                            className='kl1_input'
                            value={mavsumiyXarajats.find(x => x.id === item.id).value}
                            onChange={(e)=>{
                                const newArrayMavsumiyXarajats = [...mavsumiyXarajats]
                                newArrayMavsumiyXarajats[index].value = e.target.value
                                setMavsumiyXarajats(newArrayMavsumiyXarajats)
                            }}
                        />
                    </div>
                </div>
                )
            })
        }
        <div className='kl1_product_footer'>
            <button className='kl1_add_button' onClick={()=>{addMavsumiyXarajat()}}>
            Mavsumiy xarajat qoshish
            </button>
            <p className='kl1_jami'>JAMI: {GetXarajatSum()} so`m</p>
        </div>
        
        <p className='kl1_formtitle'>Mavsumiy xarajatlarning oylar bo'yicha taqsimlanishi</p>
        <div className='kl1_calendar'>
            <Input
                rounded
                bordered
                label='Yanvar'
                placeholder='1 000 000'
                color="secondary"
                width='23%'
                className='kl1_input'
                type='number'
                onChange={(e)=>{
                    const newMonths2 = {...monthXarajat}
                    newMonths2.january = e.target.value
                    setMonthXarajat(newMonths2)
                }}
            />
            <Input
                rounded
                bordered
                label='Febral'
                placeholder='1 000 000'
                color="secondary"
                width='23%'
                className='kl1_input'
                type='number'
                onChange={(e)=>{
                    const newMonths2 = {...monthXarajat}
                    newMonths2.february = e.target.value
                    setMonthXarajat(newMonths2)
                }}
            />
            <Input
                rounded
                bordered
                label='Mart'
                placeholder='1 000 000'
                color="secondary"
                width='23%'
                className='kl1_input'
                type='number'
                onChange={(e)=>{
                    const newMonths2 = {...monthXarajat}
                    newMonths2.march = e.target.value
                    setMonthXarajat(newMonths2)
                }}
            />
            <Input
                rounded
                bordered
                label='Aprel'
                placeholder='1 000 000'
                color="secondary"
                width='23%'
                className='kl1_input'
                type='number'
                onChange={(e)=>{
                    const newMonths2 = {...monthXarajat}
                    newMonths2.april = e.target.value
                    setMonthXarajat(newMonths2)
                }}
            />
            <Input
                rounded
                bordered
                label='May'
                placeholder='1 000 000'
                color="secondary"
                width='23%'
                className='kl1_input'
                type='number'
                onChange={(e)=>{
                    const newMonths2 = {...monthXarajat}
                    newMonths2.may = e.target.value
                    setMonthXarajat(newMonths2)
                }}
            />
            <Input
                rounded
                bordered
                label='Iyun'
                placeholder='1 000 000'
                color="secondary"
                width='23%'
                className='kl1_input'
                type='number'
                onChange={(e)=>{
                    const newMonths2 = {...monthXarajat}
                    newMonths2.june = e.target.value
                    setMonthXarajat(newMonths2)
                }}
            />
            <Input
                rounded
                bordered
                label='Iyul'
                placeholder='1 000 000'
                color="secondary"
                width='23%'
                className='kl1_input'
                type='number'
                onChange={(e)=>{
                    const newMonths2 = {...monthXarajat}
                    newMonths2.july = e.target.value
                    setMonthXarajat(newMonths2)
                }}
            />
            <Input
                rounded
                bordered
                label='Avgust'
                placeholder='1 000 000'
                color="secondary"
                width='23%'
                className='kl1_input'
                type='number'
                onChange={(e)=>{
                    const newMonths2 = {...monthXarajat}
                    newMonths2.august = e.target.value
                    setMonthXarajat(newMonths2)
                }}
            />
            <Input
                rounded
                bordered
                label='Sentabr'
                placeholder='1 000 000'
                color="secondary"
                width='23%'
                className='kl1_input'
                type='number'
                onChange={(e)=>{
                    const newMonths2 = {...monthXarajat}
                    newMonths2.september = e.target.value
                    setMonthXarajat(newMonths2)
                }}
            />
            <Input
                rounded
                bordered
                label='Oktabr'
                placeholder='1 000 000'
                color="secondary"
                width='23%'
                className='kl1_input'
                type='number'
                onChange={(e)=>{
                    const newMonths2 = {...monthXarajat}
                    newMonths2.october = e.target.value
                    setMonthXarajat(newMonths2)
                }}
            />
            <Input
                rounded
                bordered
                label='Noyabr'
                placeholder='1 000 000'
                color="secondary"
                width='23%'
                className='kl1_input'
                type='number'
                onChange={(e)=>{
                    const newMonths2 = {...monthXarajat}
                    newMonths2.november = e.target.value
                    setMonthXarajat(newMonths2)
                }}
            />
            <Input
                rounded
                bordered
                label='Dekabr'
                placeholder='1 000 000'
                color="secondary"
                width='23%'
                className='kl1_input'
                type='number'
                onChange={(e)=>{
                    const newMonths2 = {...monthXarajat}
                    newMonths2.december = e.target.value
                    setMonthXarajat(newMonths2)
                }}
            /> 
            </div>
            <div className='endRow'>
                <p className={(MonthsSum2() != GetXarajatSum())? 'text_black_18 red_text text_degree' : 'text_black_18 text_degree'}>Jami: {MonthsSum2()} so'm</p>
            </div>
        </section>
    )
}

export default EditMavsumiy