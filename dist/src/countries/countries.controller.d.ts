import { CountriesService } from './countries.service';
export declare class CountriesController {
    private readonly countriesService;
    constructor(countriesService: CountriesService);
    findAll(): Promise<import("./country.entity").Country[]>;
    findOne(code: string): Promise<{
        source: string;
        data: import("./country.entity").Country;
    }>;
    create(body: any): Promise<import("./country.entity").Country>;
    update(code: string, body: any): Promise<import("./country.entity").Country>;
    remove(code: string): Promise<{
        deleted: boolean;
    }>;
}
