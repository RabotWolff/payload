"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const find_1 = __importDefault(require("./requestHandlers/find"));
const verifyEmail_1 = __importDefault(require("../auth/requestHandlers/verifyEmail"));
const unlock_1 = __importDefault(require("../auth/requestHandlers/unlock"));
const create_1 = __importDefault(require("./requestHandlers/create"));
const init_1 = __importDefault(require("../auth/requestHandlers/init"));
const login_1 = __importDefault(require("../auth/requestHandlers/login"));
const refresh_1 = __importDefault(require("../auth/requestHandlers/refresh"));
const me_1 = __importDefault(require("../auth/requestHandlers/me"));
const registerFirstUser_1 = __importDefault(require("../auth/requestHandlers/registerFirstUser"));
const forgotPassword_1 = __importDefault(require("../auth/requestHandlers/forgotPassword"));
const resetPassword_1 = __importDefault(require("../auth/requestHandlers/resetPassword"));
const findVersions_1 = __importDefault(require("./requestHandlers/findVersions"));
const findVersionByID_1 = __importDefault(require("./requestHandlers/findVersionByID"));
const restoreVersion_1 = __importDefault(require("./requestHandlers/restoreVersion"));
const delete_1 = __importDefault(require("./requestHandlers/delete"));
const findByID_1 = __importDefault(require("./requestHandlers/findByID"));
const update_1 = __importDefault(require("./requestHandlers/update"));
const logout_1 = __importDefault(require("../auth/requestHandlers/logout"));
const buildEndpoints = (collection) => {
    let { endpoints } = collection;
    if (collection.auth) {
        if (collection.auth.verify) {
            endpoints.push({
                path: '/verify/:token',
                method: 'post',
                handler: verifyEmail_1.default,
            });
        }
        if (collection.auth.maxLoginAttempts > 0) {
            endpoints.push({
                path: '/unlock',
                method: 'post',
                handler: unlock_1.default,
            });
        }
        endpoints = endpoints.concat([
            {
                path: '/init',
                method: 'get',
                handler: init_1.default,
            },
            {
                path: '/login',
                method: 'post',
                handler: login_1.default,
            },
            {
                path: '/logout',
                method: 'post',
                handler: logout_1.default,
            },
            {
                path: '/refresh-token',
                method: 'post',
                handler: refresh_1.default,
            },
            {
                path: '/me',
                method: 'get',
                handler: me_1.default,
            },
            {
                path: '/first-register',
                method: 'post',
                handler: registerFirstUser_1.default,
            },
            {
                path: '/forgot-password',
                method: 'post',
                handler: forgotPassword_1.default,
            },
            {
                path: '/reset-password',
                method: 'post',
                handler: resetPassword_1.default,
            },
        ]);
    }
    if (collection.versions) {
        endpoints = endpoints.concat([
            {
                path: '/versions',
                method: 'get',
                handler: findVersions_1.default,
            },
            {
                path: '/versions/:id',
                method: 'get',
                handler: findVersionByID_1.default,
            },
            {
                path: '/versions/:id',
                method: 'post',
                handler: restoreVersion_1.default,
            },
        ]);
    }
    return endpoints.concat([
        {
            path: '/',
            method: 'get',
            handler: find_1.default,
        },
        {
            path: '/',
            method: 'post',
            handler: create_1.default,
        },
        {
            path: '/:id',
            method: 'put',
            handler: update_1.default,
        },
        {
            path: '/:id',
            method: 'get',
            handler: findByID_1.default,
        },
        {
            path: '/:id',
            method: 'delete',
            handler: delete_1.default,
        },
    ]);
};
exports.default = buildEndpoints;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRFbmRwb2ludHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29sbGVjdGlvbnMvYnVpbGRFbmRwb2ludHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxrRUFBMEM7QUFDMUMsc0ZBQThEO0FBQzlELDRFQUFvRDtBQUNwRCxzRUFBOEM7QUFDOUMsd0VBQXVEO0FBQ3ZELDBFQUF5RDtBQUN6RCw4RUFBNkQ7QUFDN0Qsb0VBQW1EO0FBQ25ELGtHQUFpRjtBQUNqRiw0RkFBMkU7QUFDM0UsMEZBQWtFO0FBQ2xFLGtGQUEwRDtBQUMxRCx3RkFBZ0U7QUFDaEUsc0ZBQThEO0FBQzlELHNFQUFxRDtBQUNyRCwwRUFBa0Q7QUFDbEQsc0VBQThDO0FBQzlDLDRFQUEyRDtBQUUzRCxNQUFNLGNBQWMsR0FBRyxDQUFDLFVBQXFDLEVBQWMsRUFBRTtJQUMzRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsVUFBVSxDQUFDO0lBRS9CLElBQUksVUFBVSxDQUFDLElBQUksRUFBRTtRQUNuQixJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzFCLFNBQVMsQ0FBQyxJQUFJLENBQUM7Z0JBQ2IsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsT0FBTyxFQUFFLHFCQUFXO2FBQ3JCLENBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsRUFBRTtZQUN4QyxTQUFTLENBQUMsSUFBSSxDQUFDO2dCQUNiLElBQUksRUFBRSxTQUFTO2dCQUNmLE1BQU0sRUFBRSxNQUFNO2dCQUNkLE9BQU8sRUFBRSxnQkFBTTthQUNoQixDQUFDLENBQUM7U0FDSjtRQUVELFNBQVMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO1lBQzNCO2dCQUNFLElBQUksRUFBRSxPQUFPO2dCQUNiLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE9BQU8sRUFBRSxjQUFXO2FBQ3JCO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsT0FBTyxFQUFFLGVBQVk7YUFDdEI7WUFDRDtnQkFDRSxJQUFJLEVBQUUsU0FBUztnQkFDZixNQUFNLEVBQUUsTUFBTTtnQkFDZCxPQUFPLEVBQUUsZ0JBQWE7YUFDdkI7WUFDRDtnQkFDRSxJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixNQUFNLEVBQUUsTUFBTTtnQkFDZCxPQUFPLEVBQUUsaUJBQWM7YUFDeEI7WUFDRDtnQkFDRSxJQUFJLEVBQUUsS0FBSztnQkFDWCxNQUFNLEVBQUUsS0FBSztnQkFDYixPQUFPLEVBQUUsWUFBUzthQUNuQjtZQUNEO2dCQUNFLElBQUksRUFBRSxpQkFBaUI7Z0JBQ3ZCLE1BQU0sRUFBRSxNQUFNO2dCQUNkLE9BQU8sRUFBRSwyQkFBd0I7YUFDbEM7WUFDRDtnQkFDRSxJQUFJLEVBQUUsa0JBQWtCO2dCQUN4QixNQUFNLEVBQUUsTUFBTTtnQkFDZCxPQUFPLEVBQUUsd0JBQXFCO2FBQy9CO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLGlCQUFpQjtnQkFDdkIsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsT0FBTyxFQUFFLHVCQUFhO2FBQ3ZCO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxJQUFJLFVBQVUsQ0FBQyxRQUFRLEVBQUU7UUFDdkIsU0FBUyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFDM0I7Z0JBQ0UsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE9BQU8sRUFBRSxzQkFBWTthQUN0QjtZQUNEO2dCQUNFLElBQUksRUFBRSxlQUFlO2dCQUNyQixNQUFNLEVBQUUsS0FBSztnQkFDYixPQUFPLEVBQUUseUJBQWU7YUFDekI7WUFDRDtnQkFDRSxJQUFJLEVBQUUsZUFBZTtnQkFDckIsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsT0FBTyxFQUFFLHdCQUFjO2FBQ3hCO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxPQUFPLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFDdEI7WUFDRSxJQUFJLEVBQUUsR0FBRztZQUNULE1BQU0sRUFBRSxLQUFLO1lBQ2IsT0FBTyxFQUFFLGNBQUk7U0FDZDtRQUNEO1lBQ0UsSUFBSSxFQUFFLEdBQUc7WUFDVCxNQUFNLEVBQUUsTUFBTTtZQUNkLE9BQU8sRUFBRSxnQkFBTTtTQUNoQjtRQUNEO1lBQ0UsSUFBSSxFQUFFLE1BQU07WUFDWixNQUFNLEVBQUUsS0FBSztZQUNiLE9BQU8sRUFBRSxnQkFBTTtTQUNoQjtRQUNEO1lBQ0UsSUFBSSxFQUFFLE1BQU07WUFDWixNQUFNLEVBQUUsS0FBSztZQUNiLE9BQU8sRUFBRSxrQkFBUTtTQUNsQjtRQUNEO1lBQ0UsSUFBSSxFQUFFLE1BQU07WUFDWixNQUFNLEVBQUUsUUFBUTtZQUNoQixPQUFPLEVBQUUsZ0JBQWE7U0FDdkI7S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRixrQkFBZSxjQUFjLENBQUMifQ==