import env from "@/env";
import chest from "@/libs/utils/chest";
import { setCookie } from "@/libs/utils/cookie";
import LoginMdl from "@/models/LoginMdl";
import Login from "@/views/dynamics/Login";

export default class LoginCtl {
    model: LoginMdl;

    constructor(private view: Login) {
        this.model = new LoginMdl(this);
    }

    validationCheck = () => {

        let errors:any = {username:null, password:null};

        let {username, password} = this.view.state;
        
        let isValid = true;

        if(username.length<4){
            isValid = false;
            errors.username = "نام کاربر نامعتبر";
        }

        if(password.length<8){
            isValid = false;
            errors.password = "رمزعبور نامعتبر";
        }

        this.view.setState({errors});

        return isValid;
    };

    submit = async () => {

        if(!this.validationCheck()){
            return;
        }

        let params = {
            ...this.view.state,
        };

        let result = await this.model.sendLoginReq(params);

        if (result) {
            setCookie(env.cookies.user_token, result.token, 90);
            setCookie(env.cookies.user_fullname, result.firstname+" "+result.lastname, 90);
            window.location.href = env.routes.user_dashboard;
        }
    };

    onAuthFailed = ()=>{

        chest.openNotification("نام کاربری یا رمزعبور اشتباه است.", "error");
    }
}
