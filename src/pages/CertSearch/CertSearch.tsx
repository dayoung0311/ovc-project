import { useState } from "react";
import SearchGridCard from "../../components/common/cards/SearchGridCard";
import SearchListCard from "../../components/common/cards/SearchListCard";
import { Search } from "lucide-react";

type Item = {
  id: number;
  title: string;
  category: string;
  description: string;
};

const items: Item[] = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    category: "IT/기술",
    description: "AWS 기술을 활용한 클라우드 설계 자격증",
  },
  {
    id: 2,
    title: "CISSP",
    category: "경영/비즈니스",
    description: "보안 관리자 및 엔지니어를 위한 자격증",
  },
  {
    id: 3,
    title: "Google Associate Cloud Engineer",
    category: "금융/회계",
    description: "GCP 환경에서 인프라를 관리하는 기본 능력 평가",
  },
];

function CertSearch() {
  const [viewType, setViewType] = useState("grid");
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-row">
      {/* 좌측 - 사이드바 영역 */}
      <div className="w-[320px] h-screen p-[50px] bg-green-100">
        <h3 className="font-medium text-lg mb-6">카테고리</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 accent-green-600" />
            <span className="text-gray-700 font-medium">IT/기술</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 accent-green-600" />
            <span className="text-gray-700 font-medium">경영/비즈니스</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 accent-green-600" />
            <span className="text-gray-700 font-medium">금융/회계</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 accent-green-600" />
            <span className="text-gray-700 font-medium">외국어</span>
          </label>
        </div>
      </div>
      {/* 우측 - 카드 영역 */}
      <div className="flex-1 p-8">
        <div className="flex justify-between">
          <div>
            <h1 className="font-semibold text-4xl pb-2">자격증 탐색</h1>
            <p className="pb-5">
              커리어를 한 단계 높여줄 최적의 자격증을 리스트에서 확인해보세요.
            </p>
          </div>
          <div className="flex h-fit p-2 bg-gray-100 rounded-lg gap-4 mb-6">
            <button
              onClick={() => {
                setViewType("grid");
              }}
              className="px-4 h-fit rounded-lg  hover:bg-gray-300 transition font-medium"
            >
              그리드
            </button>
            <button
              onClick={() => {
                setViewType("list");
              }}
              className="px-4  h-fit rounded-lg hover:bg-gray-300 transition font-medium"
            >
              리스트
            </button>
          </div>
        </div>
        <div className="flex w-full border border-black-200 justify-between px-6 py-5 rounded-xl mb-[24px] gap-2">
          <input
            className="w-full"
            type="text"
            placeholder="자격증 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => console.log("검색")}
            className="p-2 rounded hover:bg-gray-200 transition"
          >
            <Search size={20} />
          </button>
        </div>

        {viewType === "grid" && (
          <div className="flex flex-wrap gap-x-6 gap-y-6 w-full">
            {items.map((item) => {
              return (
                <div key={item.id}>
                  <SearchGridCard
                    title={item.title}
                    category={item.category}
                    description={item.description}
                  />
                </div>
              );
            })}
          </div>
        )}

        {viewType === "list" && (
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;

              return (
                // 리스트를 감싸는 div
                <div
                  key={item.id}
                  //리스트의 마지막
                  className={`p-2 ${!isLast ? "border-b border-gray-200" : ""}`}
                >
                  <SearchListCard
                    title={item.title}
                    category={item.category}
                    description={item.description}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default CertSearch;
