import React from "react";
import dynamic from 'next/dynamic'

const CasLogin = dynamic(() => import("@/views/dynamics/CasLogin"), { ssr: false });

export default function casLogin(props:any){
    return <CasLogin {...props}/>
}