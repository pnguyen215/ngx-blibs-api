export class HeaderResponse {
    code: number;
    text: string;
    type: string;
    description: string;

    setHeader(header: any): HeaderResponse {
        const headerResponse = new HeaderResponse();
        headerResponse.setCode(header.code);
        headerResponse.setText(header.text);
        headerResponse.setType(header.type);
        headerResponse.setDescription(header.description);
        return headerResponse;
    }

    public setCode(code: number) {
        this.code = code;
    }

    public getCode(): number {
        return this.code;
    }

    public setText(text: string) {
        this.text = text;
    }

    public getText(): string {
        return this.text;
    }

    public setType(type: string) {
        this.type = type;
    }

    public getType(): string {
        return this.type;
    }

    public setDescription(description: string) {
        this.description = description;
    }

    public getDescription(): string {
        return this.description;
    }
}
