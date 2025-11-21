import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CountriesService } from '../countries/countries.service';
import { TravelPlansService } from '../travel-plans/travel-plans.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const countriesService = app.get(CountriesService);
  const travelPlansService = app.get(TravelPlansService);

  console.log('🌱 Seeding database...');

  const seedCountries = ['COL', 'USA', 'FRA', 'JPN', 'ESP']; 

  for (const code of seedCountries) {
  console.log(`Fetching country ${code}...`);
  try {
  await countriesService.findByCode(code);
} catch (err) {
  console.log(`Country ${code} not found in API, creating manually...`);
  await countriesService.create({
    code,
    name: code === 'ESP' ? 'España' : code,
    region: 'Europe',
    subregion: 'Southern Europe',
    capital: 'Madrid',
    population: 47000000,
    flagUrl: 'https://flagcdn.com/es.svg',
  });
}

}


  console.log('🌱 Adding sample Travel Plans...');

  // Planes asociados a COL y USA (no se podrán borrar)
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

  // Mostrar todos los países para verificar
  const allCountries = await countriesService.findAll();
  console.log('Countries in DB:', allCountries.map(c => c.code));

  await app.close();
}

bootstrap();
