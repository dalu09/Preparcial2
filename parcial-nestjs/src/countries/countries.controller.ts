import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  findAll() {
    return this.countriesService.findAll();
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.countriesService.findByCode(code);
  }

  @Post()
  create(@Body() body) {
    return this.countriesService.create(body);
  }

  @Put(':code')
  update(@Param('code') code: string, @Body() body) {
    return this.countriesService.update(code, body);
  }

  @Delete(':code')
  remove(@Param('code') code: string) {
    return this.countriesService.remove(code);
  }
}
