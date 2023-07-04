import { Breadcrumb as AntBreadcrumb, ConfigProvider } from "antd";
import React, { Component } from "react";
import styles from "./Breadcrumb.module.css";
import { HomeOutlined } from '@ant-design/icons';
// import Observer from "@/utils/observer";
// import { getParamByName } from "@/utils/helpers";
// import Storage from "@/utils/storage";


export default class Breadcrumb extends Component<BreadcrumbProps,BreadcrumbState>{
    
    constructor(props:BreadcrumbProps){
        super(props);
        //this.controller = new BreadcrumbController(this);
        this.state = {
            breadcrumbItems:[
                // {title:"bpms-pakdel", url:"/jasldk"},
                // {title:"A002-pakdel", url:"/jasldk"},
            ],
        }
    }
    
    componentDidMount(){

        //Observer.add("onUrlStateChange", this.loadBreadCrumbList);

        this.loadBreadCrumbList();
    }

    componentWillUnmount(){

        //Observer.remove("onUrlStateChange", this.loadBreadCrumbList);
    }

    loadBreadCrumbList=()=>{

        // let group = getParamByName("group");
        // let group_list = Storage.get("categories");
        // let groups = extractSelectedGroups(group, group_list);
        // let breadcrumbItems = [];
        // groups.forEach(g=>{
        //     let url = new URL(window.location);
        //     url.searchParams.set("group", g.key);
        //     breadcrumbItems.push({key: g.key, url, title: g.title});
        // });
        // this.setState({breadcrumbItems});
    }
    
    render(){
        return(
            <div className={styles.con}>

            <ConfigProvider direction="ltr">
                <AntBreadcrumb>

                    <AntBreadcrumb.Item href="/">
                        <HomeOutlined style={{fontSize:"1rem"}}/>
                    </AntBreadcrumb.Item>

                    {
                        this.state.breadcrumbItems.map((v,i)=>(
                            <AntBreadcrumb.Item key={i} href={v.url}>
                                <div className={styles.title}>{v.title}</div>
                            </AntBreadcrumb.Item>
                        ))
                    }

                </AntBreadcrumb>
            </ConfigProvider>
                
            </div>
        )
    }
}

interface BreadcrumbProps {
}

interface BreadcrumbState {
    breadcrumbItems: any[];
}