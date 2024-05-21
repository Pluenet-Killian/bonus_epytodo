"use client"

import {useState} from "react";
import {useLoginMutation, useRegisterMutation} from "../../service/auth";

export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [firstName, setFirstName] = useState("")
    const {mutate: loginMutate} = useRegisterMutation();

    const handleLogin = () => {
        loginMutate({
            email,
            password,
            name,
            firstName
        })
    }

    return (
        <div className={"w-full"}>
            <p className={"text-4xl font-semibold"}>Veuillez vous enregistrer</p>
            <div className="w-full flex justify-center items-center flex-col space-y-4 mt-8">
                <input onChange={(e) => setFirstName(e.target.value)} placeholder={"Prénom"}
                       className={"border border-black text-xl w-[500px] h-[50px]"}/><input
                onChange={(e) => setName(e.target.value)} placeholder={"Nom"}
                className={"border border-black text-xl w-[500px] h-[50px]"}/>

                <input type={"email"} onChange={(e) => setEmail(e.target.value)} placeholder={"Email"}
                       className={"border border-black text-xl w-[500px] h-[50px]"}/>
                <input type={"password"} onChange={(e) => setPassword(e.target.value)} placeholder={"Mot de passe"}
                       className={"border border-black text-xl w-[500px] h-[50px]"}/>
                <button onClick={() => handleLogin()}>S'enregistrer</button>
            </div>
        </div>
    )
}
