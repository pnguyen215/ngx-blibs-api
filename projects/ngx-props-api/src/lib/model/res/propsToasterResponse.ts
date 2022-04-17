export class PropsToasterResponse {

    id: string;
    type: AlertType;
    message: string;
    title: string;
    autoClose: boolean;
    keepAfterRouteChange: boolean;
    fade: boolean;

    constructor(init?: Partial<PropsToasterResponse>) {
        Object.assign(this, init);
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}
