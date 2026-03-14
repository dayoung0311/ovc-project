import { useCallback, useEffect, useState } from "react";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { getCategory } from "../../../api/category";
import type { SettingCategory } from "../../../types/category";
import { getCerts, syncPopularCertificates } from "../../../api/certSearch";

interface CertRegisterFormValues {
  certId?: number;
  categoryId?: number;
  name: string;
  authority: string;
  certNum?: string;
  passingDate: string;
  expirationDate?: string;
}

interface CertRegisterFormProps {
  onClose: () => void;
  onCreate: (values: CertRegisterFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
}

const CertRegisterForm = ({
  onClose,
  onCreate,
  isSubmitting = false,
}: CertRegisterFormProps) => {
  const [categories, setCategories] = useState<SettingCategory[]>([]);
  const [selectedCertId, setSelectedCertId] = useState<number | null>(null);
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [isNameFocused, setIsNameFocused] = useState(false);

  const [form, setForm] = useState<CertRegisterFormValues>({
    certId: undefined,
    categoryId: undefined,
    name: "",
    authority: "",
    certNum: "",
    passingDate: "",
    expirationDate: "",
  });

  const fetchCategories = useCallback(async () => {
    try {
      const res = await getCategory();
      setCategories(res.data);
    } catch (error) {
      console.error("카테고리 조회 실패", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const keyword = form.name.trim();
  const canSearch = debouncedKeyword.length > 0;

  useEffect(() => {
    // 입력 중 과도한 재조회/깜빡임을 줄이기 위해 검색어를 디바운스
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 250);

    return () => clearTimeout(timer);
  }, [keyword]);

  const {
    data: certSearchData,
    isFetching: isCertSearching,
    refetch: refetchCertSearch,
  } = useQuery({
    queryKey: ["certRegisterSearch", form.categoryId, debouncedKeyword],
    queryFn: async () => {
      if (!form.categoryId) {
        return getCerts({
          keyword: debouncedKeyword,
          page: 0,
          size: 10,
          sort: "name,ASC",
        });
      }

      const byCategory = await getCerts({
        keyword: debouncedKeyword,
        categoryIds: [form.categoryId],
        page: 0,
        size: 10,
        sort: "name,ASC",
      });

      if (byCategory.data.content.length > 0) {
        return byCategory;
      }

      // 카테고리 검색 결과가 비면 전체 검색으로 한 번 더 조회해 연관검색어를 보완
      return getCerts({
        keyword: debouncedKeyword,
        page: 0,
        size: 10,
        sort: "name,ASC",
      });
    },
    enabled: canSearch,
    retry: false,
    placeholderData: keepPreviousData,
  });

  const certOptions = certSearchData?.data.content ?? [];

  const syncMutation = useMutation({
    mutationFn: () => syncPopularCertificates([keyword]),
    onSuccess: async (result) => {
      const normalizedKeyword = keyword.toLowerCase();
      const isMissing = result.data.missingNames.some(
        (name) => name.trim().toLowerCase() === normalizedKeyword,
      );
      const isMatched = result.data.matchedNames.some(
        (name) => name.trim().toLowerCase() === normalizedKeyword,
      );

      if (isMissing) {
        alert("요청한 자격증을 찾지 못했습니다. (missingNames)");
        return;
      }

      if (isMatched) {
        await fetchCategories();
        const refetched = await refetchCertSearch();
        const syncedOptions = refetched.data?.data.content ?? [];

        if (syncedOptions.length > 0) {
          // 동기화 후 바로 저장 가능한 흐름이 되도록 첫 매칭 항목을 자동 선택
          const exactMatch =
            syncedOptions.find(
              (cert) => cert.name.trim().toLowerCase() === normalizedKeyword,
            ) ?? syncedOptions[0];

          setForm((prev) => ({
            ...prev,
            name: exactMatch.name,
            categoryId: exactMatch.categoryId,
          }));
          setSelectedCertId(exactMatch.certId);
        }

        alert("자격증 데이터가 등록되었습니다. 자동 선택되었습니다.");
        return;
      }

      alert("동기화 결과를 확인해주세요.");
    },
    onError: () => {
      alert("자격증 동기화에 실패했습니다. 잠시 후 다시 시도해주세요.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "name") {
      setSelectedCertId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.categoryId) {
      alert("카테고리를 선택해주세요.");
      return;
    }

    if (!form.name.trim()) {
      alert("자격증명을 입력해주세요.");
      return;
    }

    if (!form.authority.trim()) {
      alert("발급 기관을 입력해주세요.");
      return;
    }

    if (!form.passingDate) {
      alert("합격일을 입력해주세요.");
      return;
    }

    if (!selectedCertId) {
      alert("자격증을 목록에서 선택해주세요.");
      return;
    }

    try {
      await onCreate({
        ...form,
        certId: selectedCertId,
      });
      onClose();
    } catch {
      // 에러 메시지는 상위(onCreate)에서 처리
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          카테고리
        </label>

        <select
          value={form.categoryId ?? ""}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-green-700"
          onChange={(e) => {
            const value = e.target.value;
            setForm((prev) => ({
              ...prev,
              categoryId: value ? Number(value) : undefined,
            }));
            setSelectedCertId(null);
          }}
        >
          <option value="">카테고리 선택</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <label className="mb-1 block text-sm font-medium text-slate-700">
          자격증명
        </label>
        <div className="relative">
          <input
            type="text"
            name="name"
            placeholder="예: 정보처리기사"
            value={form.name}
            onChange={handleChange}
            onFocus={() => setIsNameFocused(true)}
            onBlur={() => setIsNameFocused(false)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-green-700"
          />

          {isNameFocused && keyword.length > 0 && (
            <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
              {isCertSearching ? (
                <p className="px-2 py-1 text-sm text-slate-500">검색 중...</p>
              ) : certOptions.length > 0 ? (
                <div className="max-h-40 space-y-1 overflow-y-auto">
                  {certOptions.map((cert) => (
                    <button
                      key={cert.certId}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setForm((prev) => ({
                          ...prev,
                          name: cert.name,
                          categoryId: cert.categoryId,
                        }));
                        setSelectedCertId(cert.certId);
                        setIsNameFocused(false);
                      }}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                        selectedCertId === cert.certId
                          ? "bg-green-100 text-green-900"
                          : "hover:bg-slate-100"
                      }`}
                    >
                      {cert.name}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-between gap-2 px-2 py-1">
                  <p className="text-sm text-slate-500">검색 결과가 없습니다.</p>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => syncMutation.mutate()}
                    disabled={syncMutation.isPending}
                    className="rounded-lg bg-slate-800 px-2 py-1 text-xs font-semibold text-white disabled:opacity-60"
                  >
                    {syncMutation.isPending ? "동기화 중..." : "외부 동기화"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          발급 기관
        </label>
        <input
          type="text"
          name="authority"
          value={form.authority}
          placeholder="예: 한국산업인력공단"
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-green-700"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          자격증 번호
        </label>
        <input
          type="text"
          name="certNum"
          value={form.certNum}
          placeholder="예: 00000000000A"
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-green-700"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          합격일
        </label>
        <input
          type="date"
          name="passingDate"
          value={form.passingDate}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-green-700"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          만료일
        </label>
        <input
          type="date"
          name="expirationDate"
          value={form.expirationDate}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-green-700"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-green-700 px-4 py-2 font-semibold text-white transition hover:bg-green-800"
        >
          {isSubmitting ? "저장 중..." : "저장"}
        </button>
      </div>
    </form>
  );
};

export default CertRegisterForm;
export type { CertRegisterFormValues };
