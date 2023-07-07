import { ConfigProvider, Button } from "antd";
import React, { Component } from "react";
import styles from "./DashboardControlBar.module.css";
import {
    FileAddOutlined,
    FolderAddOutlined,
    RollbackOutlined,
} from "@ant-design/icons";

export default class DashboardControlBar extends Component<
    DashboardControlBarProps,
    DashboardControlBarState
> {
    constructor(props: DashboardControlBarProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return (
            <div className={styles.con}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: "#003e29",
                        },
                    }}
                >
                    <Button
                        icon={
                            <FolderAddOutlined style={{ fontSize: "1rem" }} />
                        }
                        title="ایجاد پوشه"
                        className={styles.btn}
                        type="default"
                        onClick={this.props.onCreateFolder}
                        disabled={this.props.currentFolderId===-1}
                    >
                        {"ایجاد پوشه"}
                    </Button>

                    <Button
                        icon={<FileAddOutlined style={{ fontSize: "1rem" }} />}
                        title="آپلود فایل"
                        className={styles.btn}
                        type="default"
                        onClick={this.props.onUploadFile}
                        disabled={this.props.currentFolderId===-1}
                    >
                        {"آپلود فایل"}
                    </Button>

                    <Button
                        icon={<RollbackOutlined style={{ fontSize: "1rem" }} />}
                        title="بازگشت"
                        className={styles.btn}
                        type="default"
                        onClick={this.props.onBack}
                        disabled={this.props.currentFolderId===0}
                    >
                        {"بازگشت"}
                    </Button>
                </ConfigProvider>
            </div>
        );
    }
}

interface DashboardControlBarProps {
    currentFolderId: number;
    
    onCreateFolder: () => void;
    onUploadFile: () => void;
    onBack: () => void;
}

interface DashboardControlBarState {}
