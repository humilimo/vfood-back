import { PartialType } from '@nestjs/mapped-types';
import { CreateFazerDto } from './create-fazer.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateFazerDto extends PartialType(CreateFazerDto) {
    @IsNotEmpty()
    @IsNumber()
    progress: number;
}
