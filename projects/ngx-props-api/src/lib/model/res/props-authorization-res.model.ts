import { PropsPrototypes } from '../base/props-prototypes.model';

export interface PropsAuthorizationRes extends PropsPrototypes {

    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
    expiresAt?: Date;
    scope?: string;
    code?: number;
    status?: string;
    scopes?: string[];
}
