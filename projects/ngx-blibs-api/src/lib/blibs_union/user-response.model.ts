import { PreUserResponse } from './pre-user-response.model';
import { UserPrivilegesResponse } from './user-privileges-response.model';

export class UserResponse extends PreUserResponse {
    setUser(userReq: any): UserResponse {
        const user = new UserResponse();
        user.id = userReq.id;
        user.username = userReq.username || '';
        user.password = userReq.password || '';
        user.fullname = userReq.fullname || '';
        user.email = userReq.email || '';
        user.pic = userReq.pic || './assets/media/users/default.jpg';
        user.roles = userReq.roles || [];
        user.occupation = userReq.occupation || '';
        user.companyName = userReq.companyName || '';
        user.phone = userReq.phone || '';
        user.address = userReq.address;
        user.socialNetworks = userReq.socialNetworks;
        user.roleIds = userReq.roleIds;
        user.rolesOrder = userReq.rolesOrder;
        user.user_prv = new UserPrivilegesResponse().setUserPrivileges(userReq.user_prv);
        return user;
    }
}
