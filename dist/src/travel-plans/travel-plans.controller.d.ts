import { TravelPlansService } from './travel-plans.service';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { UpdateTravelPlanDto } from './dto/update-travel-plan.dto';
export declare class TravelPlansController {
    private readonly travelPlansService;
    constructor(travelPlansService: TravelPlansService);
    create(dto: CreateTravelPlanDto): Promise<import("./travel-plan.entity").TravelPlan>;
    findAll(): Promise<import("./travel-plan.entity").TravelPlan[]>;
    findOne(id: string): Promise<import("./travel-plan.entity").TravelPlan>;
    update(id: string, dto: UpdateTravelPlanDto): Promise<import("./travel-plan.entity").TravelPlan>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
