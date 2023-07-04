import React, { Component } from "react";
import styles from "./FileIcon.module.css";
import { FolderOutlined, FileOutlined, ShareAltOutlined } from "@ant-design/icons";


export default class FileIcon extends Component<FileIconProps, FileIconState> {


    render() {
        switch (this.props.type) {

            // case "back":
            //     return <RollbackOutlined className={styles.back_icon} />;

            case "folder":
                return <FolderOutlined className={styles.folder_icon} />;

            case "shared":
                return (
                    <div className={styles.file_wrapper}>
                        <FolderOutlined className={styles.shared} />
                        <ShareAltOutlined className={styles.shared_t} />
                    </div>
                )

            case "md":
                return (
                    <div className={styles.file_wrapper}>
                        <FileOutlined className={styles.md} />
                        <div className={styles.md_t}>MD</div>
                    </div>
                )

            case "pdf":
                return (
                    <div className={styles.file_wrapper}>
                        <FileOutlined className={styles.pdf} />
                        <div className={styles.pdf_t}>PDF</div>
                    </div>
                )

            case "jpg":
                return (
                    <div className={styles.file_wrapper}>
                        <FileOutlined className={styles.jpg} />
                        <div className={styles.jpg_t}>JPG</div>
                    </div>
                )

            case "png":
                return (
                    <div className={styles.file_wrapper}>
                        <FileOutlined className={styles.png} />
                        <div className={styles.png_t}>PNG</div>
                    </div>
                )

            case "gif":
                return (
                    <div className={styles.file_wrapper}>
                        <FileOutlined className={styles.gif} />
                        <div className={styles.gif_t}>GIF</div>
                    </div>
                )

            case "mp4":
                return (
                    <div className={styles.file_wrapper}>
                        <FileOutlined className={styles.mp4} />
                        <div className={styles.mp4_t}>MP4</div>
                    </div>
                )
        }
    }
}

interface FileIconProps {
    type: string;
}

interface FileIconState {
}
