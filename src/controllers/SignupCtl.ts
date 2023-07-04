import env from "@/env";
import PostRequest from "@/libs/rest/PostRequest";
import { setCookie } from "@/libs/utils/cookie";
import SignupMdl from "@/models/SignupMdl";
import Signup from "@/views/dynamics/Signup";

export default class SignupCtl {
    model: SignupMdl;

    constructor(private view: Signup) {
        this.model = new SignupMdl(this);
    }

    validationCheck = () => {};

    submit = async () => {
        let params = {
            ...this.view.state,
        };

        let result = await this.model.sendSignupReq(params);

        if (result) {
            console.log(result);

            setCookie(env.cookies.user_token, result.token, 90);
            
            window.location.href = env.routes.user_dashboard;
        }
    };
}
