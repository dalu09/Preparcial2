import { HttpService } from '@nestjs/axios';
import { CountriesAPI } from './countries-api.interface';
export declare class RestCountriesAPI implements CountriesAPI {
    private readonly http;
    constructor(http: HttpService);
    getCountryByCode(code: string): Promise<{
        code: string;
        name: any;
        region: any;
        subregion: any;
        capital: any;
        population: any;
        flagUrl: any;
    } | null>;
}
