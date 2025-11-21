import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CountriesModule } from './countries/countries.module';
import { TravelPlansModule } from './travel-plans/travel-plans.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    CountriesModule,      
    TravelPlansModule     
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
