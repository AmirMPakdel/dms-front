import env from "@/env";
import { getCookie } from "@/libs/utils/cookie";
import React, { Component } from "react";

export default class Login extends Component {

    render(): React.ReactNode {

        window.document.title = "سامانه مدیریت مستندات فنی"

        let c = getCookie(env.cookies.user_token);

        if(c && c.length && c.length > 10){
            window.location.href = "/dashboard";
        }else{
            window.location.href = "/login";
        }
        
        return (
            <div />
        );
    }
}