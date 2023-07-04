import React, { Component } from "react";
import styles from "./DFUpload.module.css";
import { Button, ConfigProvider, Upload, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/es/upload";
import chest from "@/libs/utils/chest";

export default class DFUpload extends Component<DFUploadProps> {
    input: any;

    constructor(props: DFUploadProps) {
        super(props);
        this.state = {
            title: "",
            is_free: 0,
            can_continue: false,
            file: null,
            file_name: "",
            upload_percent: 0,
            status: "select",
            upload_loading: false,
        };
    }

    componentDidMount() {}

    onSelectFile = () => {
        this.input.click();
    };

    onInputClick = () => {
        this.input.files = null;
        this.input.value = null;
    };

    onInputChange = (e: any) => {
        let file = e.target.files[0];

        console.log(file);

        if (file.size < 1024 * 1024 * 1024) {
            // this.setState({
            //     file,
            //     file_name: file.name,
            //     status: "ready",
            // });

            this.props.onChange(file);
        } else {
            chest.openNotification("فایل انتخابی حجم بالای 1 گیگابایت دارد", "error");
        }
    };

    onRemoveFile = () => {
        this.setState({
            file: null,
            file_name: "",
            status: "select",
        });
    };

    render(): React.ReactNode {
        return (
            <div
                className={styles.con}
                style={{ flex: this.props.flex || "1" }}
            >
                <Button style={{height:"100%", width:"100%"}}
                    className={styles.upload_btn}
                    onClick={this.onSelectFile}
                >
                    {"انتخاب فایل"}
                </Button>

                <input
                    style={{ display: "none" }}
                    onClick={this.onInputClick}
                    ref={(r) => (this.input = r)}
                    onChange={this.onInputChange}
                    type={"file"}
                    accept={".md, .pdf, .jpg, .png, .gif, .mp4"}
                />
            </div>
        );
    }
}

export interface DFUploadProps {
    key?: string | number;
    ref?: (ref: DFUpload) => void;
    flex?: number | string;
    title: string;

    onChange: (file:File)=>void;
}
