import env from "@/env";
import PostRequest from "@/libs/rest/PostRequest";
import { setCookie } from "@/libs/utils/cookie";
import { getParamByName } from "@/libs/utils/helpers";
import React, { Component } from "react";
import Loading from "../components/global/Loading";

export default class Login extends Component {

    componentDidMount(){

        let params:any = {};

        params[env.SSO.SSO_getToken_param] = getParamByName(env.SSO.SSO_getToken_param);

        PostRequest(env.urls.login_with_cas, params).then(res=>{

            if(res.rc === env.statusList.SUCCESS.code){

                let result = res.data;

                if (result) {
                    setCookie(env.cookies.user_token, result.token, 90);
                    setCookie(env.cookies.user_fullname, result.firstname+" "+result.lastname, 90);
                    window.location.href = env.routes.user_dashboard;
                }
                
            }else{

                window.location.href = env.routes.user_login;
            }
        });
    }

    render(): React.ReactNode {

        window.document.title = "سامانه مدیریت مستندات فنی"
        
        return (
            <div>
                <Loading style={{minHeight:"60vh"}}/>
            </div>
        );
    }
}