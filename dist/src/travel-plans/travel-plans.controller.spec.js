"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const travel_plans_controller_1 = require("./travel-plans.controller");
describe('TravelPlansController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [travel_plans_controller_1.TravelPlansController],
        }).compile();
        controller = module.get(travel_plans_controller_1.TravelPlansController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=travel-plans.controller.spec.js.map