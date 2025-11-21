"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const travel_plans_service_1 = require("./travel-plans.service");
describe('TravelPlansService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [travel_plans_service_1.TravelPlansService],
        }).compile();
        service = module.get(travel_plans_service_1.TravelPlansService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=travel-plans.service.spec.js.map