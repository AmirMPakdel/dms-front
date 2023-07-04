import env from "@/env";
import axios from "axios";
import { getCookie } from "../utils/cookie";

export default function GetRequest(
    url: string,
    options?: RequestOptions
):Promise<RequestResolveValue>{
    return new Promise((resolve) => {


        // let headers = {
        //     Cookie: env.cookies.user_token+"="+getCookie(env.cookies.user_token)+";",
        // }

        axios
            .get(env.server_domain+url)
            .then((value) => {

                if(value.status != 200){
                    resolve({error: value.statusText});
                    return;
                }

                resolve(value.data);

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

interface RequestOptions {}
