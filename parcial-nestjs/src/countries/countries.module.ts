import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './country.entity';
import { RestCountriesAPI } from './external/restcountries.provider';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Country]),
    HttpModule,               
  ],
  controllers: [CountriesController],
  providers: [
    CountriesService,
    {
      provide: 'COUNTRIES_API',
      useClass: RestCountriesAPI,
    },
  ],
  exports: [CountriesService],
})
export class CountriesModule {}
