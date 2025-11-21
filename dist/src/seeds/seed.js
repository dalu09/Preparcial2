"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const countries_service_1 = require("../countries/countries.service");
const travel_plans_service_1 = require("../travel-plans/travel-plans.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const countriesService = app.get(countries_service_1.CountriesService);
    const travelPlansService = app.get(travel_plans_service_1.TravelPlansService);
    console.log('🌱 Seeding database...');
    const seedCountries = ['COL', 'USA', 'FRA', 'JPN'];
    for (const code of seedCountries) {
        console.log(`Fetching country ${code}...`);
        await countriesService.findByCode(code);
    }
    console.log('🌱 Adding sample Travel Plans...');
    await travelPlansService.create({
        countryCode: 'COL',
        title: 'Viaje a Bogotá',
        startDate: '2025-01-10',
        endDate: '2025-01-15',
        notes: 'Plan de 5 días',
    });
    await travelPlansService.create({
        countryCode: 'USA',
        title: 'Vacaciones en Nueva York',
        startDate: '2025-06-01',
        endDate: '2025-06-10',
    });
    console.log('🌱 Seed completed!');
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed.js.map