export class Global {
    public static userrole: string;
    public static username: string;
}
export interface CatalogUser {
    [key: string]: string | boolean;
    userName: string;
    isAdmin: boolean;
}
export enum CardOwner {
    ONLYMYCHANGES = 'ONLYMYCHANGES',
}
export enum Tribes {
    MMK = 'MMK',
    DRA = 'DRA',
    MTR = 'MTR',
    FXC = 'FXC',
}
export enum FeatureTeam {
    CONF = 'CONF',
    GEN = 'GEN',
    ACC = 'ACC',
}
export enum Application {
    LEGACY = 'LEGACY',
    MODERN = 'MODERN',
    DIGITAL = 'DIGITAL',
}

export enum FilterType {
    My = 'My',
    Tribes = 'Tribes',
    FeatureTeam = 'FeatureTeam',
    Application = 'Application',
    Custom = 'Custom',
}

export class FilterOption {
    type!: FilterType;
    selected!: boolean;
    key!: string;
    upperkey!: string;
}

export enum ChangeOwner {
    ONLYMYCHANGES = 'ONLYMYCHANGES',
}

export interface BookMarkcard {
    [key: string]: string | boolean | Date | number;
    application: string;
    bookmarkId: number;
    description: string;
    expiryDate: Date;
    featureTeam: string;
    iconName: string;
    isCardExpired: boolean;
    isCardValidationRequired: boolean;
    longUrl: string;
    shortUrl: string;
    title: string;
    tribe: string;
    userName: string;
}

export class Change {
    application: Application;
    featureteam: FeatureTeam;
    tribes: Tribes;
    owner: ChangeOwner;
    shortUrl: string;
}
