import { Response, NextFunction } from 'express';
import { PayloadRequest } from '../../express/types';
export declare type UpdateResult = {
    message: string;
    doc: Document;
};
export default function updateHandler(req: PayloadRequest, res: Response, next: NextFunction): Promise<Response<UpdateResult> | void>;
