import { AddressResponse } from './address-response.model';
import { AuthResponse } from './auth-response.model';
import { SocialNetworksResponse } from './social-networks-response.model';
import { UserPrivilegesResponse } from './user-privileges-response.model';
import { UserResponse } from './user-response.model';

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
    suffixesAvatarUrl?: string;
    activeAvatarUrl?: string;
    displayAvatarUrl?: string;
    avatarUrlSubstitute?: string;
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

}
