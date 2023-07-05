import React, { Component } from "react";
import styles from "./CloseModalLayout.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { ConfigProvider } from "antd";

export default class CloseModalLayout extends Component<
    CloseModalLayoutProps,
    CloseModalLayoutState
> {
    constructor(props: CloseModalLayoutProps) {
        super(props);
    }

    componentDidMount() {}

    render() {
        let className = "bgw ";
        if (this.props.className) {
            className = "bgw " + this.props.className;
        }

        let wrapperClass = "bgw ";
        if (this.props.wrapperClass) {
            wrapperClass = this.props.wrapperClass;
        }

        return (
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#003e29",
                    },
                }}
            >
                <div className={styles.con + " " + className}>
                    {this.props.closable === false ? null : (
                        <CloseOutlined
                            className={
                                styles.close_btn + " bgw amp_btn md_card_shd"
                            }
                            onClick={this.props.onClose}
                        />
                    )}

                    <div className={styles.wrapper + " " + wrapperClass}>
                        {this.props.children}
                    </div>
                </div>
            </ConfigProvider>
        );
    }
}

interface CloseModalLayoutProps {
    className?: string;
    wrapperClass?: string;
    closable?: boolean;
    children?: React.ReactNode;

    onClose?: () => void;
}

interface CloseModalLayoutState {}
