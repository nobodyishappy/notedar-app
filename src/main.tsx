import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import Calendar from './Calendar.tsx'
import Game from './TicTacToe.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Game />
  </StrictMode>,
)
