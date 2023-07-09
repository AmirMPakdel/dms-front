import env from "@/env";
import PostRequest from "@/libs/rest/PostRequest";
import { getParamByName } from "@/libs/utils/helpers";
import React, { Component } from "react";
import Loading from "../components/global/Loading";

export default class Login extends Component {

    componentDidMount(){

        let params:any = {};

        params[env.SSO.SSO_getToken_param] = getParamByName(env.SSO.SSO_getToken_param);

        // PostRequest(env.SSO.SSO_getToken_url, params, {customUrl:true}).then(res=>{

        //     console.log(res);
        // });
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