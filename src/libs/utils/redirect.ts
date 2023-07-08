import env from "@/env";

export function authRedirection(){

    let current_url = window.location.href;

    goToLoginPage();
}

export function goToLoginPage(){

    window.location.href = env.routes.user_login;
}