import mongoose, { ConnectionOptions } from 'mongoose';
export declare const MONGO_URI: string;
export declare const Mongo_URI_Server: string, MONGO_USERNAME: string, MONGO_PASSWORD: string, MONGO_HOST: string, MONGO_PORT: string, MONGO_DATABASE: string;
export declare const MONGO_OPTIONS: ConnectionOptions;
declare const _default: () => {
    MONGO_URI: string;
    MONGO_OPTIONS: mongoose.ConnectOptions;
};
export default _default;
