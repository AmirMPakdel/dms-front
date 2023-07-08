import React, { Component } from "react";
import styles from "./Login.module.css";
import Dynaform from "@/libs/dynaform/Dynaform";
import LoginCtl from "@/controllers/LoginCtl";
import env from "@/env";
import { Button } from "antd";

export default class Login extends Component<LoginProps, LoginState> {

    controller: LoginCtl;

    constructor(props: LoginProps) {
        super(props);
        this.controller = new LoginCtl(this);
        window.document.title = "ورود | سامانه مدیریت مستندات فنی"
        this.state = {
            username: "apakdel",
            password: "123456789",
            errors:{
                username:null,
                password:null,
            },
        };
    }

    onValueChange = (value: any, key: string) => {
        let obj: any = {};
        obj[key] = value;
        this.setState(obj);
    };

    onSubmit = () => {
        this.controller.submit();
    };

    render(): React.ReactNode {
        return (
            <div className={styles.con}>

                <img
                    className={styles.logo}
                    src={"/android-chrome-192x192.png"}
                />
                <div className={styles.title1}>{"سامانه مدیریت مستندات فنی سازمان انرژی اتمی"}</div>

                <div className={styles.login_tx}>{"ورود کاربران"}</div>

                <Dynaform
                    className={styles.form}
                    formData={{
                        rows: [
                            {
                                columnSizes: [1],
                                elements: [
                                    {
                                        controller: "textinput",
                                        id: "username",
                                        title: "نام کاربری",
                                        value: this.state.username,
                                        error: this.state.errors.username,
                                        onChange: (v) => {
                                            this.onValueChange(v, "username");
                                        },
                                    },
                                ],
                            },
                            {
                                columnSizes: [1],
                                elements: [
                                    {
                                        controller: "textinput",
                                        id: "password",
                                        title: "رمزعبور",
                                        type: "password",
                                        value: this.state.password,
                                        error: this.state.errors.password,
                                        onChange: (v) => {
                                            this.onValueChange(v, "password");
                                        },
                                    },
                                ],
                            },
                            {
                                columnSizes: [1],
                                elements: [
                                    {
                                        controller: "button",
                                        id: "submit",
                                        type: "primary",
                                        title: "ورود",
                                        onClick: this.onSubmit,
                                    },
                                ],
                            },
                        ],
                    }}
                />

                <a className={styles.signup_link}
                href={env.routes.user_signup}>
                    <Button>{"ثبت نام در سامانه مدیریت مستندات فنی"}</Button>
                </a>

            </div>
        );
    }
}

interface LoginState {
    username: string;
    password: string;
    errors:{
        username?: string|null;
        password?: string|null;
    }
}

interface LoginProps {}
