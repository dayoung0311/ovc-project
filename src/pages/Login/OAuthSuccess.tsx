import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

function OAuthSuccess(){
    const navigate=useNavigate();

    useEffect(()=>{
        const params=new URLSearchParams(window.location.search);
        const token=params.get("token");

        if(token) {
            localStorage.setItem("accessToken",token);
            navigate("/mypage");
        }
    },[]);

    return <div>처리 중...</div>
}

export default OAuthSuccess