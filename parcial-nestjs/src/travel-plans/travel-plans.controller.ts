import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

import { TravelPlansService } from './travel-plans.service';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { UpdateTravelPlanDto } from './dto/update-travel-plan.dto';

@Controller('travel-plans')
export class TravelPlansController {
  constructor(private readonly travelPlansService: TravelPlansService) {}

  @Post()
  create(@Body() dto: CreateTravelPlanDto) {
    return this.travelPlansService.create(dto);
  }

  @Get()
  findAll() {
    return this.travelPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelPlansService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTravelPlanDto) {
    return this.travelPlansService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelPlansService.remove(+id);
  }
}
