import { motion } from "framer-motion"
import { useRef } from "react"

function SectionSearch() {
  const sliderRef = useRef<HTMLDivElement | null>(null)

  const scrollLeft = () => {
    if (!sliderRef.current) return

    sliderRef.current.scrollBy({
      left: -320,
      behavior: "smooth"
    })
  }

  const scrollRight = () => {
    if (!sliderRef.current) return

    sliderRef.current.scrollBy({
      left: 320,
      behavior: "smooth"
    })
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-white via-white to-primarySoft/40">

      <div className="relative max-w-[1400px] mx-auto px-10 lg:px-20 w-full">
        {/* title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <p className="text-primary font-semibold mb-4 tracking-wide">
            자격증 탐색
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            자격증 탐색
          </h2>

          <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-gray-800 leading-snug">
            어떤 자격증이 있는지 쉽게 찾아보세요
          </h3>

          <p className="text-gray-500 text-base lg:text-lg leading-8">
            IT, 경영, 어학 등 다양한 자격증 정보를 카테고리와 검색으로 빠르게 찾을 수 있습니다.
          </p>

          <p className="text-gray-500 text-base lg:text-lg leading-8">
            자격증 정보, 시험 일정, 설명까지 한 번에 확인하세요.
          </p>
        </motion.div>

        {/* search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-20"
        >
          <div className="max-w-[720px] rounded-full border border-primary/10 bg-[#1D2822] px-8 py-5 flex items-center shadow-xl shadow-primary/10">
            <input
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-base lg:text-lg"
              placeholder="ex) SQLD, 정보처리기사"
            />

            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-gray-300 text-xl"
            >
              🔍
            </motion.div>
          </div>
        </motion.div>

        {/* slider */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.75, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          {/* left button */}
          <motion.button
            onClick={scrollLeft}
            whileHover={{ scale: 1.08, x: -2 }}
            whileTap={{ scale: 0.96 }}
            className="absolute -left-5 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border border-primary/10 shadow-lg w-11 h-11 rounded-full z-10 text-gray-700"
          >
            ‹
          </motion.button>

          {/* cards */}
          <div
            ref={sliderRef}
            className="flex gap-8 overflow-x-auto scroll-smooth pb-4 no-scrollbar"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.25 }}
                className="group min-w-[260px] rounded-2xl border border-primary/10 bg-white/90 backdrop-blur-sm p-8 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition"
              >
                <div className="h-32 rounded-xl bg-gradient-to-br from-primarySoft via-white to-primarySoft/70 mb-6 border border-primary/10" />

                <h3 className="font-semibold mb-2 text-gray-900 group-hover:text-primary transition">
                  SQL Developer
                </h3>

                <p className="text-sm text-gray-500 leading-6">
                  데이터베이스 자격증
                </p>
              </motion.div>
            ))}
          </div>

          {/* right button */}
          <motion.button
            onClick={scrollRight}
            whileHover={{ scale: 1.08, x: 2 }}
            whileTap={{ scale: 0.96 }}
            className="absolute -right-5 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border border-primary/10 shadow-lg w-11 h-11 rounded-full z-10 text-gray-700"
          >
            ›
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default SectionSearch