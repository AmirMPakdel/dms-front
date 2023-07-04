import React, { Component } from "react";
import styles from "./DFButton.module.css";
import { ConfigProvider, Button } from "antd";

export default class DFButton extends Component<DFButtonProps> {
    render(): React.ReactNode {
        console.log(this.props.flex);

        return (
            <div
                className={styles.con}
                style={{ flex: this.props.flex || "1" }}
            >
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: "#003e29",
                        },
                    }}
                >
                    <Button
                        className={styles.btn_con}
                        onClick={this.props.onClick}
                        type={this.props.type}
                    >
                        {this.props.title}
                    </Button>
                </ConfigProvider>
            </div>
        );
    }
}

export interface DFButtonProps {
    key?: string | number;
    ref?: (ref: DFButton) => void;
    flex?: number | string;
    title: string;
    onClick?:
        | (React.MouseEventHandler<HTMLAnchorElement> &
              React.MouseEventHandler<HTMLButtonElement>)
        | undefined;
    type?:
        | "link"
        | "text"
        | "ghost"
        | "default"
        | "primary"
        | "dashed"
        | undefined;
}
