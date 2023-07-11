import React, { Component } from "react";
import styles from "./UploadFileModal.module.css";
import chest from "@/libs/utils/chest";
import CloseModalLayout from "../CloseModalLayout";
import Dynaform from "@/libs/dynaform/Dynaform";
import PostRequest from "@/libs/rest/PostRequest";
import { getCookie } from "@/libs/utils/cookie";
import env from "@/env";
import { Object2FormData } from "@/libs/utils/helpers";

export default class UploadFileModal extends Component<
    UploadFileModalProps,
    UploadFileModalState
> {
    constructor(props: UploadFileModalProps) {
        super(props);
        this.state = {
            name: "",
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
        if(!file){
            errors.file = "فایل انتخاب نشده";
            is_valid = false;
        }

        this.setState({errors});
        return is_valid;
    }

    onSubmit = () => {

        if(!this.checkValidation()){
            return;
        }

        let type = getType(this.state.file)

        let params = Object2FormData({
            token: getCookie(env.cookies.user_token),
            name: this.state.name,
            type,
            parent_id: this.props.currentFolderId,
            file: this.state.file,
        });

        PostRequest("/api/dash/uploadFile", params, {FormData:true}).then((result) => {
            console.log(result);
            if (result.rc == env.statusList.SUCCESS.code) {
                chest.openNotification("فایل بارگذاری شد", "success");
                if(this.props.onCreate){
                    this.props.onCreate();
                }
                this.onCancel();
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
                <div className={styles.title}>{"بارگذاری فایل"}</div>

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
                                        title: "نام فایل",
                                        onChange: (name) => {
                                            this.setState({name});
                                        },
                                        OnEnterKeyPressed: this.onSubmit,
                                        value: this.state.name,
                                        error: this.state.errors.name,
                                    },
                                ],
                            },
                            {
                                columnSizes: [1],
                                elements: [
                                    {
                                        controller: "upload",
                                        id: "file",
                                        title: "آپلود فایل",
                                        onChange: this.onFileChange,
                                        error: this.state.errors.file,
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

interface UploadFileModalState {
    name: string;
    file: File|null;
    errors: {
        name?: string|null,
        file?: string|null,
    }
}

interface UploadFileModalProps {
    currentFolderId: number;
    onCreate?: () => void;
    onCancel?: () => void;
}

function getType(file: File | null) {

    if(file != null){
        if(file.type == "application/md"){
            return "md";
        }else if(file.type == "application/pdf"){
            return "pdf";
        }else if(file.type == "image/jpeg"){
            return "jpg";
        }else if(file.type == "image/png"){
            return "png";
        }else if(file.type == "image/gif"){
            return "gif";
        }else if(file.type == "video/mp4"){
            return "mp4";
        }
    }
    return "md";
}

