import React from "react";
import dynamic from 'next/dynamic'

const Signup = dynamic(() => import("@/views/dynamics/Signup"), { ssr: false });

export default function signup(props:any){
    return <Signup {...props}/>
}