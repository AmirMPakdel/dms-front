import myServer from "@/utils/myServer";
import Storage from "@/utils/storage";

export default class StudentModel{
    
    /**
    * 
    * @param {object} params
    * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb 
    */
    getStudent(params, cb){
    
        if(env.MOCKING_SERVER){
            setTimeout(()=>{
                cb(null, {result_code:env.SC.SUCCESS});
            }, 2000, cb);
            return;
        }

        let student = Storage.retrive("student");

        if(student && !student.should_update){
            cb(null, {result_code:env.SC.SUCCESS, data:student});
            return;
        }
    
        myServer.Post(myServer.urls.STD_PROFILE, params, {}, (err, data)=>{
    
            if(!err){

                if(data.result_code === env.SC.SUCCESS){

                    student = data.data;

                    //TODO: set accessLevel
                    student.userAccessLevel = {
                        "1":true,
                        "2":true,
                        "3":true,
                        "4":true,
                    }

                    student.should_update = false;

                    Storage.store("student", student);
                }
            
                cb(null, data);
            
            }else{
            
                myServer.ErrorHandler.type1(err);
            }
        });
    }
    
    
}