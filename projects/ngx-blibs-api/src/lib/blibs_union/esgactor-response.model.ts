export class ESGActorResponse {

  id: number;
  createdTime: Date;
  createdBy: number;
  modifiedTime: Date;
  modifiedBy: number;
  deleted: boolean;
  archived: boolean;
  description: string;

  constructor(
    id: number,
    createdTime: Date,
    createdBy: number,
    modifiedTime: Date,
    modifiedBy: number,
    deleted: boolean,
    archived: boolean,
    description: string) {
    this.id = id;
    this.createdTime = createdTime;
    this.createdBy = createdBy;
    this.modifiedTime = modifiedTime;
    this.modifiedBy = modifiedBy;
    this.deleted = deleted;
    this.archived = archived;
    this.description = description;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getId(): number {
    return this.id;
  }

  public setCreatedTime(createdTime: Date) {
    this.createdTime = createdTime;
  }

  public getCreatedTime(): Date {
    return this.createdTime;
  }

  public setCreatedBy(createdBy: number) {
    this.createdBy = createdBy;
  }

  public getCreatedBy(): number {
    return this.createdBy;
  }

  public setModifiedTime(modifiedTime: Date) {
    this.modifiedTime = modifiedTime;
  }

  public getModifiedTime(): Date {
    return this.modifiedTime;
  }

  public setModifiedBy(modifiedBy: number) {
    this.modifiedBy = modifiedBy;
  }

  public getModifiedBy(): number {
    return this.modifiedBy;
  }

  public setDeleted(deleted: boolean) {
    this.deleted = deleted;
  }

  public getDeleted(): boolean {
    return this.deleted;
  }

  public setArchived(archived: boolean) {
    this.archived = archived;
  }

  public getArchived(): boolean {
    return this.archived;
  }

  public setDescription(description: string) {
    this.description = description;
  }

  public getDescription(): string {
    return this.description;
  }
}
