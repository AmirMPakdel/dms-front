import env from "@/env";
import axios from "axios";
import { getCookie, setCookie } from "../utils/cookie";
import { authRedirection } from "../utils/redirect";

export default function PostRequest(
    url: string,
    body: any,
    options?: RequestOptions
):Promise<RequestResolveValue>{
    return new Promise((resolve) => {


        // let headers = {
        //     Cookie: env.cookies.user_token+"="+getCookie(env.cookies.user_token)+";",
        // }

        if(options?.addUserToken){
            body.token = getCookie(env.cookies.user_token);
        }

        let req_url = env.server_domain+url;

        if(options?.customUrl){
            req_url = url;
        }

        axios
            .post(req_url, body)
            .then((value) => {

                if(value.status != 200){
                    resolve({error: value.statusText});
                }else{
                    if(value.data.rc == env.statusList.AUTH_FAILED.code){
                        setCookie(env.cookies.user_token, "", -1);
                        authRedirection();
                    }else{
                        resolve(value.data);
                    }
                }
            })
            .catch((reason) => {

                resolve({error: reason});
                return;
            });
    });
}

interface RequestResolveValue {
    error?: string,
    rc?: number,
    data?: any,
}

interface RequestOptions {
    addUserToken?: boolean;
    FormData?: boolean;
    customUrl?: boolean;
}
