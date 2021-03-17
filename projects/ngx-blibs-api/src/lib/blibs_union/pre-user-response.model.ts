import { AddressResponse } from './address-response.model';
import { AuthResponse } from './auth-response.model';
import { SocialNetworksResponse } from './social-networks-response.model';
import { UserPrivilegesResponse } from './user-privileges-response.model';

export class PreUserResponse extends AuthResponse {
    username: string;
    password: string;
    fullname: string;
    email: string;
    pic: string;
    roles: number[];
    occupation: string;
    companyName: string;
    phone: string;
    description: string;
    roleIds?: number[];
    rolesOrder?: number[];
    // tslint:disable-next-line: variable-name
    user_prv: UserPrivilegesResponse;
    app: string;
    departments: object;
    departmentDetails: object;
    organizationDetails: object;
    businessRoles: object;
    businessRolesDetails: object;
    address?: AddressResponse;
    socialNetworks?: SocialNetworksResponse;
    // personal information
    firstname: string;
    lastname: string;
    website: string;
    // account information
    language: string;
    timeZone: string;
    communication: {
        email: boolean,
        sms: boolean,
        phone: boolean
    };
    // email settings
    emailSettings: {
        emailNotification: boolean,
        sendCopyToPersonalEmail: boolean,
        activityRelatesEmail: {
            youHaveNewNotifications: boolean,
            youAreSentADirectMessage: boolean,
            someoneAddsYouAsAsAConnection: boolean,
            uponNewOrder: boolean,
            newMembershipApproval: boolean,
            memberRegistration: boolean
        },
        updatesFromKeenthemes: {
            newsAboutKeenthemesProductsAndFeatureUpdates: boolean,
            tipsOnGettingMoreOutOfKeen: boolean,
            thingsYouMissedSindeYouLastLoggedIntoKeen: boolean,
            newsAboutMetronicOnPartnerProductsAndOtherServices: boolean,
            tipsOnMetronicBusinessProducts: boolean
        }
    };

    setUser(user: any) {
        this.id = user.id;
        this.username = user.username || '';
        this.password = user.password || '';
        this.fullname = user.fullname || '';
        this.email = user.email || '';
        this.pic = user.pic || './assets/media/users/default.jpg';
        this.roles = user.roles || [];
        this.occupation = user.occupation || '';
        this.companyName = user.companyName || '';
        this.phone = user.phone || '';
        this.address = user.address;
        this.socialNetworks = user.socialNetworks;
        this.roleIds = user.roleIds;
        this.rolesOrder = user.rolesOrder;
        this.user_prv = user.user_prv;
    }
}
