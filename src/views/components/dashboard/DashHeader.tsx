import { Button, Popover } from "antd";
import React, { Component } from "react";
import styles from "./DashHeader.module.css";
import { LogoutOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import chest from "@/libs/utils/chest";
import UserInfoModal from "@/views/modals/index/UserInfoModal";
import { getCookie, setCookie } from "@/libs/utils/cookie";
import env from "@/env";
import { goToLogoutPage } from "@/libs/utils/redirect";

export default class DashHeader extends Component<
    DashHeaderProps,
    DashHeaderState
> {
    constructor(props: DashHeaderProps) {
        super(props);
        this.state = {
            popover_open: false,
            fullname: getCookie(env.cookies.user_fullname) || "user",
        };
    }

    
    onShowUserInfo = ()=>{
        this.setState({ popover_open: false });
        chest.ModalLayout.setAndShowModal(1, <UserInfoModal />);
    }

    onEditProfile = ()=>{

        if(env.SSO.enabled){
            window.location.href = env.SSO.SSO_editProfile_page;
        }
    }

    onLogout = ()=>{
        this.setState({ popover_open: false });
        setCookie(env.cookies.user_token, "", -1);
        goToLogoutPage();
    }

    renderProfileOptions = () => {
        return <div className={styles.popover_con}>

            <Button className={styles.pop_btn}
            onClick={this.onShowUserInfo}
             icon={<UserOutlined/>}>{"اطلاعات پرسنلی"}</Button>

            <Button className={styles.pop_btn}
            onClick={this.onEditProfile}
             icon={<EditOutlined/>}>{"ویرایش اطلاعات پرسنلی"}</Button>

            <Button className={styles.pop_btn}
            type="primary"
            onClick={this.onLogout}
            icon={<LogoutOutlined/>}>{"خروج"}</Button>

        </div>;
    };

    handleOpenChange = (newOpen: boolean) => {
        this.setState({ popover_open: newOpen });
    };

    onProfileBtn = ()=>{
        this.setState({popover_open:!this.state.popover_open});
    }

    render() {
        return (
            <div className={styles.con}>
                <div className={styles.left_side}>
                    <Popover
                        content={this.renderProfileOptions()}
                        trigger="click"
                        open={this.state.popover_open}
                        onOpenChange={this.handleOpenChange}
                    >
                        <div className={styles.profile_btn}
                        onClick={this.onProfileBtn}>
                            <div className={styles.name}>
                                {this.state.fullname}
                            </div>
                            <img
                                className={styles.user_icon}
                                src={"/statics/svg/user-header.svg"}
                            />
                        </div>
                    </Popover>
                </div>

                <div className={styles.right_side}>
                    <img
                        className={styles.logo}
                        src={"/android-chrome-192x192.png"}
                    />
                    <div>{"سامانه مدیریت مستندات فنی سازمان انرژی اتمی"}</div>
                </div>
            </div>
        );
    }
}

interface DashHeaderProps {}

interface DashHeaderState {
    popover_open:boolean;
    fullname: string;
}
