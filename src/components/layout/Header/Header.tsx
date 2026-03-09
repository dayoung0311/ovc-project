import { Link } from "react-router-dom"
import styles from './Header.module.css'

function Header() {
    return (
        <div className={styles.header}>
            <Link to="/" className={styles.link}>OVC</Link>
            <Link to="/calendar" className={styles.link}>일정 페이지</Link>
        </div>
    )
}

export default Header