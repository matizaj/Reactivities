export interface User {
    username: string;
    displayName: string;
    token: string;
    photo?: string;
}

export interface UserFormValues {
   email: string;
   password: string;
   username?: string;
    displayName?: string;
}