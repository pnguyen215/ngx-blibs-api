import { PropsHeaderPrototypes } from './props-header-prototypes.model';
import { PropsPagePrototypes } from './props-page-prototypes.model';


export interface PropsRecordPrototypes<T> {
    message?: string;
    status?: string;
    code?: number;
    publish?: Date;
    items: T[];
    data?: PropsPagePrototypes<T> | T;
    total?: number;
    gwt?: Date;
    header?: PropsHeaderPrototypes;
    debugMsg?: string;
    fromSide?: any;
}


export const RecordsEOFPrototypesDefault: PropsRecordPrototypes<any> = {
    message: 'No record',
    code: 404,
    status: 'BAD_REQUEST',
    publish: new Date(),
    items: [],
    total: 0,
    gwt: new Date(),
    header: null,
};

