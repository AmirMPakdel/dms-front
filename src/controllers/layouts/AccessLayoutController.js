import UserModel from "@/models/global/UserModel";
import AccessLayout from "@/views/layouts/AccessLayout";

export default class AccessLayoutController{
    
    /**@param {AccessLayout} view*/
    constructor(view){

        this.view = view;

        //this.model = new UserModel();
    }

    loadUser(){
        
        // let showWithoutAuth = this.view.props.showWithoutAuth;

        // let utoken = getCookie(env.TOKEN_KEY);

        // if(!utoken && !showWithoutAuth){
        //     window.location.href = createMinfoHref(env.PATHS.USER_AUTHENTICATION);
        //     return;
        // }
        
        // this.model.getUser(null, (err, data)=>{

        //     if(data.result_code === env.SC.SUCCESS){

        //         let user = data.data;

        //         chest.user = user;

        //         Observer.execute("onUserChange", user);
        //         Observer.execute("onAuthenticate", user);

        //         this.view.setState({
        //             loading: false,
        //             authenticated: true,
        //         });

        //     }else if(showWithoutAuth){

        //         deleteCookie(env.TOKEN_KEY);

        //         this.view.setState({
        //             loading: false,
        //             authenticated: false,
        //         });

        //     }else{

        //         deleteCookie(env.TOKEN_KEY);

        //         window.location.href = createMinfoHref(env.PATHS.USER_AUTHENTICATION);
        //     }
        // });
    }

    loadStudent(){

        // let showWithoutAuth = this.view.props.showWithoutAuth;

        // let stoken = getCookie(env.STUDENT_TOKEN_KEY);

        // if(!stoken && !showWithoutAuth){

        //     Observer.add("onStudentChange", (student)=>{
        //         this.view.setState({
        //             loading: false,
        //             authenticated: true,
        //         });
        //     });

        //     setTimeout(()=>{
        //         console.log(chest.ModalLayout.setAndShowModal);
        //         chest.ModalLayout.setAndShowModal(1, <StudentAuthModal closable={false}/>);
        //     }, 600);
            
        //     return;
        // }

        // this.model.getStudent(null, (err, data)=>{

        //     if(data.result_code === env.SC.SUCCESS){

        //         let student = data.data;

        //         chest.student = student;

        //         Observer.execute("onStudentChange", student);
        //         Observer.execute("onAuthenticate", student);

        //         this.view.setState({
        //             loading: false,
        //             authenticated: true,
        //         });

        //     }else if(showWithoutAuth){

        //         deleteCookie(env.STUDENT_TOKEN_KEY);

        //         this.view.setState({
        //             loading: false,
        //             authenticated: false,
        //         });

        //     }else{

        //         deleteCookie(env.STUDENT_TOKEN_KEY);

        //         chest.ModalLayout.setModal(1, <StudentAuthModal/>, ()=>{
        //             chest.ModalLayout.visibleToggle(1, true);
        //         });
        //     }
        // });
    }
}


/**
* @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
*/
export function getUser(cb){

    // let model = new UserModel();

    // model.getUser(null, cb);
}

/**
* @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
*/
export function getStudent(cb){

    // let model = new UserModel();

    // model.getStudent(null, cb);
}