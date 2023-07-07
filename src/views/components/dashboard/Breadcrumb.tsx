import { Breadcrumb as AntBreadcrumb, ConfigProvider } from "antd";
import React, { Component } from "react";
import styles from "./Breadcrumb.module.css";
import { HomeOutlined } from '@ant-design/icons';
import Observer from "@/libs/utils/observer";
// import Observer from "@/utils/observer";
// import { getParamByName } from "@/utils/helpers";
// import Storage from "@/utils/storage";


export default class Breadcrumb extends Component<BreadcrumbProps,BreadcrumbState>{
    
    constructor(props:BreadcrumbProps){
        super(props);
        this.state = {
            items:[
                // {title:"bpms-pakdel", url:"/jasldk"},
                // {title:"A002-pakdel", url:"/jasldk"},
            ],
        }
    }
    
    componentDidMount(){
        Observer.add("onChangeDirectory", this.onChangeDirectory);
        Observer.add("onOpenDirectory", this.onOpenDirectory);
        Observer.add("onPrevDirectory", this.onPrevDirectory);
    }

    componentWillUnmount(){
        Observer.remove("onChangeDirectory", this.onChangeDirectory);
        Observer.remove("onOpenDirectory", this.onOpenDirectory);
        Observer.remove("onPrevDirectory", this.onPrevDirectory);
    }

    onChangeDirectory = (node:any)=>{

        let newList:any[] = [];
        if(node.id != 0){
            let temp = this.state.items;
            for(let i=0; i<this.state.items.length; i++){
                let obj = temp[temp.length-1];
                if(obj.id !== node.id){
                    temp.pop();
                }else{
                    break;
                }
            }
            newList = temp;
        }
        this.setState({items:newList});
    }

    onOpenDirectory = (node:any)=>{
        let list = this.state.items;
        list.push(node);
        this.setState({items:list});
    }

    onPrevDirectory = (current_node_id:number)=>{
        let list = this.state.items;
        list.pop();
        this.setState({items:list});
    }

    onNodeSelect = (node:any)=>{
        //if root dir or current dir is selected then do nothing
        if((node.id === 0 && this.state.items.length===0) || 
        this.state.items[this.state.items.length-1].id === node.id){
            return;
        }
        Observer.execute("onChangeDirectory", node);
    }

    render(){
        return(
            <div className={styles.con}>

            <ConfigProvider direction="ltr">
                <AntBreadcrumb>

                    <AntBreadcrumb.Item 
                    onClick={()=>this.onNodeSelect({id:0,name:"root", file:{id:0,type:"folder",name:"root"}})}>
                        <HomeOutlined style={{fontSize:"1rem", cursor:"pointer"}}/>
                    </AntBreadcrumb.Item>

                    {
                        this.state.items.map((v,i)=>(
                            <AntBreadcrumb.Item key={i} 
                            onClick={()=>this.onNodeSelect(v)}>
                                <div className={styles.title}>{v.name}</div>
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
    items: any[];
}