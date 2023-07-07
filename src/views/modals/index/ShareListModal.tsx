import React, { Component } from "react";
import styles from "./ShareListModal.module.css";
import chest from "@/libs/utils/chest";
import CloseModalLayout from "../CloseModalLayout";
import { Button, Popconfirm, Table } from "antd";
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

        this.loadList();
    }

    loadList = () => {

        let params = {
            file_id: this.props.data.file_id
        }
        this.setState({ loading: true, list: [] });
        PostRequest("/api/file/getFileSharedUsers", params, { addUserToken: true }).then(res => {

            if (res.rc == env.statusList.SUCCESS.code) {

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
            <AddSharedUserModal data={this.props.data}
                updateList={this.loadList} />
        );
    };

    deleteItem = (item: any) => {
        return new Promise((resolve) => {
            let params = {
                shared_node_id: item.id,
                type: "owner",
            };
            PostRequest("/api/file/deleteSharedUser", params,
                { addUserToken: true }).then(res => {
                    resolve(null);
                    if (res.rc == env.statusList.SUCCESS.code) {
                        this.loadList();
                        chest.openNotification("کاربر از لیست اشتراک گذاری های این فایل حذف شد.", "success");
                    }
                });
        });
    }

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
                    <Loading style={{ minHeight: "20rem" }} scale={0.7} />
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
                                columns={columns(this.deleteItem)}
                                scroll={{ y: 260 }}
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

const columns = (deleteItem: any) => [
    {
        title: "نام کاربری",
        dataIndex: "username",
        key: "username",
        render: (text: string) =>
            <div className={styles.usernames}>{text}</div>
    },
    {
        title: "حذف",
        key: "delete",
        render: (text: string, record: any) =>
            <Popconfirm
                overlayClassName={styles.popconfirm}
                title="حذف آیتم"
                okText="تایید"
                cancelText="انصراف"
                description="آیا از حذف این اشتراک گذاری مطمئن هستید؟"
                onConfirm={() => deleteItem(record)}
                onOpenChange={() => console.log('open change')}
            >
                <Button type="primary"> {"حذف"} </Button>
            </Popconfirm>,
    },
];

interface ShareListModalState {
    loading: boolean;
    list: any[];
}

interface ShareListModalProps {
    data: any;
    onCancel?: () => void;
}
