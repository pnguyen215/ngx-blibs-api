export class PrivilegesResponse {
    // tslint:disable-next-line: variable-name
    is_read: boolean;
    // tslint:disable-next-line: variable-name
    is_append: boolean;
    // tslint:disable-next-line: variable-name
    is_view: boolean;
    // tslint:disable-next-line: variable-name
    is_append_to: boolean;
    // tslint:disable-next-line: variable-name
    is_write: boolean;
    // tslint:disable-next-line: variable-name
    is_create: boolean;
    // tslint:disable-next-line: variable-name
    is_delete: boolean;

    setPrivilegesResponse(privileges: any) {
        this.setRead(privileges.is_read || false);
        this.setAppend(privileges.is_append || false);
        this.setView(privileges.is_view || false);
        this.setAppendTo(privileges.is_append_to || false);
        this.setWrite(privileges.is_write || false);
        this.setCreate(privileges.is_create || false);
        this.setDelete(privileges.is_delete || false);
    }

    public buildPrivilegesResponse(privileges: any): PrivilegesResponse {
        const privilege = new PrivilegesResponse();
        privilege.setRead(privileges.is_read || false);
        privilege.setAppend(privileges.is_append || false);
        privilege.setView(privileges.is_view || false);
        privilege.setAppendTo(privileges.is_append_to || false);
        privilege.setWrite(privileges.is_write || false);
        privilege.setCreate(privileges.is_create || false);
        privilege.setDelete(privileges.is_delete || false);

        return privilege;
    }

    public setRead(isRead: boolean) {
        this.is_read = isRead;
    }

    public isRead(): boolean {
        return this.is_read;
    }

    public setAppend(isAppend: boolean) {
        this.is_append = isAppend;
    }

    public isAppend(): boolean {
        return this.is_append;
    }

    public setView(isView: boolean) {
        this.is_view = isView;
    }

    public isView(): boolean {
        return this.is_view;
    }

    public setAppendTo(isAppendTo: boolean) {
        this.is_append_to = isAppendTo;
    }

    public isAppendTo(): boolean {
        return this.is_append_to;
    }

    public setWrite(isWrite: boolean) {
        this.is_write = isWrite;
    }

    public isWrite(): boolean {
        return this.is_write;
    }

    public setCreate(isCreate: boolean) {
        this.is_create = isCreate;
    }

    public isCreate(): boolean {
        return this.is_create;
    }

    public setDelete(isDelete: boolean) {
        this.is_delete = isDelete;
    }

    public isDelete(): boolean {
        return this.is_delete;
    }

}
