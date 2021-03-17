import { PrivilegesResponse } from './privileges-response.model';

export class UserPrivilegesResponse {
    // tslint:disable-next-line: variable-name
    n_roles: string[];
    privileges: PrivilegesResponse;

    public setNRoles(nRoles: string[]) {
        this.n_roles = nRoles;
    }

    public getNRoles(): string[] {
        return this.n_roles;
    }

    public setPrivileges(privileges: PrivilegesResponse) {
        const privilege = new PrivilegesResponse();
        this.privileges = privilege.buildPrivilegesResponse(privileges);
    }

    public getPrivileges(): PrivilegesResponse {
        return this.privileges;
    }
}
