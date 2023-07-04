import React, { Component } from "react";
import styles from "./ViewPublicLink.module.css";
import Loading from "../global/Loading";
import { getCookie } from "@/libs/utils/cookie";
import env from "@/env";
import PostRequest from "@/libs/rest/PostRequest";

export default class ViewPublicLink extends Component<ViewPublicLinkProps, ViewPublicLinkState> {
    constructor(props: ViewPublicLinkProps) {
        super(props);
        this.state = {};
    }

    componentDidMount(): void {
        
        let params = { 
            token: getCookie(env.cookies.user_token),
            file_id: this.props.file_id,
        }

        PostRequest("/api/file/getPublicUrl", params).then(res=>{
            
            window.location.href = (env.server_domain+env.urls.get_file_from_access_link+"/"+res.data.uuid);
        });
    }

    render(): React.ReactNode {
        return(
            <div className={styles.con}>

                <Loading style={{height:"50vh"}}
                scale={0.7}/>

            </div>
        );
    }
}

interface ViewPublicLinkState {}

interface ViewPublicLinkProps {
    file_id: string | null;
    file_ext: string | null;
}
