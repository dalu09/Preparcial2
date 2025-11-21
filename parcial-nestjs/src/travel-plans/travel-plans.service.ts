import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TravelPlan } from './travel-plan.entity';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { UpdateTravelPlanDto } from './dto/update-travel-plan.dto';

import { CountriesService } from '../countries/countries.service';

@Injectable()
export class TravelPlansService {
  constructor(
    @InjectRepository(TravelPlan)
    private readonly travelRepo: Repository<TravelPlan>,

    private readonly countriesService: CountriesService,
  ) {}

  async create(dto: CreateTravelPlanDto) {
    const code = dto.countryCode.toUpperCase();

    const country = await this.countriesService.findByCode(code);

    const travel = this.travelRepo.create({
      ...dto,
      countryCode: code,
      country: country.data,
    });

    return this.travelRepo.save(travel);
  }

  async findAll() {
    return this.travelRepo.find();
  }

  async findOne(id: number) {
    const travel = await this.travelRepo.findOne({ where: { id } });

    if (!travel) throw new NotFoundException(`Travel plan ${id} not found`);

    return travel;
  }

  async update(id: number, dto: UpdateTravelPlanDto) {
    const travel = await this.findOne(id);

    if (dto.countryCode) {
      const code = dto.countryCode.toUpperCase();
      const country = await this.countriesService.findByCode(code);
      travel.countryCode = code;
      travel.country = country.data;
    }

    Object.assign(travel, dto);

    return this.travelRepo.save(travel);
  }

  async remove(id: number) {
    const result = await this.travelRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Travel plan ${id} not found`);
    }

    return { deleted: true };
  }
}
