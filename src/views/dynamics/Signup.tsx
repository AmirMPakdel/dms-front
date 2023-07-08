import React, { Component } from "react";
import styles from "./Signup.module.css";
import Dynaform from "@/libs/dynaform/Dynaform";
import SignupCtl from "@/controllers/SignupCtl";
import { Button } from "antd";
import env from "@/env";

export default class Signup extends Component<SignupProps, SignupState> {
    controller: SignupCtl;
    constructor(props: SignupProps) {
        super(props);
        this.controller = new SignupCtl(this);
        window.document.title = "ثبت نام | سامانه مدیریت مستندات فنی"
        this.state = {
            username: "apakdel",
            firstname: "امیر",
            lastname: "پاکدل",
            national_code: "2581095598",
            password: "123456789",
            password_repeated: "123456789",
            errors:{
                username:null,
                firstname:null,
                lastname:null,
                national_code:null,
                password:null,
                password_repeated:null,
            }
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

                <div className={styles.login_tx}>{"ثبت نام کاربران"}</div>

                <Dynaform
                    className={styles.form}
                    formData={{
                        rows: [
                            {
                                columnSizes: [1, 1],
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
                                    {
                                        controller: "textinput",
                                        id: "national_code",
                                        title: "کدملی",
                                        type: "national_code",
                                        value: this.state.national_code,
                                        error: this.state.errors.national_code,
                                        onChange: (v) => {
                                            this.onValueChange(
                                                v,
                                                "national_code"
                                            );
                                        },
                                    },
                                ],
                            },
                            {
                                columnSizes: [1, 1],
                                elements: [
                                    {
                                        controller: "textinput",
                                        id: "firstname",
                                        title: "نام",
                                        type: "firstname",
                                        value: this.state.firstname,
                                        error: this.state.errors.firstname,
                                        onChange: (v) => {
                                            this.onValueChange(v, "firstname");
                                        },
                                    },
                                    {
                                        controller: "textinput",
                                        id: "lastname",
                                        title: "نام خانوادگی",
                                        type: "lastname",
                                        value: this.state.lastname,
                                        error: this.state.errors.lastname,
                                        onChange: (v) => {
                                            this.onValueChange(v, "lastname");
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
                                    {
                                        controller: "textinput",
                                        id: "password_repeated",
                                        title: "تکرار رمزعبور",
                                        type: "password",
                                        value: this.state.password_repeated,
                                        error: this.state.errors.password_repeated,
                                        onChange: (v) => {
                                            this.onValueChange(
                                                v,
                                                "password_repeated"
                                            );
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
                                        title: "ثبت نام",
                                        onClick: this.onSubmit,
                                    },
                                ],
                            },
                        ],
                    }}
                />

                <a className={styles.signup_link}
                    href={env.routes.user_login}>
                    <Button>{"قبلا ثبت نام کرده ام"}</Button>
                </a>

            </div>
        );
    }
}

interface SignupState {
    username: string;
    firstname: string;
    lastname: string;
    national_code: string;
    password: string;
    password_repeated: string;
    errors:{
        username?: string|null,
        firstname?: string|null,
        lastname?: string|null,
        national_code?: string|null,
        password?: string|null,
        password_repeated?: string|null,
    };
}

interface SignupProps { }
