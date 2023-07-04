import React, { Component } from "react";
import styles from "./DFSpace.module.css";

export default class DFSpace extends Component<DFSpaceProps> {
    render() {
        return (
            <div
                className={styles.con}
                style={{ flex: this.props.flex || "1" }}
            ></div>
        );
    }
}

export interface DFSpaceProps {
    key?: string | number;
    flex?: number | string;
    className?: string;
}
