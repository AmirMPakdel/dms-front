import React, { Component } from "react";
import styles from "./DFDatePicker.module.css";
import JDatePicker from "@/libs/persianCalendar/JDatePicker";

export default class DFDatePicker extends Component<DFDatePickerProps> {
    onChange = (e: { value: Date }) => {
        if(this.props.onChange){
            this.props.onChange(e.value);
        }
    };

    render(): React.ReactNode {
        return (
            <div
                className={styles.con}
                style={{ flex: this.props.flex || "1" }}
            >
                <JDatePicker
                    className={styles.input}
                    value={this.props.value}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

export interface DFDatePickerProps {
    key?: string | number;
    ref?: (ref: DFDatePicker) => void;
    flex?: number | string;
    value: Date;
    onChange?: (value: Date) => void;
}
