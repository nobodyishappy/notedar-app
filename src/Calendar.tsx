import { useState, useEffect } from 'react';
import './Calendar.css'
import axios from 'axios';

function DayCard({value, start, selectDate} : {value:number, start:number, selectDate:Function}) {
  if (start != -1) {
    return (
      <button className='day-card' style={{gridColumnStart:start}} onClick={() => selectDate(value)}>{value}</button>
    )
  } else {
    return (
      <button className='day-card' onClick={() => selectDate(value)}>{value}</button>
    )
  }
  
}

function CalendarGrid({numberOfDays, startOfWeek, selectDate} : {numberOfDays:number, startOfWeek:number, selectDate:Function}) {
  let calendar = [];

  for (let i = 0; i < numberOfDays; i++) {
    if (i === 0) {
      calendar.push(<DayCard value={i + 1} start={startOfWeek + 1} selectDate={selectDate} key={i}/>);
    } else {
      calendar.push(<DayCard value={i + 1} start={-1} selectDate={selectDate} key={i}/>);
    }
  }

  return (
    <div className='calendar-grid'>
      {calendar}
    </div>
  )
}

function formatDateToDDMMYYYY(date: Date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const year = date.getFullYear();

  return `${day}${month}${year}`;
}

export default function CalendarContainer({day, month, year} : {day:number, month:number, year:number}) {
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [monthNames, setMonthNames] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    setDaysOfWeek(response.data.daysOfWeek);
    setMonthNames(response.data.monthNames);
  };
  
  useEffect(() => {
    fetchAPI();
  }, []);

  const [dateDay, setDateDay] = useState(day);
  const [dateMonth, setDateMonth] = useState(month);
  const [dateYear, setDateYear] = useState(year);

  const [dayOfWeek, setDayOfWeek] = useState(new Date(dateYear, dateMonth, 1).getDay());
  const [daysOfMonth, setDaysOfMonth] = useState(new Date(dateYear, dateMonth + 1, 0).getDate())

  const changeMonth = (value:number) => {
    const date = new Date(dateYear, dateMonth, dateDay);
    date.setMonth(dateMonth + value)

    setDateDay(date.getDay());
    setDateMonth(date.getMonth());
    setDateYear(date.getFullYear());

    setDayOfWeek(new Date(date.getFullYear(), date.getMonth(), 1).getDay());
    setDaysOfMonth(new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate());
  }

  const selectDate = async (day:number) => {
    const date = formatDateToDDMMYYYY(new Date(dateYear, dateMonth, day));
    const response = await axios.post('http://localhost:8080/tasks/newtask', {
      date: date,
      time: "1200",
      title: "Test",
      content: "Test"
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => console.log(res.data));
  }

  const monthLabel = (
    <div className='month-label-container'>
      <button className='month-arrow-button' onClick={() => changeMonth(-1)}>{'<'}</button>
      <div className='month-label'> {monthNames[dateMonth]} </div>
      <button className='month-arrow-button' onClick={() => changeMonth(1)}>{'>'}</button>
    </div>
  );
  
  const weekLabel = daysOfWeek.map((days, id) => {
    return (
      <div className='day-label' key={id}>{days}</div>
    )
  });

  return (
    <div className='calendar-container'>
      {monthLabel}
      <div className='label-container'>
        {weekLabel}
      </div>
      <CalendarGrid numberOfDays={daysOfMonth} startOfWeek={dayOfWeek} selectDate={selectDate}/>
    </div>
  );
};

