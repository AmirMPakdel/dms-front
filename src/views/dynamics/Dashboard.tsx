import React, { Component } from "react";
import styles from "./Dashboard.module.css";
import Dynaform from "@/libs/dynaform/Dynaform";
import DashboardCtl from "@/controllers/DashboardCtl";
import Breadcrumb from "../components/dashboard/Breadcrumb";
import ItemCard from "../components/dashboard/ItemCard";
import DashboardControlBar from "../components/dashboard/DashboardControlBar";
import chest from "@/libs/utils/chest";
import DashboardLayout from "@/views/layouts/DashboardLayout";
import CreateFolderModal from "../modals/index/CreateFolderModal";
import Loading from "../components/global/Loading";
import UploadFileModal from "../modals/index/UploadFileModal";
import EmptyList from "../components/global/EmptyList";

export default class Dashboard extends Component<
    DashboardProps,
    DashboardState
> {
    controller: DashboardCtl;

    constructor(props: DashboardProps) {
        super(props);
        this.controller = new DashboardCtl(this);
        this.state = {
            loading: true,
            current_folder_id: 0,
            list: [],
        };
    }

    componentDidMount(): void {
        this.controller.openFolder(this.state.current_folder_id);
    }

    onFolderUpdated = () => {
        this.controller.openFolder(this.state.current_folder_id);
    };

    onCreateFolder = () => {
        chest.ModalLayout.setAndShowModal(
            1,
            <CreateFolderModal
                currentFolderId={this.state.current_folder_id}
                onCreate={this.onFolderUpdated}
            />
        );
    };

    onUploadFile = () => {
        chest.ModalLayout.setAndShowModal(
            1,
            <UploadFileModal
                currentFolderId={this.state.current_folder_id}
                onCreate={this.onFolderUpdated}
            />
        );
    };

    onBackToPreviousFolder = () => {
        this.controller.openPrevFolder(this.state.current_folder_id);
    };

    onOpenCard = (item: any) => {
        this.controller.onOpenCard(item);
    };

    render(): React.ReactNode {
        return (
            <DashboardLayout>
                <div className={styles.con}>
                    <div className={styles.header}>
                        <div className={styles.htext}>
                            {"AEOI Documentation Management System"}
                        </div>
                    </div>

                    <div className={styles.htext2}>
                        {"AEOI Documentation Management System"}
                    </div>

                    <div className={styles.wrapper}>
                        <div className={styles.breadcrumb_wrapper}>
                            <Breadcrumb />
                        </div>

                        <div className={styles.dashcontorolbar_wrapper}>
                            <DashboardControlBar
                                onCreateFolder={this.onCreateFolder}
                                onUploadFile={this.onUploadFile}
                                onBack={this.onBackToPreviousFolder}
                                currentFolderId={this.state.current_folder_id}
                            />
                        </div>

                        <div className={styles.items_wrapper}>
                            {this.state.loading ? (
                                <Loading
                                    style={{ height: "calc(50vh - 8rem)" }}
                                    scale={0.7}
                                />
                            ) : (
                                <>
                                    {this.state.list.length ? (
                                        this.state.list.map((v, i) => (
                                            <ItemCard
                                                data={v}
                                                onFolderUpdated={
                                                    this.onFolderUpdated
                                                }
                                                onOpenCard={this.onOpenCard}
                                            />
                                        ))
                                    ) : (
                                        <EmptyList style={{ height: "calc(50vh - 8rem)" }}
                                        title={this.state.current_folder_id==-1?
                                            "!فایلی با شما به اشتراک گذاشته نشده است":undefined}/>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        );
    }
}

interface DashboardState {
    loading: boolean;
    current_folder_id: number;
    list: any[];
}

interface DashboardProps {}
