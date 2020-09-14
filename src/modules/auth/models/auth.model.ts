export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface RegisterViewModel {
    Firstname: string;
    Lastname: string;
    Email: string;
    Password: string;
}

export interface StoreState {
    loggedInStatus: boolean;
}

export interface Login {
    email: string;
    password: string;
    grant_type: string;
}

