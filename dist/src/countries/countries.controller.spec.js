"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const countries_controller_1 = require("./countries.controller");
describe('CountriesController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [countries_controller_1.CountriesController],
        }).compile();
        controller = module.get(countries_controller_1.CountriesController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=countries.controller.spec.js.map