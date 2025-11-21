import { Controller, Get, Param, Post, Body, Put, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

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

  @UseGuards(JwtAuthGuard)
  @Delete(':alpha3Code')
  async deleteCountry(@Param('alpha3Code') alpha3Code: string) {
    const deleted = await this.countriesService.deleteCountry(alpha3Code);
    if (!deleted) throw new NotFoundException(`Country ${alpha3Code} not found`);
    return { deleted: true };
  }
}
