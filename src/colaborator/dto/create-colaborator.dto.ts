import {Prisma} from '@prisma/client';
export class CreateColaboratorDto implements Prisma.ColaboratorCreateInput{
    id: number;
    name: string;
    area : string;
    grade: number;
}