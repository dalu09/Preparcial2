import { Country } from '../countries/country.entity';
export declare class TravelPlan {
    id: number;
    countryCode: string;
    country: Country;
    title: string;
    startDate: string;
    endDate: string;
    notes?: string;
    createdAt: Date;
}
