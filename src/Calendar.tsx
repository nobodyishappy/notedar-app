import { useState } from 'react';
import './Calendar.css'


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

export default function CalendarContainer({day, month, year} : {day:number, month:number, year:number}) {
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const monthNames = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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

  const selectDate = (day:number) => {
    console.log(new Date(dateYear, dateMonth, day));
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

