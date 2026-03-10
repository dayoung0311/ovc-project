// 로그인 후 API 요청할 때 JWT 토큰을 자동으로 보내줘야 함

import axios from "axios";

const API=axios.create({
    baseURL: "http://localhost:8080/api"
});

//interceptors는 axios가 요청을 보낵리 전에 가로챔 
API.interceptors.request.use((config)=> {
    //현재 로그인 토큰 가져오기
    const token=localStorage.getItem("accessToken");

    if(token) {
        //토큰이 있으면 헤더에 추가
        config.headers.Authorization=`Bearer ${token}`;
    }
    //interceptor는 반드시 config를 반환해야 요청이 계속 진행됨
    //config란 axios가 서버로 보내려는 요청 설정 객체 -> HTTP 요청에 대한 모든 정보가 들어있는 객체
    return config;
});

export default API;