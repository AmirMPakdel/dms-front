import React from "react";
import dynamic from 'next/dynamic'

const Login = dynamic(() => import("@/views/dynamics/Login"), { ssr: false });

export default function backdoorLogin(props:any){

    return <Login {...props}/>
}