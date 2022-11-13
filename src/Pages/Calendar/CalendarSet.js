import React, { useEffect, useState, useRef } from 'react'
import { useForm, Controller } from "react-hook-form";
import { AiOutlineClear, AiOutlineUserAdd, AiOutlineRollback } from 'react-icons/ai'
import { Calendar, DateObject } from "react-multi-date-picker"
import https from '../../assets/https';
import Swal from 'sweetalert2';
// Styles
import './Calendar.css'

function CalendarSet() {

    const format = "MM/DD/YYYY";
    // Uzbek Weekdays and Months
    const weekDays = ["DU", "SE", "CH", "PA", "JU", "SH", "YA"]
    const months = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentyabr", "Octyabr", "Noyabr", "Dekabr"]
    const data = ['06/22/2022', '06/23/2022', '06/24/2022', '06/25/2022']

    const [values, setValues] = useState([])

    // Alerts
    function Success() {
        Swal.fire({
            title: "Ma'lumotlar qoshildi",
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }
    function Warn() {
        Swal.fire({
            title: "Xato",
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }

    useEffect(()=>{
        https
        .get('/holidays')
        .then(res =>{
            setValues(res?.data[0]?.date)
        })
        .catch(err =>{
            console.log(err)
        })
    },[])
  
    function SubmitData(){
        let date = []
        values?.map(item =>{
            date.push(item.toLocaleString().replace(".","-").replace(".","-"))
        })
        let info = {
            id:1,
            date:date
        }
        https
        .post('/holidays', info)
        .then(res =>{
            Success()
        })
        .catch(err =>{
            console.log(err)
            Warn()
        })
    }

    
    // setInterval(function () { dates.map(date => console.log(date._format)) }, 4000);
    return (
        <section className='calendar' >
            <Calendar
                fullYear
                weekDays={weekDays}
                months={months}
                value={values}
                onChange={setValues}
                format="YYYY.MM.DD"
            />
            <div className='submit-buttons endRow'>
                <button type='button' onClick={()=>{SubmitData()}} className='client_submit submit'>
                    Ma'lumontlarni qo'shish
                </button>
          </div>
        </section>
    )
}

export default CalendarSet