import { useState } from "react"
import { signup } from "../../api/auth";

function SignupPage(){
    
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [userName, setuserName]=useState("");

    const handleSignup = async () => {
        try {
            await signup({
                email, 
                password,
                userName
            });

            alert("회원가입 성공!");
        } catch (error) {
            console.log("회원가입 오류 발생",error);
            alert("회원가입 실패!");
        }
    };

    return(
        <div>
            <h1>회원가입</h1>
            <input
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
             <input
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
             <input
            placeholder="userName"
            value={userName}
            onChange={(e)=>setuserName(e.target.value)}
            />

            <button onClick={handleSignup}>
                회원가입
            </button>
        </div>
    )
}

export default SignupPage
