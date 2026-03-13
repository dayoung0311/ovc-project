//일정 클릭 시 사이드 바 관련 정보 불러오는 API
import type { Certificate } from "../types/exam";
import { apiClient } from "./apiClient";

export async function getCertificates(cert_id: number): Promise<Certificate> {
    try {
        const res = await apiClient.get(`/api/certs/${cert_id}`);
        return res.data.data;
    } catch (error) {
        console.error("certificate 조회 실패", error);
        throw error;
    }
}