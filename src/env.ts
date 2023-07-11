const env = {

    SSO:{
<<<<<<< HEAD
        enabled: false,
        SSO_login_page: "https://cas.aeoi.gov/login?app_id=4",
        SSO_logout_page: "https://cas.aeoi.gov",
=======
        enabled: true,
        SSO_login_page: "https://cas.aeoi.gov/login?app_id=4",
>>>>>>> 898bec21098b7f083396311eb6dae4bdfbbe72db
        SSO_getToken_url: "https://cas.aeoi.gov/api/getToken",
        SSO_getToken_param: "credential",
        SSO_editProfile_page: "https://cas.aeoi.gov/editProfile?app_id=4",
    },

    routes: {
        user_login: "/login",
        user_signup: "/signup",
        user_dashboard: "/dashboard",
        user_edit_profile: "/editProfile",
    },

<<<<<<< HEAD
    server_domain: "http://localhost:5080",//"https://dms.aeoi.gov",
=======
    server_domain: "http://172.26.208.39",
>>>>>>> 898bec21098b7f083396311eb6dae4bdfbbe72db

    urls: {
        signup_user: "/api/user/signup",
        login_user: "/api/user/login",
        get_file_from_access_link: "/api/file/getFileFromAccessLink",
        login_with_cas: "/api/user/loginWithCas",
    },

    cookies: {
        user_token: "dms_tcn",
        user_fullname: "dms_fl",
    },

    statusList: {
        SUCCESS: { code: 2000 },
        INTERNAL_ERROR: { code: 5000, error: "INTERNAL_ERROR" },
        OBJECT_NOT_FOUND: { code: 4000, error: "OBJECT_NOT_FOUND" },
        AUTH_FAILED: { code: 3001, error: "AUTH_FAILED" },
        WRONG_CREDENTIAL: {code: 3002, error:"WRONG_CREDENTIAL"},
    },

    theme: {
        primary: "#003e29",
        secondary: "#467061",
    },
};

if(env.SSO.enabled){

    env.routes.user_login = env.SSO.SSO_login_page;
    env.routes.user_edit_profile = env.SSO.SSO_editProfile_page;
    env.routes.user_signup = "/404";
}

export default env;
