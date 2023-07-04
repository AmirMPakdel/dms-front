import React, { Component } from "react";
import styles from "./DFSpace.module.css";
import { Checkbox } from "antd";
import type { CheckboxValueType, CheckboxOptionType } from 'antd/es/checkbox/Group';

export default class DFSpace extends Component<DFSpaceProps> {
    render() {
        return (
            <div
                className={styles.con}
                style={{ flex: this.props.flex || "1" }}
            >
                <Checkbox.Group
                options={this.props.options}
                value={this.props.value}
                onChange={this.props.onChange}/>
            </div>
        );
    }
}

export interface DFSpaceProps {
    key?: string | number;
    flex?: number | string;
    className?: string;
    value?: CheckboxValueType[];
    options?: CheckboxOptionType[];

    onChange?: (checkedValues: CheckboxValueType[])=>void;
}
