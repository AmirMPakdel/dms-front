import React, { Component } from "react";
import styles from "./ViewPdf.module.css";
import { Document, Page, pdfjs } from "react-pdf";
import { DocumentCallback } from "react-pdf/dist/cjs/shared/types";
import { getParamByName } from "@/libs/utils/helpers";


export default class ViewPdf extends Component<ViewPdfProps, ViewPdfState> {
    constructor(props: ViewPdfProps) {
        super(props);
        this.state = {
            numPages: null,
        };
    }

    onDocumentLoadSuccess = (doc: DocumentCallback) => {
        this.setState({
            numPages: doc.numPages,
        });
    };

    render(): React.ReactNode {
        pdfjs.GlobalWorkerOptions.workerSrc = `/statics/js/3.6.172-pdf.worker.js`;

        let file_id = getParamByName("id");
        let file_ext = getParamByName("ext");
        let params = "file_id=" + file_id + "&file_ext=" + file_ext;
        let file_url = "http://localhost:5080/api/file/serve?" + params;

        return (
            <div className={styles.con}>
                <Document file={file_url}
                    onLoadSuccess={this.onDocumentLoadSuccess}>
                    {Array(this.state.numPages).fill(0).map((v, i) => (
                        <Page key={i + 1} width={1200} pageNumber={i + 1} />
                    ))}
                </Document>
            </div>
        );
    }
}

interface ViewPdfState {
    numPages: number | null;
}

interface ViewPdfProps { }
