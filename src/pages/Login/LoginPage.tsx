import { useState } from "react"
import { login } from "../../api/auth";


function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await login({
                email,
                password
            });

            localStorage.setItem("accessToken", res.accessToken);

            alert("로그인 성공!");
        } catch (error) {
            console.log("로그인 오류 발생", error);
            alert("로그인 실패!");
        }
    };

    return (
        <div>
            <h1>로그인</h1>

            <input
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>
                로그인
            </button>

        </div>
    )
}

export default LoginPage