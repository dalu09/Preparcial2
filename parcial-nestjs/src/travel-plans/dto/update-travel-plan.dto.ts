import { PartialType } from '@nestjs/mapped-types';
import { CreateTravelPlanDto } from './create-travel-plan.dto';

export class UpdateTravelPlanDto extends PartialType(CreateTravelPlanDto) {
    countryCode?: string;
}
