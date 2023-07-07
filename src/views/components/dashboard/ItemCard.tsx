import { Button, ConfigProvider, Popover } from "antd";
import React, { Component } from "react";
import styles from "./ItemCard.module.css";
import PostRequest from "@/libs/rest/PostRequest";
import { getCookie } from "@/libs/utils/cookie";
import env from "@/env";
import FileIcon from "./FileIcon";
import { MoreOutlined } from "@ant-design/icons";
import chest from "@/libs/utils/chest";
import DeleteFileModal from "@/views/modals/index/DeleteFileModal";
import RenameFileModal from "@/views/modals/index/RenameFileModal";
import ShareListModal from "@/views/modals/index/ShareListModal";
import DeleteSharedFileModal from "@/views/modals/index/DeleteSharedFileModal";

export default class ItemCard extends Component<ItemCardProps, ItemCardState> {
    constructor(props: ItemCardProps) {
        super(props);
        this.state = {
            popover_open: false,
        };
    }

    componentDidMount() { }

    componentWillUnmount() { }

    onDoubleClick = () => {
        this.setState({ popover_open: false });
        this.props.onOpenCard(this.props.data)
    }

    showPublicAccessLink = () => {

        let params = {
            token: getCookie(env.cookies.user_token),
            file_id: this.props.data.file.id
        }

        PostRequest("/api/file/getPublicUrl", params).then(res => {
            alert(env.server_domain + env.urls.get_file_from_access_link + "/" + res.data.uuid)
        });
    }

    showShareList = () => {

        this.setState({ popover_open: false });
        chest.ModalLayout.setAndShowModal(1,
            <ShareListModal data={this.props.data} />)
    }

    onDeleteFile = () => {
        this.setState({ popover_open: false });
        chest.ModalLayout.setAndShowModal(1,
            <DeleteFileModal
                data={this.props.data}
                onSuccess={this.updateFolder} />)
    }

    onDeleteSharedFile = () =>{
        this.setState({ popover_open: false });
        chest.ModalLayout.setAndShowModal(1,
            <DeleteSharedFileModal
                data={this.props.data}
                onSuccess={this.updateFolder} />)
    }

    onRenameFile = () => {
        this.setState({ popover_open: false });
        chest.ModalLayout.setAndShowModal(1,
            <RenameFileModal
                data={this.props.data}
                onRename={this.updateFolder} />)
    }

    updateFolder = () => {
        this.props.onFolderUpdated()
    }

    handleOpenChange = (newOpen: boolean) => {
        this.setState({ popover_open: newOpen });
    };

    renderIcon = (type: string) => {
        return <FileIcon type={type} />
    };

    renderMoreOptions = () => {

        if (this.props.data.file.type == "shared") {
            return (
                <div className={styles.options_wrapper}>
                    <a className={styles.options_item}
                        onClick={this.onDoubleClick}>باز کردن</a>
                </div>
            )
        }

        if (this.props.data.owner_id) {
            return (
                <div className={styles.options_wrapper}>

                    <a className={styles.options_item}
                        onClick={this.onDoubleClick}>باز کردن</a>

                    <a className={styles.options_item}
                        onClick={this.onDeleteSharedFile}>لغو اشتراک گذاری</a>

                </div>
            )
        }

        return (
            <div className={styles.options_wrapper}>
                {
                    this.props.data.file.type == "folder" ?
                        <a className={styles.options_item}
                            onClick={this.onDoubleClick}>باز کردن</a>
                        :
                        <a className={styles.options_item}
                            onClick={this.onDoubleClick}>نمایش</a>
                }
                {
                    this.props.data.file.type !== "folder" ?
                        <a className={styles.options_item}>بروزرسانی</a>
                        : null
                }
                {
                    this.props.data.file.type != "folder" ?
                        <a className={styles.options_item}
                            onClick={this.showPublicAccessLink}>لینک عمومی</a>
                        : null
                }
                {
                    this.props.data.file.type != "folder" ?
                        <a className={styles.options_item}
                            onClick={this.showShareList}>اشتراک گذاری</a>
                        : null
                }

                <a className={styles.options_item}
                    onClick={this.onRenameFile}>تغییر نام</a>

                <a className={styles.options_item}
                    onClick={this.onDeleteFile}>حذف</a>

            </div>
        );
    };

    render() {
        return (
            <div className={styles.con} onDoubleClick={this.onDoubleClick}>
                <Popover
                    content={this.renderMoreOptions()}
                    trigger="click"
                    placement="bottomRight"
                    open={this.state.popover_open}
                    onOpenChange={this.handleOpenChange}
                >
                    <Button className={styles.more_con}
                        onClick={() => this.setState({ popover_open: true })}
                        icon={<MoreOutlined />} />

                </Popover>

                <div className={styles.icon_wrapper}>
                    {this.renderIcon(this.props.data.file.type)}
                </div>

                <div className={styles.name}>{this.props.data.file.name}</div>
            </div>
        );
    }
}

interface ItemCardProps {
    data: any;
    onOpenCard: (item: any) => void;
    onFolderUpdated: () => void;
}

interface ItemCardState {
    popover_open: boolean;
}
