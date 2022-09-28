import React, { useEffect, useState } from 'react'
// Styles
import './Calendar.css'

import { Calendar, DateObject } from "react-multi-date-picker"
import { useForm, Controller } from "react-hook-form";
const format = "MM/DD/YYYY";
function CalendarSet() {
    // Uzbek Weekdays and Months
    const weekDays = ["DU", "SE", "CH", "PA", "JU", "SH", "YA"]
    const months = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentyabr", "Octyabr", "Noyabr", "Dekabr"]
    const data = ['06/22/2022', '06/23/2022', '06/24/2022', '06/25/2022']

    const [dates, setDates] = useState([new Date(), new Date()]);
    
    const [valueToBackend, setValueTobackend] = useState([])

    useEffect(() => {
        let currentValues = []
        dates.map((item) => {
            currentValues.push(item?.toLocaleString())
        })
        setValueTobackend(currentValues)
    }, [dates])

    
    // setInterval(function () { dates.map(date => console.log(date._format)) }, 4000);
    return (
        <section className='calendar' >
            <Calendar
                fullYear
                // multiple
                weekDays={weekDays}
                months={months}
                value={dates}
                onChange={setDates}
            // format="DD.MM.YYYY"
            />
        </section>
    )
}

export default CalendarSet