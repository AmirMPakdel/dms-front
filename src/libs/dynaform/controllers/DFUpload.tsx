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

        if (file.size < 25 * 1024 * 1024) {

            this.props.onChange(file);
        } else {
            chest.openNotification("فایل انتخابی حجم بالای 25 مگابایت دارد", "error");
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

        let addConClass = "";

        if(this.props.error){
            addConClass+=" tbcerri";
        }

        return (
            <div
                className={styles.con+" "+addConClass}
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

                {this.props.error?(
                    <div className={styles.error + " tcerr"}>
                        {this.props.error}
                    </div>
                ) : null}

            </div>
        );
    }
}

export interface DFUploadProps {
    key?: string | number;
    ref?: (ref: DFUpload) => void;
    flex?: number | string;
    title: string;
    error?: string|null;
    onChange: (file:File)=>void;
}
