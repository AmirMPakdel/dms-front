import React, { Component } from "react";
import styles from "./ShareListModal.module.css";
import chest from "@/libs/utils/chest";
import CloseModalLayout from "../CloseModalLayout";
import { Button, Table } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import AddSharedUserModal from "./AddSharedUserModal";
import Loading from "@/views/components/global/Loading";
import PostRequest from "@/libs/rest/PostRequest";
import env from "@/env";

export default class ShareListModal extends Component<
    ShareListModalProps,
    ShareListModalState
> {
    constructor(props: ShareListModalProps) {
        super(props);
        this.state = {
            loading: true,
            list: [],
        };
    }

    componentDidMount(): void {
        
        let params = {
            file_id: this.props.data.file_id
        }
        PostRequest("/api/file/getFileSharedUsersCtl", params, {addUserToken:true}).then(res=>{

            if(res.rc == env.statusList.SUCCESS.code){
                
                this.setState({
                    loading: false,
                    list: res.data.list,
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

    onAddUser = () => {
        chest.ModalLayout.setAndShowModal(
            2,
            <AddSharedUserModal data={this.props.data} />
        );
    };

    render() {
        return (
            <CloseModalLayout
                className={styles.con + " bgw xl_card_shd"}
                wrapperClass={styles.wrapper}
                onClose={this.onCancel}
            >
                <div className={styles.title}>
                    {"لیست افراد فایل با آنها به اشتراک گذاشته شده است"}
                </div>

                {this.state.loading ? (
                    <Loading style={{minHeight:"20rem"}} scale={0.7}/>
                ) : (
                    <>
                        <div className={styles.controller_con}>
                            <Button
                                className={styles.add}
                                icon={
                                    <PlusCircleFilled
                                        style={{
                                            color: "green",
                                            fontSize: "1.1rem",
                                        }}
                                    />
                                }
                                onClick={this.onAddUser}
                            >
                                {"اضافه کردن"}
                            </Button>
                        </div>

                        <div className={styles.table}>
                            <Table
                                columns={columns}
                                scroll={{ y: 300 }}
                                dataSource={this.state.list}
                                pagination={false}
                            />
                        </div>
                    </>
                )}
            </CloseModalLayout>
        );
    }
}

const columns = [
    {
        title: "نام کاربری",
        dataIndex: "username",
        key: "username",
        // render: (text:string) => <a>{text}</a>
    },
    {},
];

interface ShareListModalState {
    loading: boolean;
    list: any[];
}

interface ShareListModalProps {
    data: any;
    onCancel?: () => void;
}
