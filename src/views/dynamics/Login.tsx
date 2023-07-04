import React, { Component } from "react";
import styles from "./Login.module.css";
import Dynaform from "@/libs/dynaform/Dynaform";
import LoginCtl from "@/controllers/LoginCtl";

export default class Login extends Component<LoginProps, LoginState> {

    controller: LoginCtl;

    constructor(props: LoginProps) {
        super(props);
        this.controller = new LoginCtl(this);
        this.state = {
            username: "apakdel",
            password: "123456789",
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
            </div>
        );
    }
}

interface LoginState {
    username: string;
    password: string;
}

interface LoginProps {}
