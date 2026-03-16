import { motion } from "framer-motion"

function SectionMyCert() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-primarySoft/40 via-white to-white">
      {/* background decoration */}
      <div className="relative max-w-[1400px] mx-auto px-10 lg:px-20 w-full grid lg:grid-cols-[1.1fr_1fr] gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-primary font-semibold mb-4 tracking-wide">
            MY CERTIFICATIONS
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-gray-900 leading-tight">
            나의 자격증 관리
          </h2>

          <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-gray-800 leading-snug">
            취득한 자격증과 목표 자격증을 관리하세요
          </h3>

          <p className="text-gray-600 text-base lg:text-lg max-w-lg mb-10 leading-8">
            이미 취득한 자격증과 앞으로 취득하고 싶은 자격증을
            관리할 수 있습니다.
            <br />
            자격증 준비 현황을 확인하고
            목표를 체계적으로 관리하세요.
          </p>

          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary text-lg lg:text-xl text-white px-16 sm:px-24 lg:px-32 py-5 lg:py-6 rounded-full shadow-lg shadow-primary/20 transition"
          >
            내 자격증 보기
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-2 gap-6"
        >
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.25 }}
              className="group rounded-2xl border border-primary/10 bg-white/90 backdrop-blur-sm p-6 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition"
            >
              <div className="mb-4 h-14 w-14 rounded-2xl bg-gradient-to-br from-primarySoft via-white to-primarySoft/70 border border-primary/10" />

              <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition">
                자격증 카드
              </h4>

              <p className="text-sm text-gray-500 leading-6">
                취득/목표 자격증 상태와 주요 정보를
                한눈에 확인할 수 있습니다.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default SectionMyCert