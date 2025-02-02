/// <reference types="node" />
import { Request } from 'express';
import { UploadedFile } from 'express-fileupload';
import { Payload } from '../index';
import { Collection } from '../collections/config/types';
import { User } from '../auth/types';
import { Document } from '../types';
export declare type PayloadRequest = Request & {
    payload: Payload;
    locale?: string;
    fallbackLocale?: string;
    collection?: Collection;
    payloadAPI: 'REST' | 'local' | 'graphQL';
    files?: {
        file: UploadedFile;
    };
    user: User | null;
    payloadUploadSizes?: Record<string, Buffer>;
    findByID?: {
        [slug: string]: (q: unknown) => Document;
    };
};
