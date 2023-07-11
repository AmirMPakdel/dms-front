import React from "react";
import dynamic from 'next/dynamic'
import env from "@/env";
import { goToLoginPage } from "@/libs/utils/redirect";

const Signup = dynamic(() => import("@/views/dynamics/Signup"), { ssr: false });

export default function signup(props:any){

    return <Signup {...props}/>
}