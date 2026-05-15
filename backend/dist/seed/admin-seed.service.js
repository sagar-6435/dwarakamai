"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AdminSeedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSeedService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
let AdminSeedService = AdminSeedService_1 = class AdminSeedService {
    constructor(userModel) {
        this.userModel = userModel;
        this.logger = new common_1.Logger(AdminSeedService_1.name);
    }
    async onModuleInit() {
        if (process.env.SEED_ADMIN !== 'true') {
            return;
        }
        const email = (process.env.SEED_ADMIN_EMAIL || '').toLowerCase().trim();
        const password = process.env.SEED_ADMIN_PASSWORD || '';
        const name = process.env.SEED_ADMIN_NAME || 'Admin';
        if (!email || !password) {
            this.logger.warn('SEED_ADMIN=true but SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD is missing — skipping admin seed');
            return;
        }
        if (password.length < 6) {
            this.logger.warn('SEED_ADMIN_PASSWORD must be at least 6 characters — skipping admin seed');
            return;
        }
        const existing = await this.userModel.findOne({ email });
        if (existing) {
            if (existing.role !== 'admin') {
                existing.role = 'admin';
                await existing.save();
                this.logger.log(`Updated existing user ${email} to admin role`);
            }
            else {
                this.logger.log(`Admin user ${email} already exists — skip`);
            }
            return;
        }
        await this.userModel.create({
            name,
            email,
            password,
            role: 'admin',
        });
        this.logger.log(`Seeded admin user: ${email}`);
    }
};
exports.AdminSeedService = AdminSeedService;
exports.AdminSeedService = AdminSeedService = AdminSeedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AdminSeedService);
//# sourceMappingURL=admin-seed.service.js.map