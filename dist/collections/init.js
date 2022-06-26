"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
const passport_local_1 = __importDefault(require("passport-local"));
const buildCollectionFields_1 = require("../versions/buildCollectionFields");
const buildQuery_1 = __importDefault(require("../mongoose/buildQuery"));
const apiKey_1 = __importDefault(require("../auth/strategies/apiKey"));
const buildSchema_1 = __importDefault(require("./buildSchema"));
const buildSchema_2 = __importDefault(require("../mongoose/buildSchema"));
const bindCollection_1 = __importDefault(require("./bindCollection"));
const getVersionsModelName_1 = require("../versions/getVersionsModelName");
const mountEndpoints_1 = __importDefault(require("../express/mountEndpoints"));
const buildEndpoints_1 = __importDefault(require("./buildEndpoints"));
const LocalStrategy = passport_local_1.default.Strategy;
function registerCollections(ctx) {
    ctx.config.collections = ctx.config.collections.map((collection) => {
        const formattedCollection = collection;
        const schema = (0, buildSchema_1.default)(formattedCollection, ctx.config);
        if (collection.auth) {
            schema.plugin(passport_local_mongoose_1.default, {
                usernameField: 'email',
            });
            const { maxLoginAttempts, lockTime } = collection.auth;
            if (maxLoginAttempts > 0) {
                // eslint-disable-next-line func-names
                schema.methods.incLoginAttempts = function (cb) {
                    // Expired lock, restart count at 1
                    if (this.lockUntil && this.lockUntil < Date.now()) {
                        return this.updateOne({
                            $set: { loginAttempts: 1 },
                            $unset: { lockUntil: 1 },
                        }, cb);
                    }
                    const updates = { $inc: { loginAttempts: 1 } };
                    // Lock the account if at max attempts and not already locked
                    if (this.loginAttempts + 1 >= maxLoginAttempts && !this.isLocked) {
                        updates.$set = { lockUntil: Date.now() + lockTime };
                    }
                    return this.updateOne(updates, cb);
                };
                // eslint-disable-next-line func-names
                schema.methods.resetLoginAttempts = function (cb) {
                    return this.updateOne({
                        $set: { loginAttempts: 0 },
                        $unset: { lockUntil: 1 },
                    }, cb);
                };
            }
        }
        if (collection.versions) {
            const versionModelName = (0, getVersionsModelName_1.getVersionsModelName)(collection);
            const versionSchema = (0, buildSchema_2.default)(ctx.config, (0, buildCollectionFields_1.buildVersionCollectionFields)(collection), {
                disableUnique: true,
                options: {
                    timestamps: true,
                },
            });
            versionSchema.plugin(mongoose_paginate_v2_1.default, { useEstimatedCount: true })
                .plugin(buildQuery_1.default);
            ctx.versions[collection.slug] = mongoose_1.default.model(versionModelName, versionSchema);
        }
        ctx.collections[formattedCollection.slug] = {
            Model: mongoose_1.default.model(formattedCollection.slug, schema),
            config: formattedCollection,
        };
        // If not local, open routes
        if (!ctx.local) {
            const router = express_1.default.Router();
            const { slug } = collection;
            router.all('*', (0, bindCollection_1.default)(ctx.collections[formattedCollection.slug]));
            const endpoints = (0, buildEndpoints_1.default)(collection);
            (0, mountEndpoints_1.default)(router, endpoints);
            if (collection.auth) {
                const AuthCollection = ctx.collections[formattedCollection.slug];
                passport_1.default.use(new LocalStrategy(AuthCollection.Model.authenticate()));
                if (collection.auth.useAPIKey) {
                    passport_1.default.use(`${AuthCollection.config.slug}-api-key`, (0, apiKey_1.default)(ctx, AuthCollection));
                }
            }
            ctx.router.use(`/${slug}`, router);
        }
        return formattedCollection;
    });
}
exports.default = registerCollections;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb2xsZWN0aW9ucy9pbml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQWdDO0FBQ2hDLGdGQUE0QztBQUM1QyxzREFBOEI7QUFDOUIsd0RBQWdDO0FBQ2hDLHNGQUE0RDtBQUM1RCxvRUFBc0M7QUFFdEMsNkVBQWlGO0FBQ2pGLHdFQUFzRDtBQUN0RCx1RUFBdUQ7QUFDdkQsZ0VBQWtEO0FBQ2xELDBFQUFrRDtBQUNsRCxzRUFBd0Q7QUFHeEQsMkVBQXdFO0FBQ3hFLCtFQUF1RDtBQUN2RCxzRUFBOEM7QUFFOUMsTUFBTSxhQUFhLEdBQUcsd0JBQVEsQ0FBQyxRQUFRLENBQUM7QUFFeEMsU0FBd0IsbUJBQW1CLENBQUMsR0FBWTtJQUN0RCxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFxQyxFQUFFLEVBQUU7UUFDNUYsTUFBTSxtQkFBbUIsR0FBRyxVQUFVLENBQUM7UUFFdkMsTUFBTSxNQUFNLEdBQUcsSUFBQSxxQkFBcUIsRUFBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdEUsSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFO1lBQ25CLE1BQU0sQ0FBQyxNQUFNLENBQUMsaUNBQXFCLEVBQUU7Z0JBQ25DLGFBQWEsRUFBRSxPQUFPO2FBQ3ZCLENBQUMsQ0FBQztZQUdILE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBRXZELElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxFQUFFO2dCQU94QixzQ0FBc0M7Z0JBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEdBQUcsVUFBaUQsRUFBRTtvQkFDbkYsbUNBQW1DO29CQUNuQyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUks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