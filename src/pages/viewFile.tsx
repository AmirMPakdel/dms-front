import React from "react";
import dynamic from 'next/dynamic'

const ViewFile = dynamic(() => import("@/views/dynamics/ViewFile"), { ssr: false });

export default function viewFile(props:any){
    return <ViewFile {...props}/>
}