import { Repository } from 'typeorm';
import { TravelPlan } from './travel-plan.entity';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { UpdateTravelPlanDto } from './dto/update-travel-plan.dto';
import { CountriesService } from '../countries/countries.service';
export declare class TravelPlansService {
    private readonly travelRepo;
    private readonly countriesService;
    constructor(travelRepo: Repository<TravelPlan>, countriesService: CountriesService);
    create(dto: CreateTravelPlanDto): Promise<TravelPlan>;
    findAll(): Promise<TravelPlan[]>;
    findOne(id: number): Promise<TravelPlan>;
    update(id: number, dto: UpdateTravelPlanDto): Promise<TravelPlan>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
