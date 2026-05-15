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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceBookingSchema = exports.ServiceBooking = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ServiceBooking = class ServiceBooking {
};
exports.ServiceBooking = ServiceBooking;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ServiceBooking.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Service', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ServiceBooking.prototype, "service", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], ServiceBooking.prototype, "bookingDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ServiceBooking.prototype, "preferredTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' }),
    __metadata("design:type", String)
], ServiceBooking.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ServiceBooking.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            phone: String,
            email: String,
        },
    }),
    __metadata("design:type", Object)
], ServiceBooking.prototype, "contact", void 0);
exports.ServiceBooking = ServiceBooking = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ServiceBooking);
exports.ServiceBookingSchema = mongoose_1.SchemaFactory.createForClass(ServiceBooking);
//# sourceMappingURL=service-booking.schema.js.map