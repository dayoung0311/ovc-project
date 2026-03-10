import { useState } from "react";
import SearchGridCard from "../../components/common/cards/SearchGridCard";
import SearchListCard from "../../components/common/cards/SearchListCard";
import { Search } from "lucide-react";
import { useCertSearch } from "../../hooks/useCertSearch";
import { useCategory } from "../../hooks/useCategory";

function CertSearch() {
  const [viewType, setViewType] = useState("grid");

  //입력 중인 값(검색창에 입력한 값)(단순입력)
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  //실제 검색에 적용된 값(엔터를 눌렀을 경우나 검색버튼을 클릭했을때 적용되는 값)
  const [keyword, setKeyword] = useState("");
  const [categoryIds, setCategoryIds] = useState<number[]>([]);

  const { data, isLoading, isError } = useCertSearch({
    keyword, //검색어
    categoryIds, //카테고리 ids
    page: 0, //1페이지
    size: 6, //한페이지에 6개
    sort: "name,ASC", //이름을 기준으로 오름차순
  });

  //api로 가져온 애들 null일 경우 빈배열
  const certs = data?.data.content ?? [];

  //카테고리를 가져오는 hooks
  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useCategory();

  const categories = categoryData?.data ?? [];
  const getCategoryName = (categoryId: number) => {
    return categories.find((category) => category.id === categoryId)?.name ?? "";
  };


  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  //input에 입력했던것으로 검색에 적용할 겁니다.
  const handleSearch = () => {
    setKeyword(searchInput);
    setCategoryIds(selectedCategories);
  };
  console.log("categories", categories);
console.log("certs", certs);
console.log(categories.map((c) => c.id));
console.log(certs.map((c) => c.certId));

  return (
    <div className="flex flex-row">
      {/* 좌측 - 사이드바 영역 */}
      <div className="w-[320px] h-screen p-[50px] bg-green-100">
        <h3 className="font-medium text-lg mb-6">카테고리</h3>
        <div className="space-y-4">
          {isCategoryLoading && <p>카테고리 불러 오는 중...</p>}
          {isCategoryError && <p>카테고리를 불러오지 못했습니다.</p>}

          {!isCategoryLoading &&
            !isCategoryError &&
            categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                />
                <span>{category.name}</span>
              </label>
            ))}
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
            className="w-full outline-none"
            type="text"
            placeholder="자격증 검색..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            onClick={handleSearch}
            className="p-2 rounded hover:bg-gray-200 transition"
          >
            <Search size={20} />
          </button>
        </div>

        {isLoading && <div>불러오는 중...</div>}
        {isError && <div>데이터를 불러오지 못했습니다.</div>}
        {!isLoading && !isError && certs.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            조건에 맞는 자격증이 없습니다.
          </div>
        )}

        {viewType === "grid" && (
          <div className="flex flex-wrap gap-x-6 gap-y-6 w-full">
            {certs.map((item) => {
              return (
                <div key={item.certId}>
                  <SearchGridCard
                    title={item.name}
                    category={getCategoryName(item.categoryId)}
                    description={item.description ?? ""}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* 필터아이템의 길이가 0보다 클때 리스트화 */}
        {viewType === "list" && (
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
            {certs.map((item, index) => {
              const isLast = index === certs.length - 1;

              return (
                // 리스트를 감싸는 div
                <div
                  key={item.certId}
                  //리스트의 마지막
                  className={`p-2 ${!isLast ? "border-b border-gray-200" : ""}`}
                >
                  <SearchListCard
                    title={item.name}
                    category={getCategoryName(item.categoryId)}
                    description={item.description ?? ""}
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
