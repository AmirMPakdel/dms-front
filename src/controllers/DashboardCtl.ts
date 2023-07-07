import env from "@/env";
import PostRequest from "@/libs/rest/PostRequest";
import { getCookie } from "@/libs/utils/cookie";
import DashboardMdl from "@/models/DashboardMdl";
import Dashboard from "@/views/dynamics/Dashboard";

export default class DashboardCtl {
    model: DashboardMdl;

    constructor(private view: Dashboard) {
        this.model = new DashboardMdl(this);
    }

    onOpenCard = (item: any) => {

        let { type } = item.file;

        if (type == "folder" || type == "shared") {
            this.openFolder(item.id);
        } else {
            this.openFile(item);
        }
    }

    addSharedFolder = (sorted_list: any[]) => {

        sorted_list.unshift({
            id: -1,
            name: "shared",
            file: {
                type: "shared",
                name: "shared",
            },
        });
    }

    openFolder = (folder_id: number) => {

        this.view.setState({
            loading: true,
            list: [],
        });

        let params = {
            parent_id: folder_id,
            token: getCookie(env.cookies.user_token),
        };

        PostRequest("/api/dash/getAllFilesInFolder", params).then((result) => {
            if (result.rc == env.statusList.SUCCESS.code) {
                this.showFileList(
                    folder_id,
                    result.data
                );
            }
        });
    };

    openPrevFolder = (current_folder_id: number) => {

        if (current_folder_id == -1) {
            this.openFolder(0);
            return;
        }

        this.view.setState({
            loading: true,
            list: [],
        });

        let params = {
            file_id: current_folder_id,
            token: getCookie(env.cookies.user_token),
        };

        PostRequest("/api/dash/getAllFileInPrvFolder", params).then(
            (result) => {
                if (result.rc == env.statusList.SUCCESS.code) {
                    this.showFileList(
                        result.data.parent_node_id,
                        result.data.list
                    );
                }
            }
        );
    };

    showFileList = (folder_id: number, list: any[]) => {

        setTimeout(
            (folder_id: number) => {

                let sorted_list = this.sortFiles(list);

                if (folder_id === 0) {
                    this.addSharedFolder(sorted_list);
                }

                this.view.setState({
                    loading: false,
                    current_folder_id: folder_id,
                    list: sorted_list,
                });
            },
            300,
            folder_id,
            list
        );
    }

    openFile = (item: any) => {

        let { id, ext } = item.file;

        window.open("/viewFile?id=" + id + "&ext=" + ext);
    }

    sortFiles = (list: any[]) => {

        return list.sort((a, b) => {

            if (a.file.type === "folder" && b.file.type !== "folder") {
                return -1;
            } else if (b.file.type === "folder" && a.file.type !== "folder") {
                return +1;
            } else if (a.name > b.name) {
                return +1;
            } else {
                return -1;
            }
        })
    }
}
