import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CalendarContainer from './Calendar.tsx'
// import Game from './TicTacToe.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CalendarContainer day={23} month={8} year={2025}/>
  </StrictMode>,
)
