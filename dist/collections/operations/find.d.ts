import { Where } from '../../types';
import { PayloadRequest } from '../../express/types';
import { Collection, TypeWithID } from '../config/types';
import { PaginatedDocs } from '../../mongoose/types';
export declare type Arguments = {
    collection: Collection;
    where?: Where;
    page?: number;
    limit?: number;
    sort?: string;
    depth?: number;
    req?: PayloadRequest;
    overrideAccess?: boolean;
    pagination?: boolean;
    showHiddenFields?: boolean;
    draft?: boolean;
};
declare function find<T extends TypeWithID = any>(incomingArgs: Arguments): Promise<PaginatedDocs<T>>;
export default find;
