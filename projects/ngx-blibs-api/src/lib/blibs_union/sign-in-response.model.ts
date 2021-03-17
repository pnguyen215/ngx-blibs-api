import { AuthResponse } from './auth-response.model';
import { HeaderResponse } from './header-response.model';

export class SignInResponse {
    publish: string;
    data: AuthResponse;
    total: number;
    gwt: Date;
    header: HeaderResponse;

    constructor(signIn: any) {
        this.publish = signIn.publish;
        this.data = new AuthResponse().setAuth(signIn.data);
        this.total = signIn.total;
        this.gwt = signIn.gwt;
        this.header = new HeaderResponse().setHeader(signIn.header);
    }

    setSignIn(signIn: any): SignInResponse {
        const signInResponse = new SignInResponse(signIn);
        return signInResponse;
        /*
        signInResponse.setPublish(signIn.publish);
        signInResponse.setData(new AuthResponse().setAuth(signIn.data));
        signInResponse.setTotal(signIn.total);
        signInResponse.setGwt(signIn.gwt);
        signInResponse.setHeader(new HeaderResponse().setHeader(signIn.header));
        */
    }

    public setPublish(publish: string) {
        this.publish = publish;
    }

    public getPublish(): string {
        return this.publish;
    }

    public setData(data: AuthResponse) {
        this.data = data;
    }

    public getData(): AuthResponse {
        return this.data;
    }

    public setTotal(total: number) {
        this.total = total;
    }

    public getTotal(): number {
        return this.total;
    }

    public setGwt(gwt: Date) {
        this.gwt = gwt;
    }

    public getGwt(): Date {
        return this.gwt;
    }

    public setHeader(header: HeaderResponse) {
        this.header = header;
    }

    public getHeader(): HeaderResponse {
        return this.header;
    }

}
