import { Field } from '../../config/types';
import { Operation } from '../../../types';
import { PayloadRequest } from '../../../express/types';
declare type Args = {
    data: Record<string, unknown>;
    doc: Record<string, unknown>;
    docWithLocales: Record<string, unknown>;
    errors: {
        message: string;
        field: string;
    }[];
    fields: Field[];
    id?: string | number;
    mergeLocaleActions: (() => void)[];
    operation: Operation;
    path: string;
    promises: Promise<void>[];
    req: PayloadRequest;
    siblingData: Record<string, unknown>;
    siblingDoc: Record<string, unknown>;
    siblingDocWithLocales: Record<string, unknown>;
    skipValidation?: boolean;
};
export declare const traverseFields: ({ data, doc, docWithLocales, errors, fields, id, mergeLocaleActions, operation, path, promises, req, siblingData, siblingDoc, siblingDocWithLocales, skipValidation, }: Args) => void;
export {};
