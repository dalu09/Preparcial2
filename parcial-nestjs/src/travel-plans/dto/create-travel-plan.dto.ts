import {
  IsString,
  IsDateString,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateTravelPlanDto {
  @IsString()
  @Length(3, 3)
  countryCode: string;

  @IsString()
  title: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
