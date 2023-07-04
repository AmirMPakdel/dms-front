import React, { Component } from "react";
import AccessLayoutController from "@/controllers/layouts/AccessLayoutController";
import Loading from "@/views/components/global/Loading";
import styles from "./AccessLayout.module.css";

/**
 * @typedef Props 
 * @property {"noAuth"|"student"|"userL1"|"userL2"} accessType
 * @property {boolean} showWithoutAuth
 * 
 * @extends {Component<Props>}
 */
export default class AccessLayout extends Component {

    constructor(props){
        super(props);

        this.controller = new AccessLayoutController(this);

        this.state = {
            loading: 0,//props.accessType=="noAuth"?false:true,
            authenticated: false,
        }
    }

    componentDidMount(){
        
    }
    
    render(){
        return(
            <div className={styles.layout+" bglc1i "}>

                {/* {
                    this.state.loading?
                    <Loading style={{minHeight:"90vh"}}/>:
                    <>
                    {
                        (this.state.authenticated || this.props.showWithoutAuth || 
                        this.props.accessType==="noAuth")?

                        this.props.children:
                        null
                    }
                    </>
                } */}

                {this.props.children}
                
            </div>
        )
    }
}