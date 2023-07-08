import React, { Component } from "react";
import styles from "./ViewFile.module.css";
import ViewFileCtl from "@/controllers/ViewFileCtl";
import ViewPdf from "../components/viewFile/ViewPdf";
import ViewMd from "../components/viewFile/ViewMd";
import { getParamByName } from "@/libs/utils/helpers";
import ViewPublicLink from "../components/viewFile/ViewPublicLink";
import ViewMp4 from "../components/viewFile/ViewMp4";


export default class ViewFile extends Component<ViewFileProps, ViewFileState> {
    controller: ViewFileCtl;
    constructor(props: ViewFileProps) {
        super(props);
        this.controller = new ViewFileCtl(this);
        window.document.title = "نمایش فایل | سامانه مدیریت مستندات فنی"
        this.state = {
        };
    }

    render(): React.ReactNode {

        let ext = getParamByName("ext");
        let id = getParamByName("id");

        let jsx:any = null;

        switch(ext){
            case "md":
                jsx=<ViewMd/>;
                break;
            case "mp4":
                jsx=<ViewMp4 file_id={id} file_ext={ext}/>;
                break;
            default :
                jsx=<ViewPublicLink file_id={id} file_ext={ext}/>
        }

        return jsx;
    }
}

interface ViewFileState {
}

interface ViewFileProps {}
