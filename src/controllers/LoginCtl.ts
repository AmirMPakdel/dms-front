import env from "@/env";
import { setCookie } from "@/libs/utils/cookie";
import LoginMdl from "@/models/LoginMdl";
import Login from "@/views/dynamics/Login";

export default class LoginCtl {
    model: LoginMdl;

    constructor(private view: Login) {
        this.model = new LoginMdl(this);
    }

    validationCheck = () => {};

    submit = async () => {
        let params = {
            ...this.view.state,
        };

        let result = await this.model.sendLoginReq(params);

        if (result) {
            setCookie(env.cookies.user_token, result.token, 90);
            window.location.href = env.routes.user_dashboard;
        }
    };

    onAuthFailed = ()=>{

        alert("wrong username password");
    }
}
