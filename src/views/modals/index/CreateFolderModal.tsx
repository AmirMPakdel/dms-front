import React, { Component } from "react";
import styles from "./CreateFolderModal.module.css";
import chest from "@/libs/utils/chest";
import CloseModalLayout from "../CloseModalLayout";
import Dynaform from "@/libs/dynaform/Dynaform";
import PostRequest from "@/libs/rest/PostRequest";
import { getCookie } from "@/libs/utils/cookie";
import env from "@/env";

export default class CreateFolderModal extends Component<
    CreateFolderModalProps,
    CreateFolderModalState
> {
    constructor(props: CreateFolderModalProps) {
        super(props);
        this.state = {
            name: "",
            errors:{
                name: null,
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

    checkValidation = ()=>{

        let errors:any = {name: null};
        let is_valid = true;
        let {name} = this.state;

        if(name.length<1){
            errors.name = "نام پوشه خالی است";
            is_valid = false;
        }

        this.setState({errors});
        return is_valid;
    }

    onSubmit = () => {

        if(!this.checkValidation()){
            return;
        }

        let params = {
            token: getCookie(env.cookies.user_token),
            name: this.state.name,
            type: "folder",
            parent_id: this.props.currentFolderId,
        };

        PostRequest("/api/dash/createFolder", params).then((result) => {
            if (result.rc == env.statusList.SUCCESS.code) {
                chest.openNotification("پوشه ایجاد شد", "success");
                this.props.onCreate();
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
                <div className={styles.title}>{"ایجاد پوشه جدید"}</div>

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
                                        title: "نام پوشه",
                                        onChange: (name) => {
                                            this.setState({ name });
                                        },
                                        error:this.state.errors.name,
                                        OnEnterKeyPressed: this.onSubmit,
                                        value: this.state.name,
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

interface CreateFolderModalState {
    name: string;
    errors: {
        name?: string|null,
    }
}

interface CreateFolderModalProps {
    currentFolderId: number;
    onCreate: () => void;
    onCancel?: () => void;
}
