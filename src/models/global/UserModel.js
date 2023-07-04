// import { getCookie } from "@/utils/cookie";
// import myServer from "@/utils/myServer";
// import Storage from "@/utils/storage";

// export default class UserModel {
//     /**
//      * @param {object} params
//      * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb
//      */
//     getUser(params, cb) {
//         if (env.MOCKING_SERVER) {
//             setTimeout(
//                 () => {
//                     cb(null, { result_code: env.SC.SUCCESS });
//                 },
//                 2000,
//                 cb
//             );
//             return;
//         }

//         let user = Storage.retrive("user");
//         let utoken = getCookie(env.STUDENT_TOKEN_KEY);

//         if (utoken && user && !user.should_update) {
//             cb(null, { result_code: env.SC.SUCCESS, data: user });
//             return;
//         }

//         myServer.Post(myServer.urls.DASH_USER_INFO, {}, {}, (err, data) => {
//             if (!err) {
//                 if (data.result_code === env.SC.SUCCESS) {
//                     user = data.data;

//                     //TODO: set accessLevel
//                     user.userAccessLevel = {
//                         1: true,
//                         2: true,
//                         3: true,
//                         4: true,
//                     };

//                     user.should_update = false;

//                     Storage.store("user", user);
//                 }

//                 cb(null, data);
//             } else {
//                 myServer.ErrorHandler.type1(err);
//             }
//         });
//     }

//     /**
//      * @param {object} params
//      * @param {import("@/models/jsdoc/RequestCallback").RequestCallback} cb
//      */
//     getStudent(params, cb) {
//         if (env.MOCKING_SERVER) {
//             setTimeout(
//                 () => {
//                     cb(null, { result_code: env.SC.SUCCESS });
//                 },
//                 2000,
//                 cb
//             );
//             return;
//         }

//         let student = Storage.retrive("student");
//         let stoken = getCookie(env.STUDENT_TOKEN_KEY);

//         if (stoken && student && !student.should_update) {
//             cb(null, { result_code: env.SC.SUCCESS, data: student });
//             return;
//         }

//         myServer.Post(myServer.urls.STD_PROFILE, {}, {}, (err, data) => {
//             if (!err) {
//                 if (data.result_code === env.SC.SUCCESS) {
//                     student = data.data;

//                     student.should_update = false;

//                     Storage.store("student", student);
//                 }

//                 cb(null, data);
//             } else {
//                 myServer.ErrorHandler.type1(err);
//             }
//         });
//     }
// }
