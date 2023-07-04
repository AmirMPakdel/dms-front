export default class Observer {
    static observers: any = {
        onResize: [],
        onAuthenticate: [],
        onUserChange: [],
        onSideMenuToggle: [],
        onStudentChange: [],
        onFooterChange: [],
        onUrlStateChange: [],
        onSiteInfoChange: [],
    };

    static add(name: string, func: Function) {
        Observer.observers[name].push(func);
    }

    static remove(name: string, func: Function) {
        Observer.observers[name].forEach((e: Function, i: number) => {
            if (e === func) {
                Observer.observers[name].splice(i, 1);
            }
        });
    }

    static execute(name: string, ...params: any) {
        if (!Observer.observers[name]) {
            console.log("No such Observer name");
            return;
        }

        Observer.observers[name].forEach((func: Function) => {
            if (typeof func === "function") {
                func(...params);
            }
        });
    }
}
