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
exports.TravelPlansController = void 0;
const common_1 = require("@nestjs/common");
const travel_plans_service_1 = require("./travel-plans.service");
const create_travel_plan_dto_1 = require("./dto/create-travel-plan.dto");
const update_travel_plan_dto_1 = require("./dto/update-travel-plan.dto");
let TravelPlansController = class TravelPlansController {
    travelPlansService;
    constructor(travelPlansService) {
        this.travelPlansService = travelPlansService;
    }
    create(dto) {
        return this.travelPlansService.create(dto);
    }
    findAll() {
        return this.travelPlansService.findAll();
    }
    findOne(id) {
        return this.travelPlansService.findOne(+id);
    }
    update(id, dto) {
        return this.travelPlansService.update(+id, dto);
    }
    remove(id) {
        return this.travelPlansService.remove(+id);
    }
};
exports.TravelPlansController = TravelPlansController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_travel_plan_dto_1.CreateTravelPlanDto]),
    __metadata("design:returntype", void 0)
], TravelPlansController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TravelPlansController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TravelPlansController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_travel_plan_dto_1.UpdateTravelPlanDto]),
    __metadata("design:returntype", void 0)
], TravelPlansController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TravelPlansController.prototype, "remove", null);
exports.TravelPlansController = TravelPlansController = __decorate([
    (0, common_1.Controller)('travel-plans'),
    __metadata("design:paramtypes", [travel_plans_service_1.TravelPlansService])
], TravelPlansController);
//# sourceMappingURL=travel-plans.controller.js.map