import React, { Component } from "react";
import styles from "./PublicAccessLinkModal.module.css";
import chest from "@/libs/utils/chest";
import CloseModalLayout from "../CloseModalLayout";
import Loading from "@/views/components/global/Loading";
import { Button, Input } from "antd";
import { getCookie } from "@/libs/utils/cookie";
import PostRequest from "@/libs/rest/PostRequest";
import env from "@/env";

export default class PublicAccessLinkModal extends Component<
    PublicAccessLinkModalProps,
    PublicAccessLinkModalState
> {
    constructor(props: PublicAccessLinkModalProps) {
        super(props);
        this.state = {
            loading: true,
            link: "",
        };
    }

    componentDidMount(): void {
        let params = {
            token: getCookie(env.cookies.user_token),
            file_id: this.props.data.file.id,
        };

        PostRequest("/api/file/getPublicUrl", params).then((res) => {
            this.setState({
                loading: false,
                link:
                    env.server_domain +
                    env.urls.get_file_from_access_link +
                    "/" +
                    res.data.uuid,
            });
        });
    }

    onCopy = () => {
        navigator.clipboard.writeText(this.state.link);
        chest.openNotification("لینک عمومی کپی شد", "success");
    };

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
                {this.state.loading ? (
                    <Loading />
                ) : (
                    <>
                        <div className={styles.title}>
                            {"لینک دسترسی عمومی به فایل"}
                        </div>

                        <Input
                            className={styles.input}
                            value={this.state.link}
                        />

                        <Button
                            className={styles.copy}
                            onClick={this.onCopy}
                            type="primary"
                        >
                            {"کپی"}
                        </Button>
                    </>
                )}
            </CloseModalLayout>
        );
    }
}

interface PublicAccessLinkModalState {
    loading: boolean;
    link: string;
}

interface PublicAccessLinkModalProps {
    data: any;
    onCancel?: () => void;
}
