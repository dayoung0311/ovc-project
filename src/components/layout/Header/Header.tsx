import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="mx-auto mt-4 flex h-16 max-w-[1400px] items-center justify-between rounded-full border border-white/60 bg-white/55 px-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-gray-900 transition hover:opacity-80"
        >
          OVC
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/calendar"
            className="text-[15px] font-medium text-gray-600 transition hover:text-gray-900"
          >
            일정
          </Link>
          <Link
            to="/cert-search"
            className="text-[15px] font-medium text-gray-600 transition hover:text-gray-900"
          >
            자격증 탐색
          </Link>
          <Link
            to="/cert-manage"
            className="text-[15px] font-medium text-gray-600 transition hover:text-gray-900"
          >
            자격증 관리
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-[15px] font-medium text-gray-600 transition hover:text-gray-900"
          >
            로그인
          </Link>

          <Link
            to="/mypage"
            className="text-[15px] font-medium text-gray-600 transition hover:text-gray-900"
          >
            마이페이지
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header