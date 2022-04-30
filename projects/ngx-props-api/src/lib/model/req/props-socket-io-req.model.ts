import { PropsPrototypes } from '../base/props-prototypes.model';

export interface PropsSocketIoReq extends PropsPrototypes {

    websocketUrl?: string;
    enabledConnected?: boolean;
    enabledLogger?: boolean;

}


export const SocketIoDefault: PropsSocketIoReq = {

    enabledConnected: true,
    enabledLogger: false,
};
