export class FilesRequest {

  parent: string;
  child: string;
  app: string;
  userId: number;

  constructor(parent: string, child: string, app: string, userId: number) {
    this.parent = parent;
    this.child = child;
    this.app = app;
    this.userId = userId;
  }

  public setParent(parent: string) {
    this.parent = parent;
  }

  public getParent(): string {
    return this.parent;
  }


  public setChild(child: string) {
    this.child = child;
  }

  public getChild(): string {
    return this.child;
  }

  public setApp(app: string) {
    this.app = app;
  }

  public getApp(): string {
    return this.app;
  }

  public setUserId(userId: number) {
    this.userId = userId;
  }

  public getUserId(): number {
    return this.userId;
  }
}
