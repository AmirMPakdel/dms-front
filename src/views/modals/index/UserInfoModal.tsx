import React, { Component } from "react";
import styles from "./UserInfoModal.module.css";
import chest from "@/libs/utils/chest";
import CloseModalLayout from "../CloseModalLayout";
import Loading from "@/views/components/global/Loading";
import PostRequest from "@/libs/rest/PostRequest";
import env from "@/env";

export default class UserInfoModal extends Component<
    UserInfoModalProps,
    UserInfoModalState
> {
    constructor(props: UserInfoModalProps) {
        super(props);
        this.state = {
            loading: true,
            username:"",
            firstname:"",
            lastname:"",
            national_code:"",
        };
    }

    componentDidMount(): void {

        this.loadList();
    }

    loadList = () => {

        let params = {}
        this.setState({ loading: true });
        PostRequest("/api/user/loadUserInfo", params, { addUserToken: true }).then(res => {

            if (res.rc == env.statusList.SUCCESS.code) {
                this.setState({
                    loading: false,
                    username: res.data.username,
                    firstname: res.data.firstname,
                    lastname: res.data.lastname,
                    national_code: res.data.national_code,
                });
            }
        });
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
                <div className={styles.title}>
                    {"اطلاعات پایه کاربر"}
                </div>

                {this.state.loading ? (
                    <Loading style={{ minHeight: "20rem" }} scale={0.7} />
                ) : (
                    <>
                        <div className={styles.row}>
                            <div>{"نام کاربری"}</div>
                            <div>{this.state.username}</div>
                        </div>
                        <div className={styles.row}>
                            <div>{"نام"}</div>
                            <div>{this.state.firstname}</div>
                        </div>
                        <div className={styles.row}>
                            <div>{"نام خانوادگی"}</div>
                            <div>{this.state.lastname}</div>
                        </div>
                        <div className={styles.row}>
                            <div>{"کد ملی"}</div>
                            <div>{this.state.national_code}</div>
                        </div>
                    </>
                )}
            </CloseModalLayout>
        );
    }
}

interface UserInfoModalState {
    loading: boolean;
    username: string;
    firstname: string;
    lastname: string;
    national_code: string;
}

interface UserInfoModalProps {
    onCancel?: () => void;
}
