

export function Object2FormData(object: any) {

    let data = new FormData();

    Object.keys(object).forEach(e => {
        data.set(e, object[e]);
    });

    return data;
}

export function getParamByName(name: string, default_value: string | null = null, url: string = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return default_value;
    if (!results[2]) return default_value;
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}