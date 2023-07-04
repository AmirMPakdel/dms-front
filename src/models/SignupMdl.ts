import SignupCtl from "@/controllers/SignupCtl";
import env from "@/env";
import PostRequest from "@/libs/rest/PostRequest";

export default class SignupMdl {

    constructor(public controller:SignupCtl){
    }

    sendSignupReq = async (params: any) => {

        let result = await PostRequest(env.urls.signup_user, params);

        let res_data: SingupRspData = result.data;

        return res_data;
    };
}

interface SingupRspData {
    createdAt: string;
    firstname: string;
    id: number;
    lastname: string;
    token: string;
    updatedAt: string;
    username: string;
}
