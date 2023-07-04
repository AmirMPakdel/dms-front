import React, { Component } from "react";
import styles from "./DeleteFileModal.module.css";
import YesNoModalLayout from "../YesNoModalLayout";
import chest from "@/libs/utils/chest";
import PostRequest from "@/libs/rest/PostRequest";
import { getCookie } from "@/libs/utils/cookie";
import env from "@/env";


export default class DeleteFileModal extends Component<DeleteFileModalProps, DeleteFileModalState> {

    constructor(props: DeleteFileModalProps) {
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
            token: getCookie(env.cookies.user_token),
            file_id: this.props.data.file.id,
        }

        PostRequest("/api/file/delete", params).then(res => {

            if (res.rc == env.statusList.SUCCESS.code) {

                this.onClose();
                this.props.onSuccess();
                if (this.props.data.file.type == "folder") {
                    chest.openNotification("پوشه مورد نظر حذف شد.", "success");
                } else {
                    chest.openNotification("فایل مورد نظر حذف شد.", "success");
                }
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
                    {
                        this.props.data.file.type != "folder" ?
                            "آیا از حذف این فایل اطمینان دارید؟" :
                            "آیا از حذف این پوشه و محتویات درون آن اطمینان دارید؟"

                    }
                </div>

            </YesNoModalLayout>
        )
    }
}

interface DeleteFileModalProps {
    data: any;
    onSuccess: () => void;
}

interface DeleteFileModalState {

}