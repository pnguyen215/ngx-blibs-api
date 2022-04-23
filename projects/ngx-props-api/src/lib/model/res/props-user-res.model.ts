import { PropsAuthorizationRes } from './props-authorization-res.model';

export interface PropsUserRes extends PropsAuthorizationRes {

    rolesId?: number[];
    userId: number;
    status?: string;
    expiresAt?: Date;
    privileges?: Map<string, boolean>;
    username?: string;
    fullName?: string;
    email?: string;
}
