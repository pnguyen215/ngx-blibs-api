export class HeaderResponse {
    code: number;
    text: string;
    type: string;
    description: string;

    setHeaderResponse(header: any) {
        this.setCode(header.code);
        this.setText(header.text);
        this.setType(header.type);
        this.setDescription(header.description);
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
