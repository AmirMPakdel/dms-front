import React, { Component } from "react";
import styles from "./Signup.module.css";
import Dynaform from "@/libs/dynaform/Dynaform";
import SignupCtl from "@/controllers/SignupCtl";

export default class Signup extends Component<SignupProps, SignupState> {
    controller: SignupCtl;
    constructor(props: SignupProps) {
        super(props);
        this.controller = new SignupCtl(this);
        this.state = {
            username: "apakdel",
            firstname: "امیر",
            lastname: "پاکدل",
            national_code: "2581095598",
            password: "123456789",
            password_repeated: "123456789",
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
                                columnSizes: [1, 1],
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
                                    {
                                        controller: "textinput",
                                        id: "national_code",
                                        title: "کدملی",
                                        type: "national_code",
                                        value: this.state.national_code,
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
}

interface SignupProps {}
