import { PropsPrototypes } from '../base/props-prototypes.model';

export interface PropsRegisterReq extends PropsPrototypes {

    email?: string,
    username?: string,
    password: string,
    isHash?: boolean,
    hashPasswordKey?: string
    clientId?: string,
    clientSecret?: string,
    passwordGenerator?: string,
    uuidGenerator?: string
}
