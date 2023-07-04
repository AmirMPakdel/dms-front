import React, { Component } from "react";
import styles from "./test.module.css";
import Dynaform from "@/libs/dynaform/Dynaform";

/**
 * Props of test Component
 * @typedef Props
 * @property {string} className
 * @property {React.CSSProperties} style
 *
 * @extends {Component<Props>}
 */
export default class test extends Component<TestProps, TestState> {
    constructor(props: TestProps) {
        super(props);
        this.state = {
            select1: null,
            textinput1: "",
            textarea1: "",
            datepicker1: new Date(),
        };
    }

    componentDidMount() {}

    onDateChange = (e: { value: Date }) => {
        console.log(e.value);

        this.setState({ datepicker1: e.value });
    };

    render() {
        return (
            <div className={styles.con}>
                <Dynaform
                    formData={{
                        rows: [
                            {
                                columnSizes: [2, 2, 2, 2, 2],
                                elements: [
                                    {
                                        controller: "button",
                                        id: "btn1",
                                        title: "ثبت",
                                        type: "primary",
                                    },
                                    {
                                        controller: "datepicker",
                                        id: "datepicker1",
                                        onChange: (date: Date) => {
                                            this.setState({
                                                datepicker1: date,
                                            });
                                        },
                                        value: this.state.datepicker1,
                                    },
                                    {
                                        controller: "select",
                                        id: "select1",
                                        options: [
                                            { value: 1, title: "سواری" },
                                            { value: 2, title: "اتوبوس" },
                                        ],
                                        onChange: (item) => {
                                            this.setState({ select1: item });
                                        },
                                        value: this.state.select1,
                                    },
                                    {
                                        controller: "space",
                                        id: "space1",
                                    },
                                    {
                                        controller: "textinput",
                                        id: "textinput1",
                                        title: "نام خانوادگی",
                                        onChange: (value) => {
                                            this.setState({
                                                textinput1: value,
                                            });
                                        },
                                        value: this.state.textinput1,
                                    },
                                ],
                            },
                            {
                                columnSizes:[2,2,2,2],
                                elements:[
                                    {
                                        controller:"textarea",
                                        id:"textarea1",
                                        title:"توضیحات",
                                        onChange: (value) => {
                                            this.setState({textarea1:value})
                                        },
                                        value: this.state.textarea1
                                    }
                                ]
                            }
                        ],
                    }}
                />
            </div>
        );
    }
}

interface TestProps {}

interface TestState {
    datepicker1: Date;
    select1: any | null;
    textinput1: string;
    textarea1: string;
}
