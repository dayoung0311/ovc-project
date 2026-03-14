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
  const res = await apiClient.get<ApiResponse<User>>("/api/users/me");
  return res.data.data;
};

export const getMyCerts = async (): Promise<MyCertResponse[]> => {
  const res = await apiClient.get<ApiResponse<unknown>>("/api/users/me/certs");
  const rawData = res.data.data;
  const list = Array.isArray(rawData)
    ? rawData
    : typeof rawData === "object" && rawData !== null && "content" in rawData
      ? (rawData as { content?: unknown[] }).content ?? []
      : [];

  // 백엔드 응답 키가 상황에 따라 달라질 수 있어
  // 프론트에서 사용하는 단일 형태로 정규화한다.
  return list.map((item) => {
    const cert = item as Record<string, unknown>;
    return {
      id: Number(cert.id ?? cert.myCertId ?? cert.certId ?? 0),
      name: String(cert.name ?? cert.certName ?? ""),
      authority: String(cert.authority ?? cert.issuer ?? cert.issueAgency ?? ""),
      certNum:
        cert.certNum !== undefined && cert.certNum !== null
          ? String(cert.certNum)
          : cert.certNumber !== undefined && cert.certNumber !== null
            ? String(cert.certNumber)
          : cert.number !== undefined && cert.number !== null
            ? String(cert.number)
            : undefined,
      passingDate: String(
        cert.passingDate ??
          cert.passedAt ??
          cert.acquiredDate ??
          cert.passDate ??
          "",
      ),
      expirationDate:
        cert.expirationDate !== undefined && cert.expirationDate !== null
          ? String(cert.expirationDate)
          : cert.expiredAt !== undefined && cert.expiredAt !== null
            ? String(cert.expiredAt)
          : cert.expireDate !== undefined && cert.expireDate !== null
            ? String(cert.expireDate)
            : undefined,
    };
  });
};

export const deleteMyCert = async (certId: number): Promise<void> => {
  await apiClient.delete<ApiResponse<void>>(`/api/users/me/certs/${certId}`);
};

// 자격증 마스터(certificates) ID 기준으로 취득 자격증을 등록한다.
export const addMyCert = async (
  certId: number,
  body: AddMyCertRequest,
): Promise<void> => {
  await apiClient.post<ApiResponse<void>>(`/api/users/me/certs/${certId}`, body);
};
