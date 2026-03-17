import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyInfo, getMyCerts, updateNickname } from "../../api/user";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFavorites } from "../../api/favorite";

function MyPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  //프로필 편집을 위한 state
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("");

  //닉네임 수정 mutation
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateNickname,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
      setIsEditing(false);
    }
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      navigate("/mypage", { replace: true });
    }

    setReady(true);
  }, [navigate]);
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    retry: ready,
  });

  const { data: myCertCount = 0 } = useQuery({
    queryKey: ["myCertCount"],
    queryFn: async () => (await getMyCerts()).length,
    enabled: ready,
    retry: false,
  });

  const { data: favoriteCount = 0 } = useQuery({
    queryKey: ["favoriteCount"],
    queryFn: async () => (await getFavorites()).length,
    enabled: ready,
    retry: false,
  });

  useEffect(() => {
    if (user) {
      setNickname(user.nickname ?? user.name);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen px-6 pt-28">
        <div className="mx-auto max-w-[1400px] text-gray-500">로딩중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen px-6 pt-28">
        <div className="mx-auto max-w-[1400px] text-gray-500">
          로그인이 필요합니다.
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen text-gray-900">
      <div className="mx-auto max-w-[1400px] px-6 pb-16 pt-40">
        {/* 상단 타이틀 */}
        <section className="mb-8">
          <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-black">
            MY PAGE
          </p>
          <h1 className="text-[34px] font-bold tracking-[-0.02em] text-gray-900 sm:text-[42px]">
            안녕하세요, {user.name}님

          </h1>
          <p className="mt-3 text-[15px] leading-7 text-gray-600">
            계정 정보와 활동 내역을 한눈에 보고 관리할 수 있습니다.
          </p>
        </section>

        {/* 상단 프로필 메인 */}
        <section className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white/45 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-2xl">
          <div className="relative flex flex-col gap-8 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="h-32 w-32 overflow-hidden rounded-full border border-white/70 shadow">
                {user.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt="profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-white rext-3xl font-bold text-primaryDark">
                    {user.name?.charAt(0)}
                  </div>
                )}
              </div>

              <div>
                <span className="flex items-center gap-3 mt-2 mb-3">
                  {/* {user.nickname ?? user.name} */}
                  {isEditing ? (
                    <input
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="border rounded-lg px-3 py-1 mr-1 text-[28px] font-bold outline-none"
                    />
                  ) : (
                    <p className="text-[30px] font-bold tracking-[-0.02em] text-gray-900">
                      {user.nickname ?? user.name}
                    </p>
                  )}

                  {isEditing && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setNickname(user.nickname ?? user.name);
                        }}
                        className="px-4 py-2 rounded-3xl border text-base"
                      >
                        취소
                      </button>
                      <button
                        onClick={() => mutation.mutate(nickname)}
                        className="px-4 py-2 rounded-3xl bg-primary text-white text-base"
                      >
                        저장
                      </button>
                    </div>
                  )}
                </span>

                <p className="mt-2 text-[16px] text-gray-500">
                  {user.name}
                </p>
                <p className="mt-2 text-[16px] text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[260px]">
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-2xl border border-white/70 bg-[#0f1b3d] px-6 py-4 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(15,27,61,0.18)] transition hover:-translate-y-[1px]">
                프로필 편집
              </button>
            </div>
          </div>
        </section>

        {/* 하단 콘텐츠 */}
        <section className="w-full mt-16 gap-8">
          {/* 활동 요약 */}
          <div>
            <h2 className="text-[32px] font-semibold tracking-[-0.02em] text-gray-900">
              활동 요약
            </h2>

            <p className="mt-3 text-[15px] leading-7 text-gray-600">
              지금까지 등록한 자격증과 관심 자격증 현황을 한눈에 확인해보세요.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 mt-8">
              <div className="rounded-[32px] border border-white/70 bg-white/45 p-8 text-center shadow-[0_14px_40px_rgba(15,23,42,0.05)] backdrop-blur-2xl">
                <p className="text-[34px] font-bold text-gray-900">{myCertCount}</p>
                <p className="mt-2 text-sm text-gray-500">취득 자격증</p>
              </div>

              <div className="rounded-[32px] border border-white/70 bg-white/45 p-8 text-center shadow-[0_14px_40px_rgba(15,23,42,0.05)] backdrop-blur-2xl">
                <p className="text-[34px] font-bold text-gray-900">{favoriteCount}</p>
                <p className="mt-2 text-sm text-gray-500">위시리스트</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyPage;
