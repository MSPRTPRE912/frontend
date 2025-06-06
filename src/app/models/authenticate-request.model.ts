export interface AuthenticateRequestModel {
    user_id: string;
    password: string;
    code_2fa: string;
}