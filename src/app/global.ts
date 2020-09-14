export class Global {
    public static userrole: string;
    public static username: string;
}
export interface CatalogUser {
    [key: string]: string | boolean;
    userName: string;
    isAdmin: boolean;
}
