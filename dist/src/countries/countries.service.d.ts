import { Repository } from 'typeorm';
import { Country } from './country.entity';
import type { CountriesAPI } from './external/countries-api.interface';
export declare class CountriesService {
    private readonly countryRepo;
    private readonly api;
    constructor(countryRepo: Repository<Country>, api: CountriesAPI);
    findAll(): Promise<Country[]>;
    findByCode(code: string): Promise<{
        source: string;
        data: Country;
    }>;
    create(countryData: Partial<Country>): Promise<Country>;
    update(code: string, updateData: Partial<Country>): Promise<Country>;
    remove(code: string): Promise<{
        deleted: boolean;
    }>;
}
