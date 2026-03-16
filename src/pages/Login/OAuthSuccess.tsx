import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    console.log("URL:", window.location.search);
    const accessToken = params.get("accessToken"); 

    console.log("token:", accessToken);

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);

      console.log(
        "로그인 직후 token:",
        localStorage.getItem("accessToken")
      );

      navigate("/mypage");
    }
  }, []);

  return <div>처리 중...</div>;
}

export default OAuthSuccess;