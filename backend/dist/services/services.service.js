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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const service_schema_1 = require("../schemas/service.schema");
let ServicesService = class ServicesService {
    constructor(serviceModel) {
        this.serviceModel = serviceModel;
    }
    async findAll(page = 1, limit = 10, category) {
        const filter = { active: true };
        if (category)
            filter.category = category;
        const skip = (page - 1) * limit;
        const services = await this.serviceModel
            .find(filter)
            .skip(skip)
            .limit(limit)
            .sort('-createdAt');
        const total = await this.serviceModel.countDocuments(filter);
        return {
            services,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                current: page,
            },
        };
    }
    async findById(id) {
        const service = await this.serviceModel.findById(id);
        if (!service) {
            throw new common_1.NotFoundException('Service not found');
        }
        return { service };
    }
    async create(createServiceDto) {
        const slug = createServiceDto.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        const service = new this.serviceModel({
            ...createServiceDto,
            slug,
        });
        await service.save();
        return {
            message: 'Service created successfully',
            service,
        };
    }
    async update(id, updateServiceDto) {
        let updateData = updateServiceDto;
        if (updateServiceDto.name) {
            updateData.slug = updateServiceDto.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
        }
        const service = await this.serviceModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!service) {
            throw new common_1.NotFoundException('Service not found');
        }
        return {
            message: 'Service updated successfully',
            service,
        };
    }
    async delete(id) {
        const service = await this.serviceModel.findByIdAndDelete(id);
        if (!service) {
            throw new common_1.NotFoundException('Service not found');
        }
        return { message: 'Service deleted successfully' };
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(service_schema_1.Service.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ServicesService);
//# sourceMappingURL=services.service.js.map