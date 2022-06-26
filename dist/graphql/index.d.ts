/// <reference types="node" />
declare const initializeGraphQL: (req: any, res: any) => (request: import("http").IncomingMessage & {
    url: string;
}, response: import("http").ServerResponse & {
    json?: (data: unknown) => void;
}) => Promise<void>;
export default initializeGraphQL;
