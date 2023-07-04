import React, { Component } from "react";
import styles from "./RenameFileModal.module.css";
import chest from "@/libs/utils/chest";
import CloseModalLayout from "../CloseModalLayout";
import Dynaform from "@/libs/dynaform/Dynaform";
import PostRequest from "@/libs/rest/PostRequest";
import { getCookie } from "@/libs/utils/cookie";
import env from "@/env";

export default class RenameFileModal extends Component<
    RenameFileModalProps,
    RenameFileModalState
> {
    constructor(props: RenameFileModalProps) {
        super(props);
        this.state = {
            name: props.data.file.name,
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
            file_id: this.props.data.file.id,
            name: this.state.name,
        };

        PostRequest("/api/file/rename", params).then((result) => {
            if (result.rc == env.statusList.SUCCESS.code) {
                chest.openNotification("نام جدید ثبت شد", "success");
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
                <div className={styles.title}>{"ویرایش نام"}</div>

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

interface RenameFileModalState {
    name: string;
}

interface RenameFileModalProps {
    data: any;
    onRename: () => void;
    onCancel?: () => void;
}
