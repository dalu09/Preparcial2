import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CountriesService } from '../countries/countries.service';
import { TravelPlansService } from '../travel-plans/travel-plans.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const countriesService = app.get(CountriesService);
  const travelPlansService = app.get(TravelPlansService);

  console.log('🌱 Seeding database...');

  const seedCountries = ['COL', 'USA', 'FRA', 'JPN'];

  for (const code of seedCountries) {
    console.log(`Fetching country ${code}...`);
    await countriesService.findByCode(code); // usa la API externa si no está en cache
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
