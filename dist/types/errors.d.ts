export interface NestedSchemas {
    [key: string]: {
        [key: string]: {
            [key: string]: string;
        };
    };
}
export interface arrayObject {
    [key: string]: string;
}
export declare const errors: (data: NestedSchemas) => {
    getEnvErrors: (env: string, extra: arrayObject) => {
        [key: string]: {
            [key: string]: string;
        };
    };
    getError: (status: string, code: string) => {
        code: string;
        message: string;
    };
    getErrors: (env: string, errors: arrayObject, extra: arrayObject) => any;
};
