import React from "react";
import dynamic from 'next/dynamic'

const Index = dynamic(() => import("@/views/dynamics/Index"), { ssr: false });

export default function index(props:any){
    return <Index {...props}/>
}