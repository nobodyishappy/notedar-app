import { useState } from 'react'
import './Calendar.css'

function Card() {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </div>
  )
  
}

function Calendar() {
  return (
    <>
      <h1>Vite + React</h1>
      <Card/>
    </>
  )
}

export default Calendar
