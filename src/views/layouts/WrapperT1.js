import React, { Component } from "react";
import styles from "./WrapperT1.module.css";

/**
 * Props of MainButton Component
 * @typedef Props
 * @property {string} className
 * @property {React.CSSProperties} style 
 * @property {React.CSSProperties} containterStyle
 * 
 * @extends {Component<Props>}
 */
export default class WrapperT1 extends Component {

    render(){
        return(
            <div className={styles.con} style={this.props.containterStyle}>
                <div className={styles.w1+" "+this.props.className} style={this.props.style}>
                {
                    this.props.children
                }
                </div>
            </div>
        )
    }
}