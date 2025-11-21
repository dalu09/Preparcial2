import { Injectable, NotFoundException, Inject, BadRequestException } from '@nestjs/common';
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
    if (cached) return { source: 'cache', data: cached };

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

    if (!country) throw new NotFoundException(`Country ${code} not found`);

    Object.assign(country, updateData);
    return this.countryRepo.save(country);
  }

  /**
   * Borrado protegido: solo permite borrar si no hay travel plans asociados
   */
  async deleteCountry(alpha3: string) {
    const code = alpha3.toUpperCase();

    const country = await this.countryRepo.findOne({
      where: { code },
      relations: ['travelPlans'],
    });

    if (!country) {
      throw new NotFoundException(`Country ${code} not found`);
    }

    if (country.travelPlans && country.travelPlans.length > 0) {
      throw new BadRequestException(
        `Cannot delete ${code} because there are travel plans associated`,
      );
    }

    await this.countryRepo.remove(country);
    return { deleted: true };
  }
}
