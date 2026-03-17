//공통 axios 인스턴스를 바탕으로 사용자 API를 기능별로 분리한 파일
import { apiClient } from "./apiClient";
import type { ApiResponse } from "../types/api";
import type { User } from "../types/auth";

export type MyCertResponse = {
  id: number;
  name: string;
  authority: string;
  certNum?: string | null;
  passingDate: string;
  expirationDate?: string | null;
};

export type AddMyCertRequest = {
  certNum?: string;
  certNumber?: string;
  passingDate: string;
  passedAt?: string;
  expirationDate?: string;
  expiredAt?: string;
  authority?: string;
};

export const getMyInfo = async (): Promise<User> => {
  //apiClient를 사용하여 /api/users/me로 GET 요청을 보내고 응답 전체 구조는 ApiResponse<User>라고 가정
  const res = await apiClient.get<ApiResponse<User>>("/api/users/me");
  return res.data.data;
};

export const getMyCerts = async (): Promise<MyCertResponse[]> => {
  //<ApiResponse<unknown>> = 응답 바깥 구조는 알고 있지만, 안쪽 data 구조는 아직 신뢰하지 않음
  const res = await apiClient.get<ApiResponse<unknown>>("/api/users/me/certs");
  //백엔드가 실제로 보내고 싶은 페이로드에 해당하는 데이터 꺼냄
  const rawData = res.data.data;

  //실제 배열을 안전하게 꺼내는 코드
  const list = Array.isArray(rawData)
  //rawDataw 자체가 배열이면 그대로 사용
    ? rawData
    //응답이 페이지네이션 형태일 때를 대비
    //rawData가 객체이고, null이 아니고, 그 안에 content라는 속성이 있으면 content를 꺼냄
    : typeof rawData === "object" && rawData !== null && "content" in rawData
    //rawData를 우선 content 속성이 있는 객체라고 보고 content를 꺼냄
      ? (rawData as { content?: unknown[] }).content ?? []
      : [];


  // 백엔드 응답 키가 상황에 따라 달라질 수 있어
  // 프론트에서 사용하는 단일 형태로 정규화함
  return list.map((item) => {
    //이건 현재 배열 안의 각 원소를 문자열 키를 가진 일반 객체처럼 다루겠다는 의미
    // item의 정확한 타입을 모르는 상태라서,바로 item.certId처럼 접근하기 어렵기 때문
    const cert = item as Record<string, unknown>;
    return {
      //자격증의 고유 ID를 생성하는 부분
      id: Number(cert.id ?? cert.myCertId ?? cert.certId ?? 0),
      //자격증 이름
      name: String(cert.name ?? cert.certName ?? ""),
      //자격증 발급 기관
      authority: String(cert.authority ?? cert.issuer ?? cert.issueAgency ?? ""),
      //자격증 번호
      //값이 실제로 존재하는 경우에만 문자열로 바꾸고, 없으면 아예 undefined로 두는 방식 
      certNum:
        cert.certNum !== undefined && cert.certNum !== null
          ? String(cert.certNum)
          : cert.certNumber !== undefined && cert.certNumber !== null
            ? String(cert.certNumber)
            : cert.number !== undefined && cert.number !== null
              ? String(cert.number)
              : undefined,
      // 합격일, 취득일과 같은 이벤트 타입 날짜
      passingDate: String(
        cert.passingDate ??
        cert.passedAt ??
        cert.acquiredDate ??
        cert.passDate ??
        "",
      ),
      //만료일
      expirationDate:
        cert.expirationDate !== undefined && cert.expirationDate !== null
          ? String(cert.expirationDate)
          : cert.expiredAt !== undefined && cert.expiredAt !== null
            ? String(cert.expiredAt)
            : cert.expireDate !== undefined && cert.expireDate !== null
              ? String(cert.expireDate)
              : undefined,
              //certNum이나 expirationDate는 빈 문자열보다 undefined로 두는 것이 다루는데 자연스러움
    };
  });
};

export const deleteMyCert = async (certId: number): Promise<void> => {
  await apiClient.delete<ApiResponse<void>>(`/api/users/me/certs/${certId}`);
};

// 자격증 마스터(certificates) ID 기준으로 취득 자격증을 등록
export const addMyCert = async (
  certId: number,
  body: AddMyCertRequest,
): Promise<void> => {
  await apiClient.post<ApiResponse<void>>(`/api/users/me/certs/${certId}`, body);
};

//프로필 편집에서의 닉네임 변경을 위한 함수
export const updateNickname = async (nickname: string) => {
  const res = await apiClient.patch("/api/users/me", {
    nickname,
  });

  return res.data;
}
