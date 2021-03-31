export interface BlibsBaseModel {
    id: number;
    createdTime: Date;
    createdBy: number;
    modifiedTime: Date;
    modifiedBy: number;
    deleted?: boolean;
    archived?: boolean;
    description: string;
}
