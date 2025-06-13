export interface AuthenticatResponseModel {
    status?: string;
    message?: string;
    error?: string;
    "2fa_qrcode"?: string;
    password_qrcode?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
}