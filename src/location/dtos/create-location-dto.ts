import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  readonly building: string;

  @IsString()
  @IsNotEmpty()
  locationName: string;

  @IsString()
  @IsNotEmpty()
  locationNumber: string;

  @IsNumber()
  @IsNotEmpty()
  area: number;

  @IsOptional()
  parentId?: number;
}
