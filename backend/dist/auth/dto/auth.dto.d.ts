export declare class RegisterDto {
    name: string;
    email: string;
    phone?: string;
    password: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class UpdateProfileDto {
    name?: string;
    phone?: string;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
    };
}
//# sourceMappingURL=auth.dto.d.ts.map