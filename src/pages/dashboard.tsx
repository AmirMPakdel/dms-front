import React from "react";
import dynamic from 'next/dynamic'

const Dashboard = dynamic(() => import("@/views/dynamics/Dashboard"), { ssr: false });

export default function dashboard(props:any){
    return <Dashboard {...props}/>
}