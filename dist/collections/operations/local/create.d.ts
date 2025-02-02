import { Payload } from '../../..';
import { PayloadRequest } from '../../../express/types';
import { Document } from '../../../types';
export declare type Options<T> = {
    collection: string;
    data: Record<string, unknown>;
    depth?: number;
    locale?: string;
    fallbackLocale?: string;
    user?: Document;
    overrideAccess?: boolean;
    disableVerificationEmail?: boolean;
    showHiddenFields?: boolean;
    filePath?: string;
    overwriteExistingFiles?: boolean;
    req?: PayloadRequest;
    draft?: boolean;
};
export default function createLocal<T = any>(payload: Payload, options: Options<T>): Promise<T>;
