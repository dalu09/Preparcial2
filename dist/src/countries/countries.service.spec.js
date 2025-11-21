"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const countries_service_1 = require("./countries.service");
describe('CountriesService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [countries_service_1.CountriesService],
        }).compile();
        service = module.get(countries_service_1.CountriesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=countries.service.spec.js.map