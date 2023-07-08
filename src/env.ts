const env = {
    routes: {
        user_login: "/login",
        user_signup: "/signup",
        user_dashboard: "/dashboard",
    },

    server_domain: "http://localhost:5080",

    urls: {
        signup_user: "/api/user/signup",
        login_user: "/api/user/login",
        get_file_from_access_link: "/api/file/getFileFromAccessLink",
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

export default env;
