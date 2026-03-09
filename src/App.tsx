import { Route, Routes } from 'react-router-dom'
import styles from './App.module.css'
import HomePage from './pages/Home/HomePage'
import SchedulePage from './pages/Calendar/CalendarPage'
import Header from './components/layout/Header/Header'

function App() {

  return (
    <div>
      <div className={styles.header}>
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
