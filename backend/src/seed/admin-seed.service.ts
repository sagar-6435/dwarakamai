import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class AdminSeedService implements OnModuleInit {
  private readonly logger = new Logger(AdminSeedService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async onModuleInit() {
    if (process.env.SEED_ADMIN !== 'true') {
      return;
    }

    const email = (process.env.SEED_ADMIN_EMAIL || '').toLowerCase().trim();
    const password = process.env.SEED_ADMIN_PASSWORD || '';
    const name = process.env.SEED_ADMIN_NAME || 'Admin';

    if (!email || !password) {
      this.logger.warn(
        'SEED_ADMIN=true but SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD is missing — skipping admin seed',
      );
      return;
    }

    if (password.length < 6) {
      this.logger.warn(
        'SEED_ADMIN_PASSWORD must be at least 6 characters — skipping admin seed',
      );
      return;
    }

    const existing = await this.userModel.findOne({ email });
    if (existing) {
      if (existing.role !== 'admin') {
        existing.role = 'admin';
        await existing.save();
        this.logger.log(`Updated existing user ${email} to admin role`);
      } else {
        // Update password in case it changed in env
        existing.password = password;
        await existing.save();
        this.logger.log(`Updated admin user ${email} password`);
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
}
