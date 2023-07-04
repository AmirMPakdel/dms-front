import React, { CSSProperties, Component } from "react";
import styles from "./Dynaform.module.css";
import DFRow from "./DynaRow";
import { DynaFormData } from "./__Types";

export default class Dynaform extends Component<DynaformProps> {
    renderFormFromData = (formData: DynaFormData): React.ReactNode => {
        return (
            <>
                {formData.rows.map((v, i) => {
                    return <DFRow key={i} data={v} />;
                })}
            </>
        );
    };

    render(): React.ReactNode {
        let con_class = styles.con;

        if (this.props.className) {
            con_class += " " + this.props.className;
        }

        return (
            <div className={con_class} style={this.props.style}>
                {this.renderFormFromData(this.props.formData)}
            </div>
        );
    }
}

export interface DynaformProps {
    className?: string;
    style?: CSSProperties;
    formData: DynaFormData;
}