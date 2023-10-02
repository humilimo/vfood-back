import { Colaborator, Indicator, Prisma } from "@prisma/client";
import { IsNotEmpty, IsNumber } from "class-validator";
export class CreateFazerDto {
    colaborator : number;
    indicator : number;
}
