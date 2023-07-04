import React, { Component } from "react";
import styles from "./ViewMp4.module.css";
import Loading from "../global/Loading";
import { getCookie } from "@/libs/utils/cookie";
import env from "@/env";
import PostRequest from "@/libs/rest/PostRequest";

export default class ViewMp4 extends Component<
    ViewMp4Props,
    ViewMp4State
> {
    constructor(props: ViewMp4Props) {
        super(props);
        this.state = {
            video_url: "",
        };
    }

    componentDidMount(): void {
        let params = {
            token: getCookie(env.cookies.user_token),
            file_id: this.props.file_id,
        };

        PostRequest("/api/file/getPublicUrl", params).then((res) => {
            let url =
                env.server_domain +
                env.urls.get_file_from_access_link +
                "/" +
                res.data.uuid;
            this.setState({
                video_url: url,
            });
        });
    }

    render(): React.ReactNode {
        return (
            <div className={styles.con}>
                {this.state.video_url ? (
                    <video src={this.state.video_url}
                    controls={true}/>
                ) : (
                    <Loading style={{ height: "50vh" }} scale={0.7} />
                )}
            </div>
        );
    }
}

interface ViewMp4State {
    video_url: string;
}

interface ViewMp4Props {
    file_id: string | null;
    file_ext: string | null;
}
