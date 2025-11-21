import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './country.entity';
import type { CountriesAPI } from './external/countries-api.interface';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepo: Repository<Country>,

    @Inject('COUNTRIES_API')
    private readonly api: CountriesAPI,
  ) {}

  async findAll() {
    return this.countryRepo.find();
  }

  async findByCode(code: string) {
    const codeUpper = code.toUpperCase();

    const cached = await this.countryRepo.findOne({ where: { code: codeUpper } });

    if (cached) {
      return { source: 'cache', data: cached };
    }

    const external = await this.api.getCountryByCode(codeUpper);
    if (!external) {
      throw new NotFoundException(`Country ${codeUpper} not found`);
    }

    const saved = await this.countryRepo.save(external);
    return { source: 'api', data: saved };
  }


  async create(countryData: Partial<Country>) {
    const country = this.countryRepo.create({
      ...countryData,
      code: countryData.code?.toUpperCase(),
    });

    return this.countryRepo.save(country);
  }

  async update(code: string, updateData: Partial<Country>) {
    const country = await this.countryRepo.findOne({
      where: { code: code.toUpperCase() },
    });

    if (!country) {
      throw new NotFoundException(`Country ${code} not found`);
    }

    Object.assign(country, updateData);
    return this.countryRepo.save(country);
  }

  async remove(code: string) {
    const result = await this.countryRepo.delete(code.toUpperCase());

    if (result.affected === 0) {
      throw new NotFoundException(`Country ${code} not found`);
    }

    return { deleted: true };
  }
}
