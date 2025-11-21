import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { CountriesAPI } from './countries-api.interface';

@Injectable()
export class RestCountriesAPI implements CountriesAPI {
  constructor(private readonly http: HttpService) {}

  async getCountryByCode(code: string) {
    try {
      const url = `https://restcountries.com/v3.1/alpha/${code}`;
      const response = await firstValueFrom(this.http.get(url));

      if (!response.data || response.data.length === 0) {
        return null;
      }

      const c = response.data[0];

      return {
        code: code.toUpperCase(),
        name: c.name?.common ?? '',
        region: c.region ?? '',
        subregion: c.subregion ?? '',
        capital: c.capital?.[0] ?? '',
        population: c.population ?? 0,
        flagUrl: c.flags?.svg ?? c.flags?.png ?? '',
      };
    } catch {
      return null;
    }
  }
}
