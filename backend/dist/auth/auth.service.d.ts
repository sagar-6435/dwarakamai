import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../schemas/user.schema';
import { RegisterDto, LoginDto, UpdateProfileDto } from './dto/auth.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
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
    getCurrentUser(userId: string): Promise<{
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
    updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<{
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
    validateUser(userId: string): Promise<any>;
}
//# sourceMappingURL=auth.service.d.ts.map