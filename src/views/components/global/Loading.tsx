import React, { CSSProperties, Component } from "react";
import styles from "./Loading.module.css";


export default class Loading extends Component<LoadingProps, LoadingState>{
    
    render(){

        let s:CSSProperties = {transform:`scale(${this.props.scale || 1})`};
        if(this.props.style){
            s = Object.assign({}, this.props.style);
            s.transform = `scale(${this.props.scale || 1})`;
        }

        return(
            <div className={styles.con+" "+this.props.className}
             style={s}>
                
                <div className={styles.loading_centerize_wrapper}>
                    <div className={styles.lds_shape}>
                        <div className={"tbgc1"}></div>
                        <div className={"tbgc1"}></div>
                        <div className={"tbgc1"}></div>
                    </div>
                </div>
                
            </div>
        )
    }
}

interface LoadingProps{
    scale?:number,
    style?:CSSProperties,
    className?:string,
}

interface LoadingState{
    
}