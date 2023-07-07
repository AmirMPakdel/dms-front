import React, { Component } from "react";
import styles from "./DeleteSharedFileModal.module.css";
import YesNoModalLayout from "../YesNoModalLayout";
import chest from "@/libs/utils/chest";
import PostRequest from "@/libs/rest/PostRequest";
import { getCookie } from "@/libs/utils/cookie";
import env from "@/env";


export default class DeleteSharedFileModal extends Component<DeleteSharedFileModalProps, DeleteSharedFileModalState> {

    constructor(props: DeleteSharedFileModalProps) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }

    onClose = () => {

        chest.ModalLayout.closeAndDelete(1);
    }

    onDelete = () => {

        let params = {
            shared_node_id: this.props.data.id,
            type: "user",
        }

        PostRequest("/api/file/deleteSharedUser", params, { addUserToken: true }).then(res => {

            if (res.rc == env.statusList.SUCCESS.code) {

                this.onClose();
                this.props.onSuccess();
                chest.openNotification("اشتراک گذاری فایل لغو شد.", "success");
            }
        });
    }

    render() {
        return (
            <YesNoModalLayout
                wrapperClass={styles.wrapper}
                closable={true}
                onClose={this.onClose}
                positiveTitle="حذف"
                negativeTitle="انصراف"
                onNegative={this.onClose}
                onPositive={this.onDelete}
                negativeBorderMode={true}>

                <div className={styles.text}>
                    {"آیا از لغو اشتراک گذاری این فایل اطمینان دارید؟"}
                </div>

            </YesNoModalLayout>
        )
    }
}

interface DeleteSharedFileModalProps {
    data: any;
    onSuccess: () => void;
}

interface DeleteSharedFileModalState {

}