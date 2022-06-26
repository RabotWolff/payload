"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const componentSchema_1 = require("../../utilities/componentSchema");
const collectionSchema = joi_1.default.object().keys({
    slug: joi_1.default.string().required(),
    labels: joi_1.default.object({
        singular: joi_1.default.string(),
        plural: joi_1.default.string(),
    }),
    access: joi_1.default.object({
        create: joi_1.default.func(),
        read: joi_1.default.func(),
        readVersions: joi_1.default.func(),
        update: joi_1.default.func(),
        delete: joi_1.default.func(),
        unlock: joi_1.default.func(),
        admin: joi_1.default.func(),
    }),
    timestamps: joi_1.default.boolean(),
    admin: joi_1.default.object({
        useAsTitle: joi_1.default.string(),
        defaultColumns: joi_1.default.array().items(joi_1.default.string()),
        description: joi_1.default.alternatives().try(joi_1.default.string(), componentSchema_1.componentSchema),
        enableRichTextRelationship: joi_1.default.boolean(),
        components: joi_1.default.object({
            views: joi_1.default.object({
                List: componentSchema_1.componentSchema,
                Edit: componentSchema_1.componentSchema,
            }),
        }),
        pagination: joi_1.default.object({
            defaultLimit: joi_1.default.number(),
            limits: joi_1.default.array().items(joi_1.default.number()),
        }),
        preview: joi_1.default.func(),
        disableDuplicate: joi_1.default.bool(),
        hideAPIURL: joi_1.default.bool(),
    }),
    fields: joi_1.default.array(),
    hooks: joi_1.default.object({
        beforeOperation: joi_1.default.array().items(joi_1.default.func()),
        beforeValidate: joi_1.default.array().items(joi_1.default.func()),
        beforeChange: joi_1.default.array().items(joi_1.default.func()),
        afterChange: joi_1.default.array().items(joi_1.default.func()),
        beforeRead: joi_1.default.array().items(joi_1.default.func()),
        afterRead: joi_1.default.array().items(joi_1.default.func()),
        beforeDelete: joi_1.default.array().items(joi_1.default.func()),
        afterDelete: joi_1.default.array().items(joi_1.default.func()),
        beforeLogin: joi_1.default.array().items(joi_1.default.func()),
        afterLogin: joi_1.default.array().items(joi_1.default.func()),
        afterForgotPassword: joi_1.default.array().items(joi_1.default.func()),
    }),
    endpoints: joi_1.default.array().items(joi_1.default.object({
        path: joi_1.default.string(),
        method: joi_1.default.string().valid('get', 'head', 'post', 'put', 'patch', 'delete', 'connect', 'options'),
        handler: joi_1.default.alternatives().try(joi_1.default.array().items(joi_1.default.func()), joi_1.default.func()),
    })),
    auth: joi_1.default.alternatives().try(joi_1.default.object({
        tokenExpiration: joi_1.default.number(),
        depth: joi_1.default.number(),
        verify: joi_1.default.alternatives().try(joi_1.default.boolean(), joi_1.default.object().keys({
            generateEmailHTML: joi_1.default.func(),
            generateEmailSubject: joi_1.default.func(),
        })),
        lockTime: joi_1.default.number(),
        useAPIKey: joi_1.default.boolean(),
        cookies: joi_1.default.object().keys({
            secure: joi_1.default.boolean(),
            sameSite: joi_1.default.string(),
            domain: joi_1.default.string(),
        }),
        forgotPassword: joi_1.default.object().keys({
            generateEmailHTML: joi_1.default.func(),
            generateEmailSubject: joi_1.default.func(),
        }),
        maxLoginAttempts: joi_1.default.number(),
    }), joi_1.default.boolean()),
    versions: joi_1.default.alternatives().try(joi_1.default.object({
        maxPerDoc: joi_1.default.number(),
        retainDeleted: joi_1.default.boolean(),
        drafts: joi_1.default.alternatives().try(joi_1.default.object({
            autosave: joi_1.default.alternatives().try(joi_1.default.boolean(), joi_1.default.object({
                interval: joi_1.default.number(),
            })),
        }), joi_1.default.boolean()),
    }), joi_1.default.boolean()),
    upload: joi_1.default.alternatives().try(joi_1.default.object({
        staticURL: joi_1.default.string(),
        staticDir: joi_1.default.string(),
        disableLocalStorage: joi_1.default.bool(),
        adminThumbnail: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.func()),
        imageSizes: joi_1.default.array().items(joi_1.default.object().keys({
            name: joi_1.default.string(),
            width: joi_1.default.number().allow(null),
            height: joi_1.default.number().allow(null),
            crop: joi_1.default.string(), // TODO: add further specificity with joi.xor
        })),
        mimeTypes: joi_1.default.array().items(joi_1.default.string()),
        staticOptions: joi_1.default.object(),
    }), joi_1.default.boolean()),
});
exports.default = collectionSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbGxlY3Rpb25zL2NvbmZpZy9zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4Q0FBc0I7QUFDdEIscUVBQWtFO0FBRWxFLE1BQU0sZ0JBQWdCLEdBQUcsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztJQUN6QyxJQUFJLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUM3QixNQUFNLEVBQUUsYUFBRyxDQUFDLE1BQU0sQ0FBQztRQUNqQixRQUFRLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRTtRQUN0QixNQUFNLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRTtLQUNyQixDQUFDO0lBQ0YsTUFBTSxFQUFFLGFBQUcsQ0FBQyxNQUFNLENBQUM7UUFDakIsTUFBTSxFQUFFLGFBQUcsQ0FBQyxJQUFJLEVBQUU7UUFDbEIsSUFBSSxFQUFFLGFBQUcsQ0FBQyxJQUFJLEVBQUU7UUFDaEIsWUFBWSxFQUFFLGFBQUcsQ0FBQyxJQUFJLEVBQUU7UUFDeEIsTUFBTSxFQUFFLGFBQUcsQ0FBQyxJQUFJLEVBQUU7UUFDbEIsTUFBTSxFQUFFLGFBQUcsQ0FBQyxJQUFJLEVBQUU7UUFDbEIsTUFBTSxFQUFFLGFBQUcsQ0FBQyxJQUFJLEVBQUU7UUFDbEIsS0FBSyxFQUFFLGFBQUcsQ0FBQyxJQUFJLEVBQUU7S0FDbEIsQ0FBQztJQUNGLFVBQVUsRUFBRSxhQUFHLENBQUMsT0FBTyxFQUFFO0lBQ3pCLEtBQUssRUFBRSxhQUFHLENBQUMsTUFBTSxDQUFDO1FBQ2hCLFVBQVUsRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFO1FBQ3hCLGNBQWMsRUFBRSxhQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMvQyxXQUFXLEVBQUUsYUFBRyxDQUFDLFlBQVksRUFB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