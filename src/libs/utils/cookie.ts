export function setCookie(
    cname: string,
    cvalue: string,
    exdays = 0,
    config: CookieConf = {}
) {
    if (exdays) {
        let d = new Date();

        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);

        let expires = "expires=" + d.toUTCString();

        let c = cname + "=" + cvalue + ";" + expires + ";path=/";

        if (config.subdomain) {
            c += ";domain=" + config.subdomain + ".minfo.ir";
        }

        document.cookie = c;
    } else {
        let c = cname + "=" + cvalue + ";path=/";

        if (config.subdomain) {
            c += ";domain=" + config.subdomain + ".minfo.ir";
        }

        //creating session cookie
        document.cookie = c;
    }
}

export function getCookie(cname: string) {
    let name = cname + "=";

    let ca = document.cookie.split(";");

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";
}

export function deleteCookie(cname: string) {
    setCookie(cname, "", -5);
}

interface CookieConf {
    subdomain?: string;
}

const cookie = {
    setCookie,
    getCookie,
    deleteCookie,
};

export default cookie;
