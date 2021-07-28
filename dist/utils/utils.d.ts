export declare const signVerificationUrl: (url: string) => string;
export declare const hasValidVerificationUrl: <UserDocument>(_id: string, _token: string, _expires: string, _signature: string) => boolean;
export declare const plaintextToken: () => string;
export declare const hashedToken: (plaintextToken: string) => string;
