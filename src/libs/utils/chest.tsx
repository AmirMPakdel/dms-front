import React, { Component } from "react";
import { notification } from "antd";
import {
    CheckCircleOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import Observer from "./observer";

let chest = {
    user: null,

    UserPanel: {
        userChangeTab: (jsx:any) => {},
    },

    ModalLayout: {
        setModal: (layer:number, jsx:any, cb?:Function) => {},
        setAndShowModal: (layer:number, jsx:any, cb?:Function) => {},
        visibleToggle: (layer:number, visible:boolean, cb?:Function) => {},
        closeAndDelete: (layer:number, cb?:Function) => {},
    },

    SideMenu: {
        menu_is_open: false,
        openSideMenu: () => {},
        closeSideMenu: () => {},
    },

    EducatorsCrudModal: {
        controller: {},
    },

    disableBodyVerticalScroll: () => {},
    enableBodyVerticalScroll: () => {},
    disableAllAntDTooltips: () => {},
    enableAllAntDTooltips: () => {},

    openNotification: (title:string, icon:"success"|"alert"|"error", options?:{duration?:number, description?:string}) => {},
};

export class ChestComponent extends Component {
    componentDidMount() {
        chest.disableBodyVerticalScroll = this.disableBodyVerticalScroll;
        chest.enableBodyVerticalScroll = this.enableBodyVerticalScroll;
        chest.disableAllAntDTooltips = this.disableAllAntDTooltips;
        chest.enableAllAntDTooltips = this.enableAllAntDTooltips;
        chest.openNotification = this.openNotification;

        //this.onResize();
        //window.addEventListener("resize", this.ResizeObserver);
        //Observer.add("onResize", this.onResize);

        this.enableAllAntDTooltips();

        //setColors();
    }

    componentWillUnmount() {
        chest.disableBodyVerticalScroll = () => {};
        chest.enableBodyVerticalScroll = () => {};
        chest.disableAllAntDTooltips = () => {};
        chest.enableAllAntDTooltips = () => {};
        chest.openNotification = () => {};
    }

    ResizeObserver = (window:any, event:any) => {
        Observer.execute("onResize", window, event);
    };

    onResize = () => {
        // rem
        if (window.innerWidth > 1600) {
            let rem = (window.innerWidth * 16) / 1720;
            document.getElementsByTagName(
                "html"
            )[0].style.fontSize = `${rem}px`;
        } else if (window.innerWidth < 360) {
            let rem = (window.innerWidth * 16) / 362;
            document.getElementsByTagName(
                "html"
            )[0].style.fontSize = `${rem}px`;
        } else {
            document.getElementsByTagName("html")[0].style.fontSize = `${16}px`;
        }
    };

    disableBodyVerticalScroll = () => {
        document.getElementsByTagName("body")[0].style.overflowY = "hidden";
        document.getElementsByTagName("body")[0].style.overflowX = "hidden";
    };

    enableBodyVerticalScroll = () => {
        document.getElementsByTagName("body")[0].style.overflowY = "visible";
        document.getElementsByTagName("body")[0].style.overflowX = "unset";
    };

    disableAllAntDTooltips = () => {
        let tooltip = document.getElementsByClassName("ant-tooltip") as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < tooltip.length; i++) {
            tooltip[i].style.display = "none";
        }
    };

    enableAllAntDTooltips = () => {
        let tooltip = document.getElementsByClassName("ant-tooltip") as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < tooltip.length; i++) {
            tooltip[i].style.display = "block";
        }
    };

    openNotification = (title:string, icon:"success"|"alert"|"error", options?:{duration?:number, description?:string}) => {
        if (!options) {
            options = {};
        }

        if (!options.duration) {
            options.duration = 5;
        }

        if (!options.description) {
            options.description = "";
        }

        let icon_el:React.ReactNode|undefined;

        if (icon == "error") {

            icon_el = <ExclamationCircleOutlined style={{ color: "red" }} /> as React.ReactNode;
        }
        if (icon == "success") {
            icon_el = <CheckCircleOutlined style={{ color: "green" }} />;
        }
        if (icon == "alert") {
            icon_el = (
                <ExclamationCircleOutlined style={{ color: "yellow" }} />
            );
        }

        notification.open({
            message: title,
            duration: options.duration,
            description: options.description,
            icon:icon_el,
        });
    };

    render() {
        return null;
    }
}

function setColors() {
    // let tc1 = getCookie("tc1");
    // let sheet = document.createElement('style')
    // sheet.innerHTML = `.tbgc1 {background-color: ${tc1};}`;
    // document.body.appendChild(sheet);
}

export default chest;
