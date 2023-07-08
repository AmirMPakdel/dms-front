import React, { Component } from "react";
import styles from "./Dashboard.module.css";
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
import Observer from "@/libs/utils/observer";
import DashHeader from "../components/dashboard/DashHeader";

export default class Dashboard extends Component<
    DashboardProps,
    DashboardState
> {
    controller: DashboardCtl;

    constructor(props: DashboardProps) {
        super(props);
        this.controller = new DashboardCtl(this);
        window.document.title = "داشبورد | سامانه مدیریت مستندات فنی"
        this.state = {
            loading: true,
            current_folder_id: 0,
            list: [],
        };
    }

    componentDidMount() {
        Observer.add("onChangeDirectory", this.onChangeDirectory);
        Observer.add("onOpenDirectory", this.onOpenDirectory);
        Observer.add("onPrevDirectory", this.onPrevDirectory);
        this.controller.openFolder(this.state.current_folder_id);
    }

    componentWillUnmount() {
        Observer.remove("onChangeDirectory", this.onChangeDirectory);
        Observer.remove("onOpenDirectory", this.onOpenDirectory);
        Observer.remove("onPrevDirectory", this.onPrevDirectory);
    }

    onChangeDirectory = (node: any) => {
        this.controller.onOpenCard(node);
    }

    onOpenDirectory = (node: any) => {
        this.controller.onOpenCard(node);
    }

    onPrevDirectory = (current_node_id: number) => {
        this.controller.openPrevFolder(current_node_id);
    }

    onBackToPreviousFolder = () => {
        Observer.execute("onPrevDirectory", this.state.current_folder_id);
    };

    onOpenCard = (item: any) => {
        Observer.execute("onOpenDirectory", item);
    };

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

    render(): React.ReactNode {
        return (
            <DashboardLayout>
                <div className={styles.con}>
                    <DashHeader/>

                    <div className={styles.htext2}>
                        {"AEOI Documentation Management System"}
                    </div>

                    <div className={styles.wrapper}>
                        <div className={styles.breadcrumb_wrapper}>
                            <Breadcrumb />
                        </div>

                        {
                            this.state.loading ? null :
                                <div className={styles.dashcontorolbar_wrapper}>
                                    <DashboardControlBar
                                        onCreateFolder={this.onCreateFolder}
                                        onUploadFile={this.onUploadFile}
                                        onBack={this.onBackToPreviousFolder}
                                        currentFolderId={this.state.current_folder_id}
                                    />
                                </div>
                        }

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
                                            title={this.state.current_folder_id == -1 ?
                                                "!فایلی با شما به اشتراک گذاشته نشده است" : undefined} />
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    <div className={styles.footer}>{"اداره کل فناوری اطلاعات و مدیریت هوشمند"}</div>
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

interface DashboardProps { }
