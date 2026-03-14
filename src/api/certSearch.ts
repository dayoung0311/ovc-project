import { apiClient } from "./apiClient";
import type {
  ApiResponse,
  CertDetail,
  CertDetailParams,
  CertPageData,
  CertSearchParams,
} from "../types/cert";

export const getCerts = async (
  params: CertSearchParams,
): Promise<ApiResponse<CertPageData>> => {
  const {
    categoryIds,
    keyword = "",
    page = 0,
    size = 10,
    sort = "name,ASC",
  } = params;

  const response = await apiClient.get<ApiResponse<CertPageData>>("/api/certs", {
    params: {
      categoryIds,
      keyword,
      page,
      size,
      sort,
    },
    paramsSerializer: {
      indexes: null,
    },
  });

  return response.data;
};

export const getCertDetails = async (
  params:CertDetailParams
) : Promise<ApiResponse<CertDetail>> => {
  const {certId} = params;

  const response = await apiClient.get<ApiResponse<CertDetail>>(`/api/certs/${certId}`);

  return response.data;
};

type SyncPopularCertificatesData = {
  requestedNames: string[];
  matchedNames: string[];
  missingNames: string[];
  certIds: Array<number | string>;
  categoryNames: string[];
  detailSyncedCertIds: Array<number | string>;
  scheduleSyncedCertIds: Array<number | string>;
};

// 전달받은 자격증명으로 백엔드 동기화 파이프라인
// (카테고리/자격증 -> 상세 -> 일정)을 실행
export const syncPopularCertificates = async (
  certificateNames: string[],
): Promise<ApiResponse<SyncPopularCertificatesData>> => {
  const response = await apiClient.post<ApiResponse<SyncPopularCertificatesData>>(
    "/api/admin/sync/popular-certificates",
    { certificateNames },
  );

  return response.data;
};
