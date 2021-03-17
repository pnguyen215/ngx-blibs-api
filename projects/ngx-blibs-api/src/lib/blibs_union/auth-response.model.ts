import { ESGActorResponse } from './esgactor-response.model';

export class AuthResponse extends ESGActorResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    expiresDate: Date;
    scope: string;
    code: number;
    organization: string;
    status: string;

    setAuthResponse(auth: any) {
        this.accessToken = auth.accessToken;
        this.refreshToken = auth.refreshToken;
        this.expiresIn = auth.expiresIn || 7200;
        this.expiresDate = auth.expiresDate || new Date(Date.now() + 100 * 24 * 60 * 60 * 1000);
    }

    public setScope(scope: string) {
        this.scope = scope;
    }

    public getScope(): string {
        return this.scope;
    }

    public setCode(code: number) {
        this.code = code;
    }

    public getCode(): number {
        return this.code;
    }

    public setOrganization(organization: string) {
        this.organization = organization;
    }

    public getOrganization(): string {
        return this.organization;
    }

    public setStatus(status: string) {
        this.status = status;
    }

    public getStatus(): string {
        return this.status;
    }

    public setAccessToken(accessToken: string) {
        this.accessToken = accessToken;
    }

    public getAccessToken(): string {
        return this.accessToken;
    }

    public setRefreshToken(refreshToken: string) {
        this.refreshToken = refreshToken;
    }

    public getRefreshToken(): string {
        return this.refreshToken;
    }

    public setExpiresIn(expiresIn: number) {
        this.expiresIn = expiresIn || 7200;
    }

    public getExpiresIn(): number {
        return this.expiresIn;
    }

    public setExpiresDate(expiresDate: Date) {
        this.expiresDate = expiresDate || new Date(Date.now() + 100 * 24 * 60 * 60 * 1000);
    }

    public getExpiresDate(): Date {
        return this.expiresDate;
    }
}
