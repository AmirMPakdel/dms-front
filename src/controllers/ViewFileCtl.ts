import env from "@/env";
import PostRequest from "@/libs/rest/PostRequest";
import { setCookie } from "@/libs/utils/cookie";
//import ViewFileMdl from "@/models/ViewFileMdl";
import ViewFile from "@/views/dynamics/ViewFile";

export default class ViewFileCtl {
    //model: ViewFileMdl;

    constructor(private view: ViewFile) {
        //this.model = new ViewFileMdl(this);
    }

    validationCheck = () => {};

    submit = async () => {
    };
}
