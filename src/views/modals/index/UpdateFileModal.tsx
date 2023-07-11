import React, { Component } from "react";
import styles from "./UpdateFileModal.module.css";
import chest from "@/libs/utils/chest";
import CloseModalLayout from "../CloseModalLayout";
import Dynaform from "@/libs/dynaform/Dynaform";
import PostRequest from "@/libs/rest/PostRequest";
import { getCookie } from "@/libs/utils/cookie";
import env from "@/env";
import { Object2FormData } from "@/libs/utils/helpers";

export default class UpdateFileModal extends Component<
    UpdateFileModalProps,
    UpdateFileModalState
> {
    constructor(props: UpdateFileModalProps) {
        super(props);
        this.state = {
            name: props.data.file.name,
            file: null,
            errors:{
                name: null,
                file: null,
            }
        };
    }

    onCancel = () => {
        if (this.props.onCancel) {
            this.props.onCancel();
        } else {
            chest.ModalLayout.visibleToggle(1, false);
        }
    };

    onFileChange = (file:File)=>{

        this.setState({file});
    }

    checkValidation = ()=>{

        let errors:any = {name: null, file:null};
        let is_valid = true;
        let {name, file} = this.state;

        if(name.length<1){
            errors.name = "نام فایل خالی است";
            is_valid = false;
        }

        this.setState({errors});
        return is_valid;
    }

    onSubmit = () => {

        if(!this.checkValidation()){
            return;
        }

        let params = Object2FormData({
            token: getCookie(env.cookies.user_token),
            file_id: this.props.data.file.id,
            name: this.state.name,
            file: this.state.file?this.state.file:undefined,
        });

        PostRequest("/api/file/update", params, {FormData:true}).then((result) => {
            if (result.rc == env.statusList.SUCCESS.code) {
                chest.openNotification("نام آیتم ویرایش شد", "success");
                this.props.onRename();
                chest.ModalLayout.visibleToggle(1, false);
            }
        });
    };

    render() {
        return (
            <CloseModalLayout
                className={styles.con + " bgw xl_card_shd"}
                wrapperClass={styles.wrapper}
                onClose={this.onCancel}
            >
                <div className={styles.title}>{"ویرایش"}</div>

                <Dynaform
                    style={{ border: "none" }}
                    formData={{
                        rows: [
                            {
                                columnSizes: [1],
                                elements: [
                                    {
                                        controller: "textinput",
                                        id: "name",
                                        title: "نام جدید",
                                        onChange: (name) => {
                                            this.setState({ name });
                                        },
                                        OnEnterKeyPressed: this.onSubmit,
                                        value: this.state.name,
                                        error: this.state.errors.name,
                                    },
                                ],
                            },
                            {
                                display: this.props.data.file.type=="folder"?false:true,
                                columnSizes: [1],
                                elements: [
                                    {
                                        controller: "upload",
                                        id: "file",
                                        title: "آپلود فایل فایل جدید",
                                        onChange: this.onFileChange,
                                    },
                                ],
                            },
                            {
                                columnSizes: [1],
                                elements: [
                                    {
                                        controller: "button",
                                        id: "submit",
                                        title: "ثبت",
                                        type: "primary",
                                        onClick: this.onSubmit,
                                    },
                                ],
                            },
                        ],
                    }}
                />

            </CloseModalLayout>
        );
    }
}

interface UpdateFileModalState {
    name: string;
    file: any;
    errors: {
        name?: string|null,
        file?: string|null,
    }
}

interface UpdateFileModalProps {
    data: any;
    onRename: () => void;
    onCancel?: () => void;
}
