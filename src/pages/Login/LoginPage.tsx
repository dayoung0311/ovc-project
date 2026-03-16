import { motion } from "framer-motion"

function LoginPage() {

  const handleNaverLogin = () => {
    try {
      window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/naver`
    } catch (error) {
      console.log("로그인 오류 발생", error);
      alert("로그인 실패!");
    }
  };

  return (

    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* 로그인 카드 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.08)] rounded-2xl px-18 py-14"
      >

        {/* 로고 */}
        <h1 className="text-4xl font-bold text-center mb-3 tracking-tight text-gray-900">
          OVC
        </h1>

        <p className="text-center text-gray-500 mb-10">
          자격증 관리와 일정 관리를 <br />
          하나로 관리하세요
        </p>

        {/* 로그인 버튼 */}
        <div className="flex flex-col gap-4">

          <button
            onClick={handleNaverLogin}
            className="flex items-center justify-center gap-3 bg-[#03C75A] text-white py-3 rounded-lg font-medium hover:scale-[1.02] hover:shadow-lg transition-all"
          >
            네이버로 로그인
          </button>

        </div>

        {/* 안내 문구 */}
        <p className="text-center text-sm text-gray-400 mt-8">
          로그인하면 OVC 서비스 이용에 동의하게 됩니다.
        </p>

      </motion.div>

    </div>

  );
}

export default LoginPage;