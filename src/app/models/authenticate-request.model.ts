export interface AuthenticateRequestModel {
    email: string;
    password: string;
    code_2fa: string;
}