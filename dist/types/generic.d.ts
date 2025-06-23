export interface GenericItem {
    id: number;
    label: string;
}
export interface Generic {
    [key: string]: Generic | GenericItem[];
}
export declare const generic: (data: Generic) => Generic;
