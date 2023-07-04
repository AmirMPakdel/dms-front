import React, { Component } from "react";
import styles from "./DFTextArea.module.css";

export default class DFTextArea extends Component<DFTextAreaProps>{
    state = {
        error: "",
    };
    input: any;

    componentDidMount() {
        this.input.addEventListener("keyup", this.onKeyUp);
    }

    onChange = (e: { target: { value: string } }) => {
        if (this.props.onChange) {
            let val = e.target.value;
            this.props.onChange(val);
        }
    };

    centerize = () => {
        this.input.scrollIntoView({
            behavior: "auto",
            block: "center",
            inline: "center",
        });
    };

    onKeyUp = (e: { keyCode: number; preventDefault: () => void }) => {
        if (e.keyCode === 13) {
            e.preventDefault();

            if (this.props.OnEnterKeyPressed) {
                this.props.OnEnterKeyPressed();
            }
        }
    };

    render() {
        let title: string | undefined = "";
        let title_st: any = {};
        let input_st = { ...this.props.inputStyle };
        let add_class = "";

        if (this.props.className) {
            add_class += this.props.className + " ";
        }

        if (this.props.direction) {
            input_st.direction = this.props.direction;
        }

        if (!this.props.value && !this.props.staticTitle) {
            title_st.opacity = 0;
            title = this.props.title;
        }

        if (this.props.error) {
            add_class += " beci ";
        }


        return (
            <div
                className={styles.tput_con + " blc3 " + add_class}
                style={{
                    ...{ flex: this.props.flex || "1", borderColor: "#003e29" },
                    ...this.props.style,
                }}
            >

                {this.props.value ? (
                    <div className={styles.top_title + " fdc1"}>
                        {this.props.title
                            ? this.props.title
                            : this.props.placeholder}
                    </div>
                ) : null}

                <textarea
                    className={
                        styles.tput_input + " bdyt " + this.props.inputClassName
                    }
                    placeholder={this.props.placeholder || this.props.title}
                    value={this.props.value}
                    onChange={this.onChange}
                    style={input_st}
                    disabled={this.props.disabled}
                    maxLength={this.props.maxLength}
                    autoComplete={this.props.autocomplete}
                    ref={(r) => (this.input = r)}
                />

                {this.props.error || this.state.error ? (
                    <div className={styles.error + " fec"}>
                        {this.props.error || this.state.error}
                    </div>
                ) : null}
            </div>
        );
    }
}

export interface DFTextAreaProps {
    key?: string | number;
    flex?: number | string;
    className?: string;
    inputClassName?: string;
    title?: string;
    staticTitle?: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    maxLength?: number;
    autocomplete?: string;
    style?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    titleStyle?: React.CSSProperties;
    error?: string;
    direction?: any;
    opacity?: any;

    ref?: (ref: DFTextArea) => void;
    onChange?: (value: string) => void;
    OnEnterKeyPressed?: () => void;
}
