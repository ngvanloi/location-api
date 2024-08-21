import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateLocationDto {
  @IsString()
  @IsOptional()
  readonly building: string;

  @IsString()
  @IsOptional()
  locationName: string;

  @IsString()
  @IsOptional()
  locationNumber: string;

  @IsNumber()
  @IsOptional()
  area: number;

  @IsOptional()
  parentId?: number;
}
