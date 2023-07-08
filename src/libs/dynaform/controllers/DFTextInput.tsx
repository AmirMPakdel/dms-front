import React, { Component } from "react";
import styles from "./DFTextInput.module.css";

export default class DFTextInput extends Component<DFTextInputProps> {
    state = {
        error: "",
    };
    input: any;

    componentDidMount() {
        this.input.addEventListener("keyup", this.onKeyUp);
    }

    onChange = (e: { target: { value: any } }) => {
        if (!this.props.onChange) return;

        let val = e.target.value;

        // if(val == ""){
        //     this.props.onChange(val);
        //     return;
        // }

        // if(this.props.type == "price"){
        //     val = priceFormattoInteger(val);
        //     val = priceFormat(val);
        // }

        // if(this.props.inputFilter){

        //     let {value , error} =
        //     this.props.inputFilter(this.props.value, val);

        //     this.props.onChange(value);

        //     this.setState({error});

        // }else{

        //     this.props.onChange(val);
        // }

        this.props.onChange(val);
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
            add_class += " tbcerri ";
        }

        let m_input_type = "";
        if (this.props.type === "password") {
            m_input_type = "password";
        } else if (this.props.type === "price") {
            m_input_type = "tel";
        }

        return (
            <div
                className={styles.tput_con + " blc3 " + add_class}
                style={{
                    ...{ flex: this.props.flex || "1", borderColor: "#003e29" },
                    ...this.props.style,
                }}
            >
                {/* {
                    this.props.title?
                    <div className={styles.tput_title} style={{...title_st, ...this.props.titleStyle}}>{this.props.title}</div>:null
                } */}

                {this.props.value ? (
                    <div className={styles.top_title + " fdc1"}>
                        {this.props.title
                            ? this.props.title
                            : this.props.placeholder}
                    </div>
                ) : null}

                <input
                    className={
                        styles.tput_input + " bdyt " + this.props.inputClassName
                    }
                    placeholder={this.props.placeholder || this.props.title}
                    value={this.props.value}
                    onChange={this.onChange}
                    style={input_st}
                    disabled={this.props.disabled}
                    maxLength={this.props.maxLength}
                    type={m_input_type}
                    autoComplete="true"
                    // autoComplete={this.props.autocomplete}
                    ref={(r) => (this.input = r)}
                />

                {this.props.error || this.state.error ? (
                    <div className={styles.error + " tcerr"}>
                        {this.props.error || this.state.error}
                    </div>
                ) : null}
            </div>
        );
    }
}

export interface DFTextInputProps {
    key?: string | number;
    flex?: number | string;
    className?: string;
    inputClassName?: string;
    title?: string;
    staticTitle?: string;
    placeholder?: string;
    value?: string;
    type?: string;
    disabled?: boolean;
    maxLength?: number;
    autocomplete?: string;
    style?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    titleStyle?: React.CSSProperties;
    error?: string | null;
    direction?: any;
    opacity?: any;

    ref?: (ref: DFTextInput) => void;
    onChange?: (value: string) => void;
    OnEnterKeyPressed?: () => void;
}
