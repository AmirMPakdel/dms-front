import React, { Component } from "react";
import styles from "./ViewMd.module.css";
import Loading from "../global/Loading";
import { getParamByName } from "@/libs/utils/helpers";
import { getCookie } from "@/libs/utils/cookie";
import env from "@/env";
import GetRequest from "@/libs/rest/GetRequest";


export default class ViewMd extends Component<ViewMdProps, ViewMdState> {
    constructor(props: ViewMdProps) {
        super(props);
        this.state = {
            loading: true,
            md_html: "",
        };
    }

    componentDidMount(): void {

        let file_id = getParamByName("id");
        let file_ext = getParamByName("ext");

        let params = {
            token: getCookie(env.cookies.user_token),
            file_id,
            file_ext,
        };

        GetRequest("/api/file/serve?file_id="+file_id+"&file_ext="+file_ext).then(res => {

            console.log(res);

            this.setState({
                md_html: res.data.htm_content,
                loading: false,
            });
        });

    }

    render(): React.ReactNode {

        return (
            <div className={styles.con}>
                {
                    this.state.loading ?
                        <Loading style={{ height: "60vh" }} scale={0.6} />
                        :
                        <div className={styles.md} dangerouslySetInnerHTML={
                            this.state.loading ? undefined : { __html: this.state.md_html }} />
                }
            </div>
        );
    }
}

interface ViewMdState {
    loading: boolean;
    md_html: string;
}

interface ViewMdProps { }
