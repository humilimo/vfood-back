import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateColaboratorDto implements Prisma.ColaboratorCreateInput {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  area: string;
}
