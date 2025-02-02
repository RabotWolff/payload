"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const find_1 = __importDefault(require("../../collections/operations/find"));
const getExtractJWT_1 = __importDefault(require("../getExtractJWT"));
const JwtStrategy = passport_jwt_1.default.Strategy;
exports.default = ({ secret, config, collections }) => {
    const opts = {
        passReqToCallback: true,
        jwtFromRequest: (0, getExtractJWT_1.default)(config),
        secretOrKey: secret,
    };
    return new JwtStrategy(opts, async (req, token, done) => {
        try {
            const collection = collections[token.collection];
            const where = {};
            if (collection.config.auth.verify) {
                where.and = [
                    {
                        email: {
                            equals: token.email,
                        },
                    },
                    {
                        _verified: {
                            not_equals: false,
                        },
                    },
                ];
            }
            else {
                where.email = {
                    equals: token.email,
                };
            }
            const userQuery = await (0, find_1.default)({
                where,
                collection,
                req,
                overrideAccess: true,
                depth: collection.config.auth.depth,
            });
            if (userQuery.docs && userQuery.docs.length > 0) {
                const user = userQuery.docs[0];
                user.collection = collection.config.slug;
                done(null, user);
            }
            else {
                done(null, false);
            }
        }
        catch (err) {
            done(null, false);
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2F1dGgvc3RyYXRlZ2llcy9qd3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnRUFBNEQ7QUFHNUQsNkVBQXFEO0FBQ3JELHFFQUE2QztBQUU3QyxNQUFNLFdBQVcsR0FBRyxzQkFBVyxDQUFDLFFBQVEsQ0FBQztBQUV6QyxrQkFBZSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQVcsRUFBb0IsRUFBRTtJQUM1RSxNQUFNLElBQUksR0FBb0I7UUFDNUIsaUJBQWlCLEVBQUUsSUFBSTtRQUN2QixjQUFjLEVBQUUsSUFBQSx1QkFBYSxFQUFDLE1BQU0sQ0FBQztRQUNyQyxXQUFXLEVBQUUsTUFBTTtLQUNwQixDQUFDO0lBRUYsT0FBTyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDdEQsSUFBSTtZQUNGLE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFakQsTUFBTSxLQUFLLEdBQTJCLEVBQUUsQ0FBQztZQUN6QyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDakMsS0FBSyxDQUFDLEdBQUcsR0FBRztvQkFDVjt3QkFDRSxLQUFLLEVBQUU7NEJBQ0wsTUFBTSxFQUFFLEtBQUssQ0FBQyxLQUFLO3lCQUNwQjtxQkFDRjtvQkFDRDt3QkFDRSxTQUFTLEVBQUU7NEJBQ1QsVUFBVSxFQUFFLEtBQUs7eUJBQ2xCO3FCQUNGO2lCQUNGLENBQUM7YUFDSDtpQkFBTTtnQkFDTCxLQUFLLENBQUMsS0FBSyxHQUFHO29CQUNaLE1BQU0sRUFBRSxLQUFLLENBQUMsS0FBSztpQkFDcEIsQ0FBQzthQUNIO1lBRUQsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFBLGNBQUksRUFBQztnQkFDM0IsS0FBSztnQkFDTCxVQUFVO2dCQUNWLEdBQUc7Z0JBQ0gsY0FBYyxFQUFFLElBQUk7Z0JBQ3BCLEtBQUssRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLO2FBQ3BDLENBQUMsQ0FBQztZQUVILElBQUksU0FBUyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQy9DLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBRXpDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDbEI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNuQjtTQUNGO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ25CO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==