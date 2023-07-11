import env from "@/env";

export function authRedirection(){

    let current_url = window.location.href;

    goToLoginPage();
}

export function goToLoginPage(){

    if(env.SSO.enabled){
        window.location.href = env.SSO.SSO_login_page;
    }else{
        window.location.href = env.routes.user_login;
    }
}

export function goToLogoutPage(){

    if(env.SSO.enabled){
        window.location.href = env.SSO.SSO_logout_page;
    }else{
        window.location.href = env.routes.user_login;
    }
}