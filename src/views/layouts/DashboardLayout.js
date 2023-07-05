import React, { Component } from "react";
// import NotificationsMenu from "@/views/components/educatorDashboard/NotificationsMenu";
// import SideMenu from "@/views/components/layouts/SideMenu";
// import chest from "@/utils/chest";
import styles from "./DashboardLayout.module.css";
import AccessLayout from "@/views/layouts/AccessLayout";
import ModalLayout from "@/views/layouts/ModalLayout";
import { ConfigProvider } from "antd";
// import Observer from "@/utils/observer";
// import LogoutSvg from "@/views/svgs/Logout";
// import NotificationSvg from "@/views/svgs/Notification";
// import HamburgerSvg from "@/views/svgs/Hamburger";
// import CrossSvg from "@/views/svgs/Cross";
// import { deleteCookie } from "@/utils/cookie";
// import { Tooltip } from "node_modules/antd/lib/index";

export default class DashboardLayout extends Component {
    state = {
        menu_is_open: false,
    };

    // componentDidMount(){
    //     changeCSSVars(themes.userDefault);
    //     Observer.add("onSideMenuToggle", this.onSideMenuToggle);
    // }

    // componentWillUnmount(){
    //     Observer.remove("onSideMenuToggle", this.onSideMenuToggle);
    // }

    // onNitifications = ()=>{
    //     chest.NotificationsMenu_toggle();
    // }

    // onSideMenuToggle=(menu_is_open)=>{
    //     chest.SideMenu.menu_is_open = menu_is_open;
    //     this.setState({menu_is_open});
    // }

    // onToggleMenu=()=>{
    //     Observer.execute("onSideMenuToggle", !this.state.menu_is_open);
    // }

    // onLogout=()=>{
    //     deleteCookie(env.TENANT_KEY);
    //     deleteCookie(env.TOKEN_KEY);
    //     window.location.href = env.PATHS.USER_AUTHENTICATION;
    // }

    render() {
        return (
            <ModalLayout>
                <AccessLayout
                    accessType={this.props.accessType}
                    showWithoutAuth={this.props.showWithoutAuth}
                >
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: "#003e29",
                            },
                        }}
                    >
                        <div className={styles.layout}>
                            {/* <div className={styles.header_bar+" sm_card_shd bgwi"}>

                            <SideMenu/> 

                            <div className={styles.header_right_sec}>

                                {
                                    this.state.menu_is_open?
                                    <CrossSvg className={styles.menu_btn+" amp_btn"}
                                    onClick={this.onToggleMenu}/>:
                                    <HamburgerSvg className={styles.menu_btn+" amp_btn"}
                                    onClick={this.onToggleMenu}/>
                                }

                            </div> 

                            <div className={styles.header_left_sec}>

                                <div>
                                    <NotificationSvg className={styles.notification_img+" amp_btn"} onClick={this.onNitifications}/>
                                    <div className={styles.badge}>{"21"}</div>
                                </div> 

                                <Tooltip title={"خروج"}>
                                    <LogoutSvg className={styles.logout_img+" amp_btn"}
                                    onClick={this.onLogout}/>
                                </Tooltip>

                            </div> 
                            
                        </div> */}

                            <div className={styles.wrapper}>
                                {this.props.children}
                                {/* <NotificationsMenu/> */}
                            </div>
                        </div>
                    </ConfigProvider>
                </AccessLayout>
            </ModalLayout>
        );
    }
}
