import { Link } from "react-router-dom"

function Header() {
    return (
        <>
            <Link to="/">홈</Link>
            <Link to="/calendar">일정 페이지</Link>
        </>
    )
}

export default Header