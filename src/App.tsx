import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home/HomePage'
import SchedulePage from './pages/Calendar/CalendarPage'
import Header from './components/layout/Header'

function App() {

  return (
    <div>
      <div className="header">
      <Header/>
      </div>

      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/calendar" element={<SchedulePage/>}/>
      </Routes>
    </div>
  )
}

export default App
