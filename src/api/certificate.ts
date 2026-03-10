import type { Certificate } from "../types/exam";
import { apiClient } from "./apiClient";

export async function getCertificates(cert_id: number): Promise<Certificate> {
    const res = await apiClient.get(`/certs/${cert_id}`);
    return res.data.data;
}