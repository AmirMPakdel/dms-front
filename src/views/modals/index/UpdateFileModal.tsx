import React, { Component } from "react";
import styles from "./UpdateFileModal.module.css";
import chest from "@/libs/utils/chest";
import CloseModalLayout from "../CloseModalLayout";

export default class UpdateFileModal extends Component<
    UpdateFileModalProps,
    UpdateFileModalState
> {
    constructor(props: UpdateFileModalProps) {
        super(props);
        this.state = {
        };
    }

    onCancel = () => {
        if (this.props.onCancel) {
            this.props.onCancel();
        } else {
            chest.ModalLayout.visibleToggle(1, false);
        }
    };

    render() {
        return (
            <CloseModalLayout
                className={styles.con + " bgw xl_card_shd"}
                wrapperClass={styles.wrapper}
                onClose={this.onCancel}
            >
                <div className={styles.title}>{"ایجاد پوشه جدید"}</div>
                
            </CloseModalLayout>
        );
    }
}

interface UpdateFileModalState {
}

interface UpdateFileModalProps {
    currentFolderId: number;
    onCancel?: () => void;
}
