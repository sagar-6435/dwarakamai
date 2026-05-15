import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, UpdateProfileDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            role: string;
        };
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            role: string;
        };
        token: string;
    }>;
    getCurrentUser(req: any): Promise<{
        user: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            phone: string;
            role: string;
            profileImage: string;
            address: {
                street?: string;
                city?: string;
                state?: string;
                zipCode?: string;
                country?: string;
            };
        };
    }>;
    updateProfile(req: any, updateProfileDto: UpdateProfileDto): Promise<{
        message: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            phone: string;
            address: {
                street?: string;
                city?: string;
                state?: string;
                zipCode?: string;
                country?: string;
            };
        };
    }>;
}
//# sourceMappingURL=auth.controller.d.ts.map