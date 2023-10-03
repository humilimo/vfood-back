import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class CreateIndicatorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(2)
  type: number;

  @IsOptional()
  @IsNumber()
  meta: number;

  @IsOptional()
  @IsNumber()
  supermeta: number;

  @IsOptional()
  @IsNumber()
  desafio: number;
}
