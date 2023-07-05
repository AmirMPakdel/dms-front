import React, { CSSProperties, Component } from "react";
import styles from "./EmptyList.module.css";


export default class EmptyList extends Component<EmptyListProps, EmptyListState> {
    
    render(){
        return(
            <div className={styles.con+" bgw "+this.props.className} style={this.props.style}>

                <img className={styles.img} src={"/statics/svg/info_b.svg"}/>

                {
                    this.props.title?
                    <div className={styles.text+" hrot"}>{this.props.title}</div>:
                    <div className={styles.text+" hrot"}>{"!آیتمی در این پوشه وجود ندارد"}</div>
                }
                
            </div>
        )
    }
}

interface EmptyListProps{
    className?: string;
    style?: CSSProperties;
    title?: string;
}

interface EmptyListState{
    
}