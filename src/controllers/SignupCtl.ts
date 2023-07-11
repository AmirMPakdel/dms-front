import env from "@/env";
import { setCookie } from "@/libs/utils/cookie";
import SignupMdl from "@/models/SignupMdl";
import Signup from "@/views/dynamics/Signup";

export default class SignupCtl {
    model: SignupMdl;

    constructor(private view: Signup) {
        this.model = new SignupMdl(this);
    }

    validationCheck = () => {
        let errors:any = {
            username:null, firstname:null,
            lastname:null, national_code:null,
            password:null, password_repeated:null,
        };

        let {username, firstname,
            lastname, national_code,
            password, password_repeated} = this.view.state;
        
        let isValid = true;

        if(username.length<4){
            isValid = false;
            errors.username = "نام کاربر نامعتبر";
        }
        if(firstname.length<3){
            isValid = false;
            errors.firstname = "نام نامعتبر";
        }
        if(lastname.length<3){
            isValid = false;
            errors.lastname = "نام خانوادگی نامعتبر";
        }
        if(national_code.length!=10){
            isValid = false;
            errors.national_code = "کدملی نامعتبر";
        }
        if(password.length<8){
            isValid = false;
            errors.password = "رمزعبور باید حداقل از 8 کارکتر  باشد";
        }
        if(!errors.password && password_repeated!=password){
            isValid = false;
            errors.password_repeated = "تکرار رمزعبور اشتباه است";
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

        let result = await this.model.sendSignupReq(params);

        if (result) {

            setCookie(env.cookies.user_token, result.token, 90);
            setCookie(env.cookies.user_fullname, result.firstname+" "+result.lastname, 90);
            
            window.location.href = env.routes.user_dashboard;
        }
    };
}
