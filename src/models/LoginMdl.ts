import LoginCtl from "@/controllers/LoginCtl";
import env from "@/env";
import PostRequest from "@/libs/rest/PostRequest";

export default class LoginMdl {
    constructor(public controller: LoginCtl) {}

    sendLoginReq = async (params: any) => {
        
        let result = await PostRequest(env.urls.login_user, params);
        
        if (result.rc == env.statusList.WRONG_CREDENTIAL.code) {
            this.controller.onAuthFailed();
            return null;
        }

        let res_data: LoginRspData = result.data;

        return res_data;
    };
}

interface LoginRspData {
    createdAt: string;
    firstname: string;
    id: number;
    lastname: string;
    token: string;
    updatedAt: string;
    username: string;
}
