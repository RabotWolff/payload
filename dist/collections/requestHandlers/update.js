"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const formatSuccess_1 = __importDefault(require("../../express/responses/formatSuccess"));
const update_1 = __importDefault(require("../operations/update"));
async function updateHandler(req, res, next) {
    try {
        const draft = req.query.draft === 'true';
        const autosave = req.query.autosave === 'true';
        const doc = await (0, update_1.default)({
            req,
            collection: req.collection,
            id: req.params.id,
            data: req.body,
            depth: parseInt(String(req.query.depth), 10),
            draft,
            autosave,
        });
        let message = 'Updated successfully.';
        if (draft)
            message = 'Draft saved successfully.';
        if (autosave)
            message = 'Autosaved successfully.';
        return res.status(http_status_1.default.OK).json({
            ...(0, formatSuccess_1.default)(message, 'message'),
            doc,
        });
    }
    catch (error) {
        return next(error);
    }
}
exports.default = updateHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbGxlY3Rpb25zL3JlcXVlc3RIYW5kbGVycy91cGRhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSw4REFBcUM7QUFFckMsMEZBQTBFO0FBQzFFLGtFQUEwQztBQU8zQixLQUFLLFVBQVUsYUFBYSxDQUFDLEdBQW1CLEVBQUUsR0FBYSxFQUFFLElBQWtCO0lBQ2hHLElBQUk7UUFDRixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUM7UUFDekMsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUssTUFBTSxDQUFDO1FBRS9DLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBQSxnQkFBTSxFQUFDO1lBQ3ZCLEdBQUc7WUFDSCxVQUFVLEVBQUUsR0FBRyxDQUFDLFVBQVU7WUFDMUIsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNqQixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7WUFDZCxLQUFLLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM1QyxLQUFLO1lBQ0wsUUFBUTtTQUNULENBQUMsQ0FBQztRQUVILElBQUksT0FBTyxHQUFHLHVCQUF1QixDQUFDO1FBRXRDLElBQUksS0FBSztZQUFFLE9BQU8sR0FBRywyQkFBMkIsQ0FBQztRQUNqRCxJQUFJLFFBQVE7WUFBRSxPQUFPLEdBQUcseUJBQXlCLENBQUM7UUFFbEQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLHFCQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3BDLEdBQUcsSUFBQSx1QkFBcUIsRUFBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO1lBQzVDLEdBQUc7U0FDSixDQUFDLENBQUM7S0FDSjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDcEI7QUFDSCxDQUFDO0FBM0JELGdDQTJCQyJ9