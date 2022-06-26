import { Field } from '../../config/types';
import { PayloadRequest } from '../../../express/types';
declare type Args = {
    data: Record<string, unknown>;
    doc: Record<string, unknown>;
    fields: Field[];
    operation: 'create' | 'update';
    promises: Promise<void>[];
    req: PayloadRequest;
    siblingData: Record<string, unknown>;
    siblingDoc: Record<string, unknown>;
};
export declare const traverseFields: ({ data, doc, fields, operation, promises, req, siblingData, siblingDoc, }: Args) => void;
export {};
