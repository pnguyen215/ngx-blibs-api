import { ESGActorResponse } from './esgactor-response.model';

export class AddressResponse extends ESGActorResponse {
    addressLine: string;
    city: string;
    province: string;
    district: string;
    ward: string;
    state: string;
    postCode: string;


    setAddress(address: any) {
        const addressResponse = new AddressResponse();
        addressResponse.setAddressLine(address.addressLine || 'system-addr-line');
        addressResponse.setCity(address.city || '');
        addressResponse.setProvince(address.province || '');
        addressResponse.setDistrict(address.district || '');
        addressResponse.setWard(address.ward || '');
        addressResponse.setState(address.state || '');
        addressResponse.setPostCode(address.postCode || '10100'); // if null then assign post-code system: 10100
        return addressResponse;
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

