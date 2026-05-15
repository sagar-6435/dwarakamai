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
exports.ServiceBookingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const service_booking_schema_1 = require("../schemas/service-booking.schema");
let ServiceBookingsService = class ServiceBookingsService {
    constructor(bookingModel) {
        this.bookingModel = bookingModel;
    }
    async findAll(userId, isAdmin, page = 1, limit = 10) {
        const filter = {};
        if (!isAdmin)
            filter.user = userId;
        const skip = (page - 1) * limit;
        const bookings = await this.bookingModel
            .find(filter)
            .populate('user')
            .populate('service')
            .skip(skip)
            .limit(limit)
            .sort('-createdAt');
        const total = await this.bookingModel.countDocuments(filter);
        return {
            bookings,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                current: page,
            },
        };
    }
    async create(userId, data) {
        const booking = new this.bookingModel({
            ...data,
            user: userId,
        });
        await booking.save();
        await booking.populate('user');
        await booking.populate('service');
        return { message: 'Service booking created successfully', booking };
    }
    async update(id, data) {
        const booking = await this.bookingModel
            .findByIdAndUpdate(id, data, { new: true, runValidators: true })
            .populate('user')
            .populate('service');
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        return { message: 'Booking updated successfully', booking };
    }
    async delete(id) {
        const booking = await this.bookingModel.findByIdAndDelete(id);
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        return { message: 'Booking deleted successfully' };
    }
};
exports.ServiceBookingsService = ServiceBookingsService;
exports.ServiceBookingsService = ServiceBookingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(service_booking_schema_1.ServiceBooking.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ServiceBookingsService);
//# sourceMappingURL=service-bookings.service.js.map