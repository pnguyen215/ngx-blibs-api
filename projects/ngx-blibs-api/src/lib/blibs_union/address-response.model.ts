import { ESGActorResponse } from './esgactor-response.model';

export class AddressResponse extends ESGActorResponse {
    addressLine: string;
    city: string;
    province: string;
    district: string;
    ward: string;
    state: string;
    postCode: string;


    setAddressResponse(address: any) {
        this.setAddressLine(address.addressLine || 'system-addr-line');
        this.setCity(address.city || '');
        this.setProvince(address.province || '');
        this.setDistrict(address.district || '');
        this.setWard(address.ward || '');
        this.setState(address.state || '');
        this.setPostCode(address.postCode || '10100'); // if null then assign post-code system: 10100
    }

    public setAddressLine(addressLine: string) {
        this.addressLine = addressLine;
    }

    public getAddressLine(): string {
        return this.addressLine;
    }

    public setCity(city: string) {
        this.city = city;
    }

    public getCity(): string {
        return this.city;
    }

    public setProvince(province: string) {
        this.province = province;
    }

    public getProvince(): string {
        return this.province;
    }

    public setDistrict(district: string) {
        this.district = district;
    }

    public getDistrict(): string {
        return this.district;
    }

    public setWard(ward: string) {
        this.ward = ward;
    }

    public getWard(): string {
        return this.ward;
    }

    public setState(state: string) {
        this.state = state;
    }

    public getState(): string {
        return this.state;
    }

    public setPostCode(postCode: string) {
        this.postCode = postCode || '10100';
    }

    public getPostCode(): string {
        return this.postCode;
    }

}

