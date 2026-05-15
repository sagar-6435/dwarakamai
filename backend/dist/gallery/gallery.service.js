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
exports.GalleryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const gallery_schema_1 = require("../schemas/gallery.schema");
let GalleryService = class GalleryService {
    constructor(galleryModel) {
        this.galleryModel = galleryModel;
    }
    async findAll(page = 1, limit = 12, category) {
        const filter = { active: true };
        if (category)
            filter.category = category;
        const skip = (page - 1) * limit;
        const gallery = await this.galleryModel
            .find(filter)
            .skip(skip)
            .limit(limit)
            .sort('displayOrder');
        const total = await this.galleryModel.countDocuments(filter);
        return {
            gallery,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                current: page,
            },
        };
    }
    async findById(id) {
        const item = await this.galleryModel.findById(id);
        if (!item) {
            throw new common_1.NotFoundException('Gallery item not found');
        }
        return { item };
    }
    async create(data) {
        const item = new this.galleryModel(data);
        await item.save();
        return { message: 'Gallery item created successfully', item };
    }
    async update(id, data) {
        const item = await this.galleryModel.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
        if (!item) {
            throw new common_1.NotFoundException('Gallery item not found');
        }
        return { message: 'Gallery item updated successfully', item };
    }
    async delete(id) {
        const item = await this.galleryModel.findByIdAndDelete(id);
        if (!item) {
            throw new common_1.NotFoundException('Gallery item not found');
        }
        return { message: 'Gallery item deleted successfully' };
    }
};
exports.GalleryService = GalleryService;
exports.GalleryService = GalleryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(gallery_schema_1.Gallery.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GalleryService);
//# sourceMappingURL=gallery.service.js.map