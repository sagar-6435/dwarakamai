import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
export declare class AdminSeedService implements OnModuleInit {
    private userModel;
    private readonly logger;
    constructor(userModel: Model<UserDocument>);
    onModuleInit(): Promise<void>;
}
//# sourceMappingURL=admin-seed.service.d.ts.map