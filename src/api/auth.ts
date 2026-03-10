// 로그인/회원가입에 대한 API 호출 분리
import axios from "axios";

const API=axios.create({
    baseURL: "http://localhost:8080/api"
});

export const signup=async(data: {
    email: string;
    password: string;
    userName: string;
})=> {
    const res=await API.post("auth/signup",data);
    return res.data.data;
};

export const login =async(data : {
    email: string;
    password: string;
})=> {
    const res=await API.post("auth/login",data);
    return res.data.data;
}