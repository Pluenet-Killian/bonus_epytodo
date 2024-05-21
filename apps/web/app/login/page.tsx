"use client"

import {useState} from "react";
import {useLoginMutation} from "../../service/auth";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {mutate: loginMutate} = useLoginMutation();

    const handleLogin = () => {
        loginMutate({
            email,
            password
        })
    }

    return (
        <div className={"w-full"}>
            <p className={"text-4xl font-semibold"}>Veuillez vous connecter</p>
            <div className="w-full flex justify-center items-center flex-col space-y-4 mt-8">
                <input type={"email"} onChange={(e) => setEmail(e.target.value)} placeholder={"Email"} className={"border border-black text-xl w-[500px] h-[50px]"} />
                <input type={"password"} onChange={(e) => setPassword(e.target.value)} placeholder={"Password"} className={"border border-black text-xl w-[500px] h-[50px]"} />
                <button onClick={() => handleLogin()}>Se connecter</button>
            </div>
        </div>
    )
}
