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
        };
    }

    onCancel = () => {
        if (this.props.onCancel) {
            this.props.onCancel();
        } else {
            chest.ModalLayout.visibleToggle(1, false);
        }
    };

    onSubmit = () => {
        let params = {
            token: getCookie(env.cookies.user_token),
            name: this.state.name,
            type: "folder",
            parent_id: this.props.currentFolderId,
        };

        PostRequest("/api/dash/createFolder", params).then((result) => {
            console.log(result);
            if (result.rc == env.statusList.SUCCESS.code) {
                chest.openNotification("پوشه ایجاد شد", "success");
                if (this.props.onCreate) {
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
}

interface CreateFolderModalProps {
    currentFolderId: number;
    onCreate?: () => void;
    onCancel?: () => void;
}
