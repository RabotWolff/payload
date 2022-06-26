import { PayloadRequest } from '../../../express/types';
import { Field } from '../../config/types';
declare type Args = {
    data: Record<string, unknown>;
    doc: Record<string, unknown>;
    field: Field;
    operation: 'create' | 'update';
    promises: Promise<void>[];
    req: PayloadRequest;
    siblingData: Record<string, unknown>;
    siblingDoc: Record<string, unknown>;
};
export declare const promise: ({ data, doc, field, operation, promises, req, siblingData, siblingDoc, }: Args) => Promise<void>;
export {};
