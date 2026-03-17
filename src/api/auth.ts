// 로그인/회원가입에 대한 API 호출 분리
import type { ApiResponse } from "../types/api";
import type { SignupRequest, LoginRequest, User } from "../types/auth";
import { apiClient } from "./apiClient";


export const signup=async(data: SignupRequest)=> {
    const res=await apiClient.post<ApiResponse<User>>("/auth/signup",data);
    return res.data.data;
};

export const login =async(data : LoginRequest)=> {
    const res=await apiClient.post<ApiResponse<{accessToken : string }>>("/auth/login",data);

    return res.data.data;
}

export const logout = async (): Promise<void> => {
    try {
        await apiClient.post<ApiResponse<null>>("/auth/logout");
    } finally {
        localStorage.removeItem("accessToken"); //로컬에 남아있는 accessToken 삭제
        window.location.href="/"; //후에 랜딩페이지로 이동
    }
};
