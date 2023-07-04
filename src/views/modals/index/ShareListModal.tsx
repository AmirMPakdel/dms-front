import React, { Component } from "react";
import styles from "./ShareListModal.module.css";
import chest from "@/libs/utils/chest";
import CloseModalLayout from "../CloseModalLayout";

export default class ShareListModal extends Component<
    ShareListModalProps,
    ShareListModalState
> {
    constructor(props: ShareListModalProps) {
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

interface ShareListModalState {
}

interface ShareListModalProps {
    currentFolderId: number;
    onCancel?: () => void;
}
