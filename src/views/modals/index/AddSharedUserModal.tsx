import React, { Component } from "react";
import styles from "./AddSharedUserModal.module.css";
import chest from "@/libs/utils/chest";
import CloseModalLayout from "../CloseModalLayout";
import Dynaform from "@/libs/dynaform/Dynaform";
import PostRequest from "@/libs/rest/PostRequest";
import env from "@/env";

export default class AddSharedUserModal extends Component<
    AddSharedUserModalProps,
    AddSharedUserModalState
> {
    constructor(props: AddSharedUserModalProps) {
        super(props);
        this.state = {
            username: "",
            errors:{
                username: null,
            }
        };
    }

    onCancel = () => {
        if (this.props.onCancel) {
            this.props.onCancel();
        } else {
            chest.ModalLayout.visibleToggle(2, false);
        }
    };

    checkValidation = ()=>{

        let errors:any = {username: null};
        let is_valid = true;
        let {username} = this.state;

        if(username.length<3){
            errors.username = "نام کاربری نامعتبر";
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
            username: this.state.username,
            file_id: this.props.data.file_id,
        }
        PostRequest("/api/file/addShareUser", params, { addUserToken: true }).then(res => {

            if (res.rc == env.statusList.SUCCESS.code) {
                chest.openNotification("فایل با کاربر به اشتراک گذاشته شد", "success");
                chest.ModalLayout.visibleToggle(2, false);
                this.props.updateList();
            }
        });
    }

    render() {
        return (
            <CloseModalLayout
                className={styles.con + " bgw xl_card_shd"}
                wrapperClass={styles.wrapper}
                onClose={this.onCancel}
            >
                <div className={styles.title}>{"اضافه کردن کاربر به لیست اشتراک این فایل"}</div>

                <Dynaform
                    style={{ border: "none" }}
                    formData={{
                        rows: [
                            {
                                columnSizes: [1],
                                elements: [
                                    {
                                        controller: "textinput",
                                        id: "username",
                                        title: "نام کاربری",
                                        onChange: (username) => {
                                            this.setState({ username });
                                        },
                                        error:this.state.errors.username,
                                        OnEnterKeyPressed: this.onSubmit,
                                        value: this.state.username,
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

interface AddSharedUserModalState {
    username: string;
    errors: {
        username?: string|null,
    }
}

interface AddSharedUserModalProps {
    data: any;
    onCancel?: () => void;
    updateList: () => void;
}
