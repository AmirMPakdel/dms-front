import React, { Component } from "react";
import CloseModalLayout from "./CloseModalLayout";
import styles from "./YesNoModalLayout.module.css";
import { Button, ConfigProvider } from "antd";

export default class YesNoModalLayout extends Component<YesNoModalLayoutProps> {
    constructor(props: YesNoModalLayoutProps) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#003e29",
                    },
                }}
            >
                <CloseModalLayout
                    className={this.props.className}
                    wrapperClass={this.props.wrapperClass}
                    closable={this.props.closable}
                    onClose={this.props.onClose}
                >
                    {this.props.children}

                    <div className={styles.btn_sec + " "}>
                        <Button
                            className={
                                styles.pos_btn +
                                " " +
                                this.props.positiveClassName
                            }
                            onClick={this.props.onPositive}
                            type={
                                this.props.positiveBorderMode == true
                                    ? "default"
                                    : "primary"
                            }
                            loading={this.props.positiveLoading}
                        >
                            {this.props.positiveTitle}
                        </Button>

                        <Button
                            className={
                                styles.neg_btn +
                                " " +
                                this.props.negativeClassName
                            }
                            type={
                                this.props.negativeBorderMode == true
                                    ? "default"
                                    : "primary"
                            }
                            onClick={this.props.onNegative}
                        >
                            {this.props.negativeTitle}
                        </Button>
                    </div>
                </CloseModalLayout>
            </ConfigProvider>
        );
    }
}

interface YesNoModalLayoutProps {
    children?: any;
    className?: string;
    wrapperClass?: string;
    closable?: boolean;
    onClose?: () => void;
    positiveClassName?: string;
    positiveTitle?: string;
    onPositive?: () => void;
    positiveBorderMode?: boolean;
    positiveLoading?: boolean;
    negativeClassName?: string;
    negativeTitle?: string;
    negativeBorderMode?: boolean;
    onNegative?: () => void;
}
